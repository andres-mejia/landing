# Contrato del DOM: ciclo de vida

| Gancho | Uso |
|---|---|
| `section#factory.lifecycle[data-section]` | Ancla y navegación ("The pipeline") sin cambios |
| `ol.lifecycle-phases > li.phase[data-phase="0..6"]` | 7 estaciones en orden |
| `li.phase > button.phase-button[aria-pressed][aria-controls="phase-detail"]` | Selección con ratón, toque o teclado (flechas) |
| `li.phase .phase-artifact` | Artefacto del cambio en cada fase |
| `li.phase.is-reached` | Fase alcanzada por el recorrido (todas por defecto sin JS) |
| `.lifecycle-track` con `--at` (CSSOM) | Posición del marcador |
| `.lifecycle-return` (SVG) | Arco de retorno de Operate a Discover & plan |
| `.lifecycle-accelerators li[data-phases]` | Franja de aceleradores (3) |
| `#phase-detail[aria-live="polite"] li[data-phase]` | Papel y riesgo por fase; con JS solo se ve el de la fase elegida |
| `.lifecycle-replay` | Repite el recorrido |
| `.lifecycle[data-running]`, `.lifecycle.is-live` | Estado del recorrido; solo en pantalla |

Se retiran: `.factory*`, `.factory-svg--h/--v`, `[data-stage]`, `[data-context]`, `#stage-number`, `#stage-title`, `#pipeline-status`, `.pipeline-replay`, `.context-explorers`.
