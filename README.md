# Ceromancia CV — Análisis simbólico de velas

Aplicación demo: backend (FastAPI + TensorFlow) e interfaz web para subir fotos de velas y recibir una interpretación basada en patrones visuales heurísticos y un modelo de clasificación ligero.

## Requisitos

- Python 3.10+
- Node.js 18+ (solo para el frontend estático con Vite)

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` y configura la API en la UI si no usas el proxy de Vite (por defecto apunta a `http://127.0.0.1:8000`).

## Documentación del flujo del modelo

Ver `docs/MODELO_IA_FLUJO.md`.
