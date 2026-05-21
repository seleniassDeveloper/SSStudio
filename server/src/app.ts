import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { corsOrigins, env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { healthRouter } from "./routes/health.js";
import { ceromancyRouter, analyzeCandleImage } from "./routes/ceromancy.js";
import multer from "multer";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (corsOrigins.includes(origin) || corsOrigins.includes("*")) {
          return callback(null, true);
        }
        return callback(new Error(`CORS bloqueado: ${origin}`));
      },
      credentials: true,
    })
  );

  app.use(
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_req, res) => {
    res.json({
      name: "SSSTudio API",
      docs: "/api/v1/health",
    });
  });

  app.use("/api/v1", apiRouter);

  /** Rutas legacy (frontend / vite proxy) */
  app.use("/health", healthRouter);
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });
  app.post("/analizar", upload.single("file"), analyzeCandleImage);

  app.use(errorHandler);

  return app;
}
