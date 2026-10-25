---
name: Andrés Mejía
description: Landing personal de un arquitecto de software. Precisión estructural, azul carbón y ámbar cálido; papel y óxido en el tema claro.
colors:
  dark:
    sec-1: "#0D151E"
    sec-2: "#111820"
    sec-3: "#0E1720"
    surface: "#171D23"
    surface-hover: "#1C242C"
    surface-alt: "#111A23"
    surface-inset: "#0B1721"
    text: "#F6F5F2"
    text-2: "#C9D0D6"
    text-3: "#AAB8C4"
    text-4: "#91A6B5"
    accent: "#E1B28C"
    accent-hover: "#F0C8A4"
    accent-ink: "#141A20"
    signal: "#8AB3CD"
    focus: "#E1B28C"
  light:
    sec-1: "#F6F5F2"
    sec-2: "#EFEDE8"
    sec-3: "#F1F0EC"
    surface: "#FFFFFF"
    surface-alt: "#EDECE7"
    surface-inset: "#F7F6F3"
    text: "#111418"
    text-2: "#2F353C"
    text-3: "#545A61"
    text-4: "#6E6B65"
    accent: "#A24A28"
    accent-hover: "#87391B"
    accent-ink: "#FFFFFF"
    oxide-graphics: "#B5502B"
    signal: "#2F6B93"
    focus: "#B5502B"
typography:
  h1:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(48px, 5.45vw, 78px)"
    fontWeight: 500
    lineHeight: 1.075
    letterSpacing: "-0.055em"
  h2:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(35px, 4vw, 56px)"
    lineHeight: 1.15
    letterSpacing: "-0.045em"
  h3-panel:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(25px, 3vw, 40px)"
    lineHeight: 1.25
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  mono:
    fontFamily: "IBM Plex Mono, Courier New, monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.07em"
rounded:
  none: "0px"
  sm: "3px"
motion:
  ease: "cubic-bezier(.2,.7,.2,1)"
  ease-in-out: "cubic-bezier(.65,0,.35,1)"
---

# DESIGN: Andrés Mejía

Sistema visual de la landing. **La traducción a CSS son los bloques `:root,html[data-theme=dark]` y `html[data-theme=light]` de `web/css/site.css`**: si cambia un token aquí, cambia allí, y al revés. Ese fichero contiene además los tokens del pipeline (`--f-*`), los gráficos (`--d1`–`--d4`), la red del canvas (`--net-*`) y los brillos ambientales, que este documento no repite.

## Dirección

Profesional, arquitectónica, elegante y sobria. Precisión estructural, ingeniería y claridad. Tipografía protagonista, espacios generosos, líneas finas, retícula y detalles técnicos contenidos.

- **Tema oscuro (por defecto):** azul carbón en tres capas (`sec-1`, `sec-2`, `sec-3`) con superficies algo más claras para tarjetas. Ámbar cálido como acento y azul acero como señal.
- **Tema claro:** papel cálido con superficies blancas. Óxido como acento de texto (`#A24A28`, que llega a AA) y `#B5502B` solo en gráficos.
- **Los dos temas son completos:** todas las secciones cambian, incluidos el pipeline y la experiencia.
- **Luz ambiental:** azul acero y ámbar suave detrás del retrato y en el hero. Los degradados se aplican al entorno, **nunca sobre la piel**.

## Reglas

- **Colores solo como tokens.** No hay colores literales fuera de los bloques de tema de `site.css`.
- **Geometría:** contenedores rectangulares, radios mínimos (0–3 px), bordes de 1 px y separación precisa. Nada de píldoras ni tarjetas flotantes por defecto.
- **Tipografía:** Manrope para títulos, cuerpo, navegación y botones; IBM Plex Mono para etiquetas, índices, tags técnicos y diagramas. Fuentes autoalojadas (CSP `'self'`).
- **Retrato:** recortado y conviviendo con el fondo, sin tarjeta. `filter: none`. No se retoca, no se regenera ni se sustituye por variantes anteriores.
- **Marca personal:** wordmark `am_`. Sin logotipos de clientes (organizaciones en texto).
- **Contraste:** AA en los dos temas; el acento del tema claro para texto pequeño es `#A24A28`.

## Movimiento

- Curvas `--ease` (salidas) y `--ease-io` (transiciones de estado).
- Solo `transform`, `opacity`, `clip-path` y atributos SVG.
- La rama de `prefers-reduced-motion` se escribe primero: contenido visible y nada en movimiento.
- Lo que no se ve se pausa (canvas del hero y pipeline fuera de pantalla o con la pestaña oculta).

## Línea base del detector (2026-10-25)

`impeccable detect` sobre `dist/` da 221 avisos en la versión que entra en el repo: texto de interfaz por debajo de 12 px (etiquetas mono de 10 px), etiquetas encima de los H2, índices numerados, brillos de color sin desplazamiento, puntos de estado que laten, el barrido del pipeline y la retícula del hero. Son decisiones de diseño heredadas: su revisión es una tarea de M1 y cada excepción la acepta Andrés de forma explícita en `CLAUDE.md`.
