# Feature Specification: Pipeline del ciclo de vida del software

**Feature Branch**: `m1-spec-002-pipeline`

**Created**: 2026-10-27

**Status**: Draft

**Input**: User description: "La fábrica (pipeline) se ve muy genérica y orientada al harness de IA. Hacerla más profesional y diferente: el proceso de construcción de software desde la planificación y el análisis hasta la implantación en producción, pasando por todo el ciclo de vida. Que sea lo más impactante posible."

## Clarifications

### Session 2026-10-27

- Q: ¿Qué fases recorre? → A: 7 fases: Discover & plan, Analyse, Architect, Build, Verify, Release, Operate.
- Q: ¿Qué cambio recorre las fases como ejemplo? → A: uno real de FENORA, el producto propio de Andrés.
- Q: ¿Qué papel tiene la IA (RAG, MCP, agentes)? → A: una franja fina de aceleradores que cruza las fases; deja de ser el centro.
- Q: ¿Es fiel el borrador del ejemplo de FENORA? → A: sí; se publica sin nombrar agregador ni bancos.
- Q: ¿Cómo se mueve? → A: el cambio avanza fase a fase al entrar en pantalla y cada fase deja su artefacto; también se puede elegir una fase. Con movimiento reducido, todo estático.

## Contexto

La sección actual ("From intent to running software", ancla `#factory`) muestra 5 etapas como cubos isométricos y tres módulos de IA (RAG, Agent harness, MCP) en el centro. Tiene unas 250 palabras (176 de texto y 76 en etiquetas del dibujo) y en pantallas anchas aparece una barra de desplazamiento horizontal. Cuenta una historia de herramientas, no la de un arquitecto que acompaña un sistema de principio a fin.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver el ciclo completo y dónde aporta Andrés (Priority: P1)

Un CTO recorre la sección y entiende en segundos que Andrés interviene en todo el ciclo de vida, de la planificación a la operación en producción, y qué aporta en cada fase.

**Why this priority**: Es el diferencial que la sección debe transmitir y el motivo del rediseño.

**Independent Test**: Mostrar la sección 20 segundos y pedir que nombren las fases y una aportación de Andrés en alguna de ellas.

**Acceptance Scenarios**:

1. **Given** la sección en escritorio, **When** se carga, **Then** muestra las 7 fases en orden, en una sola fila y sin desplazamiento horizontal a ningún ancho.
2. **Given** una fase, **When** el visitante la elige (clic o teclado), **Then** ve qué hace Andrés en ella, el artefacto que produce y el riesgo que evita.
3. **Given** un móvil de 320 a 860 px, **When** se carga, **Then** las fases se apilan en vertical sin desplazamiento horizontal.

---

### User Story 2 - Seguir un cambio real de punta a punta (Priority: P1)

El visitante ve cómo un cambio real de FENORA avanza por las 7 fases y deja en cada una un artefacto concreto, hasta llegar a producción y volver como aprendizaje.

**Why this priority**: Un ejemplo real hace creíble y memorable el proceso; es lo que lo distingue de un diagrama genérico.

**Independent Test**: Comprobar que cada fase muestra un artefacto del cambio y que el recorrido termina en producción con un retorno a la planificación.

**Acceptance Scenarios**:

1. **Given** la sección entra en pantalla con movimiento permitido, **When** pasan unos segundos, **Then** el cambio avanza fase a fase y cada fase muestra su artefacto al llegar.
2. **Given** movimiento reducido o sin JavaScript, **When** se carga, **Then** las 7 fases y sus artefactos están visibles a la vez y nada se mueve.
3. **Given** el recorrido llega a Operate, **When** termina, **Then** se ve el retorno de lo aprendido a Discover & plan.

---

### User Story 3 - IA como acelerador, no como protagonista (Priority: P2)

El visitante ve una franja fina que cruza las fases e indica dónde los agentes, la recuperación de contexto (RAG) y las herramientas (MCP) aceleran el trabajo.

**Why this priority**: Conserva la señal de ingeniería con IA sin que domine el relato.

