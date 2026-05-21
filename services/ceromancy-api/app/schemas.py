from pydantic import BaseModel, Field


class PatternMatch(BaseModel):
    pattern_id: str
    nombre: str
    confianza: float = Field(ge=0.0, le=1.0)
    interpretacion: str
    detalles_visuales: str


class MetricasVisuales(BaseModel):
    inclinacion_llama_grados: float
    asimetria_cera: float
    ratio_residuos_oscuros: float
    elongacion_gotas_inferior: float
    brillo_promedio_llama: float


class AnalisisResponse(BaseModel):
    resumen: str
    metricas: MetricasVisuales
    patrones: list[PatternMatch]
    nota_metodo: str
