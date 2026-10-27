# Feature Specification: Landing más limpia y senior

**Feature Branch**: `m1-spec-landing-limpia`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Refinamiento M1 de la landing: hacerla más limpia y transmitir seriedad, elegancia, madurez y seniority, y generar curiosidad en los posibles leads. Decir menos y con más intención. (1) Tecnología abstraída: sustituir el mapa de unas 130 etiquetas y las cifras del stack por áreas de capacidad (cloud y plataformas, eventos e integración, datos, ingeniería con IA, seguridad e identidad, delivery), cada una con pocas tecnologías modernas de referencia y los tipos de proyecto que la respaldan. (2) Experiencia: resaltar impacto e industrias con menos detalle visible; verbos de resultado y proyectos destacados, el resto al desplegar. (3) Liderazgo y soft skills: Team Leader y Architecture Lead con equipos de hasta 12 personas, fundador y CTO de Team Cloud (2012–2021), fundador y CEO de Tekhos, inglés profesional; resaltar proactividad e impacto en los proyectos. (4) Trayectoria empresarial: Team Cloud y Tekhos como experiencia sin dejar de presentar a un profesional independiente. (5) Contacto: andres.mejia@tekhos.com además de LinkedIn. (6) Restricciones de la constitución: cifras verificables, sin residencia, retrato intacto, CSP, dos temas, movimiento reducido, EN/ES; revisar la línea base del detector de Impeccable."

## Clarifications

### Session 2026-10-26

- Q: ¿Qué se hace con la sección del pipeline? → A: Se conserva tal cual; se refinará después.
- Q: ¿Cuántas cifras tiene la banda principal? → A: 4 (experiencias, organizaciones, países y sectores).
- Q: ¿Cuántos proyectos se destacan? → A: 6, uno por sector principal.
- Petición de Andrés (2026-10-26): sustituir las etiquetas de países por un mapa global estilizado y dinámico con puntos vivos (FR-006b, T018). También retirar Go de las capacidades.
- Timeline (2026-10-27): Andrés elige carriles proporcionales frente a una línea ligada al scroll o un selector por año (FR-014b, T019).
- Cierre del presupuesto (2026-10-27): Andrés acepta que el objetivo de cierre de la spec 001 sea el valor medido tras el bloque 4; la reducción grande se hace en el rediseño del pipeline (spec 002).
- Objetivos de texto (2026-10-27): Andrés los sube a 1.300 en total y 1.100 visibles, porque la trayectoria, Belcorp y el pipeline intacto añaden texto que quiere conservar.
- Primeros años (2026-10-27): hito 2005–2012 en Pragma SA, Assist Consultores y Nexos Software (FR-014).
- Corrección de medida (2026-10-26, T002): la línea base de 2.340 palabras contaba también atributos y paneles ocultos con otro método. Medido con el test de presupuesto: 1.808 en total y 1.153 visibles. Los objetivos de FR-001 y SC-001 se ajustan a esa medida.

## Contexto

La página actual (fase 1) tiene 1.808 palabras en inglés dentro del contenido principal (1.153 visibles sin desplegar), 10 secciones, 129 etiquetas en el explorador tecnológico y 71 en las tarjetas de proyecto. Demuestra amplitud, pero se lee como una lista de palabras clave y no transmite liderazgo ni trayectoria empresarial. Las decisiones de posicionamiento están en ADR-005: titular de arquitecto independiente; Team Cloud y Tekhos como trayectoria; clientes con nombre.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender en un minuto quién es y por qué es senior (Priority: P1)

Un CTO o responsable de ingeniería llega desde LinkedIn o una recomendación. En menos de un minuto de lectura entiende qué aporta Andrés (arquitectura con criterio e ingeniería práctica), su nivel (más de 20 años, liderazgo de equipos y de arquitectura, fundador de empresas) y en qué sectores ha trabajado, sin tener que leer listas de tecnologías.

**Why this priority**: Es la primera impresión y el motivo de la página. Sin ella, el resto no se lee.

**Independent Test**: Mostrar la primera pantalla y la siguiente a una persona del perfil objetivo durante 60 segundos y pedirle que describa a Andrés: debe mencionar nivel senior, liderazgo y al menos dos sectores.

**Acceptance Scenarios**:

