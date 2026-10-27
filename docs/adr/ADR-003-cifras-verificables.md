# ADR-003: Cifras verificables

- **Estado:** aceptado
- **Fecha:** 2026-10-25

## Contexto

- Andrés quiere KPIs porque "los números venden más que el texto".
- Una cifra inventada o que no cuadra con el contenido destruye la credibilidad de un arquitecto senior en la primera pregunta de un CTO ("¿cómo lo mediste?").
- Las cifras de resultado (latencias, ahorros, volúmenes) necesitan datos reales que todavía no están.

## Decisión

- **Solo se publican cifras con evidencia visible en la página.**
  - Banda principal: 15 experiencias, 17 organizaciones (16 y 18 hasta el 2026-10-26, antes de retirar la PoC de Mercedes-Benz), 16 países (14 hasta el 2026-10-27; Andrés añade Chile y Perú), 14 países, 8 sectores, 5 ecosistemas backend y 3 clouds + on-prem.
  - El stack en cifras: 11 frameworks backend, 6 frameworks frontend, 6 herramientas ETL y 5 plataformas big data.
- **Cada cifra lleva `data-items`** con la lista exacta de lo que cuenta. `scripts/build.mjs` falla si:
  - el número no coincide con la lista;
  - un elemento no aparece en el contenido **fuera de la propia cifra** (coincidencia de token completo, para que "Go" no se valide con "Google");
  - el KPI de experiencias no coincide con las tarjetas;
  - los países por región no suman el KPI.
- **Los insights de Experiencia los calcula `experience.js`** a partir de las tarjetas: la distribución por ámbito y las tecnologías más recurrentes (Kafka en 5 de 15). No pueden desincronizarse.
- **Las cifras de resultado** se añadirán por proyecto solo con el dato de Andrés, cómo se midió y su permiso de publicación.

## Alternativas

| Opción | A favor | En contra |
|---|---|---|
| **A. Cifras desglosadas y validadas en build** (elegida) | Verificables por el visitante y por la máquina | Cifras de amplitud, no de impacto, hasta tener datos |
| B. Cifras escritas a mano | Simple | Se desincronizan al editar contenido |
| C. Cifras de resultado estimadas | Más impacto aparente | Inventadas; riesgo reputacional y de NDA |

## Consecuencias

- Para cambiar una cifra hay que cambiar su evidencia, o el build falla. Es intencionado.
- **Pendiente de Andrés:** totales reales de proyectos y clientes (los actuales son los que se pueden comprobar en la página), herramientas BPM y cifras de resultado por proyecto.

## Enmienda (2026-10-26, spec 001)

- **La banda principal pasa a 4 cifras** por decisión de Andrés: experiencias, organizaciones, países y sectores. Los ecosistemas backend y las clouds salen de la banda y se describen en las áreas de capacidad, sin cifra. Las 4 cifras del stack (frameworks backend y frontend, herramientas ETL y plataformas big data) se retiran con el explorador tecnológico.
- **El build valida una lista explícita** (`REQUIRED_KPIS` en `scripts/build.mjs`) en lugar de exigir "al menos 9 cifras desglosadas": tiene que existir cada una de las 4 y toda cifra con `data-items` sigue validando número y evidencia.
- **Proyectos destacados:** si hay tarjetas con `data-featured`, tienen que ser exactamente 6 y las primeras.

