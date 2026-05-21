import { Router } from "express";
import { healthRouter } from "./health.js";
import { leadsRouter } from "./leads.js";
import { authRouter } from "./auth.js";
import { organizationsRouter } from "./organizations.js";
import { analyticsRouter } from "./analytics.js";
import { ceromancyRouter } from "./ceromancy.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/leads", leadsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/organizations", organizationsRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/ceromancy", ceromancyRouter);
