# Contrato del DOM

Ganchos del marcado de `web/index.html` de los que dependen el build (`scripts/build.mjs`), el JS de cliente y los tests. Cambiar uno exige cambiar a la vez sus consumidores.

## Se mantienen

| Gancho | Consumidores |
|---|---|
| `article.engagement[data-project-category]` | build (cuenta tarjetas), `experience.js` (filtros, expansión, insights), tests |
| `.kpi[data-kpi][data-items] strong.kpi-value [data-count-to]` | build (validación ADR-003), `app.js` (conteo), tests |
| `.region[data-region] … <b>N</b> … <ul><li>` | build (suma de países), tests |
| `#project-count`, `.project-more`, `[data-project-filter]`, `.recurring li` | `experience.js`, `i18n.js` (patrones numéricos), tests |
| `#factory` y todo su interior (`data-stage`, `data-context`, `data-station`, SVG) | `app.js`, tests (sin cambios: FR-004) |
| `[data-section]` y anclas de `.main-nav` / `#mobile-nav` | `app.js` (sección activa), tests |
| `.reveal`, `[data-decode]`, `[data-i18n-skip]` | `app.js`, `i18n.js` |

## Cambian

| Gancho | Cambio |
|---|---|
| `.kpi[data-kpi="ecosystems"]`, `.kpi[data-kpi="clouds"]` | Se retiran |
| `.stack-kpis`, `.stack-kpi[data-open-tech][data-items]` | Se retiran; el build deja de excluirlos de la evidencia |
| `.technology-layout`, `[data-tech-select]`, `.technology-panel`, `.technology-tags` | Se retiran; `experience.js` pierde el explorador |
| `article.engagement[data-featured]` | Nuevo, en las 6 primeras tarjetas |

## Nuevos

| Gancho | Uso |
|---|---|
| `section#capabilities` con `.capability` (6) y, dentro, `.capability-tech li` (≤ 5) | Rejilla de áreas; tests cuentan áreas y tecnologías |
| `section#trayectoria` con `ol.journey > li.milestone` (4), `.milestone-period`, `.leadership`, `.languages` | Trayectoria; tests comprueban hitos y periodos |
| `#contacto a[href^="mailto:andres.mejia@tekhos.com"]` | Contacto por correo; test |
| Ancla `#trayectoria` en `.main-nav` y `#mobile-nav` | Navegación y sección activa |

## Reglas del build tras el cambio

- KPIs obligatorios: `engagements`, `organisations`, `countries`, `industries`.
- `engagements` = número de `article.engagement`; textos "N selected engagements" y "Show all N engagements" iguales a ese número.
- Toda cifra con `data-items` cumple: número = elementos y cada elemento aparece fuera de las cifras.
- Exactamente 6 `article.engagement[data-featured]`, y son las 6 primeras.
