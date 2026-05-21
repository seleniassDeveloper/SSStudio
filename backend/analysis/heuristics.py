"""
Análisis de bajo nivel sobre la imagen (sin OpenCV): luminancia, centroides,
asimetría y textura aproximada para alimentar reglas y el vector de rasgos TF.
"""

from __future__ import annotations

import numpy as np
from PIL import Image


def rgb_a_array(img: Image.Image) -> np.ndarray:
    arr = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
    return arr


def luminancia(rgb: np.ndarray) -> np.ndarray:
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    return 0.299 * r + 0.587 * g + 0.114 * b


def analizar_vela(rgb: np.ndarray) -> dict[str, float]:
    """
    Devuelve métricas normalizadas aproximadamente en [0, 1] salvo grados.
    """
    h, w, _ = rgb.shape
    y = luminancia(rgb)

    # Región "llama": píxeles más brillantes (percentil 97 de luminancia)
    thr = float(np.quantile(y, 0.97))
    mask_flame = y >= max(thr, 0.55)
    if not np.any(mask_flame):
        mask_flame = y >= np.quantile(y, 0.90)

    yy, xx = np.indices((h, w))
    total = float(np.sum(mask_flame) + 1e-6)
    cx = float(np.sum(xx * mask_flame) / total)
    cy = float(np.sum(yy * mask_flame) / total)

    # Centro geométrico de la imagen como proxy del eje de vela
    axis_x = w / 2.0
    despl_x = (cx - axis_x) / (w / 2.0 + 1e-6)
    inclinacion_grados = float(np.clip(np.arctan2(despl_x, 1.0) * 180.0 / np.pi, -45.0, 45.0))

    mitad_inf = y[h // 2 :, :]
    izq = float(np.mean(mitad_inf[:, : w // 2]))
    der = float(np.mean(mitad_inf[:, w // 2 :]))
    asimetria_cera = float(np.clip(abs(izq - der) / (izq + der + 1e-6), 0.0, 1.0))

    # Zona superior (humo / hollín): oscuridad en franja superior 35%
    top = rgb[: int(h * 0.35), :]
    lum_top = luminancia(top)
    ratio_residuos = float(np.mean(lum_top < 0.25))

    # Elongación de "gota": varianza vertical vs horizontal en mitad inferior
    low = y[int(h * 0.55) :, :]
    gy, gx = np.gradient(low)
    elong = float(np.clip(np.std(gy) / (np.std(gx) + 1e-6) / 4.0, 0.0, 1.0))

    brillo_llama = float(np.mean(y[mask_flame])) if np.any(mask_flame) else float(np.mean(y))

    return {
        "inclinacion_llama_grados": inclinacion_grados,
        "asimetria_cera": asimetria_cera,
        "ratio_residuos_oscuros": ratio_residuos,
        "elongacion_gotas_inferior": elong,
        "brillo_promedio_llama": float(np.clip(brillo_llama, 0.0, 1.0)),
    }


def vector_caracteristicas(
    rgb: np.ndarray,
    size: int = 96,
    heur_dict: dict[str, float] | None = None,
) -> np.ndarray:
    """Redimensiona y aplana para rama CNN + concat con heurísticas."""
    pil = Image.fromarray((np.clip(rgb, 0.0, 1.0) * 255).astype(np.uint8))
    small = np.asarray(pil.resize((size, size)), dtype=np.float32) / 255.0
    flat = small.reshape(-1)
    metrics = heur_dict if heur_dict is not None else analizar_vela(rgb)
    heur = np.array(list(metrics.values()), dtype=np.float32)
    return np.concatenate([flat, heur], axis=0)
