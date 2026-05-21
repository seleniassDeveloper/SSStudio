#!/usr/bin/env bash
# Prepara el repo para cuenta GitHub nueva — NO sube secretos
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Comprobando secretos en staging..."
FORBIDDEN=$(git add -n . 2>/dev/null | grep -E '\.env$|\.env\.local|\.env\.production$|service-account|firebase-adminsdk|\.pem' | grep -v '\.env\.example' || true)
if [ -n "$FORBIDDEN" ]; then
  echo "ERROR: Archivos sensibles detectados. Revisa .gitignore"
  echo "$FORBIDDEN"
  exit 1
fi

echo "==> Build producción..."
npm install
npm run build

echo "==> Verificando artefactos..."
test -f server/dist/index.js
test -f frontend/dist/index.html

echo ""
echo "OK — Listo para push a cuenta GitHub NUEVA."
echo ""
echo "Siguiente:"
echo "  git remote remove origin 2>/dev/null || true"
echo "  git add ."
echo "  git commit -m 'feat: production SaaS — Render + Vercel'"
echo "  git remote add origin https://github.com/TU_USUARIO/ssstudio-platform.git"
echo "  git push -u origin main"
echo ""
echo "Deploy: docs/MIGRACION_CUENTA_NUEVA.md"
