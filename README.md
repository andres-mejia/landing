# andres-mejia/landing

Landing personal de Andrés Mejía, arquitecto de software. Bilingüe EN/ES, con tema oscuro y claro. Se despliega en AWS Amplify Hosting en https://andres.tekhos.com.

```bash
nvm use && npm ci
npm run build      # dist/ (lo que publica Amplify)
npm run serve      # http://localhost:4173 con las cabeceras de customHttp.yml
npm test           # build + Playwright
```

- **Fase 1:** HTML estático en `web/`.
- **Fase 2:** Astro, con la misma salida `dist/`.

Mismo flujo que `me-beauty-site` (Spec Kit, Impeccable, milestones M0–M5). Reglas de trabajo en `CLAUDE.md`, decisiones en `docs/adr/`, milestones en `docs/BACKLOG.md` y estado del traspaso en `docs/HANDOFF.md`.
