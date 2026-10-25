# Andrés Mejía Landing Constitution

Principios y gates de la landing personal de Andrés Mejía. Es corta a propósito: lo operativo (comandos, AWS, git, skills, flujo de issues) vive en `CLAUDE.md`. Los valores concretos viven en `PRODUCT.md`, `DESIGN.md` y `docs/SPEC.md`, que esta constitución no copia.

## Core Principles

### I. Cifras verificables
Toda cifra publicada MUST llevar `data-items` con lo que cuenta y su evidencia visible en la página; el build MUST fallar si no cuadra (ADR-003). Las cifras de resultado solo se publican con el dato de Andrés, cómo se midió y su permiso.

### II. No se inventa nada
Clientes, cifras, resultados, fechas, testimonios, logos, métricas y autorizaciones MUST salir de Andrés. Lo que falta no se rellena: se omite o se pregunta. Las decisiones D1–D5 de `docs/BACKLOG.md` son de Andrés.

### III. Posicionamiento global sin residencia
La página, sus metadatos, el JSON-LD y el repositorio (público) MUST NOT contener la ciudad ni ninguna ubicación personal de Andrés. Los países citados son de clientes y equipos.

### IV. Retrato intacto
`web/assets/andres-retrato-definitivo.png` MUST conservar su SHA-256 aprobado. No se regenera, no se retoca, no recibe filtros ni luz sobre la piel, y no se sustituye por variantes anteriores.

### V. El contenido no depende de la animación
La página MUST ser íntegra y utilizable sin JavaScript y con `prefers-reduced-motion`, sin botón de pausa. Una animación existe solo si comunica jerarquía, relato, feedback o cambio de estado; solo anima `transform`, `opacity`, `clip-path` y atributos SVG; la rama sin movimiento se escribe primero; lo que no se ve se pausa.

### VI. Sistema de tokens con dos temas completos
Los colores MUST ser tokens de `DESIGN.md`, traducidos en los bloques de tema de `web/css/site.css`, que cambian a la vez. Los dos temas (oscuro por defecto y claro) cubren todas las secciones. La única skill de estilo es Impeccable.

### VII. CSP `'self'` y accesibilidad AA
Sin scripts, estilos ni atributos `style` en línea; el JS solo toca estilos por CSSOM. WCAG 2.2 AA en ambos temas: contraste ≥ 4,5:1, teclado completo, foco visible y 0 violaciones serias o críticas de axe.

### VIII. Bilingüe sin pérdidas
EN británico como idioma inicial y ES de España con tuteo. Un texto MUST cambiar a la vez en inglés y en su clave de traducción (fase 1) o en sus dos diccionarios (fase 2). En español no queda texto en inglés.

## Gates de calidad

Una tarea no se da por terminada si incumple alguno de los gates de `docs/SPEC.md` §6:

- `npm test` en verde (consola y CSP, desbordes de 320 a 1440 px, i18n, temas, pipeline, cifras, movimiento reducido, axe).
- `npm run check:deploy` en verde si cambia `amplify.yml`.
- Sin avisos nuevos de `impeccable detect` respecto a la línea base, salvo excepciones aceptadas por Andrés.
- Capturas de escritorio y móvil en los dos temas en `docs/reviews/`.
- Desde M3: Lighthouse móvil Performance ≥ 90 y Accessibility ≥ 95, LCP < 2,5 s y CLS < 0,05.

## Decisiones y despliegue

- Una decisión de stack, despliegue o contenido estructural requiere un ADR en `docs/adr/` antes de implementarse.
- `npm run build` deja el sitio en `dist/` en todas las fases. El despliegue (AWS Amplify, ADR-002) sale de `amplify.yml` y `customHttp.yml`. Cada merge a `main` publica en https://andres.tekhos.com, que no se indexa hasta que Andrés decida `SITE_INDEXABLE=true`.
- `baseline/v1/` (M2) es referencia congelada y no se modifica sin OK de Andrés.

## Governance

Esta constitución prevalece sobre las demás prácticas del proyecto, salvo lo que Andrés diga en la conversación. `CLAUDE.md` define cómo se trabaja y no puede contradecir estos principios. Toda enmienda MUST documentarse con su motivo y subir la versión: MAJOR si redefine o elimina un principio, MINOR si añade uno o amplía materialmente, PATCH si solo aclara. Cada PR MUST verificar los gates y los principios afectados.

**Version**: 1.0.0 | **Ratified**: 2026-10-25 | **Last Amended**: 2026-10-25
