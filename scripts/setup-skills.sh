#!/usr/bin/env bash
# Instala las skills del proyecto (ver docs/SKILLS.md). Mismo esquema que me-beauty-site.
# Uso: desde la raíz del repo, tras `nvm use`: ./scripts/setup-skills.sh
set -euo pipefail

IMPECCABLE_VERSION="4.5.2"      # última con 14 días o más el 2026-10-25
PLAYWRIGHT_CLI_VERSION="0.1.22"

if [[ ! -f "PRODUCT.md" || ! -f "DESIGN.md" ]]; then
  echo "Ejecuta este script desde la raíz del repo (faltan PRODUCT.md o DESIGN.md)." >&2
  exit 1
fi

node scripts/check-node.mjs

echo "==> Impeccable ${IMPECCABLE_VERSION} (skill principal de diseño), ámbito de proyecto, solo Claude Code"
npx --yes "impeccable@${IMPECCABLE_VERSION}" install --providers=claude --scope=project

echo "==> Impeccable: telemetría desactivada para todo el proyecto"
mkdir -p .impeccable
if [[ -f .impeccable/config.json ]]; then
  echo "    .impeccable/config.json ya existe; revisa que contenga \"telemetry\": false"
else
  printf '{\n  "telemetry": false\n}\n' > .impeccable/config.json
fi

echo "==> playwright-cli ${PLAYWRIGHT_CLI_VERSION} y su skill"
npm install -g "@playwright/cli@${PLAYWRIGHT_CLI_VERSION}"
playwright-cli install --skills

echo "==> Dependencias de test y navegador Chromium"
npm ci
npx playwright install chromium

cat <<'EOF'

Hecho. Pasos manuales dentro de Claude Code (son comandos de la sesión, no de shell):

  /plugin marketplace add Owl-Listener/designer-skills
  /plugin install visual-critique@designer-skills
  /plugin install design-systems@designer-skills

Después, si cambian PRODUCT.md o DESIGN.md:
  /impeccable init
EOF
