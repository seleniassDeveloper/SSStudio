# Seguridad — SSSTudio

## Archivos que NUNCA deben estar en Git

- `server/.env`, `frontend/.env`
- `service-account*.json`, `firebase-adminsdk*.json`
- Claves `.pem`, passwords en markdown

## Estado del repo

`.gitignore` bloquea `.env` y credenciales. Antes de cada push:

```bash
git status
# No debe listar: server/.env, frontend/.env
```

## Si expusiste credenciales (chat, screenshot, commit)

| Servicio | Acción |
|----------|--------|
| Neon | Reset database password → nueva `DATABASE_URL` |
| Firebase | Eliminar service account key → generar nueva |
| Render/Vercel | Actualizar variables con valores nuevos |

## Variables solo en hosting

| Variable | Dónde |
|----------|-------|
| `DATABASE_URL` | Render |
| `FIREBASE_*` (servidor) | Render |
| `VITE_FIREBASE_*` | Vercel |
| `VITE_API_URL` | Vercel |
| `CORS_ORIGINS` | Render |

## CORS producción

Solo dominios explícitos en `CORS_ORIGINS`. No uses `*` con `credentials: true`.