**Independent Test**: Comprobar que la franja existe, cruza las fases y nombra como máximo 3 aceleradores.

**Acceptance Scenarios**:

1. **Given** la sección, **When** se lee la franja, **Then** nombra como máximo 3 aceleradores y en qué fases intervienen.

---

### Edge Cases

- Con la pestaña oculta o la sección fuera de pantalla, el recorrido se pausa.
- Si el visitante elige una fase durante el recorrido automático, el recorrido se detiene y queda en esa fase.
- En español, ningún texto de la sección queda en inglés salvo nombres de fases o artefactos que se decidan en inglés (ADR, C4, CI/CD, SLO).
- El ejemplo de FENORA no publica datos confidenciales del producto (proveedores, bancos con nombre, cifras de uso) sin el OK de Andrés.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sección MUST sustituir el pipeline actual (cubos, módulos RAG / Agent harness / MCP y sus contextos) por un plano del ciclo de vida con 7 fases: Discover & plan, Analyse, Architect, Build, Verify, Release, Operate.
- **FR-002**: Cada fase MUST mostrar: qué hace Andrés, el artefacto que produce y el riesgo que evita, en una frase cada uno como máximo.
- **FR-003**: Un cambio real de FENORA, "conectar un banco nuevo por Open Banking (PSD2)", MUST recorrer las fases dejando un artefacto concreto en cada una (tabla del brief de diseño, confirmada por Andrés). Ni el agregador ni los bancos se nombran.
- **FR-004**: Tras Operate, la sección MUST mostrar el retorno de lo aprendido a la planificación.
- **FR-005**: Una franja de aceleradores MUST cruzar las fases y nombrar como máximo 3 (agentes, RAG, MCP) con las fases en las que intervienen.
- **FR-006**: El visitante MUST poder elegir una fase con ratón, toque o teclado; la fase elegida queda indicada como seleccionada.
- **FR-007**: El recorrido automático MUST empezar solo con la sección en pantalla, pausarse fuera de ella o con la pestaña oculta y detenerse cuando el visitante elige una fase.
- **FR-008**: Con movimiento reducido o sin JavaScript, MUST verse todo el contenido a la vez y nada moverse.
- **FR-009**: La sección MUST NOT tener desplazamiento horizontal a ningún ancho (de 320 a 2560 px) y MUST apilarse en vertical hasta 860 px.
- **FR-010**: La sección MUST tener como máximo 200 palabras en inglés (hoy unas 250) y su equivalente en español.
- **FR-011**: La sección MUST cumplir la constitución: tokens de los dos temas, CSP `'self'`, AA, solo `transform`, `opacity`, `clip-path` y atributos SVG en la animación, y sin vocabulario vetado ("fábrica", "factoría de software").
- **FR-012**: El cambio MUST NOT añadir avisos al detector de Impeccable respecto a la línea base.

### Key Entities

- **Fase**: nombre, qué hace Andrés, artefacto, riesgo que evita, aceleradores que intervienen.
- **Cambio de ejemplo**: título, artefacto por fase, retorno a la planificación.
- **Acelerador**: nombre, fases en las que interviene.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una prueba de 20 segundos con 3 personas del perfil objetivo, todas nombran al menos 5 de las 7 fases y una aportación de Andrés.
- **SC-002**: La sección baja de unas 250 palabras a 200 o menos en inglés.
- **SC-003**: 0 casos de desplazamiento horizontal de 320 a 2560 px y 0 avisos nuevos del detector.
- **SC-004**: Los tests de la sección pasan en EN y ES, en los dos temas y con movimiento reducido.

## Assumptions

- El ancla `#factory` y la entrada "The pipeline" de la navegación se conservan para no romper enlaces; el título de la sección puede cambiar.
- El recorrido y los artefactos se dibujan en SVG con el lenguaje de plano técnico (trazos finos, cotas, retícula), con los tokens existentes.
- El ejemplo de FENORA lo confirma Andrés antes de construir; no se publica nada del producto que él no apruebe.
- Los tests actuales del pipeline (etapas, contextos RAG/MCP/harness, número de etapa) se sustituyen por los de la sección nueva.
