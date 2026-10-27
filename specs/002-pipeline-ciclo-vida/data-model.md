# Data model: Pipeline del ciclo de vida

Copy en inglés (fuente) con su clave ES en `translations.js`. Datos confirmados por Andrés el 2026-10-27; sin nombrar agregador ni bancos.

## Cabecera

- H2: "From the first question" / "to running in production."
- Entradilla: "One real change from FENORA, my own product: connecting a new bank through Open Banking (PSD2), followed from plan to production."

## Fase

| # | Nombre | Artefacto | Papel de Andrés | Riesgo que evita |
|---|---|---|---|---|
| 01 | Discover & plan | Roadmap entry with success criteria | Prioritise with the business | Building what adds no value |
| 02 | Analyse | Consent flow and NFRs: SCA, security, latency | Turn needs into requirements | Late regulatory surprises |
| 03 | Architect | Connector ADR and C4 diagram | Decide and document | Implicit decisions |
| 04 | Build | Connector service and OpenAPI contract | Contracts and code | Fragile integrations |
| 05 | Verify | Contract tests against the sandbox | Tests as a release gate | Breaking production |
| 06 | Release | CI/CD pipeline and infrastructure as code | Repeatable delivery | Manual deployments |
| 07 | Operate | Metrics, alerts and consent expiry | Observe and learn | Silent failures |

Reglas: una frase corta por campo; siglas sin traducir.

## Retorno

- "What production teaches goes back into the roadmap."

## Acelerador

| Acelerador | Etiqueta | Fases |
|---|---|---|
| RAG | Project knowledge | 02, 03 |
| Agents | Build and verification | 04, 05 |
| MCP | Tools and environments | 04, 06, 07 |

## Estado (cliente)

- `at`: índice de la fase alcanzada por el recorrido (0–6) o "todas" sin JS / con movimiento reducido.
- `selected`: fase elegida por el visitante; detiene el recorrido.
