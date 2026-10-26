# Implementation Plan: Landing más limpia y senior

**Branch**: `m1-plan-landing-limpia` | **Date**: 2026-10-26 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-landing-limpia-senior/spec.md` y brief de diseño [design-brief.md](design-brief.md).

## Summary

Refinar la landing estática de la fase 1 para decir menos con más intención. Se conserva el mundo visual (tokens, retrato, fuentes, temas) y el pipeline. Cambia el contenido y la estructura: banda de 4 cifras, rejilla de 6 áreas de capacidad en lugar del explorador de 129 etiquetas, 6 proyectos destacados (uno por sector), una sección nueva de liderazgo y trayectoria, método y "Sobre mí" condensados, y contacto por correo. El enfoque técnico mantiene el HTML a mano en `web/`, ajusta `experience.js` (retira el explorador, conserva filtros e insights), adapta la validación de cifras del build (ADR-003) y reescribe los tests afectados. Todo texto nuevo entra a la vez en inglés y en `translations.js`.

## Technical Context

**Language/Version**: HTML5, CSS (un solo `site.css` con tokens), JavaScript nativo ES2022 sin bundler; build en Node 22.12+.

**Primary Dependencies**: ninguna en cliente. Desarrollo: `@playwright/test` 1.64.0, `@axe-core/playwright` 4.13.0, `yaml` 2.9.1; Impeccable 4.5.2 (detector).

**Storage**: N/A (contenido en el HTML; preferencias de idioma y tema en `localStorage`).

**Testing**: Playwright contra `dist/` con la CSP real (`npm test`), validaciones del build (`scripts/build.mjs`), detector de Impeccable (`npm run detect`).

**Target Platform**: navegadores evergreen; Chromium verificado en CI. Safari y Firefox quedan para M3 (T5).

**Project Type**: sitio estático de una página (landing).

**Performance Goals**: sin regresión: menos DOM y menos texto que hoy; LCP y CLS se miden en M3 (T4).

**Constraints**: CSP `'self'` sin estilos ni scripts en línea; AA en dos temas; íntegra sin JS y con movimiento reducido; EN/ES por cadenas inglesas; retrato con hash fijo; sin residencia; cifras verificables.

**Scale/Scope**: 1 página, 11 secciones tras el cambio; ≤ 1.200 palabras en EN en total (de 1.808) y ≤ 1.000 visibles (de 1.153); 30 tecnologías nombradas en capacidades (de 129); 15 tarjetas de proyecto, 6 destacadas.

## Constitution Check

*GATE: pasa antes de la fase 0 y se revisa tras la fase 1.*

| Principio | Cómo lo cumple el plan | Estado |
|---|---|---|
| I. Cifras verificables | La banda queda en 4 cifras; organizaciones, países y sectores mantienen `data-items` y su evidencia. El build pasa a exigir exactamente las cifras declaradas en lugar de "al menos 9" (enmienda de ADR-003, ver research R3). | Pasa |
| II. No se inventa nada | Fechas, roles, tamaño de equipo e idiomas los aportó Andrés (spec, design-brief). Las tecnologías de cada área salen de proyectos ya presentes en la página (data-model). | Pasa |
| III. Sin residencia | Team Cloud se sitúa en Colombia, sin ciudad; no se menciona dónde reside Andrés ni desde dónde trabaja como independiente. | Pasa |
| IV. Retrato intacto | No se toca el asset; el build sigue verificando el hash. | Pasa |
| V. Contenido sin animación | Las secciones nuevas son HTML estático; sin JS todo es visible. Revelados nuevos solo con `transform`/`opacity` y rama reducida primero. | Pasa |
| VI. Tokens y dos temas | Sin colores nuevos: la rejilla y los hitos usan tokens existentes (`--surface`, `--line`, `--accent`, `--signal`). | Pasa |
| VII. CSP y AA | `mailto:` no requiere CSP; sin `style=` en el marcado. axe en los dos temas. | Pasa |
| VIII. Bilingüe | Cada texto nuevo o cambiado lleva su clave en `translations.js`; el test de restos en inglés se amplía a las secciones nuevas. | Pasa |

**Re-check post-diseño (fase 1):** sin violaciones. La única desviación de lo existente es la enmienda de ADR-003 (mínimo de cifras), justificada por la decisión Q2 de Andrés y registrada en Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-limpia-senior/
├── spec.md              # /speckit-specify
├── design-brief.md      # Impeccable shape
├── plan.md              # este fichero
├── research.md          # fase 0
├── data-model.md        # fase 1: contenido de áreas, destacados e hitos
├── quickstart.md        # fase 1: cómo validar
├── contracts/
│   └── dom-contract.md  # fase 1: ganchos del DOM que usan build, JS y tests
├── checklists/requirements.md
└── tasks.md             # /speckit-tasks (no lo crea este comando)
```

### Source Code (repository root)

```text
web/
├── index.html           # secciones: kpis (4), experiencia (orden y data-featured), capacidades (nueva rejilla),
│                        #   trayectoria (nueva), método y sobre mí condensados, contacto con correo
├── css/site.css         # estilos de .capabilities, .journey y ajustes de .kpis, .method, .about, .contact
└── js/
    ├── experience.js    # retira el explorador tecnológico y los stack-kpi; conserva filtros, expansión e insights
    ├── app.js           # revelados de las secciones nuevas; navegación con el ancla nueva
    └── translations.js  # claves ES de todos los textos nuevos o cambiados
scripts/build.mjs        # validación de cifras: lista explícita de KPIs esperados (ADR-003)
tests/site.spec.ts       # cifras (4), capacidades, destacados, trayectoria, contacto, presupuesto de texto
docs/adr/ADR-003-cifras-verificables.md   # enmienda: banda de 4 cifras y fin de las cifras del stack
docs/SPEC.md             # arquitectura de página actualizada
DESIGN.md                # sin tokens nuevos; nota de la línea base del detector tras el cambio
```

**Structure Decision**: proyecto único estático en la raíz (ADR-001). No se crea ninguna carpeta nueva de código.

## Bloques de PR (propuesta para /speckit-tasks)

1. **Evidencia y capacidades:** banda de 4 cifras, enmienda de ADR-003 y build; rejilla de 6 capacidades que sustituye al explorador y a las cifras del stack.
2. **Experiencia:** 6 destacados en orden, `data-featured`, verbos de resultado y máximo 4 etiquetas por tarjeta.
3. **Liderazgo y trayectoria:** sección nueva con hitos, equipos e idiomas; "Sobre mí" y método condensados; ancla en la navegación.
4. **Contacto y limpieza final:** correo y LinkedIn, etiquetas de sección reducidas al índice, texto mono a 12 px donde se toque, presupuesto de texto, SPEC y capturas.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Enmienda de ADR-003: el build deja de exigir "al menos 9 cifras desglosadas" | Andrés decidió reducir la banda a 4 y retirar las 4 cifras del stack (Q2); quedarían 3 con desglose | Mantener cifras solo para cumplir el mínimo contradice la decisión y la limpieza que pide la spec |