1. **Given** un visitante en la primera pantalla de escritorio o móvil, **When** la lee sin desplazarse, **Then** ve el titular, la propuesta de valor, el dato de trayectoria y una llamada a la conversación, sin ninguna lista de tecnologías.
2. **Given** un visitante que se desplaza una pantalla, **When** llega a la banda de evidencia, **Then** encuentra cifras verificables y la amplitud de sectores, y cada cifra sigue abriendo su evidencia.

---

### User Story 2 - Ver capacidades modernas sin un muro de etiquetas (Priority: P1)

El visitante quiere saber si Andrés domina lo que su empresa necesita hoy (cloud, eventos, datos, IA, seguridad, delivery). Ve un número reducido de áreas de capacidad. Cada una nombra unas pocas tecnologías modernas de referencia y el tipo de proyectos en los que las ha aplicado.

**Why this priority**: Es el cambio que pide Andrés de forma explícita ("no hace falta enumerar todas las tecnologías") y el que más limpia la página.

**Independent Test**: Contar las áreas y las tecnologías visibles en la sección y comprobar que cada área enlaza con proyectos reales de la página.

**Acceptance Scenarios**:

1. **Given** la sección de tecnología, **When** se carga, **Then** muestra entre 5 y 6 áreas de capacidad con un máximo de 5 tecnologías nombradas por área.
2. **Given** un área de capacidad, **When** el visitante la consulta, **Then** ve el tipo de proyectos y al menos un proyecto real de la página que la respalda.
3. **Given** el idioma español, **When** el visitante recorre la sección, **Then** no queda texto en inglés salvo nombres propios de tecnologías.

---

### User Story 3 - Liderazgo, trayectoria empresarial y habilidades (Priority: P1)

El visitante descubre que Andrés no solo diseña: ha liderado equipos de hasta 12 personas como Team Leader y Architecture Lead, fundó y dirigió como CTO Team Cloud (2012–2021, vendida en 2021) y está construyendo Tekhos como fundador y CEO. Ve sus idiomas (español nativo, inglés profesional) y las habilidades que generan impacto en los proyectos: proactividad, decisiones explícitas y acompañamiento hasta producción.

**Why this priority**: Es lo que distingue a un senior de un perfil técnico amplio y lo que Andrés echa en falta.

**Independent Test**: Revisar que la página contiene cada dato de liderazgo y trayectoria confirmado por Andrés, en EN y ES, y ninguno que no lo esté.

**Acceptance Scenarios**:

1. **Given** el contenido de la página, **When** se busca la trayectoria empresarial, **Then** aparecen Team Cloud (2012–2021, fundador y CTO, vendida en 2021) y Tekhos (fundador y CEO, en construcción), y Tekhos figura como continuación de la visión de Team Cloud, no como cambio de nombre.
2. **Given** el titular y la cabecera, **When** se leen, **Then** presentan a un arquitecto de software independiente; Tekhos no aparece como marca de la página.
3. **Given** el apartado de liderazgo, **When** se lee, **Then** indica el tamaño máximo de equipo (12 personas) y los roles de liderazgo, sin cifras que Andrés no haya dado.

---

### User Story 4 - Proyectos destacados con impacto (Priority: P2)

El visitante ve primero un grupo reducido de proyectos destacados. Cada uno lleva el cliente por su nombre, el contexto (cliente final, consultora, plataforma, producto propio), un verbo de resultado y el sector. El resto se puede desplegar y filtrar.

**Why this priority**: Mantiene la evidencia que sostiene las cifras y reduce la lectura inicial.

**Independent Test**: Cargar la sección y contar las tarjetas visibles antes de desplegar; comprobar que el total sigue coincidiendo con la cifra de experiencias.

**Acceptance Scenarios**:

1. **Given** la sección de experiencia, **When** se carga, **Then** muestra solo los proyectos destacados y un control para ver todos.
2. **Given** cualquier filtro, **When** se aplica, **Then** el contador y las cifras siguen cuadrando con las tarjetas.
3. **Given** una tarjeta, **When** se lee su resumen, **Then** empieza por un verbo de resultado y no por "Worked on…" / "Trabajo en…".

---

### User Story 5 - Contactar por el canal preferido (Priority: P2)

El visitante interesado puede escribir a `andres.mejia@tekhos.com` o conectar en LinkedIn desde la cabecera y desde el cierre de la página.

