# SPEC: landing de Andrés Mejía

Documento funcional y de interacción de la página tal como entra en el repo (fase 1). Los valores visuales están en `DESIGN.md` y en los bloques de tokens de `web/css/site.css`; aquí solo se nombran. Cada cambio de comportamiento pasa por `/speckit-specify` y actualiza este documento.

## 1. Objetivo

Que un decisor técnico entienda en un minuto qué aporta Andrés, lo compruebe con evidencia verificable en la propia página y abra una conversación. El refinamiento (M1) se hace sobre `web/` y se revisa en https://andres.tekhos.com; después se migra a Astro con paridad (M2, ADR-004).

## 2. Arquitectura de página

Una sola página con anclas. Orden de secciones tras la spec 001 (2026-10-27):

| Sección | Ancla | Contenido |
|---|---|---|
| Header | — | Wordmark `am_`, navegación (Expertise, The pipeline, Experience, Capabilities, Track record, About), EN/ES, tema, "Let's talk", menú móvil y barra de lectura |
| Hero | `#inicio` | Etiqueta del H1, H1 en cuatro líneas, intro, CTA, "20+" y "Hands-on", retrato y canvas |
| Contextos | — | 6 marcas con su sector debajo |
| Evidencia | — | Banda de 4 cifras verificables (experiencias, organizaciones, países, sectores) y mapa de puntos con un punto vivo por país y leyenda por región |
| Expertise | `#enfoque` | Cuatro especialidades en `<details>`, una frase cada una |
| Pipeline | `#factory` | Pendiente de rediseño en la spec 002 (ciclo de vida en 7 fases) |
| Experiencia | `#experiencia` | Filtros, insights, 16 tarjetas (6 destacadas por sector) y matriz "Clients by channel" con 30 clientes por canal |
| Capacidades | `#capabilities` | Rejilla de 6 áreas con hasta 5 tecnologías y los proyectos que las respaldan |
| Trayectoria | `#trayectoria` | Carriles proporcionales 2005 a hoy con 5 etapas, marcador "Today", liderazgo e idiomas |
| Método | — | Cuatro habilidades de impacto en una franja |
| Sobre mí | `#sobre-mi` | Una idea y un párrafo, enlace a LinkedIn |
| Contacto | `#contacto` | Correo `andres.mejia@tekhos.com` como acción principal y LinkedIn |
| Footer | — | Nombre, alcance global y volver arriba |

Solo el H1 lleva etiqueta encima; los H2 no (el detector y Impeccable vetan las etiquetas sobre los encabezados).

## 3. Comportamiento por zona

### 3.1 Header
- Fijo. Se compacta al hacer scroll, marca la sección activa (IntersectionObserver) e integra la barra de lectura.
- Selector EN/ES (`aria-pressed`) y cambio de tema con View Transition circular cuando hay movimiento permitido.
- Móvil: menú con `aria-expanded` y `aria-controls`.
- **Aceptación:** sin desbordes de 320 a 1440 px; la sección activa coincide con la visible.

### 3.2 Hero
- Entrada del H1 línea a línea y conteo animado de las cifras. Solo la entrada depende de `.js`; `theme-init.js` libera el estado a los 2,5 s pase lo que pase.
- Canvas de topología sobre la retícula de 88 px. Se pausa fuera de pantalla y con la pestaña oculta.
- Retrato con luz ambiental detrás, nunca sobre la piel.
- **Aceptación:** ninguna línea del H1 se sale de su columna de 320 a 1920 px.

### 3.3 KPIs y cifras (ADR-003)
- Cada cifra lleva `data-items`. El build falla si el número no coincide con la lista o si un elemento no aparece fuera de la propia cifra.
- Los países por región suman el KPI de países. Las cifras del stack abren su panel tecnológico.
- **Aceptación:** test de cifras en verde; nada se publica sin evidencia visible.

### 3.4 Pipeline
- Dos SVG que comparten `data-station`: horizontal desde 861 px, vertical hasta 860 px y sin scroll horizontal. Solo el visible anima (SMIL).
- Etapas seleccionables (`data-stage`, `aria-pressed`), contextos RAG/MCP/harness y botón "Replay". Sin botón de pausa.
- **Aceptación:** vertical sin scroll a 320, 390, 768 y 860 px; las etapas y contextos se seleccionan con teclado.

### 3.5 Experiencia
- Filtros por ámbito (todos, finanzas, comercio, plataformas, producto). Cada tarjeta identifica el contexto (cliente final, consultora, plataforma, producto propio o prueba de concepto).
- `experience.js` calcula los insights (distribución por ámbito y tecnologías recurrentes) a partir de las tarjetas.
- **Aceptación:** el filtro de banca muestra 4; el KPI de experiencias coincide con las tarjetas.

### 3.6 Tecnología
- Explorador de 10 disciplinas con paneles (`aria-pressed`, `aria-controls`). Cada panel cierra con "In practice" y proyectos reales.

### 3.7 Idiomas y temas
- EN inicial salvo preferencia guardada. La traducción va por cadenas inglesas (`translations.js`) y vigila el DOM. En fase 2: claves y rutas `/` y `/es/`.
- Oscuro por defecto; preferencia en `localStorage['andres-theme']`; `theme-color` se actualiza.
- **Aceptación:** EN → ES → EN conserva textos dinámicos; en ES no queda texto inglés; el tema persiste al recargar.

## 4. Movimiento

- Cada animación comunica jerarquía, relato, feedback o cambio de estado.
- Solo `transform`, `opacity`, `clip-path` y atributos SVG; curvas `--ease` y `--ease-io`.
- Rama de `prefers-reduced-motion` primero: todo visible, pipeline detenido, H1 sin transformaciones, sin View Transition.
- Revelado de H2 con `clip-path`, spotlight que sigue al cursor solo con puntero fino, botones magnéticos solo con puntero fino.

## 5. Accesibilidad

WCAG 2.2 AA en ambos temas: contraste ≥ 4,5:1, teclado completo, foco visible, `aria-pressed`/`aria-expanded` en los controles, contenido íntegro sin JS y con movimiento reducido, 0 violaciones serias o críticas de axe.

## 6. Gates de calidad

Una tarea no se da por terminada si incumple alguno:

- `npm test` en verde: consola y CSP limpias en EN/ES × oscuro/claro, sin scroll horizontal a 320, 360, 390, 768, 1024 y 1440 px, i18n, temas, pipeline, cifras, movimiento reducido y axe.
- `npm run check:deploy` en verde si se toca `amplify.yml`.
- `npm run detect` sin avisos nuevos respecto a la línea base de `DESIGN.md`, salvo excepciones aceptadas por Andrés en `CLAUDE.md`.
- Capturas de escritorio (1440×900) y móvil (390×844) en los dos temas en `docs/reviews/<AAAA-MM-DD>-<tema>/`.
- Rendimiento (M3): Lighthouse móvil Performance ≥ 90 y Accessibility ≥ 95, LCP < 2,5 s en 4G simulado y CLS < 0,05.
