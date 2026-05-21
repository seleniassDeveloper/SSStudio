import { Router } from "express";
import multer from "multer";
import type { Request, Response } from "express";
import { env } from "../config/env.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

export async function analyzeCandleImage(req: Request, res: Response) {
  if (!env.CEROMANCY_SERVICE_URL) {
    return res.status(503).json({
      error: "Servicio de ceromancia no configurado. Define CEROMANCY_SERVICE_URL.",
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Archivo requerido (campo: file)" });
  }

  const form = new FormData();
  const blob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype });
  form.append("file", blob, req.file.originalname || "vela.jpg");

  let upstreamRes: globalThis.Response;
  try {
    upstreamRes = await fetch(`${env.CEROMANCY_SERVICE_URL}/analizar`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(120_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error de conexión";
    return res.status(503).json({
      error: `Ceromancia IA no disponible. Ejecuta: npm run dev:ceromancy (${msg})`,
    });
  }

  const text = await upstreamRes.text();
  if (!upstreamRes.ok && upstreamRes.status === 404) {
    return res.status(503).json({
      error:
        "El puerto configurado no es el servicio de ceromancia. Usa CEROMANCY_SERVICE_URL=http://127.0.0.1:8002 y npm run dev:ceromancy",
    });
  }

  res
    .status(upstreamRes.status)
    .type(upstreamRes.headers.get("content-type") ?? "application/json")
    .send(text);
}

export const ceromancyRouter = Router();

ceromancyRouter.post("/analyze", upload.single("file"), analyzeCandleImage);