**Why this priority**: Convierte la curiosidad en conversación; hoy solo existe LinkedIn.

**Independent Test**: Activar cada llamada a la acción y comprobar que abre el correo o LinkedIn.

**Acceptance Scenarios**:

1. **Given** la sección de contacto, **When** el visitante la ve, **Then** encuentra el correo y LinkedIn, sin formularios.
2. **Given** un visitante sin cliente de correo, **When** quiere el correo, **Then** puede leerlo y copiarlo como texto.

---

### Edge Cases

- Con movimiento reducido o sin JavaScript, todas las áreas, proyectos destacados y datos de liderazgo son visibles y legibles.
- En móvil de 320 px, las áreas de capacidad y la trayectoria no generan desplazamiento horizontal.
- Si una tecnología de una cifra deja de aparecer en la página al abstraer el contenido, la cifra MUST cambiar o retirarse (el build falla si no cuadra).
- Una tecnología se nombra en un área solo si aparece en al menos un proyecto de la página o Andrés la confirma.
- Los textos nuevos existen en EN y ES a la vez; ninguno vuelve al inglés en la versión española.
- El correo visible no puede usarse para recopilar datos personales del visitante (no hay formulario).

## Requirements *(mandatory)*

### Functional Requirements

**Mensaje y estructura**

- **FR-001**: La página MUST reducir su texto total (incluido lo plegable) a 1.300 palabras o menos y el texto visible sin desplegar a 1.100 o menos, sin perder ninguna cifra verificable ni su evidencia.
- **FR-002**: La página MUST mantener el titular de arquitecto de software independiente y no presentar Tekhos como marca de la página (ADR-005).
- **FR-003**: Cada sección MUST tener un único mensaje principal; los detalles secundarios quedan en elementos desplegables.
- **FR-004**: La sección del pipeline MUST conservarse tal cual en este refinamiento (contenido, etapas, contextos y animación). Su simplificación queda para una iteración posterior.

**Evidencia**

- **FR-005**: Toda cifra visible MUST seguir siendo verificable en la propia página (ADR-003). La banda principal MUST reducirse a 4 cifras: experiencias, organizaciones, países y sectores. Los ecosistemas backend y las clouds pasan a las áreas de capacidad, sin cifra.
- **FR-006**: Los clientes MUST aparecer con su nombre y su contexto (ADR-005).
- **FR-006b**: Los países de clientes y equipos MUST mostrarse sobre un mapa global estilizado con un punto vivo por país, a escala de país y nunca de ciudad. La lista de países por región se conserva como leyenda accesible y como evidencia de la cifra; con movimiento reducido o sin JS los puntos son estáticos y los puntos fuera de pantalla no se animan.

**Capacidades**

- **FR-007**: La sección de tecnología MUST sustituir el explorador de 10 disciplinas y 129 etiquetas por entre 5 y 6 áreas de capacidad: cloud y plataformas; arquitectura orientada a eventos e integración; datos; ingeniería con IA; seguridad e identidad; delivery y operación (pueden fusionarse dos si la lectura lo pide).
- **FR-008**: Cada área MUST nombrar como máximo 5 tecnologías, priorizando las modernas que la página respalda, y MUST indicar el tipo de proyectos y al menos un proyecto real de la página.
- **FR-009**: Las cifras del stack (11 frameworks backend, 6 frontend, 6 ETL, 5 big data) MUST retirarse o integrarse en las áreas sin enumerar las listas completas.

**Experiencia**

- **FR-010**: La sección de experiencia MUST mostrar inicialmente 6 proyectos destacados, uno por sector principal (banca, seguros, comercio, aviación, sector público y producto con IA), y permitir ver y filtrar todos. La selección concreta se propone en el plan y la confirma Andrés.
- **FR-011**: Cada resumen de proyecto MUST empezar por un verbo de resultado (C3).
- **FR-012**: Las etiquetas visibles por tarjeta MUST limitarse a 4 como máximo.

**Liderazgo y trayectoria**

