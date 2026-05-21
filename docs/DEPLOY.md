# Deploy gratuito SSSTudio SaaS (paso a paso)

> **Cuenta Railway bloqueada o proyecto viejo:** usa [`MIGRACION_CUENTA_NUEVA.md`](MIGRACION_CUENTA_NUEVA.md) (GitHub + Render + Vercel nuevos).

Flujo final: **GitHub → deploy automático → URL pública 24/7**

| Componente | Servicio gratis | URL ejemplo |
|------------|-----------------|-------------|
| Frontend | Vercel o Cloudflare Pages | `https://ssstudio.vercel.app` |
| API Node | **Render** (recomendado) o Railway | `https://ssstudio-api.onrender.com` |
| PostgreSQL | Neon | connection string en variables |
| Auth | Firebase | Google Sign-In |
| Ceromancia IA | Railway (Python) | `https://ceromancy.up.railway.app` |

---

## 0. Estructura del monorepo

```
agency-website/
├── frontend/          # React + Vite
├── server/            # Node + Express + Prisma
├── services/ceromancy-api/  # Python FastAPI (opcional en prod)
├── docs/DEPLOY.md
├── vercel.json        # Root → build frontend
└── package.json       # workspaces
```

---

## 1. Base de datos Neon (PostgreSQL)

