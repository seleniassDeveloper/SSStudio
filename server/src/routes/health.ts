import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { env, firebaseEnabled } from "../config/env.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  let db = "disconnected";
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = "connected";
  } catch {
    db = "error";
  }

  res.json({
    status: "ok",
    service: "ssstudio-api",
    version: "1.0.0",
    environment: env.NODE_ENV,
    database: db,
    firebase: firebaseEnabled ? "enabled" : "disabled",
    ceromancyService: env.CEROMANCY_SERVICE_URL ?? "not_configured",
    timestamp: new Date().toISOString(),
  });
});
