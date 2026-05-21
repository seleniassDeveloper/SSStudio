import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";

const leadSchema = z.object({
  nombre: z.string().min(1).max(120),
  email: z.string().email().optional().or(z.literal("")),
  proyecto: z.string().max(200).optional(),
  tipo: z.string().max(80).optional(),
  descripcion: z.string().min(5).max(5000),
});

export const leadsRouter = Router();

leadsRouter.post("/", optionalAuth, async (req: AuthedRequest, res, next) => {
  try {
    const data = leadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        nombre: data.nombre,
        email: data.email || null,
        proyecto: data.proyecto || null,
        tipo: data.tipo || null,
        descripcion: data.descripcion,
        userId: req.user?.id ?? null,
        source: "landing",
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        name: "lead_created",
        userId: req.user?.id,
        payload: { leadId: lead.id, tipo: data.tipo },
      },
    });

    res.status(201).json({ ok: true, id: lead.id });
  } catch (err) {
    next(err);
  }
});

leadsRouter.get("/", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Solo administradores" });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    res.json({ leads });
  } catch (err) {
    next(err);
  }
});
