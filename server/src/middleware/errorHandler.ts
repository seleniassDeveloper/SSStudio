import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (res.headersSent) return;

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: err.flatten().fieldErrors,
    });
  }

  const message = err instanceof Error ? err.message : "Error interno";
  const status =
    err && typeof err === "object" && "status" in err && typeof err.status === "number"
      ? err.status
      : 500;

  res.status(status).json({
    error: process.env.NODE_ENV === "production" && status === 500 ? "Error interno" : message,
  });
}
