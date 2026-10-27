# Implementation Plan: Pipeline del ciclo de vida del software

**Branch**: `m1-plan-002` | **Date**: 2026-10-27 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-pipeline-ciclo-vida/spec.md` y brief [design-brief.md](design-brief.md).

## Summary

Sustituir la sección `#factory` (cubos isométricos, módulos RAG / Agent harness / MCP, dos SVG con SMIL) por un plano del ciclo de vida: 7 estaciones en HTML semántico sobre una línea con cotas de plano técnico, un marcador que recorre las estaciones con el cambio real de FENORA y deja su artefacto en cada una, una línea de retorno de Operate a Discover & plan, una franja fina de aceleradores de IA y un panel con el papel de Andrés y el riesgo que evita en la fase elegida. Todo se dibuja con HTML y CSS (línea, cotas y marcador) y un SVG mínimo para el arco de retorno; el JS de la sección sustituye al del pipeline actual en `app.js`.

## Technical Context

**Language/Version**: HTML5, CSS con tokens (`site.css`), JavaScript nativo ES2022; build en Node 22.12+.

**Primary Dependencies**: ninguna nueva.

**Storage**: N/A.

**Testing**: Playwright (`npm test`) con la CSP real; detector de Impeccable 4.5.2.

**Target Platform**: navegadores evergreen; verificado en Chromium.

**Project Type**: sitio estático (fase 1).

**Performance Goals**: menos DOM y menos CSS que hoy (se retiran dos SVG grandes, la animación SMIL y unas 250 reglas); sin trabajo de animación fuera de pantalla.

**Constraints**: CSP `'self'`; solo `transform`, `opacity`, `clip-path` y atributos SVG; movimiento reducido y sin JS con todo visible; sin desplazamiento horizontal de 320 a 2560 px; máximo 200 palabras en EN.

**Scale/Scope**: 1 sección; 7 fases; 3 aceleradores; ~150 palabras.

## Constitution Check

| Principio | Cómo lo cumple | Estado |
|---|---|---|
| I. Cifras verificables | La sección no publica cifras | Pasa |
| II. No se inventa nada | El cambio y sus 7 artefactos los confirmó Andrés; sin nombres de agregador ni bancos | Pasa |
| III. Sin residencia | No aplica | Pasa |
| IV. Retrato intacto | No aplica | Pasa |
| V. Contenido sin animación | Estaciones, artefactos y panel en HTML; sin JS o con movimiento reducido todo visible y quieto | Pasa |
| VI. Tokens y dos temas | Línea, cotas, marcador y franja con tokens existentes (`--line`, `--line-strong`, `--accent`, `--signal`, `--text-*`) | Pasa |
| VII. CSP y AA | Sin estilos en línea (posiciones por CSSOM); estaciones como botones con `aria-pressed`; panel con `aria-live="polite"` | Pasa |
| VIII. Bilingüe | Todos los textos con clave ES; siglas (ADR, C4, CI/CD, NFR, SCA, PSD2) sin traducir | Pasa |

Re-check post-diseño: sin violaciones.

## Project Structure

### Documentation

```text
specs/002-pipeline-ciclo-vida/
├── spec.md · design-brief.md · plan.md · research.md · data-model.md · quickstart.md
├── contracts/dom-contract.md
├── checklists/requirements.md
└── tasks.md            # /speckit-tasks
```

### Source Code

```text
web/index.html          # section#factory nueva: cabecera, ol.lifecycle (7 estaciones), arco de retorno, franja de aceleradores, panel de fase
web/css/site.css        # estilos .lifecycle*; se retiran .factory*, .stage*, .station*, .context*, --f-* sin uso
web/js/app.js           # se retira el bloque "Conceptual delivery pipeline" y se añade el del ciclo de vida
web/js/translations.js  # claves nuevas; se retiran las del pipeline
tests/site.spec.ts      # se sustituyen los tests del pipeline
docs/SPEC.md            # sección 3.4 nueva
```

**Structure Decision**: proyecto único estático (ADR-001). Sin ficheros nuevos de código.

## Bloques de PR

1. **Estructura y contenido:** marcado de las 7 estaciones, artefactos, panel, franja y retorno en EN/ES; retirada del pipeline anterior (HTML, CSS, JS, claves); tests nuevos con movimiento reducido.
2. **Movimiento y cierre:** recorrido automático en pantalla, selección que detiene el recorrido, botón "Replay", arco de retorno animado, apilado vertical en móvil, capturas y detector.

## Complexity Tracking

Sin violaciones.
