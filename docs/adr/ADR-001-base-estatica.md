# ADR-001: Base estática de la fase 1 y build en Node

- **Estado:** aceptado
- **Fecha:** 2026-10-25

## Contexto

- La landing se diseñó primero en ChatGPT (`docs/reference/contexto-chatgpt.md`). Se exportó como un HTML autónomo de 4,9 MB, con el CSS repartido en 5 ficheros de reglas acumuladas y el retrato incrustado dos veces.
- Se refinó en una sesión de Claude:
  - CSS único con tokens y dos temas completos.
  - Header fijo.
  - Capa de movimiento nueva.
  - Pipeline vertical en móvil.
  - Banda de KPIs verificables.
  - Copy revisado en EN y ES.
- Esa versión es la base que entra en el repo.
- `me-beauty-site` resolvió el mismo problema (ADR-004 de ese repo): base estática en `web/`, build en Node, sin Python en Amplify.

## Decisión

- **La fuente de la fase 1 es `web/`**: HTML, CSS y JS nativos, sin framework ni bundler.
- **El build es `scripts/build.mjs` (Node, sin dependencias)**. Valida y luego copia `web/` a `dist/`:
  - Comprueba el SHA-256 del retrato aprobado.
  - Valida las cifras (ADR-003).
  - Inyecta `noindex` y escribe `robots.txt` salvo que `SITE_INDEXABLE=true`.
  - Reescribe `canonical` y `og:image` con `SITE_URL`, o los quita si no está definido.
- `npm run build:standalone` genera además un HTML autónomo para revisar sin servidor. No se despliega.
- **Sin scripts ni estilos en línea**: el tema inicial lo fija `web/js/theme-init.js` desde `<head>`, para cumplir la CSP `'self'`.

## Alternativas

| Opción | A favor | En contra |
|---|---|---|
| **A. `web/` estático + build Node** (elegida) | Mismo patrón que me-beauty; despliega ya; un solo ecosistema en Amplify | El HTML se edita a mano hasta la fase 2 |
| B. Mantener el build en Python de la sesión de refinamiento | Ya existía | Segundo runtime en el build de Amplify; me-beauty ya lo descartó |
| C. Migrar directamente a Astro | Evita una fase | Mezcla migración y refinamiento; sin línea base para comparar píxeles |

## Consecuencias

- La migración a Astro (ADR-004) se hace contra una línea base congelada de esta fase.
- Las traducciones dependen de cadenas inglesas hasta la fase 2. Lo vigila un test.