- **FR-013**: La página MUST incluir el liderazgo de equipos de hasta 12 personas como Team Leader y Architecture Lead.
- **FR-014**: La página MUST incluir los primeros años (2005–2012: de desarrollador full-stack a Team Leader y Software Architect en Pragma SA, Assist Consultores y Nexos Software, en Colombia) y la trayectoria empresarial: fundador y CTO de Team Cloud (Colombia, 2012–2021, vendida en 2021) y fundador y CEO de Tekhos (en construcción), presentada como continuación de la visión de Team Cloud.
- **FR-014b**: La trayectoria MUST mostrarse en carriles proporcionales sobre un eje de años real (2005 hasta hoy), con la duración y los solapes de cada etapa visibles, barras que crecen al entrar en pantalla y un marcador "hoy" vivo; sin JS el texto de cada etapa es íntegro y con movimiento reducido nada se anima.
- **FR-015**: La página MUST incluir los idiomas: "Spanish (native) · English (professional working proficiency)" y su equivalente en español.
- **FR-016**: La página MUST destacar las habilidades que generan impacto en los proyectos (proactividad, decisiones explícitas, acompañamiento hasta producción, transferencia de conocimiento) sin adjetivos sin respaldo.

**Contacto**

- **FR-017**: El contacto MUST ofrecer `andres.mejia@tekhos.com` y LinkedIn; Malt solo si Andrés aporta la URL.

**Restricciones (constitución)**

- **FR-018**: Ningún texto, metadato ni dato estructurado MUST revelar residencia ni ubicación personal; Team Cloud se sitúa en Colombia, sin ciudad.
- **FR-019**: El retrato MUST conservar su hash aprobado.
- **FR-020**: Cada texto nuevo o cambiado MUST existir en EN británico y ES de España, sin la palabra "actualmente" ni el vocabulario vetado.
- **FR-021**: La página MUST seguir siendo íntegra sin JavaScript y con movimiento reducido, en los dos temas, con CSP `'self'` y AA.
- **FR-022**: El cambio MUST NOT añadir avisos al detector de Impeccable respecto a la línea base y SHOULD reducirlos; las excepciones las acepta Andrés.

### Key Entities

- **Área de capacidad**: nombre, mensaje de una línea, hasta 5 tecnologías de referencia, tipos de proyecto y proyectos de la página que la respaldan.
- **Proyecto**: cliente (con nombre), contexto, sector, verbo de resultado, resumen, contribución, etiquetas (máximo 4), destacado sí o no.
- **Hito de trayectoria**: organización, rol, periodo, descripción breve (Team Cloud, PFS Group, FENORA, Tekhos).
- **Cifra verificable**: valor, etiqueta y lista de elementos con evidencia en la página.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El texto de `<main>` en inglés baja de 1.808 palabras en total a 1.300 o menos, y el visible sin desplegar (1.153 al empezar) queda en 1.100 o menos, con la misma proporción en español (el pipeline, que se conserva, cuenta dentro de esos totales).
- **SC-002**: Las tecnologías nombradas en la sección de capacidades bajan de 129 a 30 o menos.
- **SC-003**: En una prueba de 60 segundos con al menos 3 personas del perfil objetivo, todas describen a Andrés como senior, mencionan liderazgo y citan al menos dos sectores.
- **SC-004**: El 100 % de las cifras visibles pasa la validación de evidencia y el 100 % de los textos tiene versión en español.
- **SC-005**: El detector de Impeccable no informa de más avisos que la línea base (221 el 2026-10-25) y los tests en dos temas, dos idiomas y seis anchos pasan.
- **SC-006**: Un visitante llega a una vía de contacto en un solo clic desde cualquier punto de la página.

## Assumptions

- La estructura técnica de la fase 1 se mantiene (HTML estático en `web/`); este refinamiento es previo a la migración a Astro (M2), que se hará con paridad sobre el resultado.
- Las tecnologías de referencia de cada área salen de los paneles y tarjetas actuales; Andrés revisa la selección en `/speckit-clarify` o en la parada de revisión.
- El dato de 12 personas es el tamaño máximo de equipo liderado y no se presenta como cifra de la banda verificable, sino como dato de trayectoria aportado por Andrés.
- La dirección visual "más limpia" se define con `/impeccable shape` antes del plan, sin cambiar los tokens de color ni el retrato.
- Las fechas de PFS Group y FENORA se mantienen como están en la página; no se añaden fechas nuevas sin el dato de Andrés.
- Malt queda fuera hasta que Andrés aporte la URL de su perfil.
