# SSSTudio — SaaS Platform

React (Vite) + Node (Express) + PostgreSQL (Neon) + Firebase Auth.

## Deploy en cuenta nueva (sin Railway viejo)

**Guía paso a paso:** [`docs/MIGRACION_CUENTA_NUEVA.md`](docs/MIGRACION_CUENTA_NUEVA.md)

| Servicio | Hosting gratis |
|----------|----------------|
| Código | GitHub (cuenta nueva) |
| API | **Render** (`render.yaml`) |
| Web | **Vercel** (`vercel.json`) |
| DB | Neon |
| Auth | Firebase |

## Estructura

```
├── frontend/     # React + Vite
├── server/       # Express + Prisma
├── backend/      # Python ceromancia (opcional)
├── render.yaml   # Deploy API en Render
└── vercel.json   # Deploy web en Vercel
```

## Local

```bash
npm install
cp server/.env.example server/.env
cp frontend/.env.example frontend/.env
npm run db:migrate -w server
npm run dev
```

- Web: http://localhost:5173  
- API: http://localhost:3001/api/v1/health  

Ceromancia: `npm run dev:ceromancy` (puerto 8002).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | API + frontend |
| `npm run build` | Build producción |
| `bash scripts/migrate-new-account.sh` | Verificar antes de push |

## Seguridad

[`docs/SECURITY.md`](docs/SECURITY.md) — nunca subir `.env` ni service account JSON.

## Docs

- [Migración cuenta nueva](docs/MIGRACION_CUENTA_NUEVA.md)
- [Deploy general](docs/DEPLOY.md)
