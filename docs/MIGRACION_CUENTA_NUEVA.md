# Migración completa — cuenta GitHub + deploy nuevos (sin Railway viejo)

**Stack gratis recomendado (sin límite de proyectos Railway):**

| Pieza | Servicio nuevo | URL pública |
|-------|----------------|-------------|
| Código | GitHub (cuenta nueva) | — |
| API Node | **Render** (cuenta nueva) | `https://ssstudio-api.onrender.com` |
| Frontend | **Vercel** (cuenta nueva) | `https://ssstudio.vercel.app` |
| DB | **Neon** (mismo o proyecto nuevo) | connection string |
| Auth | **Firebase** (mismo o proyecto nuevo) | consola |

---

## FASE 0 — Seguridad (hacer YA)

Tus credenciales aparecieron en chats. **Rótalas antes de deploy:**

1. **Neon** → Project → Reset password / nueva connection string  
2. **Firebase** → Service accounts → Delete old key → Generate new key  
3. Borra `server/.env` local si lo compartiste; usa solo variables en Render/Vercel  

Nunca subas `.env` a GitHub (ya está en `.gitignore`).

---

## FASE 1 — Cuenta GitHub nueva (5 min)

1. Crea cuenta en [github.com](https://github.com) (email nuevo si quieres separación total).  
2. **New repository** → nombre: `ssstudio-platform` → **Private** recomendado → sin README.  
3. En tu Mac:

```bash
cd "/Users/seleniasanchez/Desktop/Documents/Proyectos de github seleniaprogramacion/agency-website"

# Quitar remote viejo si existe
git remote remove origin 2>/dev/null || true

# Commit limpio (sin .env)
git add .
git status   # VERIFICA: no debe aparecer server/.env ni .env
git commit -m "feat: production SaaS stack — Render + Vercel"

git branch -M main
git remote add origin https://github.com/TU_USUARIO_NUEVO/ssstudio-platform.git
git push -u origin main
```

Sustituye `TU_USUARIO_NUEVO` y el nombre del repo.

---

## FASE 2 — Neon PostgreSQL (5 min)

Opción A — **Reusar** proyecto Neon actual (tablas SSSTudio ya creadas).  
Opción B — **Proyecto nuevo** en [neon.tech](https://neon.tech) (recomendado si quieres DB limpia).

1. Neon → **Connect** → **Pooled connection**  
2. Copia:

```text
postgresql://USER:PASS@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
```

3. Si DB nueva, tras deploy API ejecuta migraciones (Render lo hace en `startCommand`).

---

## FASE 3 — Firebase (10 min)

### Mismo proyecto `ssstudio-cc2bb` (rápido)

1. [console.firebase.google.com](https://console.firebase.google.com)  
2. **Authentication** → Google → Enable  
3. **Project settings → Web app** → copia 6 valores `VITE_FIREBASE_*`  
4. **Service accounts** → **nueva clave** (no uses la expuesta) → 3 vars servidor  

### Proyecto Firebase nuevo (100% desacoplado)

1. Create project → `ssstudio-prod-v2`  
2. Repite pasos arriba  
3. Usa credenciales nuevas en Render y Vercel  

---

## FASE 4 — API en Render (cuenta NUEVA) (15 min)

1. [render.com](https://render.com) → Sign up con **GitHub cuenta nueva**  
2. **New +** → **Blueprint**  
3. Conecta repo `ssstudio-platform`  
4. Render detecta `render.yaml` en la raíz  
5. Te pedirá variables — pega en el formulario:

```env
DATABASE_URL=postgresql://...(Neon pooled)...
CORS_ORIGINS=https://PLACEHOLDER.vercel.app
FIREBASE_PROJECT_ID=ssstudio-cc2bb
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@ssstudio-cc2bb.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
CEROMANCY_SERVICE_URL=
```

6. **Apply** → espera deploy (~5–10 min primera vez)  
7. Copia URL pública:

```text
https://ssstudio-api.onrender.com
```

8. Prueba:

```bash
curl https://ssstudio-api.onrender.com/api/v1/health
```

Debe: `"database":"connected"`.

**Nota free tier:** Render “duerme” tras inactividad; primera petición tarda ~30–60 s.

---

## FASE 5 — Frontend en Vercel (cuenta NUEVA) (10 min)

1. [vercel.com](https://vercel.com) → Sign up con **GitHub cuenta nueva**  
2. **Add New → Project** → importa `ssstudio-platform`  
3. Framework: **Vite** (auto)  
4. **Environment Variables** (Production):

```env
VITE_API_URL=https://ssstudio-api.onrender.com
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=ssstudio-cc2bb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ssstudio-cc2bb
VITE_FIREBASE_STORAGE_BUCKET=ssstudio-cc2bb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=1:...:web:...
```

5. **Deploy** → URL:

```text
https://ssstudio-platform.vercel.app
```

---

## FASE 6 — Enlazar CORS + Firebase (5 min)

### Render → Variables → editar:

```env
CORS_ORIGINS=https://ssstudio-platform.vercel.app,http://localhost:5173
```

(Usa tu URL real de Vercel, sin `/` final.)

### Firebase → Authentication → Authorized domains:

- `ssstudio-platform.vercel.app`
- `localhost`

Redeploy Render si cambiaste CORS (o guarda; a veces aplica al reinicio).

---

## FASE 7 — Deploy automático

| Servicio | Trigger |
|----------|---------|
| Render | `git push` a `main` (cambios en repo) |
| Vercel | `git push` a `main` |
| GitHub Actions | Solo valida build (`.github/workflows/`) |

---

## URLs finales para compartir

| Uso | URL |
|-----|-----|
| **Usuarios (web)** | `https://TU-APP.vercel.app` |
| **API health** | `https://TU-API.onrender.com/api/v1/health` |
| **Leads POST** | `https://TU-API.onrender.com/api/v1/leads` |

---

## Ceromancia IA (opcional)

Segundo servicio en Render:

- **New Web Service** → mismo repo → **Root Directory:** `backend`  
- **Runtime:** Python 3  
- **Build:** `pip install -r requirements.txt`  
- **Start:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`  

Luego en API Render:

```env
CEROMANCY_SERVICE_URL=https://ssstudio-ceromancy.onrender.com
```

---

## Checklist final

- [ ] Repo en GitHub cuenta **nueva** (sin remote viejo)  
- [ ] `server/.env` **no** está en el repo  
- [ ] Render API → health OK  
- [ ] Vercel → landing carga  
- [ ] Formulario contacto → lead en Neon  
- [ ] Google login → dominio Vercel en Firebase  
- [ ] Credenciales viejas rotadas  

---

## Si Render también falla (plan B)

- API: [Fly.io](https://fly.io) free allowance — `server/Dockerfile` listo  
- Frontend: [Cloudflare Pages](https://pages.cloudflare.com) — build: `npm run build -w frontend`, output: `frontend/dist`  

---

## Comandos locales (desarrollo)

```bash
npm install
cp server/.env.example server/.env    # editar local
cp frontend/.env.example frontend/.env
npm run db:migrate -w server
npm run dev
```

En otra terminal: `npm run dev:ceromancy` (puerto 8002).
