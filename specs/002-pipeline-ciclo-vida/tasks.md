---

description: "Tareas de la spec 002: pipeline del ciclo de vida"
---

# Tasks: Pipeline del ciclo de vida del software

**Input**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/dom-contract.md](contracts/dom-contract.md), [quickstart.md](quickstart.md)

**Tests**: incluidos; sustituyen a los del pipeline actual en `tests/site.spec.ts`.

- Un issue y un commit por tarea; un PR por bloque con `Closes #N`; merge con el CI en verde.
- Milestone: **M1 · Refinamiento sobre web/**. La numeración sigue a la spec 001 (T001–T019).
- Cada texto: inglés en el marcado y su clave en `web/js/translations.js`.

## Resumen

| Fase | Tareas | Bloque |
|---|---|---|
| US1 + US2 · Ciclo de vida y cambio de FENORA (P1) | T020 a T022 | 7 |
| US2 + US3 · Movimiento, aceleradores y cierre (P1/P2) | T023 a T024 | 8 |
| **Total** | | **5** |

## Bloques de PR

| Bloque | Tareas | Rama | Qué se ve en andres.tekhos.com |
|---|---|---|---|
| 7 | T020 a T022 | `m1-b7-ciclo-estructura` | Plano del ciclo de vida con 7 fases, artefactos, panel y franja de aceleradores, estático |
| 8 | T023 a T024 | `m1-b8-ciclo-movimiento` | El cambio recorre las fases al entrar en pantalla y vuelve al roadmap |

---

## Phase 1: User Story 1 + 2 - Ciclo de vida y cambio real (Priority: P1)

**Goal**: sustituir el pipeline por el plano de 7 fases con el cambio de FENORA, estático y accesible.

**Independent Test**: `#factory` tiene 7 `li.phase` con artefacto; elegir una fase muestra su papel y riesgo; sin JS todo es visible.

- [ ] T020 [US1] Marcado de `section#factory.lifecycle` con cabecera, `ol.lifecycle-phases` de 7 fases (nombre, artefacto), `#phase-detail` con papel y riesgo por fase, arco de retorno, franja de 3 aceleradores y "Replay", con el copy del data-model y sus claves ES; retirar el marcado, los textos y las claves del pipeline anterior, en web/index.html y web/js/translations.js (FR-001 a FR-005, FR-010)
- [ ] T021 [P] [US1] Estilos de plano técnico (línea de 1 px, cotas, numeración, marcador, franja alineada a sus fases) con tokens de los dos temas, apilado vertical hasta 860 px y sin desplazamiento horizontal de 320 a 2560 px; retirar las reglas `.factory*`, `.stage*`, `.station*`, `.context*` y los tokens `--f-*` sin uso, en web/css/site.css (FR-009, FR-011)
- [ ] T022 [US1] Retirar de app.js el bloque del pipeline anterior y añadir la selección de fase (clic, toque y flechas) con `aria-pressed` y el panel en `aria-live`; tests nuevos de estaciones, selección y español, en web/js/app.js y tests/site.spec.ts (FR-006, contrato del DOM)

**Checkpoint**: bloque 7.

---

## Phase 2: User Story 2 + 3 - Movimiento y cierre (Priority: P1/P2)

**Goal**: el cambio recorre las fases al entrar en pantalla, deja su artefacto y vuelve al roadmap.

**Independent Test**: con movimiento permitido las fases pasan a `is-reached` una a una solo en pantalla; elegir una fase detiene el recorrido; con movimiento reducido todo está visible y quieto.

- [ ] T023 [US2] Recorrido automático único al entrar en pantalla (marcador y `is-reached` fase a fase), arco de retorno dibujado al llegar a Operate, pausa fuera de pantalla y con la pestaña oculta, parada al elegir una fase, "Replay" y rama de movimiento reducido primero; tests del recorrido y de movimiento reducido, en web/js/app.js, web/css/site.css y tests/site.spec.ts (FR-007, FR-008)
- [ ] T024 Verificación de cierre: test de anchos de 320 a 2560 px y de "máximo 200 palabras" en `#factory`, presupuesto global actualizado, `npm run detect` sin avisos nuevos, docs/SPEC.md (sección del pipeline) y capturas en docs/reviews/<AAAA-MM-DD>-ciclo-de-vida/, en tests/site.spec.ts, docs/SPEC.md y docs/reviews/ (FR-009, FR-010, FR-012, SC-002, SC-003)

## Dependencies & Execution Order

- T020 antes que T021 y T022 (marcado). T021 en paralelo con T022.
- T023 depende de T020 a T022. T024 es la última.
