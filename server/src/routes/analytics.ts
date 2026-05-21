import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { optionalAuth, requireAuth, type AuthedRequest } from "../middleware/auth.js";

const eventSchema = z.object({
  name: z.string().min(1).max(80),
  payload: z.record(z.unknown()).optional(),
});

export const analyticsRouter = Router();

analyticsRouter.post("/events", optionalAuth, async (req: AuthedRequest, res, next) => {
  try {
    const data = eventSchema.parse(req.body);

    await prisma.analyticsEvent.create({
      data: {
        name: data.name,
        payload: (data.payload ?? {}) as Prisma.InputJsonValue,
        userId: req.user?.id,
      },
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

analyticsRouter.get("/summary", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Solo administradores" });
    }

    const [leads, users, events] = await Promise.all([
      prisma.lead.count(),
      prisma.user.count(),
      prisma.analyticsEvent.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    res.json({
      summary: {
        totalLeads: leads,
        totalUsers: users,
        eventsLast7Days: events,
      },
    });
  } catch (err) {
    next(err);
  }
});
