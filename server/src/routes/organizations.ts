import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const organizationsRouter = Router();

organizationsRouter.use(requireAuth);

organizationsRouter.get("/", async (req: AuthedRequest, res, next) => {
  try {
    const orgs = await prisma.organization.findMany({
      where: {
        members: { some: { userId: req.user!.id } },
      },
      include: {
        members: { include: { user: { select: { id: true, email: true, displayName: true } } } },
        projects: true,
      },
    });
    res.json({ organizations: orgs });
  } catch (err) {
    next(err);
  }
});

const projectSchema = z.object({
  name: z.string().min(1).max(120),
  type: z.string().default("app"),
});

organizationsRouter.post("/:orgId/projects", async (req: AuthedRequest, res, next) => {
  try {
    const orgId = String(req.params.orgId);
    const data = projectSchema.parse(req.body);

    const member = await prisma.organizationMember.findFirst({
      where: { organizationId: orgId, userId: req.user!.id },
    });

    if (!member) return res.status(403).json({ error: "Sin acceso" });

    const project = await prisma.project.create({
      data: {
        organizationId: orgId,
        name: data.name,
        type: data.type,
      },
    });

    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
});
