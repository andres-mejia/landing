---

description: "Tareas de la spec 001: landing más limpia y senior"
---

# Tasks: Landing más limpia y senior

**Input**: Design documents from `specs/001-landing-limpia-senior/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/dom-contract.md](contracts/dom-contract.md), [quickstart.md](quickstart.md)

**Tests**: incluidos. La constitución exige `npm test` en verde y cada cambio de contenido toca tests existentes (cifras, i18n, experiencia); cada tarea actualiza o añade los suyos en `tests/site.spec.ts`.

**Organization**: tareas agrupadas por historia de usuario (US1–US5 de la spec).

- **Un issue por tarea, un commit por tarea y un PR por bloque** (ver "Bloques de PR"). El commit lleva `Refs #N`; el PR lleva `Closes #N` de todos los issues del bloque y se mergea con el CI en verde. Cada issue lleva la línea "PR: bloque N".
- Milestone de todas las tareas: **M1 · Refinamiento sobre web/**.
- Cada texto nuevo o cambiado: inglés en el marcado o el JS **y** su clave en `web/js/translations.js`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede hacer en paralelo (ficheros distintos, sin dependencias pendientes).
- **[Story]**: historia de la spec a la que pertenece (US1–US5).

## Resumen

| Fase | Tareas | Bloque |
|---|---|---|
| Fase 2 · Fundacional | T001 a T002 | 1 |
| US1 · Entender en un minuto (P1) | T003 | 1 |
| US2 · Capacidades sin muro de etiquetas (P1) | T004 a T006 | 1 |
| US3 · Liderazgo y trayectoria (P1) | T007 a T009 | 2 |
| US4 · Proyectos destacados (P2) | T010 a T012 | 3 |
| US5 · Contacto (P2) | T013 | 4 |
| Fase final · Pulido | T014 a T017 | 4 |
| US1 · Mapa de países (P1, añadido el 2026-10-26) | T018 | 5 |
| US3 · Timeline en carriles (P1, añadido el 2026-10-27) | T019 | 6 |
| **Total** | | **19** |

## Bloques de PR

| Bloque | Tareas | Rama propuesta | Qué se ve en andres.tekhos.com |
|---|---|---|---|
| 1 | T001 a T006 | `m1-b1-evidencia-capacidades` | Banda de 4 cifras y rejilla de 6 capacidades en lugar del explorador |
| 2 | T007 a T009 | `m1-b2-trayectoria` | Sección de liderazgo y trayectoria; "Sobre mí" y método condensados |
| 3 | T010 a T012 | `m1-b3-experiencia` | 6 proyectos destacados por sector, verbos de resultado, etiquetas reducidas |
| 4 | T013 a T017 | `m1-b4-contacto-cierre` | Correo de contacto, cabeceras de sección limpias, presupuesto de texto y cierre |
| 5 | T018 | `m1-b5-mapa` | Mapa global de puntos con un punto vivo por país de clientes y equipos |
| 6 | T019 | `m1-b6-timeline` | Trayectoria en carriles proporcionales con marcador "hoy" vivo |

---

## Phase 1: Setup

Sin tareas: el proyecto, el build y los tests ya existen (M0).

---

## Phase 2: Foundational (bloquea US1 y US2)

- [ ] T001 Enmienda de ADR-003 y validación de cifras por lista explícita de KPIs (`engagements`, `organisations`, `countries`, `industries`) en lugar de "al menos 9 cifras desglosadas", y validación de "exactamente 6 `article.engagement[data-featured]` y son las 6 primeras" activable cuando existan, en scripts/build.mjs y docs/adr/ADR-003-cifras-verificables.md (research R3, contrato del DOM)
- [ ] T002 [P] Test de presupuesto de texto que cuenta las palabras de `<main>` en EN (total y visibles sin desplegar) y registra los valores; los umbrales "≤ 1.300 en total y ≤ 1.100 visibles" (SC-001) se activan en T015, en tests/site.spec.ts (research R7)

**Checkpoint**: el build valida la banda nueva y el presupuesto se mide.

---

## Phase 3: User Story 1 - Entender en un minuto (Priority: P1) - MVP

**Goal**: la banda de evidencia dice lo esencial con 4 cifras verificables.

**Independent Test**: la banda muestra 15, 17, 14 y 8; cada cifra con desglose abre su evidencia; los países por región suman 14.

- [ ] T003 [US1] Reducir la banda a 4 cifras retirando `data-kpi="ecosystems"` y `data-kpi="clouds"`, ajustar la rejilla de `.kpi-grid` a 4 columnas (2 en móvil) con tokens existentes, retirar sus claves de traducción y actualizar el test de cifras a `['15', '17', '14', '8']`, en web/index.html, web/css/site.css, web/js/translations.js y tests/site.spec.ts (FR-005)

- [ ] T018 [US1] Mapa global de puntos generado una vez desde Natural Earth (world-atlas, ISC) en web/assets/world-dots.svg con scripts/build-map.mjs, un punto vivo por país a escala de país sobre `.countries`, la lista por región como leyenda (contrato del build intacto), pulso con `transform`/`opacity` solo en pantalla, estático con movimiento reducido, en web/index.html, web/css/site.css, web/js/app.js, scripts/build-map.mjs y tests/site.spec.ts (FR-006b)

**Checkpoint**: US1 verificable por sí sola.

---

## Phase 4: User Story 2 - Capacidades sin muro de etiquetas (Priority: P1)

**Goal**: 6 áreas de capacidad siempre visibles en lugar del explorador de 129 etiquetas y las cifras del stack.

**Independent Test**: `section#capabilities` tiene 6 `.capability`; ninguna con más de 5 `.capability-tech li`; 30 o menos en total; cada área nombra al menos un proyecto de la página.

- [ ] T004 [US2] Rejilla de 6 áreas en `section#capabilities` con el contenido del data-model (nombre, una línea, "máximo 5" tecnologías, tipo de proyectos y proyectos que la respaldan), sustituyendo `.stack-kpis` y `.technology-layout`, con todas sus claves ES, en web/index.html y web/js/translations.js (FR-007, FR-008, FR-009)
- [ ] T005 [P] [US2] Estilos de `.capabilities` y `.capability` con tokens de los dos temas, sin desbordes de 320 a 1440 px, texto mono a 12 px como mínimo y revelado con `transform`/`opacity` (rama reducida primero), en web/css/site.css
- [ ] T006 [US2] Retirar de experience.js el explorador (`[data-tech-select]`, `.technology-panel`, `[data-open-tech]`) y del build la exclusión de `.stack-kpi`; sustituir el test que pulsa `.stack-kpi` por uno de capacidades (6 áreas, ≤ 5 por área, ≤ 30 en total) y ampliar el test de restos en inglés a la sección, en web/js/experience.js, scripts/build.mjs y tests/site.spec.ts (contrato del DOM)

**Checkpoint**: US1 y US2 juntas forman el bloque 1.

---

## Phase 5: User Story 3 - Liderazgo y trayectoria (Priority: P1)

**Goal**: la página muestra liderazgo, trayectoria empresarial e idiomas.

**Independent Test**: `section#trayectoria` con `ol.journey` de 4 `li.milestone` y periodos 2012–2021, 2019–2024, 2025– y 2026–; liderazgo con "hasta 12 personas"; idiomas; en ES sin restos en inglés.

- [ ] T007 [US3] Sección `section#trayectoria` antes de "Sobre mí" con `ol.journey` de 4 hitos del data-model (Team Cloud, Colombia, 2012–2021, fundador y CTO, vendida en 2021; PFS Group 2019–2024, Chief Software Architect; FENORA 2025–, producto SaaS propio con lanzamiento en producción previsto en diciembre de 2026; Tekhos 2026–, fundador y CEO, continuación de la visión de Team Cloud y no cambio de nombre), bloque `.leadership` (Team Leader y Architecture Lead, equipos de hasta 12 personas) y `.languages` ("Spanish (native) · English (professional working proficiency)"), con claves ES, en web/index.html y web/js/translations.js (FR-013, FR-014, FR-015, FR-018)
- [ ] T008 [P] [US3] Estilos de `.journey`, `.milestone`, `.leadership` y `.languages` con tokens, revelado con la clase `reveal` existente y ancla `#trayectoria` en `.main-nav` y `#mobile-nav` con su clave ES, en web/css/site.css, web/index.html y web/js/app.js
- [ ] T009 [US3] Condensar "Sobre mí" (sin repetir la trayectoria ya listada) y el método en una franja de 4 pasos de una línea, con habilidades de impacto (proactividad, decisiones explícitas, acompañamiento hasta producción, transferencia de conocimiento), y tests de trayectoria (4 hitos y periodos), en web/index.html, web/css/site.css, web/js/translations.js y tests/site.spec.ts (FR-016)

- [ ] T019 [US3] Timeline en carriles proporcionales: eje de años 2005 hasta hoy, una barra por etapa con `data-start`/`data-end` posicionada por CSSOM, solapes visibles, crecimiento al entrar en pantalla y marcador "hoy" con el punto vivo del mapa, en web/index.html, web/css/site.css, web/js/experience.js y tests/site.spec.ts (FR-014b)

**Checkpoint**: bloque 2.

---

## Phase 6: User Story 4 - Proyectos destacados con impacto (Priority: P2)

**Goal**: 6 proyectos destacados por sector primero; el resto al desplegar.

**Independent Test**: las 6 primeras tarjetas visibles son Santander, Reale Seguros, Indra/Minsait · Beabloo, Iberia Airlines, Indra/Minsait → INE Chile y FENORA; el filtro de banca sigue en 4; el contador cuadra.

- [ ] T010 [US4] Reordenar las tarjetas para que las 6 destacadas vayan primero en este orden: Santander, Reale Seguros, Indra/Minsait · Beabloo, Iberia Airlines, Indra/Minsait → INE Chile, FENORA, marcarlas con `data-featured`, renumerar los índices visibles y sus claves ES, y añadir el test de destacados, en web/index.html, web/js/translations.js y tests/site.spec.ts (FR-010, research R4)
- [ ] T011 [US4] Reescribir los 15 resúmenes de proyecto para que empiecen por un verbo de resultado, sin cifras nuevas, en EN y ES, para revisión de Andrés, en web/index.html y web/js/translations.js (FR-011, C3)
- [ ] T012 [US4] Limitar las etiquetas visibles a "máximo 4" por tarjeta conservando las tecnologías que respaldan las áreas de capacidad, y actualizar el test de insights recurrentes con el valor que calcule experience.js, en web/index.html y tests/site.spec.ts (FR-012)

**Checkpoint**: bloque 3.

---

## Phase 7: User Story 5 - Contacto (Priority: P2)

**Goal**: el visitante escribe por correo o LinkedIn en un clic.

**Independent Test**: `#contacto` contiene `a[href^="mailto:andres.mejia@tekhos.com"]` con la dirección visible y el enlace a LinkedIn.

- [ ] T013 [US5] Contacto con `mailto:andres.mejia@tekhos.com` (dirección visible y copiable) y LinkedIn, sin formulario, y test de los dos enlaces, en web/index.html, web/css/site.css, web/js/translations.js y tests/site.spec.ts (FR-017, research R6)

---

## Phase 8: Polish & Cross-Cutting Concerns

- [ ] T014 [P] Cabeceras de sección: dejar solo el índice (`02 /`…) sobre los H2 y retirar la frase, conservar la del hero, subir a 12 px el texto mono de las zonas tocadas y condensar las especialidades a una línea por resumen, en web/index.html, web/css/site.css y web/js/translations.js (design-brief)
- [ ] T015 Activar los umbrales "≤ 1.300 palabras en total y ≤ 1.100 visibles" del test de presupuesto y recortar copy hasta cumplirlo sin perder evidencia, en tests/site.spec.ts, web/index.html y web/js/translations.js (SC-001)
- [ ] T016 [P] Actualizar docs/SPEC.md (arquitectura de página), DESIGN.md (línea base del detector tras el cambio) y CLAUDE.md (ganchos nuevos), en docs/SPEC.md, DESIGN.md y CLAUDE.md
- [ ] T017 Verificación del cierre: `npm test`, `npm run detect` sin superar la línea base, capturas de escritorio (1440×900) y móvil (390×844) en los dos temas en docs/reviews/<AAAA-MM-DD>-landing-limpia/ y parada de revisión con Andrés (quickstart)

---

## Dependencies & Execution Order

- **T001** bloquea T003 (la banda nueva no pasaría la validación antigua) y T010 (validación de destacados).
- **US1 → US2:** independientes en contenido; van juntas en el bloque 1.
- **US3, US4 y US5** dependen solo de la fase 2 y pueden hacerse en cualquier orden; se ordenan por prioridad.
- **T011 → T012** (mismas tarjetas). **T015** va después de todas las historias (mide el resultado final). **T017** es la última.

### Parallel Opportunities

- T002 en paralelo con T001.
- T005 (CSS) en paralelo con T004 (marcado) dentro de US2.
- T008 en paralelo con T007 dentro de US3.
- T014 y T016 en paralelo dentro del pulido.

## Implementation Strategy

- **MVP:** fase 2 + US1 + US2 (bloque 1): la página ya se lee más limpia y senior en la parte de evidencia y capacidades.
- **Incremental:** bloque 2 (trayectoria), bloque 3 (experiencia), bloque 4 (contacto y cierre). Cada bloque se publica en andres.tekhos.com al mergear y se revisa con capturas.
- **Revisión de Andrés:** el copy nuevo (T004, T007, T009, T011) se le presenta en la parada de cada bloque; las decisiones de contenido son suyas.
