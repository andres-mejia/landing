# Research: Landing más limpia y senior

Fase 0 de `/speckit-plan`. No quedan `NEEDS CLARIFICATION` en el contexto técnico: el stack no cambia. Las decisiones de abajo resuelven cómo cumplir la spec dentro de la fase 1.

## R1. Qué tecnologías nombra cada área de capacidad

- **Decision:** 6 áreas con 5 tecnologías cada una (30 en total), elegidas entre las etiquetas de las tarjetas de proyecto para que cada una tenga un proyecto real detrás. Detalle en [data-model.md](data-model.md).
- **Rationale:** cumple FR-008 y el caso límite de la spec ("una tecnología se nombra en un área solo si aparece en al menos un proyecto de la página o Andrés la confirma"). Prioriza lo moderno que la página respalda: Kafka, CDC, Azure/AWS, Terraform/Argo CD, RAG/MCP.
- **Alternatives considered:** tomar las 5 primeras de cada panel actual (varias, como GCP, RabbitMQ, PostgreSQL, Redis u OpenTelemetry, solo aparecen en los paneles que se retiran y quedarían sin evidencia en la página); 4 por área (24 en total, demasiado escueto para mostrar amplitud).
- **Pendiente de Andrés:** Go solo aparece en el panel de backend (y en la cifra de ecosistemas que se retira). Se mantiene en el área de backend porque ya formaba parte del contenido aprobado; Andrés puede retirarlo en la revisión.

## R2. Las 6 áreas frente a las 6 de la spec

- **Decision:** backend e ingeniería de servicios; cloud y plataformas (incluye delivery); eventos e integración; datos; ingeniería con IA; arquitectura e identidad (incluye seguridad).
- **Rationale:** FR-005 lleva los ecosistemas backend a las áreas, así que backend necesita su sitio. FR-007 permite fusionar dos áreas: delivery se integra en cloud y plataformas (Terraform, Argo CD) y seguridad en arquitectura e identidad (DDD, OAuth). Así se mantiene el máximo de 6.
- **Alternatives considered:** 7 áreas (rompe el máximo de la spec); seguridad como área propia sin backend (perdería la información de los 5 ecosistemas).

## R3. Validación de cifras en el build (ADR-003)

- **Decision:** `scripts/build.mjs` deja de exigir "al menos 9 cifras desglosadas" y pasa a exigir la lista explícita de KPIs de la banda (`engagements`, `organisations`, `countries`, `industries`), cada una con su validación actual (tarjetas, `data-items`, regiones). Si aparece una cifra con `data-items` fuera de esa lista, se valida igual.
- **Rationale:** la decisión Q2 deja 3 cifras desglosadas; un mínimo numérico ya no protege nada y una lista explícita detecta que falte una cifra concreta.
- **Alternatives considered:** bajar el mínimo a 3 (no detecta qué cifra falta); mantener cifras en las áreas para llegar a 9 (contradice la decisión).

## R4. Proyectos destacados sin reescribir el filtrado

- **Decision:** reordenar las tarjetas en el HTML para que las 6 destacadas sean las primeras (Santander, Reale Seguros, Indra/Minsait · Beabloo, Iberia, INE Chile, FENORA) y marcarlas con `data-featured`. `experience.js` sigue mostrando las 6 primeras coincidencias (`INITIAL=6`); con el filtro "todos" son exactamente las destacadas.
- **Rationale:** cero lógica nueva; sin JS todas las tarjetas siguen visibles; el orden es contenido, no comportamiento.
- **Alternatives considered:** seleccionar por `data-featured` en JS (más código y un estado distinto sin JS).

## R5. Sección de trayectoria accesible y sin animación obligatoria

- **Decision:** lista ordenada (`<ol>`) de 4 hitos con periodo, organización, rol y una línea; bloque aparte con liderazgo (equipos de hasta 12 personas, Team Leader y Architecture Lead) e idiomas. Revelado opcional con la clase `reveal` existente.
- **Rationale:** el orden cronológico es semántico; los lectores de pantalla anuncian "lista de 4 elementos"; reutiliza el sistema de revelado y su rama de movimiento reducido.
- **Alternatives considered:** línea de tiempo en SVG (más peso, peor lectura con lector de pantalla y otra pieza animada compitiendo con el pipeline).

## R6. Correo de contacto

- **Decision:** enlace `mailto:andres.mejia@tekhos.com` con la dirección visible como texto, junto a LinkedIn, en la cabecera de la sección de contacto y en el cierre.
- **Rationale:** FR-017 y el caso límite de visitantes sin cliente de correo (pueden copiarlo). La CSP no restringe `mailto:`.
- **Alternatives considered:** formulario (vetado: sin destino ni backend); ofuscar la dirección (dificulta copiarla y no evita el spam de forma real; el comodín de SES ya filtra spam).

## R7. Presupuesto de texto verificable

- **Decision:** test de Playwright que cuenta las palabras de `<main>` en inglés, en total (incluido lo plegable) y visibles sin desplegar, y exige ≤ 1.200 en total y ≤ 1.000 visibles (SC-001). Se registra el valor real en el informe de revisión.
- **Rationale:** convierte un objetivo editorial en una regresión automática.
- **Alternatives considered:** contarlo a mano en cada revisión (se olvida).

## R8. Línea base del detector

- **Decision:** cada bloque compara `npm run detect` con la línea base (216 avisos tras retirar Mercedes-Benz) y no puede subirla. Quitar el explorador, las frases sobre los H2 y el texto mono de 10 px en las zonas tocadas debería bajarla de forma visible.
- **Rationale:** FR-022 y la constitución.
- **Alternatives considered:** corregir toda la línea base en este refinamiento (mezcla limpieza de detector con cambio de contenido; queda para la revisión de excepciones con Andrés).
