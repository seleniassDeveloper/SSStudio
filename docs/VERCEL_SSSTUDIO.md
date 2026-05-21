# Publicar SSSTudio en Vercel (2 minutos)

Repo: https://github.com/seleniassDeveloper/SSStudio

## Pasos

1. Entra en https://vercel.com/new
2. **Import Git Repository** → `seleniassDeveloper/SSStudio`
3. **Project Name:** `ssstudio` (URL: `https://ssstudio.vercel.app`)
4. Deja la configuración que detecta `vercel.json`:
   - Build: `npm run build -w frontend`
   - Output: `frontend/dist`
5. **Deploy** (sin variables también carga la landing)
6. Cuando tengas API en Render, añade en **Settings → Environment Variables**:

```env
VITE_API_URL=https://tu-api.onrender.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=ssstudio-cc2bb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ssstudio-cc2bb
VITE_FIREBASE_STORAGE_BUCKET=ssstudio-cc2bb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

7. **Redeploy** tras añadir variables.

## URL final

- Producción: `https://ssstudio.vercel.app`
- O la que muestre Vercel en **Domains**

Cada `git push` a `main` redespliega automáticamente.
