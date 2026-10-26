# ADR-005: Profesional independiente y clientes con nombre

- **Estado:** aceptado
- **Fecha:** 2026-10-25
- **Decide:** Andrés (decisiones D1 y D2 de `docs/BACKLOG.md`)

## Contexto

- La landing se publica en `andres.tekhos.com`, bajo el dominio de la marca madre Tekhos. Quedaba abierto si la página debía presentar a Andrés como profesional independiente o como fundador de Tekhos (D1).
- Las tarjetas de experiencia nombran a clientes finales, consultoras y plataformas. Quedaba abierto si se mantenían los nombres, se anonimizaban por sector o se mezclaban ambos criterios (D2).

## Decisión

- **D1: profesional independiente.** La landing presenta a Andrés como arquitecto de software independiente. No se presenta como página de fundador ni se mencionan Tekhos, su logotipo o sus servicios en el copy. Tekhos tendrá su propia landing en `tekhos.com`, en otro repositorio.
- **D2: clientes con nombre.** Los nombres de clientes y organizaciones no se anonimizan. Cada tarjeta sigue distinguiendo el contexto: cliente final, consultora, plataforma, producto propio o prueba de concepto.

## Alternativas

| Opción | A favor | En contra |
|---|---|---|
| **A. Independiente y con nombres** (elegida) | Coincide con la página actual; evidencia concreta y verificable; la marca personal no compite con Tekhos | El subdominio sugiere una relación con Tekhos que el copy no explica |
| B. Página de fundador de Tekhos | Refuerza la marca madre | Mezcla dos mensajes antes de que Tekhos tenga landing propia |
| C. Clientes anonimizados por sector | Menos exposición a acuerdos de confidencialidad | Pierde la evidencia que sostiene las cifras (ADR-003) |

## Consecuencias

- El copy actual ya cumple ambas decisiones; no hay cambios en `web/`.
- Las cifras de organizaciones siguen validándose por nombre (ADR-003).
- Un cliente nuevo solo se añade con el nombre y el contexto que confirme Andrés.

## Actualización (2026-10-26)

- Andrés retira la tarjeta de Mercedes-Benz (prueba de concepto dentro del porfolio de PFS). Las cifras pasan a 15 experiencias y 17 organizaciones; el build y los tests lo validan.
