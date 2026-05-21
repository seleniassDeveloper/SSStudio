import type { Request, Response, NextFunction } from "express";
import { firebaseEnabled } from "../config/env.js";
import { verifyIdToken } from "../lib/firebase.js";
import { prisma } from "../lib/prisma.js";

export type AuthedRequest = Request & {
  user?: {
    id: string;
    firebaseUid: string;
    email: string;
    role: string;
  };
};

export async function optionalAuth(req: AuthedRequest, _res: Response, next: NextFunction) {
  if (!firebaseEnabled) return next();

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();

  try {
    const token = header.slice(7);
    const decoded = await verifyIdToken(token);
    if (!decoded?.uid) return next();

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (user) {
      req.user = {
        id: user.id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        role: user.role,
      };
    }
  } catch {
    /* token inválido en rutas opcionales */
  }

  next();
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  if (!firebaseEnabled) {
    return res.status(503).json({
      error: "Auth no configurado. Define variables Firebase en el servidor.",
    });
  }

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = await verifyIdToken(header.slice(7));
    if (!decoded?.uid || !decoded.email) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const user = await prisma.user.upsert({
      where: { firebaseUid: decoded.uid },
      update: {
        email: decoded.email,
        displayName: decoded.name ?? undefined,
        photoUrl: decoded.picture ?? undefined,
      },
      create: {
        firebaseUid: decoded.uid,
        email: decoded.email,
        displayName: decoded.name ?? null,
        photoUrl: decoded.picture ?? null,
      },
    });

    req.user = {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
