"""
Catálogo de patrones simbólicos predefinidos.
Cada patrón tiene metadatos de interpretación; la activación depende
de umbrales sobre métricas y de la salida del modelo híbrido.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class PatronSimbolico:
    id: str
    nombre: str
    interpretacion: str
    detalle_modelo: str


PATRONES: dict[str, PatronSimbolico] = {
    "llama_inclinada": PatronSimbolico(
        id="llama_inclinada",
        nombre="Llama inclinada",
        interpretacion="Corrientes o influencias externas desvían la intención; conviene clarificar prioridades.",
        detalle_modelo="Se activa cuando el centroide de la región luminosa se desplaza lateralmente respecto al eje de la vela.",
    ),
    "cera_colgante": PatronSimbolico(
        id="cera_colgante",
        nombre="Gota o columna de cera",
        interpretacion="Carga emocional o asunto pendiente que 'pesa' y pide cierre o ritual de soltar.",
        detalle_modelo="Alta elongación vertical de cera en la mitad inferior sin dispersión simétrica.",
    ),
    "residuos_hollin": PatronSimbolico(
        id="residuos_hollin",
        nombre="Residuos / hollín",
        interpretacion="Obstáculos, confusión o energía densa; revisar comunicación y entorno.",
        detalle_modelo="Alto ratio de píxeles oscuros alrededor de la zona de llama.",
    ),
    "llama_estable": PatronSimbolico(
        id="llama_estable",
        nombre="Llama centrada y estable",
        interpretacion="Equilibrio y foco; buen momento para consolidar acuerdos o meditación.",
        detalle_modelo="Baja inclinación, brillo concentrado y poca asimetría de cera.",
    ),
    "cera_asimetrica": PatronSimbolico(
        id="cera_asimetrica",
        nombre="Derrame asimétrico",
        interpretacion="Desbalance entre dar y recibir, o entre dos ámbitos de la vida.",
        detalle_modelo="Gradiente horizontal de intensidad en la zona de cera fuertemente sesgado.",
    ),
    "figura_organica": PatronSimbolico(
        id="figura_organica",
        nombre="Figura orgánica difusa",
        interpretacion="Proceso en curso, forma aún no definida; paciencia y observación continua.",
        detalle_modelo="Contornos irregulares con varianza alta en bordes inferiores (sin patrón claro dominante).",
    ),
}


def orden_patrones() -> list[str]:
    return list(PATRONES.keys())
