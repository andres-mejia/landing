# ADR-003: Cifras verificables

- **Estado:** aceptado
- **Fecha:** 2026-10-25

## Contexto

- Andrés quiere KPIs porque "los números venden más que el texto".
- Una cifra inventada o que no cuadra con el contenido destruye la credibilidad de un arquitecto senior en la primera pregunta de un CTO ("¿cómo lo mediste?").
- Las cifras de resultado (latencias, ahorros, volúmenes) necesitan datos reales que todavía no están.

## Decisión

- **Solo se publican cifras con evidencia visible en la página.**
  - Banda principal: 16 experiencias, 18 organizaciones, 14 países, 8 sectores, 5 ecosistemas backend y 3 clouds + on-prem.
  - El stack en cifras: 11 frameworks backend, 6 frameworks frontend, 6 herramientas ETL y 5 plataformas big data.
- **Cada cifra lleva `data-items`** con la lista exacta de lo que cuenta. `scripts/build.mjs` falla si:
  - el número no coincide con la lista;
  - un elemento no aparece en el contenido **fuera de la propia cifra** (coincidencia de token completo, para que "Go" no se valide con "Google");
  - el KPI de experiencias no coincide con las tarjetas;
  - los países por región no suman el KPI.
- **Los insights de Experiencia los calcula `experience.js`** a partir de las tarjetas: la distribución por ámbito y las tecnologías más recurrentes (Kafka en 6 de 16). No pueden desincronizarse.
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
