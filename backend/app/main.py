from __future__ import annotations

import io
import uuid
from pathlib import Path

import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from analysis.heuristics import analizar_vela, rgb_a_array, vector_caracteristicas
from analysis.patterns_catalog import PATRONES, orden_patrones
from analysis.tf_model import inferir_probabilidades

from app.schemas import AnalisisResponse, MetricasVisuales, PatternMatch

app = FastAPI(title="Ceromancia CV API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_BYTES = 8 * 1024 * 1024
UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analizar", response_model=AnalisisResponse)
async def analizar(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "Se requiere un archivo de imagen (JPEG/PNG/WebP).")

    raw = await file.read()
    if len(raw) > MAX_BYTES:
        raise HTTPException(400, "Imagen demasiado grande (máx. 8 MB).")

    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception as exc:
        raise HTTPException(400, f"No se pudo leer la imagen: {exc}") from exc

    rgb = rgb_a_array(img)
    heur = analizar_vela(rgb)
    feat = vector_caracteristicas(rgb, heur_dict=heur)
    img_flat = feat[: 96 * 96 * 3].astype(np.float32)
    heur_vec = feat[96 * 96 * 3 :].astype(np.float32)

    probs = inferir_probabilidades(img_flat, heur_vec, heur)

    orden = orden_patrones()
    matches: list[PatternMatch] = []
    for i, pid in enumerate(orden):
        p = PATRONES[pid]
        conf = float(probs[i])
        if conf < 0.12:
            continue
        detalle = (
            f"{p.detalle_modelo} Confianza combinada (reglas+TF): {conf:.2f}. "
            f"Métricas: inclinación {heur['inclinacion_llama_grados']:.1f}°, "
            f"asimetría cera {heur['asimetria_cera']:.2f}, residuos {heur['ratio_residuos_oscuros']:.2f}."
        )
        matches.append(
            PatternMatch(
                pattern_id=p.id,
                nombre=p.nombre,
                confianza=round(conf, 3),
                interpretacion=p.interpretacion,
                detalles_visuales=detalle,
            )
        )

    matches.sort(key=lambda m: m.confianza, reverse=True)

    if not matches:
        matches.append(
            PatternMatch(
                pattern_id="ninguno",
                nombre="Sin patrón dominante",
                confianza=0.0,
                interpretacion="La imagen no activó umbrales claros; prueba más luz, encuadre centrado o otra toma.",
                detalles_visuales="Aumenta contraste llama/fondo o acerca la cámara.",
            )
        )

    top = matches[0]
    resumen = (
        f"Patrón principal sugerido: «{top.nombre}». "
        f"Inclinación aparente de la llama: {heur['inclinacion_llama_grados']:.1f}°. "
        f"Indicadores de residuos oscuros: {heur['ratio_residuos_oscuros']:.0%} en la zona superior."
    )

    return AnalisisResponse(
        resumen=resumen,
        metricas=MetricasVisuales(
            inclinacion_llama_grados=round(heur["inclinacion_llama_grados"], 2),
            asimetria_cera=round(heur["asimetria_cera"], 3),
            ratio_residuos_oscuros=round(heur["ratio_residuos_oscuros"], 3),
            elongacion_gotas_inferior=round(heur["elongacion_gotas_inferior"], 3),
            brillo_promedio_llama=round(heur["brillo_promedio_llama"], 3),
        ),
        patrones=matches[:6],
        nota_metodo=(
            "Salida híbrida: reglas interpretables sobre la geometría y luminancia "
            "se fusionan (65/35) con logits de una pequeña red convolucional en TensorFlow. "
            "Ver docs/MODELO_IA_FLUJO.md."
        ),
    )


@app.post("/debug/guardar")
async def debug_guardar(file: UploadFile = File(...)):
    """Opcional: guarda copia para depuración local."""
    raw = await file.read()
    name = f"{uuid.uuid4().hex[:12]}_{file.filename or 'img'}"
    path = UPLOAD_DIR / name
    path.write_bytes(raw)
    return {"path": str(path)}
