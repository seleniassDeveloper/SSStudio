import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      memberships: {
        include: { organization: true },
      },
    },
  });

  res.json({ user });
});

authRouter.post("/sync", requireAuth, async (req: AuthedRequest, res) => {
  const slug = `org-${req.user!.id.slice(0, 8)}`;
  const existing = await prisma.organizationMember.findFirst({
    where: { userId: req.user!.id },
    include: { organization: true },
  });

  if (existing) {
    return res.json({ organization: existing.organization });
  }

  const org = await prisma.organization.create({
    data: {
      name: `${req.user!.email.split("@")[0]} Workspace`,
      slug,
      members: {
        create: {
          userId: req.user!.id,
          role: "OWNER",
        },
      },
    },
  });

  await prisma.subscription.create({
    data: {
      organizationId: org.id,
      plan: "FREE",
    },
  });

  res.status(201).json({ organization: org });
});
