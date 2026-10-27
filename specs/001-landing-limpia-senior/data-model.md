# Data model: Landing más limpia y senior

El contenido vive en `web/index.html` (fase 1). Este modelo fija qué datos lleva cada pieza y de dónde salen, para que el copy no invente nada. Los textos definitivos en EN y ES se escriben en la implementación y los revisa Andrés en la parada.

## Cifra verificable (banda)

| Campo | Regla |
|---|---|
| `kpi` | uno de `engagements`, `organisations`, `countries`, `industries` |
| `value` | número entero; `engagements` = número de tarjetas |
| `items` | lista `data-items` (salvo `engagements`); cada elemento aparece en la página fuera de la cifra |
| `label`, `sub` | texto EN con clave ES |

Valores tras el cambio: 15 experiencias, 17 organizaciones, 16 países (Chile y Perú añadidos el 2026-10-27), 8 sectores. Se retiran `ecosystems` y `clouds` de la banda y las 4 cifras del stack.

## Área de capacidad

| Campo | Regla |
|---|---|
| `name` | título corto |
| `line` | una frase de valor, sin adjetivos sin respaldo |
| `tech` | máximo 5; cada una con proyecto en la página (salvo lo indicado) |
| `projects` | tipo de proyectos y al menos un proyecto real |

| Área | Tecnologías (5) | Proyectos de la página que la respaldan |
|---|---|---|
| Backend y servicios | Java / Spring Boot · .NET / C# · Python / FastAPI · Node.js | Nespresso, SCRM · Schwarz Group, FENORA, PFS Group |
| Cloud y plataformas | AWS · Azure · OpenShift · Terraform · Argo CD | Indra/Minsait · Beabloo, SCRM, Reale Seguros, FENORA |
| Eventos e integración | Kafka · Debezium (CDC) · Azure Event Hubs · Apache Camel · MQTT | Umivale, SCRM, Santa Lucía, Onesait Efficiency |
| Datos | Databricks · Data Lake · MongoDB · Oracle · Apache NiFi | Beabloo, Umivale, Onesait Efficiency |
| Ingeniería con IA | RAG · MCP · LangChain / LlamaIndex · Python / ML · UiPath | FENORA, PFS Group |
| Arquitectura e identidad | DDD · Hexagonal · CQRS · OAuth 2.0 / JWT · Keycloak | Santander, Santa Lucía, Mercadona, Iberia, INE Chile |

Go se retiró a petición de Andrés el 2026-10-26: no tenía proyecto en la página (research R1). El área queda con 4 tecnologías y 29 en total.

## Proyecto

| Campo | Regla |
|---|---|
| `org` | nombre del cliente o empresa, sin anonimizar |
| `context` | cliente final, consultora, plataforma, producto propio o prueba de concepto |
| `category` | `finance`, `commerce`, `platforms` o `product` (filtros actuales) |
| `featured` | sí en 6 tarjetas, en este orden: Santander, Reale Seguros, Indra/Minsait · Beabloo, Iberia Airlines, Indra/Minsait → INE Chile, FENORA |
| `summary` | empieza por un verbo de resultado |
| `tags` | máximo 4 |

## Hito de trayectoria

| Periodo | Organización | Rol | Línea (datos de Andrés) |
|---|---|---|---|
| 2012–2021 | Team Cloud (Colombia) | Fundador y CTO | Primera empresa: consultoría y desarrollo a medida para empresas nacionales y europeas; vendida en 2021 |
| 2019–2024 | PFS Group | Chief Software Architect | Productos SaaS, prácticas de ingeniería compartidas y bases reutilizables |
| 2025– | FENORA | Fundador | Producto SaaS propio de Open Banking e IA; lanzamiento en producción previsto en diciembre de 2026 |
| 2026– | Tekhos | Fundador y CEO | La empresa en construcción que continúa la visión de Team Cloud con alcance global |

## Liderazgo e idiomas

- Team Leader y Architecture Lead de equipos de hasta 12 personas (dato de trayectoria, no cifra de la banda).
- Idiomas: "Spanish (native) · English (professional working proficiency)" / "Español (nativo) · Inglés (nivel profesional)".

## Contacto

- `andres.mejia@tekhos.com` (ADR-006) y LinkedIn `https://www.linkedin.com/in/andresmejiatcl/`.
- Malt queda fuera hasta que Andrés aporte la URL.