1. Entra en [https://neon.tech](https://neon.tech) → **Sign up** (gratis).
2. **New Project** → nombre `ssstudio` → región cercana a tus usuarios.
3. En **Dashboard → Connection details** copia la URL **pooled** (termina en `-pooler` o usa el modo *Pooled*).
4. Debe verse así:

```bash
postgresql://USER:PASSWORD@ep-xxxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

5. Guarda esa URL; la usarás en Railway/Render como `DATABASE_URL`.

### Aplicar schema (primera vez)

En tu Mac, con la URL de Neon en `server/.env`:

```bash
cd server
cp .env.example .env
# Edita .env y pega DATABASE_URL=...

npm install
npm run db:migrate:dev   # solo desarrollo local (crea migración si falta)
# O en producción el host ejecuta:
npm run db:migrate       # prisma migrate deploy
```

---

## 2. Firebase Authentication

1. [https://console.firebase.google.com](https://console.firebase.google.com) → **Add project** → `ssstudio-prod`.
2. **Build → Authentication → Get started → Sign-in method → Google → Enable**.
3. **Project settings → General → Your apps → Web** → registrar app.
4. Copia las claves web → van al frontend (`VITE_FIREBASE_*`).

### Service Account (backend)

1. **Project settings → Service accounts → Generate new private key** (JSON).
2. Del JSON extrae:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (en una línea con `\n` literales)

Ejemplo en Railway:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

3. **Authentication → Settings → Authorized domains** → agrega:
   - `localhost`
   - `tu-app.vercel.app`
   - dominio de Cloudflare si usas Pages

---

## 3. API Node en Railway (recomendado)

1. [https://railway.app](https://railway.app) → login con GitHub.
2. **New Project → Deploy from GitHub repo** → selecciona `agency-website`.
3. **Settings del servicio:**
   - **Root Directory:** `server`
   - **Builder:** Dockerfile (ya existe `server/Dockerfile`)
4. **Variables** (pestaña Variables):

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://...neon...?sslmode=require
CORS_ORIGINS=https://tu-frontend.vercel.app,http://localhost:5173
FIREBASE_PROJECT_ID=ssstudio-prod
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@ssstudio-prod.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
CEROMANCY_SERVICE_URL=https://tu-ceromancy.up.railway.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

5. **Deploy** → copia la URL pública, ej. `https://ssstudio-api-production.up.railway.app`.
6. Prueba:

```bash
curl https://TU-API.up.railway.app/api/v1/health
```

Respuesta esperada: `{"status":"ok",...}`

### Alternativa: Render

1. [https://render.com](https://render.com) → **New → Blueprint** o Web Service.
2. Conecta el repo; Render lee `server/render.yaml`.
3. En el dashboard pega las mismas variables que arriba.
4. **Start command** (ya en blueprint): `npx prisma migrate deploy && npm run start`

---

## 4. Servicio Python ceromancia (opcional)

Si usas la demo de vela en producción:

1. En Railway → **New Service** → mismo repo.
2. **Root Directory:** `services/ceromancy-api`
3. Variables: ninguna obligatoria; usa `PORT` de Railway.
4. Copia la URL → `CEROMANCY_SERVICE_URL` en la API Node.

Local:

```bash
npm run dev:ceromancy
```

---

## 5. Frontend en Vercel

1. [https://vercel.com](https://vercel.com) → **Add New → Project** → importa el repo de GitHub.
2. **Root Directory:** deja vacío (usa `vercel.json` en la raíz).
3. **Environment Variables** (Production):

```env
VITE_API_URL=https://TU-API.up.railway.app
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=ssstudio-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ssstudio-prod
VITE_FIREBASE_STORAGE_BUCKET=ssstudio-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc
VITE_DEMO_DASHBOARD_URL=https://dashboard-react-rust-eight.vercel.app/app
VITE_DEMO_EMOTIONS_URL=
VITE_DEMO_CALORIES_URL=
```

4. **Deploy** → URL: `https://tu-proyecto.vercel.app`.

5. Vuelve a Railway y actualiza `CORS_ORIGINS` con la URL exacta de Vercel (sin barra final).

### Cloudflare Pages (alternativa)

1. [https://dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect Git**.
2. **Build command:** `npm install && npm run build -w frontend`
3. **Build output directory:** `frontend/dist`
4. Mismas variables `VITE_*` que en Vercel (prefijo obligatorio en Vite).
5. En Firebase Authorized domains agrega `*.pages.dev`.

---

## 6. CORS (obligatorio)

La API solo acepta orígenes listados en `CORS_ORIGINS` (separados por coma):

```env
CORS_ORIGINS=https://ssstudio.vercel.app,https://www.tudominio.com,http://localhost:5173
```

Si el frontend muestra error de red/CORS:

1. Verifica que la URL en el navegador coincida exactamente con una entrada.
2. No uses `*` en producción si envías cookies (`credentials: true`).

---

## 7. Deploy automático desde GitHub

### Vercel

Al conectar el repo, cada `git push` a `main` despliega el frontend.

### Railway

Cada push que toque `server/**` redespliega la API.

### GitHub Actions (CI)

Ya existen workflows que validan el build en cada push:

- `.github/workflows/deploy-web.yml` → build frontend
- `.github/workflows/deploy-api.yml` → build API

Opcional: agrega secrets en **GitHub → Settings → Secrets** para que el CI use tus `VITE_*` reales.

---

## 8. Comandos locales (copiar y pegar)

```bash
# Raíz del repo
git clone https://github.com/TU_USUARIO/agency-website.git
cd agency-website
npm install

# Terminal 1 — API
cd server && cp .env.example .env
# Completa DATABASE_URL y Firebase
npm run db:push
npm run dev

# Terminal 2 — Frontend
cd frontend && cp .env.example .env
# VITE_API_URL=http://localhost:3001
npm run dev

# Terminal 3 — Ceromancia (opcional)
npm run dev:ceromancy
```

Abre: `http://localhost:5173`

---

## 9. Checklist producción

- [ ] `curl https://API/api/v1/health` → ok
- [ ] Formulario contacto guarda lead en Neon (`leads` table)
- [ ] Login Google visible en navbar (si Firebase configurado)
- [ ] Demo ceromancia sube imagen (si `CEROMANCY_SERVICE_URL` activo)
- [ ] `CORS_ORIGINS` incluye URL de Vercel
- [ ] Variables `VITE_API_URL` apuntan a Railway, no a localhost

---

## 10. Escalar después (ya preparado en schema)

| Feature | Tabla / ruta | Siguiente paso |
|---------|--------------|----------------|
| Multi-tenant | `organizations`, `organization_members` | UI dashboard |
| Suscripciones | `subscriptions` | Stripe webhook |
| Analytics | `analytics_events`, `POST /api/v1/analytics/events` | Grafana / Metabase |
| IA | `projects.config` JSON | OpenAI en worker |
| Realtime | — | Socket.io o Ably |

---

## 11. Variables resumen

### `server/.env`

Ver `server/.env.example`.

### `frontend/.env`

Ver `frontend/.env.example`.

---

## 12. Solución de problemas

| Síntoma | Causa | Fix |
|---------|-------|-----|
| CORS error | Origen no en lista | Agregar URL a `CORS_ORIGINS` y redeploy API |
| 500 en leads | DB sin migrar | `npm run db:migrate` en Railway logs |
| Firebase auth popup | Dominio no autorizado | Authorized domains en Firebase |
| Ceromancia 502 | Python caído | Deploy `services/ceromancy-api` y URL en `CEROMANCY_SERVICE_URL` |
| Build Vercel falla | Falta root workspace | Usar `vercel.json` raíz o `npm run build -w frontend` |

---

## URL final

Después del deploy tendrás:

- **App:** `https://TU-PROYECTO.vercel.app`
- **API:** `https://TU-API.up.railway.app`
- **Docs health:** `https://TU-API.up.railway.app/api/v1/health`

Comparte la URL de Vercel con usuarios reales; la app corre 24/7 sin tu computadora.
