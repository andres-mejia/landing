# Backlog: milestones, etiquetas y criterios de cierre

Guía para que `/speckit-tasks` genere tareas con la granularidad correcta y para clasificar los issues que crea `/speckit-github-taskstoissues`. Sigue el mismo esquema que `me-beauty-site`.

## Granularidad

- **Una tarea = un issue y un commit** (≈ medio día a un día de trabajo). **Un PR por bloque visible**: varias tareas relacionadas que juntas se pueden ver y aceptar en https://andres.tekhos.com. Los bloques están en `specs/*/tasks.md`.
  - No crear tareas de una línea ni épicas de una semana.
- Cada tarea nombra la sección o el componente y su criterio de aceptación verificable (test de Playwright, captura o gate del SPEC).
- Prioridad: **P1** bloquea la publicación indexable, **P2** la mejora y **P3** puede esperar.

## Milestones (crear en GitHub antes de generar los issues)

Cada push a `main` se publica automáticamente en https://andres.tekhos.com con `noindex` (ADR-002), una vez creada la app de Amplify. El refinamiento se hace sobre ese entorno.

| Milestone | Objetivo | Criterio de cierre |
|---|---|---|
| **M0 · Bootstrap y entorno dev** | Repo inicializado, base estática y CI (bloque 1); Spec Kit, skills, `PRODUCT.md`, `DESIGN.md`, `docs/SPEC.md` y constitución (bloque 2); app de Amplify creada por Andrés y `andres.tekhos.com` asociado | `npm test` verde contra `dist/`; `andres.tekhos.com` sirve la landing con `noindex` y la CSP real; spec, plan y tasks revisados; issues creados |
| **M1 · Refinamiento sobre `web/`** | Contacto (C1), verbos de resultado (C3), mapa tecnológico (C5) e imagen OG (T1) sobre la landing estática | Andrés da la landing por buena en dev; `npm test` verde e `impeccable detect` sin avisos no aceptados |
| **M2 · Migración a Astro** | ADR-004 (T6): `baseline/v1/` congelada, Astro estático, i18n por claves con EN en `/` y ES en `/es/`; la salida sigue en `dist/` | `npm run parity` con 0 diferencias por idioma y tema; los mismos tests en verde ampliados a las dos rutas; `amplify.yml` sin cambios |
| **M3 · Calidad y rendimiento** | Fuentes WOFF2 (T2), retrato AVIF/WebP (T3), Lighthouse y Core Web Vitals (T4), Safari y Firefox (T5), JSON-LD de persona (T7), caché `immutable` en `/_astro/*`, 404 propia | Todos los gates en verde, con informe en `docs/reviews/` |
| **M4 · Contenido real** | Cifras de resultado con dato y permiso (C2), totales reales (D4), BPM (D5), trabajo reciente (C4) | Cada cifra nueva con evidencia visible y validada en build; nada publicado sin el OK de Andrés |
| **M5 · Producción** | `SITE_INDEXABLE=true`, `SITE_URL` definitiva, sitemap y comprobación de metadatos para buscadores | Sitio indexable; decisión confirmada por Andrés |
| **Backlog** | Lo que no bloquea | — |

## Etiquetas

| Etiqueta | Uso |
|---|---|
| `setup` | Estructura, tooling, Spec Kit, skills, tests |
| `design-system` | Tokens, tipografía, temas |
| `section` | Construcción o ajuste de una sección del SPEC |
| `motion` | Coreografía, canvas, pipeline, reduced motion |
| `a11y` | Accesibilidad |
| `perf` | Rendimiento, imágenes, fuentes, presupuesto de JS |
| `content` | Copy, cifras, proyectos, traducciones |
| `i18n` | Traducciones EN/ES y rutas por idioma |
| `refine` | Ajustes que pide Andrés tras revisar capturas |
| `decision` | Decisión pendiente de Andrés; no se resuelve sin él |
| `deploy` | AWS Amplify, dominio, cabeceras, CI de despliegue |

## Decisiones pendientes de Andrés (etiqueta `decision`)

| # | Pendiente | Prioridad | Milestone |
|---|---|---|---|
| D1 | ~~Relación con Tekhos~~. Resuelta el 2026-10-25 (ADR-005): profesional independiente; Tekhos tendrá su propia landing. | — | — |
| D2 | ~~Criterio de clientes~~. Resuelta el 2026-10-25 (ADR-005): los nombres no se anonimizan. | — | — |
| D3 | ~~Dominio~~. Resuelta el 2026-10-25: esta landing en `andres.tekhos.com`; `tekhos.com` para la empresa. | — | — |
| D4 | Totales reales de proyectos y clientes, si son mayores que los comprobables (15 y 17). Se publicarían como "40+ proyectos · 15 documentados". | P2 | M4 |
| D5 | Herramientas BPM (Camunda, jBPM, Bizagi…): quinta cifra del stack y entrada en el panel tecnológico. | P2 | M4 |

## Contenido (etiqueta `content`)

| # | Tarea | Prioridad | Milestone |
|---|---|---|---|
| C1 | Contacto: email de dominio propio (`@tekhos.com`, si Andrés lo confirma) y enlace a Malt, además de LinkedIn. Sin formulario sin destino. | P1 | M1 |
| C2 | Cifras de resultado en 3–4 proyectos: métrica, cómo se midió y permiso de publicación. Candidatos: Umivale (eventos/día del CDC), SCRM (eventos/s en carga), Beabloo (servicios migrados y plazo), INE Chile (volumen), PFS (productos y tamaño de equipo), FENORA (bancos conectados). | P1 | M4 |
| C3 | Tarjetas de proyecto: verbos de resultado en lugar de "Worked on…" / "Trabajo en…". | P2 | M1 |
| C4 | Trabajo reciente que todavía no aparece en la landing. Andrés decide qué proyectos se incluyen y cómo se nombran; no se añade nada sin su OK. | P2 | M4 |
| C5 | Recortar el mapa tecnológico: unas 130 etiquetas leen como lista de palabras clave. Mantener lo que se vende. | P3 | M1 |

## Técnico (etiquetas `perf`, `deploy`, `setup`)

| # | Tarea | Prioridad | Milestone |
|---|---|---|---|
| T1 | Imagen OG de 1200×630 sin transparencia (el PNG del retrato no sirve para LinkedIn). Generarla sin alterar el retrato. Con `SITE_URL=https://andres.tekhos.com`. | P1 | M1 |
| T2 | Fuentes en WOFF2 con subconjunto latino. Conservar los TTF originales como fuente. | P2 | M3 |
| T3 | Retrato en AVIF/WebP con alfa y `srcset`, manteniendo el PNG maestro. Comparación visual antes y después: el rostro no puede cambiar. | P2 | M3 |
| T4 | Medir Lighthouse y Core Web Vitals en el despliegue de Amplify. Objetivos sin CLS apreciable y LCP con el retrato priorizado. | P2 | M3 |
| T5 | Probar Safari y Firefox: View Transitions y `::details-content` son mejora progresiva. | P2 | M3 |
| T6 | Migración a Astro (ADR-004). | P2 | M2 |
| T7 | JSON-LD de persona (sin dirección ni residencia). | P3 | M3 |

Estos puntos son la entrada de `/speckit-specify`. Los que no acaben en `tasks.md` se crean a mano en su milestone con las etiquetas indicadas.
