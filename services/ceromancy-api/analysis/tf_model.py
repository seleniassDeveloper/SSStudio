"""
Modelo TensorFlow (Keras): rama convolucional ligera + vector heurístico,
fusión y capa de salida multi-etiqueta (sigmoid) alineada con el catálogo.
Sin pesos preentrenados externos: arquitectura lista para fine-tuning.
En inferencia se combina con prior por reglas (neuro-simbólico híbrido).
"""

from __future__ import annotations

import numpy as np
import tensorflow as tf
from tensorflow import keras

from analysis.patterns_catalog import orden_patrones

_NUM_PATRONES = len(orden_patrones())
_IMG_FLAT = 96 * 96 * 3
_HEUR = 5


def construir_modelo() -> keras.Model:
    img_in = keras.layers.Input(shape=(_IMG_FLAT,), name="imagen_flat")
    h_in = keras.layers.Input(shape=(_HEUR,), name="heuristicas")

    x = keras.layers.Reshape((96, 96, 3))(img_in)
    x = keras.layers.Conv2D(16, 3, padding="same", activation="relu")(x)
    x = keras.layers.MaxPool2D()(x)
    x = keras.layers.Conv2D(32, 3, padding="same", activation="relu")(x)
    x = keras.layers.GlobalAveragePooling2D()(x)
    x = keras.layers.Dense(32, activation="relu")(x)

    z = keras.layers.Concatenate()([x, h_in])
    z = keras.layers.Dense(48, activation="relu")(z)
    logits = keras.layers.Dense(_NUM_PATRONES, activation=None, name="logits")(z)

    return keras.Model(inputs=[img_in, h_in], outputs=logits, name="ceromancia_hibrida")


_model: keras.Model | None = None


def obtener_modelo() -> keras.Model:
    global _model
    if _model is None:
        tf.keras.utils.set_random_seed(42)
        _model = construir_modelo()
    return _model


@tf.function
def _forward(model: keras.Model, img_flat: tf.Tensor, heur: tf.Tensor) -> tf.Tensor:
    return model([img_flat, heur], training=False)


def logits_red_neuronal(
    img_flat: np.ndarray, heur: np.ndarray
) -> np.ndarray:
    model = obtener_modelo()
    img_t = tf.constant(img_flat[np.newaxis, :], dtype=tf.float32)
    h_t = tf.constant(heur[np.newaxis, :], dtype=tf.float32)
    out = _forward(model, img_t, h_t)
    return out.numpy().reshape(-1)


def prior_reglas(heur: dict[str, float]) -> np.ndarray:
    """
    Convierte métricas en logits heurísticos por patrón (orden fijo del catálogo).
    """
    ids = orden_patrones()
    logits = np.zeros(len(ids), dtype=np.float32)
    inc = abs(heur["inclinacion_llama_grados"]) / 45.0
    asym = heur["asimetria_cera"]
    res = heur["ratio_residuos_oscuros"]
    elong = heur["elongacion_gotas_inferior"]
    est = 1.0 - min(1.0, inc * 2 + asym * 2 + res * 2)

    idx = {pid: i for i, pid in enumerate(ids)}

    logits[idx["llama_inclinada"]] = 3.0 * inc
    logits[idx["cera_colgante"]] = 2.5 * elong
    logits[idx["residuos_hollin"]] = 4.0 * res
    logits[idx["llama_estable"]] = 3.0 * est
    logits[idx["cera_asimetrica"]] = 3.0 * asym
    # Figura orgánica: alta varianza estructural sin dominancia clara
    otros = (
        logits[idx["llama_inclinada"]]
        + logits[idx["cera_colgante"]]
        + logits[idx["residuos_hollin"]]
        + logits[idx["cera_asimetrica"]]
    )
    logits[idx["figura_organica"]] = float(np.clip(2.0 - otros * 0.35, 0.0, 3.0))

    return logits


def combinar_hibrido(
    logits_nn: np.ndarray, logits_reglas: np.ndarray, alpha_nn: float = 0.35
) -> np.ndarray:
    """alpha_nn: peso de la rama neuronal; el resto son reglas interpretables."""
    a = float(np.clip(alpha_nn, 0.0, 1.0))
    z = a * logits_nn + (1.0 - a) * logits_reglas
    return 1.0 / (1.0 + np.exp(-np.clip(z, -12, 12)))


def inferir_probabilidades(img_flat: np.ndarray, heur_vec: np.ndarray, heur_dict: dict[str, float]) -> np.ndarray:
    nn = logits_red_neuronal(img_flat, heur_vec)
    reg = prior_reglas(heur_dict)
    return combinar_hibrido(nn, reg, alpha_nn=0.35)
