> **Documento histórico.** Es el contexto con el que se traspasó la versión preparada en ChatGPT (2026-10-25). Desde entonces cambiaron, entre otras cosas, el CSS (un solo `web/css/site.css` con tokens y dos temas completos), el copy (titular "built to evolve", sin "fábrica"), el header (fijo), el pipeline (vertical en móvil) y las cifras (ADR-003). **Donde este documento contradiga a `CLAUDE.md` o a un ADR, mandan estos.** Su apéndice de extracción ya no aplica: la fuente está en `web/`.

# Andrés Mejía — Contexto de implementación de la landing

Fecha del traspaso: 25 de octubre de 2026. Especificación del estado actual y guía para continuar en Claude Code, dentro del repositorio GitHub del propietario, con despliegue en AWS.

## 0. Instrucción inicial para Claude Code

Leer este documento completo antes de modificar archivos. El objetivo es continuar una landing ya diseñada, implementada y refinada; conservar su identidad y mejorarla de forma incremental.

```text
Actúa como un ingeniero frontend sénior con criterio de diseño y experiencia en AWS.

Continúa la landing personal de Andrés Mejía a partir de este documento y del archivo
andres-mejia-landing-en-es.html. El HTML es la referencia visual y funcional ejecutable;
este Markdown aporta las decisiones, restricciones y contexto que no deben perderse.

1. Inspecciona primero el repositorio: README, CLAUDE.md/AGENTS.md si existen, estructura,
   dependencias, scripts, workflows, infraestructura y configuración de despliegue.
2. Conserva el trabajo existente y reutiliza su stack y pipeline cuando sean adecuados.
3. Si solo se aporta el HTML autónomo, recupera sus recursos y separa los archivos sin
   cambiar el diseño. El apéndice de este documento incluye un extractor reproducible.
4. Comprueba primero la equivalencia visual y funcional; después refina la implementación.
5. Mantén EN como idioma inicial, con selector EN/ES y traducción completa del contenido
   estático y dinámico. Mantén el posicionamiento de consultoría global.
6. No añadas botones de pausa. Respeta las preferencias de movimiento reducido del sistema.
7. Usa exclusivamente el retrato definitivo aportado. No regeneres ni retoques el rostro,
   el color de piel, la ropa, las proporciones ni la identidad de la persona.
8. No inventes clientes, cifras, fechas, resultados, autorizaciones de logos o testimonios.
9. Prepara la integración GitHub→AWS según la infraestructura real del repositorio.
   No inventes dominio, región, cuenta, bucket, rol IAM o distribución CloudFront.
10. Valida escritorio/móvil y ambos idiomas. Explica cambios, pruebas y pendientes reales.

Empieza indicando brevemente qué has encontrado en el repositorio y continúa con el
trabajo que pueda resolverse con ese contexto. No hagas una reconstrucción genérica
ni cambies a un framework nuevo por defecto.
```

### Archivos que deben acompañar este documento

- **`andres-mejia-landing-en-es.html`**: exportación autónoma de aproximadamente 4,89 MiB; incorpora CSS, JavaScript, fuentes, favicon y retrato en base64. Se abre localmente sin instalar dependencias. Contiene el contenido exacto EN/ES.
- **Este Markdown**: instrucciones, tokens, contexto profesional, comportamiento y migración.
- Si ya está disponible el proyecto por archivos, ese código es preferible para trabajar; el HTML autónomo sigue siendo la referencia de comparación.

Este Markdown no contiene los píxeles de la fotografía. Para conservar la identidad exacta es necesario aportar el HTML o el PNG definitivo. No sustituir un recurso ausente por una cara generada.

Referencia online existente: <https://andres-mejia-arquitectura.andresmejia.chatgpt.site>. Mantiene acceso privado; no depender de que Claude Code pueda acceder a ella. La URL definitiva del despliegue AWS todavía no está especificada.

## 1. Objetivo, posicionamiento y decisiones aprobadas

### Identidad profesional

- **Nombre:** Andrés Mejía; conservar tildes en todas las vistas y metadatos.
- **Actividad:** arquitectura de software, consultoría independiente e ingeniería práctica.
- **Alcance:** global, colaboración remota con equipos distribuidos.
- **Trayectoria:** más de 20 años construyendo software; se presenta como `20+` y `End to end`.
- **Diferencial:** conectar negocio, arquitectura, implementación, integración, cloud y entrega; amplitud tecnológica respaldada por proyectos concretos.
- **Sectores:** banca, seguros, retail/comercio, aviación, sector público, IoT industrial, medios digitales y productos con IA.
- **Experiencia de producto:** Chief Software Architect en PFS Group; fundador y arquitecto backend/IA de FENORA.
- **Contacto confirmado:** <https://www.linkedin.com/in/andresmejiatcl/>.

### Requisitos que no deben revertirse

1. **No publicar la ciudad de residencia.** No añadir ubicación residencial en copy, pie, JSON-LD, metadatos o formularios. La presentación es global. Las ubicaciones de proyectos, cuando sean necesarias para explicar su contexto, no representan residencia del profesional.
2. **Bilingüe EN/ES.** EN es el idioma inicial cuando no hay preferencia guardada. El idioma elegido se conserva localmente.
3. **Sin botón de pausa de animaciones**, ni global ni en la fábrica. El botón `Replay / Reiniciar` sí existe. `prefers-reduced-motion` sigue respetándose sin control visible adicional.
4. **Retrato aprobado intacto:** camisa negra y americana negra. No volver a las versiones con saco gris, filtros de piel o rasgos alterados.
5. **El movimiento debe explicar ingeniería**, además de aportar acabado: fábrica, pipeline, eventos y capas RAG/MCP/harness.
6. **No convertir la página en un CV interminable:** presentar evidencia y permitir explorar detalles mediante filtros y desplegables.
7. **Nombres de organizaciones en texto, sin logotipos de clientes por ahora.** Distinguir cliente final, consultora, plataforma, producto propio y prueba de concepto.
8. **No publicar los CV completos ni datos personales extraídos de ellos** —teléfono, dirección, documentos— por defecto. El CTA actual usa LinkedIn.

## 2. Dirección visual

Landing profesional, arquitectónica, elegante y sobria. Sensación de precisión estructural, ingeniería, claridad y experiencia. Tipografía protagonista, espacios generosos, líneas finas, retícula y detalles técnicos contenidos.

La página alterna superficies claras de tono papel con secciones oscuras azul carbón. El hero es oscuro, con iluminación ambiental azul y ámbar detrás del retrato. El retrato recortado convive con el fondo; no se presenta en una tarjeta genérica con esquinas muy redondas.

- **Hero:** composición editorial con texto a la izquierda y retrato a la derecha en escritorio.
- **Luces:** azul acero y ámbar suave; los degradados se aplican al entorno, nunca sobre la piel.
- **Secciones oscuras:** fábrica y experiencia; su información debe resultar legible, no decorativa.
- **Secciones claras:** especialidades, tecnologías, método y presentación personal en tema claro.
- **Acentos:** ámbar cálido en hero/pipeline; óxido en superficies claras.
- **Geometría:** contenedores rectangulares, radios mínimos, bordes de 1 px, separación precisa. Evitar convertir todos los elementos en píldoras o tarjetas flotantes.
- **Marca personal:** wordmark tipográfico `am_`, nombre y subtítulo; favicon local existente. No introducir un logotipo Tekhos nuevo o no aprobado.
- **Relación con Tekhos:** la solicitud original busca coherencia cromática con Tekhos. Los valores que siguen son los realmente implementados en esta landing, no una afirmación de que exista un manual oficial de Tekhos con estos mismos tokens.

## 3. Tokens cromáticos y superficies

### Variables existentes, tema claro

Estos nombres ya existen en el código; no son una propuesta nueva.

```css
:root {
  --paper: #F6F5F2;
  --ink: #111418;
  --graphite: #2A2E33;
  --stone: #6E6B65;
  --sand: #D9D6CF;
  --oxide: #B5502B;
  --accent-dark: #E07A52;
  --line: rgba(110, 107, 101, .25);
  --surface: #EDECE7;
  --body: 'Manrope', Arial, sans-serif;
  --mono: 'IBM Plex Mono', 'Courier New', monospace;
}
```

### Sobrescrituras existentes, tema oscuro

```css
html[data-theme=dark] {
  --paper: #1B1E22;
  --ink: #F6F5F2;
  --graphite: #D9D6CF;
  --stone: #B7B3AB;
  --sand: #414346;
  --oxide: #E07A52;
  --line: rgba(217, 214, 207, .22);
  --surface: #2A2E33;
}
```

El tema oscuro no invierte la fotografía. El hero y la fábrica mantienen su carácter oscuro en ambos temas; el selector afecta principalmente a las superficies claras y sus textos. El tema inicial actual es claro, salvo preferencia guardada.

### Valores efectivos de hero, fábrica y proyectos

Actualmente varios de estos valores son literales CSS. Si se centralizan en tokens semánticos, conservar sus valores y comprobar la equivalencia visual.

| Uso | Valor actual |
| --- | --- |
| Fondo hero/cabecera | `#0D151E` |
| Fondo general de secciones oscuras | `#111820` |
| Fondo fábrica | `#0E1720` |
| Superficie del panel de fábrica | `#0A131CCC` |
| Ámbar principal hero/CTA/selección | `#E1B28C` |
| Ámbar hover CTA | `#F0C8A4` |
| Acento luminoso/estado | `#E4AB7E` |
| Acento de encabezados pipeline | `#D8B18D` |
| Texto principal sobre oscuro | `#F6F5F2` |
| Texto introductorio hero | `#BBC4CD` |
| Texto secundario hero | `#AEB9C4` |
| Texto secundario fábrica | `#AAB8C4` |
| Etiquetas técnicas de fábrica | `#91A6B5` |
| Bordes de fábrica | `#334351` / `#334553` |
| Tarjetas de experiencia | `#171D23` |
| Tarjeta de experiencia hover | `#1C242C` |
| Retícula de tarjetas/bordes | `#3B4248` |
| Texto de resumen de proyecto | `#B9C0C6` |
| Texto de tags de proyecto | `#A9BAC8` |
| Bordes sutiles sobre oscuro | `#FFFFFF12`, `#FFFFFF18`, `#FFFFFF22` |

### Degradados exactos del hero

```css
.hero::before {
  background:
    radial-gradient(ellipse at 92% 35%, #83502635, transparent 35%),
    radial-gradient(ellipse at 60% 40%, #17496B45, transparent 47%);
}
.hero::after {
  background-image:
    linear-gradient(#C4D4DF04 1px, transparent 1px),
    linear-gradient(90deg, #C4D4DF04 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: linear-gradient(90deg, transparent 35%, #000);
}
.portrait-glow {
  background:
    radial-gradient(ellipse at 7% 41%, #1B527AA3, transparent 52%),
    radial-gradient(ellipse at 96% 29%, #B37B3EAD, transparent 47%);
  filter: blur(25px);
}
```

Los colores hexadecimales de ocho dígitos incluyen alfa. No reemplazarlos por colores opacos. `isolation:isolate`, las capas del hero y la posición del glow son parte de la composición. Mantener `filter:none` en la imagen.

## 4. Tipografía y jerarquía

### Fuentes locales

| Familia | Archivos | Pesos | Función |
| --- | --- | --- | --- |
| Manrope | `manrope-400.ttf`, `manrope-500.ttf`, `manrope-600.ttf`, `manrope-700.ttf` | 400, 500, 600, 700 | Títulos, cuerpo, navegación, botones |
| IBM Plex Mono | `plex-mono.ttf` | 400 | Eyebrows, índices, tags técnicos, coordenadas y diagramas |

Las fuentes están incrustadas en el HTML autónomo. No dependen de Google Fonts en tiempo de ejecución. Conservar las licencias correspondientes a los archivos si se incorporan al repositorio; la exportación no aporta por sí sola un expediente de licencias. Una conversión a WOFF2 es una optimización posterior, manteniendo los originales y la equivalencia visual.

| Elemento | Configuración de referencia |
| --- | --- |
| Cuerpo base | 15 px; line-height 1.65; Manrope 400 |
| H1 hero EN escritorio | `clamp(48px, 5.45vw, 78px)`; line-height 1.075; tracking -0.055em; peso 500 |
| H1 hero ES escritorio | override `clamp(45px, 5.5vw, 78px)` |
| H1 hero móvil EN | override final de motion: `clamp(43px, 10.2vw, 72px)` |
| H1 hero móvil ES | `clamp(42px, 10.8vw, 65px)` |
| H2 general | `clamp(35px, 4vw, 56px)`; line-height 1.15; tracking -0.045em |
| H2 de fábrica | `clamp(38px, 4.4vw, 61px)`; 39 px en móvil |
| H3 tarjetas de proyecto | 25 px escritorio / 27 px móvil; line-height 1.3; tracking -0.035em |
| H3 panel tecnológico | `clamp(25px, 3vw, 40px)`; 29 px móvil; line-height 1.25 |
| Introducción hero | 15 px escritorio / 14 px móvil; line-height 1.85 |
| Resumen proyecto | 12 px escritorio / 13 px móvil; line-height 1.8 |
| Eyebrows/mono | Habitualmente 8–10 px; mayúsculas; tracking 0.07–0.12em |
| Tags | 9–11 px; bordes finos y fondo discreto |
| H2 contacto | `clamp(45px, 6.7vw, 90px)`; line-height 1.1; tracking -0.05em |

La implementación acumula sobrescrituras por archivo y media query. Estos tamaños describen la intención y las reglas principales; antes de consolidar CSS, medir los estilos computados a cada viewport. No sustituir Manrope por Inter ni usar una fuente mono para todo el contenido.

## 5. Composición, retícula y componentes

### Medidas de referencia

- `.section-wrap`: ancho máximo 1440 px; márgenes automáticos; padding horizontal 6%.
- Hero a ancho completo; padding horizontal `max(6%, calc((100vw - 1267px)/2))`.
- Secciones amplias: 110 px de padding vertical en escritorio, 70 px en móvil.
- Cabecera: 88 px de alto; 80 px en móvil.
- Hero escritorio: grid `1.12fr 1fr`, gap 4%; texto a la izquierda, retrato a la derecha.
- Hero móvil: flujo vertical, primero texto y después fotografía, sin ocultar el retrato.
- Retrato escritorio: altura mínima 595 px; 620 px en pantallas grandes; 565 px en la adaptación intermedia.
- Retrato móvil: ancho máximo 460 px, `aspect-ratio:1/1.09`.
- Experiencias: grid de tres columnas; dos en tramo intermedio; una en móvil. Gutter de 1 px, borde exterior fino.
- Tarjeta de experiencia: padding 28 px en escritorio, 26 px móvil; tags al pie.
- Tecnología: dos columnas, navegación de 260 px + panel flexible; panel con padding 42×48 px. En móvil, navegación de dos columnas sobre el panel.
- Método: cuatro bloques; en móvil, grid de dos columnas.
- Fábrica: SVG con viewBox `0 0 1120 500`; ancho mínimo 750 px, 760 px en móvil, dentro de un viewport con scroll horizontal local.
- Botón principal hero: altura mínima 53 px, ámbar y texto oscuro; desplazamiento de hover de unos 2 px.
- Bordes: normalmente 1 px. Radios: 0–3 px en la mayor parte de los componentes; 7 px en módulos del SVG.
- Sombra fábrica: `0 28px 90px #0000001A`.

### Breakpoints existentes

| Umbral | Propósito |
| --- | --- |
| ≥1600 px | Ajuste de márgenes, hero y altura de retrato |
| ≤1200 px | Experiencias a dos columnas y ajuste de navegación |
| ≤1100 px | Ajustes tipográficos, gaps e inspector de fábrica |
| ≤1000 px y >760 px | Navegación principal colapsada en menú |
| ≤760 px | Composición móvil, menú, tarjetas a una columna, tecnología apilada |
| ≤370 px | Ajustes adicionales del hero |

Revisar límites y cascada durante el refactor. No considerar que 375 px es la única anchura móvil soportada.

### Iconos y marca

Sprite SVG inline con símbolos locales:

`i-intent`, `i-cube`, `i-code`, `i-shield`, `i-cloud`, `i-data`, `i-plug`, `i-loop`, `i-branch`.

Son iconos lineales simples, con trazos de aproximadamente 1.3–1.6 px y tamaño visual habitual de 18–22 px. El hero no necesita iconos grandes de proveedores. Mantener el sprite o migrarlo de forma equivalente; no añadir una librería de iconos completa solo para estos nueve símbolos.

## 6. Retrato y recursos visuales

### Recurso definitivo

- Archivo: **`assets/andres-retrato-definitivo.png`**.
- Dimensiones reales: **1218 × 1292 px**.
- Formato: **PNG RGBA**, transparencia real, canal alfa de 0 a 255.
- Tamaño: **1.612.034 bytes**.
- SHA-256: `9075e09dbbd93f301c09ed46869a6284f9652b7fa3a272f2490443ef76e99907`.
- Alt EN: `Andrés Mejía, software architect, wearing a black shirt and blazer`.
- Alt ES: `Andrés Mejía, arquitecto de software, con camisa y americana negras`.
- Render: `object-fit:contain`, `object-position:center bottom`, `filter:none`.
- El fondo se construye con CSS; no está integrado en el PNG.
- El retrato tiene prioridad de carga en el hero (`fetchpriority="high"` y preload en la versión por archivos).

### Historia que explica por qué no debe retocarse

Se probaron muchas variantes. Varias fueron rechazadas por parecer de otra persona, envejecer el rostro, alterar el corte de pelo, mostrar canas no deseadas o introducir parches rojizos. El propietario eligió una versión concreta para detener esas alteraciones.

**No modificar** rasgos, ojos, mandíbula, tono de piel, cicatriz, edad aparente, musculatura, cuello, proporciones, cabello ni ropa como parte de un refactor frontend. No aplicar LUT, hue-rotate, saturación, filtro cálido o luz ambiental sobre el rostro. La americana debe seguir percibiéndose negra, no gris. No corregir asimetrías con generación de imagen.

### Recursos antiguos que no son la referencia

En el proyecto original también existen `andres-natural-v2.png`, `andres-negra.webp` y `andres-americana.webp`. Son variantes anteriores. No utilizarlas como hero, fallback o imagen social por conveniencia. No están incluidas como alternativas en el HTML autónomo actual.

El favicon aprobado es `assets/favicon.svg`, un recurso SVG local de 276 bytes. El fondo del hero, la retícula y toda la fábrica son CSS/SVG nativos, no imágenes rasterizadas ni vídeos.

## 7. Movimiento e interacción

### Principio

Movimiento contenido y significativo. Debe dar vida a una arquitectura profesional, conservando legibilidad y control mediante interacción directa. No añadir control visible de pausa.

### Animaciones actuales

| Componente | Comportamiento |
| --- | --- |
| Entrada del hero | 1.1 s; opacidad y translateY de 18 px; `cubic-bezier(.2,.7,.2,1)` |
| Entrada del retrato | 1.4 s, delay 0.12 s; misma familia de easing |
| Luz ambiental | 12 s; alternate infinito; desplazamiento -7 a +8 px y -9 px vertical; opacidad 0.78–1 |
| Indicador de estado | Pulso de 3.4 s |
| Reveal por scroll | 0.8 s; translateY 22 px; observador threshold 0.12 y margen inferior -24 px |
| Método | Escalonado de 0.07, 0.14 y 0.21 s |
| Conectores de fábrica | Stroke-dashoffset; 2.8 s lineales |
| Cinta transportadora | Stroke-dashoffset; 1.4 s lineales |
| Paquetes en la cinta | SVG animateMotion de 15 s, escalonados 3 s |
| Eventos entre módulos | SVG animateMotion de 3–5 s |
| LED de estación activa | Pulso de 1.8 s |
| Flechas CTA | Transición 0.25 s, desplazamiento 3 px |
| Apertura de servicio | 0.35 s; opacidad y translateY -5 px |
| Barra de lectura | Fija arriba, 2 px, `scaleX` calculado con requestAnimationFrame |

### Fábrica de software

Cinco estaciones en perspectiva isométrica ligera, conectadas por una cinta con paquetes en movimiento:

| Etapa | Mensaje | Artefactos |
| --- | --- | --- |
| Intent / Intención | Entender negocio, restricciones y sistema existente | Problema, contexto, interesados, aceptación |
| Design / Diseño | Explicitar límites, contratos y compromisos | ADRs, contratos API/evento, hoja de ruta |
| Build / Construcción | Ingeniería con contexto y control | Código versionado, contratos de herramientas, checkpoints |
| Verify / Verificación | Evidencia antes que confianza | Pruebas, contratos, evaluaciones, revisión |
| Ship / Entrega | Entregar y aprender de producción | Release, infraestructura, rollback, logs/métricas/trazas |

Sobre la línea principal aparecen:

- **RAG:** documentación, ADRs y código relevante; recuperación de contexto.
- **MCP:** herramientas y recursos conectados; contratos y límites explícitos.
- **Agent harness:** ejecución, estado, progreso y recuperación alrededor del agente.

Esta fábrica es una **visualización conceptual explicativa**, no un sistema conectado a repositorios o modelos reales. No añadir simulaciones de métricas o estados que parezcan telemetría real. Tampoco introducir claves API o un backend de IA para reproducir la animación.

### Estado y controles

- Avance automático de estación cada 3800 ms cuando la fábrica está visible, la pestaña activa y el sistema permite movimiento.
- Al seleccionar una etapa o RAG/MCP/Harness, se conserva la explicación durante unos 20 s; las partículas pueden seguir moviéndose.
- La selección manual centra horizontalmente la estación en el viewport de la fábrica.
- `Replay` reinicia etapa y tiempo del SVG; respeta la preferencia de movimiento reducido.
- Fuera de vista o con pestaña oculta, se suspenden animaciones de fábrica y temporizadores innecesarios.
- `prefers-reduced-motion: reduce`: sin entradas desplazadas ni movimiento continuo; contenido visible y controles de exploración operativos.
- No utilizar `aria-live` para anunciar continuamente cada cambio automático; la implementación anuncia selecciones manuales.
- Evitar listeners o timers duplicados al migrar a componentes con montaje/desmontaje.

### Otras interacciones

- Servicios con `<details>/<summary>`; solo uno abierto a la vez.
- Filtros de experiencias: All, Banking & insurance, Retail & commerce, Platforms & integration, Product & AI.
- Se muestran inicialmente 6 de 16 experiencias; `Show all 16 engagements` revela todas. Los filtros reinician la expansión y actualizan el contador.
- Cada proyecto tiene un desplegable `My contribution`, rol y tags.
- Tecnología: diez botones seleccionan un panel; usar `aria-pressed`, `aria-controls` y `hidden` de forma consistente.
- Tema claro/oscuro persistido; menú móvil que se cierra al navegar o con Escape; foco visible y skip link.

## 8. Arquitectura de información y copy principal

### Orden de secciones y anclas actuales

| Orden | Sección | ID actual |
| --- | --- | --- |
| 01 | Hero / propuesta de valor | `inicio` |
| — | Organizaciones y contextos seleccionados | Sin ancla propia |
| 02 | Especialidades | `enfoque` |
| 03 | Fábrica / pipeline | `factory` |
| 04 | Experiencias / proyectos | `experiencia` |
| 05 | Mapa tecnológico | `technologies` |
| 06 | Método | Sin ID de sección; heading `metodo-title` |
| 07 | Sobre Andrés | `sobre-mi` |
| 08 | Contacto | `contacto` |
| — | Footer | Enlaces al inicio |

La mezcla de IDs en inglés/español es heredada y no aparece como copy. No renombrarlos sin actualizar todos los enlaces y pruebas.

### Hero aprobado

**EN**

```text
Independent software architect                          Working globally

Clarity before complexity

Architecture
with intent.
Software
built to last.

I'm Andrés Mejía. I connect business intent with hands-on engineering —
across banking, insurance, retail, aviation and AI products.

Let's discuss your next challenge ↗
Explore the pipeline ↓

20+                                  End to end
Years building software              From decisions to production
```

**ES**

```text
Arquitecto de software independiente                    Consultoría global

Claridad antes que complejidad

Arquitectura
con propósito.
Software
que perdura.

Soy Andrés Mejía. Conecto la intención del negocio con la ingeniería práctica:
banca, seguros, retail, aviación y productos de IA.

Hablemos del próximo reto ↗
Explorar el pipeline ↓

20+                                  De principio a fin
Años construyendo software            De las decisiones a producción
```

### Resto del relato

- Especialidades: arquitectura y evolución; sistemas distribuidos e integración; backend/cloud; ingeniería asistida por IA.
- Experiencia: `Different industries. Real engineering depth.` / `Distintos sectores. Profundidad técnica real.`
- Tecnologías: `Breadth to connect. Depth to deliver.` / `Amplitud para conectar. Profundidad para construir.`
- Método: entender contexto, explicitar decisiones, implementar, compartir conocimiento.
- Sobre Andrés: arquitecto, ingeniero y creador; combinar consultoría y visión de producto. Posicionamiento global explícito.
- Contacto: `Every great system starts with a better question.` / `Todo gran sistema empieza con una pregunta mejor.`
- Footer: `Independent consulting · Global collaboration` / `Consultoría independiente · Colaboración global`.

No añadir cifras comerciales, años por cliente ni métricas de rendimiento sin nueva validación del propietario.

## 9. Organizaciones, proyectos y límites de atribución

La selección se enriqueció a partir de los CV aportados y la sesión de CV/candidaturas del proyecto AND. Hay versiones orientadas a ofertas con fechas y stacks diferentes. Por eso la landing usa funciones y contribuciones estables, y evita una cronología detallada o asignar tecnologías contradictorias a un cliente.

- No transformar una intervención realizada mediante una consultora en una relación comercial directa.
- No usar `Trusted by`, testimonios, recomendaciones ni sellos de aprobación para resumir estos nombres.
- Mercadona y Mercedes-Benz aparecen como intervenciones documentadas dentro del porfolio PFS. **Mercedes-Benz es una prueba de concepto**, no una plataforma de producción acreditada.
- INE Chile se presenta dentro de la entrega de Indra / Minsait.
- PFS es liderazgo de arquitectura y productos; FENORA es producto propio.
- Los nombres de organismos/empresas identifican experiencia, no un aval o una colaboración actual.
- Los logotipos no están incluidos. Si el propietario aporta autorización o directrices aplicables, evaluar su incorporación sin alterar el sentido de las relaciones. Esta es una decisión editorial; no asumir que la nota de no respaldo otorga permisos de marca.

A continuación se conserva el contenido profesional de las **16 experiencias**, en inglés como referencia de datos. La traducción completa ya está en el HTML.

### 01. Nestlé · Nespresso Professional

- **Filtro:** `commerce`; contexto `Commerce`.
- **Rol:** Backend engineering & integration.
- **Título:** B2B commerce, connected to the enterprise.
- **Ámbito:** Rubicon platform services for orders, catalogues and customer accounts, connected to ERP, logistics and payment systems.
- **Contribución:** Contributed backend services and contract-first integrations within an international delivery team.
- **Tags:** Java / Spring Boot, Python, Kafka, AWS, OpenAPI.

### 02. Umivale

- **Filtro:** `finance`; contexto `Insurance`.
- **Rol:** Lead architecture & modernisation.
- **Título:** Evolve the core. Keep data flowing.
- **Ámbito:** Modernisation of a legacy insurance contract platform, with change data capture between Oracle and MongoDB.
- **Contribución:** Designed Debezium → Kafka pipelines and stateful stream processing for enrichment, validation and routing. Defined domain boundaries and engineering practices.
- **Tags:** CDC, Debezium, Kafka Streams, Oracle, MongoDB.

### 03. SCRM · Schwarz Group

- **Filtro:** `commerce`; contexto `Retail`.
- **Rol:** Senior .NET architecture & engineering.
- **Título:** An event ingestion platform for retail.
- **Ámbito:** Backend event ingestion connecting APIs, Kubernetes workloads, Azure Event Hubs and Confluent Kafka in the Schwarz / Lidl context.
- **Contribución:** Designed the service structure, implemented APIs and integrations, and worked on load testing, infrastructure automation and GitOps delivery.
- **Tags:** .NET / C#, Azure Event Hubs, Confluent Kafka, Terraform, Argo CD.

### 04. Indra / Minsait · Beabloo

- **Filtro:** `platforms`; contexto `Cloud platforms`.
- **Rol:** Cloud migration architecture.
- **Título:** A retail platform, re-platformed on Azure.
- **Ámbito:** Azure platform migration and modernisation for Beabloo, later Onesait Retail, spanning applications, data infrastructure and delivery.
- **Contribución:** Planned the migration roadmap and technical proofs of concept. Worked across AKS, HDInsight, data services, automation and deployment pipelines.
- **Tags:** Azure AKS, HDInsight, Databricks, Data Lake, Terraform.

### 05. Santa Lucía

- **Filtro:** `finance`; contexto `Insurance`.
- **Rol:** Software architecture & technical leadership.
- **Título:** Turn business requirements into durable services.
- **Ámbito:** Architecture and evolution of corporate insurance applications, working with product owners and engineering teams.
- **Contribución:** Defined solution designs, domain boundaries and integration contracts. Supported implementation, code reviews and shared technical standards.
- **Tags:** DDD, Hexagonal architecture, REST / SOAP, Apache Camel, OpenShift.

### 06. Santander

- **Filtro:** `finance`; contexto `Banking`.
- **Rol:** Backend architecture & integration.
- **Título:** Secure APIs for a complex banking landscape.
- **Ámbito:** Banking backend services and integrations, balancing domain design, access control and technical governance.
- **Contribución:** Worked on service boundaries, secure API practices, cloud integration and guidelines that connect architectural decisions with delivery.
- **Tags:** Secure APIs, OAuth 2.0 / JWT, DDD, Cloud integration.

### 07. Iberia Airlines

- **Filtro:** `platforms`; contexto `Travel`.
- **Rol:** Senior engineering & microservices architecture.
- **Título:** Model the full journey of an airline order.
- **Ámbito:** Digital airline services covering agency commissions, flight availability, orders, payments, cancellations and refunds.
- **Contribución:** Worked on domain boundaries, event processing, idempotency and automated verification across business workflows.
- **Tags:** DDD, Event-driven integration, API contracts, Automated testing.

### 08. Reale Seguros

- **Filtro:** `finance`; contexto `Insurance`.
- **Rol:** Software architecture & delivery.
- **Título:** Insurance workflows, from core to portal.
- **Ámbito:** Policy, claims and customer-facing applications connecting insurance business processes with backend services.
- **Contribución:** Contributed API architecture, security, client portal integration and infrastructure automation, including Terraform and Bicep.
- **Tags:** Insurance APIs, Client portals, Terraform, Bicep.

### 09. Indra / Minsait → INE Chile

- **Filtro:** `platforms`; contexto `Public sector`.
- **Rol:** Technical leadership · Onesait Census.
- **Título:** A census platform built around secure data flows.
- **Ámbito:** Multi-tenant demographic platform for INE Chile, delivered within Indra / Minsait.
- **Contribución:** Led backend and frontend delivery, with secure APIs, role-based access, asynchronous submission processing and container deployment.
- **Tags:** Java / Spring Boot, Vue, Keycloak, Kafka, OpenShift.

### 10. Indra / Minsait · Onesait Efficiency

- **Filtro:** `platforms`; contexto `Industrial IoT`.
- **Rol:** Software architecture & technical leadership.
- **Título:** From device telemetry to operational insight.
- **Ámbito:** Multi-tenant energy management platform serving industrial contexts in Spain and Mexico.
- **Contribución:** Designed telemetry ingestion and transformation flows, connecting MQTT, event streaming and data pipelines to operational dashboards.
- **Tags:** MQTT, Kafka, Apache NiFi, Node-RED, StreamSets.

### 11. Indra / Minsait · Onesait Retail

- **Filtro:** `commerce`; contexto `Retail SaaS`.
- **Rol:** Software architecture & full-stack engineering.
- **Título:** Modernise the platform and the experience.
- **Ámbito:** Evolution of a retail analytics and digital signage SaaS, spanning identity, player devices, frontend and business intelligence.
- **Contribución:** Worked on LDAP-to-Keycloak integration, Vue 3 experiences for WebOS, Pentaho migration, Ubuntu player automation and GitOps deployment.
- **Tags:** Vue 3, Keycloak, Pentaho, Ubuntu, Argo CD.

### 12. PFS Group

- **Filtro:** `product`; contexto `Product & automation`.
- **Rol:** Chief Software Architect.
- **Título:** Build the foundations for several products.
- **Ámbito:** Architecture leadership for Reexdoc intelligent document processing, RobotikEA human–bot workflows and UiPath automation initiatives.
- **Contribución:** Defined architecture methods, reusable components and engineering practices. Designed event-driven SaaS products, cloud infrastructure and microfrontend solutions.
- **Tags:** AWS serverless, Node.js, Python / ML, Microfrontends, UiPath.

### 13. FENORA

- **Filtro:** `product`; contexto `Own product · Fintech & AI`.
- **Rol:** Founder & AI backend architect.
- **Título:** A product perspective on AI engineering.
- **Ámbito:** Personal finance SaaS combining Open Banking PSD2 integration with Sofía, an AI assistant grounded in financial context.
- **Contribución:** Built backend and AI architecture: retrieval pipelines, vector search, multi-provider LLM integration and MCP tool use, with AWS deployment and observability.
- **Tags:** Python / FastAPI, RAG, MCP, LangChain / LlamaIndex, AWS.

### 14. Mercadona · PFS engagement

- **Filtro:** `commerce`; contexto `Retail architecture`.
- **Rol:** Application architecture engagement.
- **Título:** Define boundaries around retail domains.
- **Ámbito:** Cloud-native retail architecture work documented within the PFS project portfolio.
- **Contribución:** Worked on domain boundaries, data ownership, point-of-sale ingestion and inventory / pricing patterns, with container delivery on AKS.
- **Tags:** DDD / C4, Hexagonal architecture, CQRS, Azure AKS.

### 15. Mercedes-Benz · PFS engagement

- **Filtro:** `platforms`; contexto `Proof of concept`.
- **Rol:** Event-driven architecture prototype.
- **Título:** Explore resilience before committing to a design.
- **Ámbito:** An order-processing proof of concept within the PFS project portfolio.
- **Contribución:** Prototyped reactive event flows, defined API and event contracts, and exercised retry, circuit breaker and back-pressure patterns.
- **Tags:** PoC, Kafka, Spring Cloud Stream, Quarkus, Pact.

### 16. Swiss Smart Media

- **Filtro:** `platforms`; contexto `Digital media`.
- **Rol:** Full-stack engineering & architecture.
- **Título:** Connect enterprise systems to web experiences.
- **Ámbito:** Digital media and enterprise web platforms delivered across concurrent projects and distributed teams.
- **Contribución:** Built APIs and frontend experiences, modelled application data and integrated enterprise backends, including SAP Fiori / SAPUI5 and OData workflows.
- **Tags:** Node.js, PHP / Laravel, React / Angular, SAP Fiori / HANA, AWS.

### Otros contextos de consultoría

Bancolombia, Capgemini, Cegedim y Seccuri. No inventar un caso detallado para estas organizaciones cuando los materiales aportados no lo describen. La sección adicional actual los presenta junto a equipos de consultoría y producto a nivel internacional.

## 10. Mapa tecnológico completo

Son tecnologías y patrones utilizados en distintos momentos y proyectos; no equivalen a una certificación, un nivel uniforme de dominio o uso reciente de cada herramienta. Mantener esa distinción. La narrativa principal es negocio/arquitectura; el detalle técnico se explora en estos diez grupos.

### Architecture

- **ID de datos:** `architecture`; símbolo `i-cube`.
- **Encabezado:** Structure that serves the domain.
- **Aplicación:** Domain modelling, service boundaries, explicit contracts and patterns chosen for the constraints of each system.
- **Evidencia contextual:** Seen in insurance modernisation, retail architecture and airline workflows.
- **Catálogo:** DDD, Hexagonal architecture, Clean architecture, Microservices, Modular monoliths, Vertical Slice, CQRS, Saga, Outbox, Event Sourcing, C4 / UML, OpenAPI / AsyncAPI.

### Backend

- **ID de datos:** `backend`; símbolo `i-code`.
- **Encabezado:** From service design to working code.
- **Aplicación:** A broad backend background across JVM, .NET, Python and JavaScript ecosystems, including enterprise and product platforms.
- **Evidencia contextual:** Examples: Nespresso, SCRM, PFS products and FENORA.
- **Catálogo:** Java, Spring Boot / Cloud, Spring Batch, Quarkus, C# / ASP.NET, Python, FastAPI / Flask / Django, Node.js, NestJS / Express, PHP / Laravel.

### Cloud

- **ID de datos:** `cloud`; símbolo `i-cloud`.
- **Encabezado:** Applications, infrastructure and data services.
- **Aplicación:** Hands-on AWS and Azure architecture, from serverless backends to container platforms and enterprise cloud migrations.
- **Evidencia contextual:** Examples: Beabloo / Minsait Azure migration and AWS-based product platforms.
- **Catálogo:** AWS Lambda, ECS / EKS, API Gateway, SQS / SNS, EventBridge, Step Functions, S3 / RDS / Aurora, Azure AKS, Azure Functions, API Management, Application Gateway, Front Door, Event Hubs / Event Grid, HDInsight / Databricks, Data Lake / Data Factory.

### Streaming & integration

- **ID de datos:** `events`; símbolo `i-branch`.
- **Encabezado:** Connect systems through data and events.
- **Aplicación:** Change data capture, stateful stream processing, IoT ingestion and API integration across existing enterprise systems.
- **Evidencia contextual:** Examples: Umivale CDC, SCRM event ingestion and Onesait Efficiency telemetry.
- **Catálogo:** Kafka, Kafka Streams / Connect, Debezium, Confluent, Schema Registry / Avro, Strimzi, RabbitMQ / ActiveMQ, MQTT / AMQP, Apache Camel, Apache NiFi, Node-RED, StreamSets, REST / SOAP, GraphQL / gRPC.

### Data

- **ID de datos:** `data`; símbolo `i-data`.
- **Encabezado:** Transactional, analytical and search workloads.
- **Aplicación:** Relational and NoSQL models, data migration, ETL and analytics, with storage matched to access patterns.
- **Evidencia contextual:** Examples: Oracle-to-MongoDB integration, retail analytics and product data platforms.
- **Catálogo:** PostgreSQL, Oracle, SQL Server, MySQL, MongoDB, DynamoDB / DocumentDB, Redis, Cosmos DB, Neo4j, Cassandra, Hadoop / Hive, Spark / PySpark, Pentaho, Airflow, IBM DataStage, SAP HANA / OData.

### Delivery & operations

- **ID de datos:** `delivery`; símbolo `i-cloud`.
- **Encabezado:** Make the route to production repeatable.
- **Aplicación:** Infrastructure as code, containers, CI/CD, GitOps and operational visibility across cloud and hybrid environments.
- **Evidencia contextual:** Examples: Azure migrations, insurance delivery and SaaS product infrastructure.
- **Catálogo:** Docker, Kubernetes, OpenShift, Helm / Kustomize, Terraform, Bicep, CloudFormation, AWS CDK / SAM, Jenkins, GitHub Actions, Azure DevOps, GitLab CI, Argo CD, Tekton.

### Frontend

- **ID de datos:** `frontend`; símbolo `i-code`.
- **Encabezado:** Complete experiences, beyond the backend.
- **Aplicación:** Web platforms, enterprise workflows and digital signage, with component-based interfaces and backend integration.
- **Evidencia contextual:** Examples: Onesait Retail, Onesait Census, PFS products and Swiss Smart Media.
- **Catálogo:** TypeScript / JavaScript, Vue / Nuxt, React / Next.js, Angular, Microfrontends, Web Components, PWA / Service Workers, SAP Fiori / SAPUI5, WebOS.

### Security

- **ID de datos:** `security`; símbolo `i-shield`.
- **Encabezado:** Identity and access are architectural concerns.
- **Aplicación:** Authentication, authorisation, identity migration and API protection integrated with application and platform design.
- **Evidencia contextual:** Examples: Onesait Retail identity modernisation, census access control and secure banking APIs.
- **Catálogo:** OAuth 2.0, OpenID Connect, JWT, Keycloak, Microsoft Entra ID, AWS Cognito, RBAC, Azure Key Vault, Managed identities, API gateway policies.

### Quality & observability

- **ID de datos:** `quality`; símbolo `i-shield`.
- **Encabezado:** Make behaviour visible and testable.
- **Aplicación:** Unit, integration, contract, end-to-end and load testing, supported by logs, metrics and distributed traces.
- **Evidencia contextual:** Examples: airline business workflows, SCRM ingestion services and cloud platforms.
- **Catálogo:** JUnit / Mockito, Pytest, Testcontainers, Pact, Cucumber / BDD, Karate, K6, Gatling / JMeter, Cypress / Playwright, OpenTelemetry, Prometheus, Grafana, Loki / Mimir, ELK.

### AI & automation

- **ID de datos:** `ai`; símbolo `i-loop`.
- **Encabezado:** Useful intelligence, connected to real systems.
- **Aplicación:** Retrieval, models and tools embedded in product workflows, alongside document intelligence and process automation.
- **Evidencia contextual:** Examples: FENORA / Sofía, Reexdoc intelligent document processing and RobotikEA.
- **Catálogo:** RAG, MCP, Agent workflows / harnesses, OpenAI / Anthropic, LangChain, LlamaIndex, Chroma / Pinecone, Embeddings / vector search, TensorFlow / PyTorch, scikit-learn, AWS Comprehend / Textract, UiPath.

## 11. Idiomas, estado y accesibilidad

### Implementación actual

- Selector compacto `EN / ES`, integrado en la cabecera, con dos botones y `aria-pressed`.
- `<html lang="en">` como base; cambia a `es` al seleccionar español.
- Preferencia `localStorage['andres-language']`; tema `localStorage['andres-theme']`.
- Preferencia guardada gana al idioma inicial. Sin preferencia, se inicia en EN; no se cambia automáticamente a ES por la localización del navegador.
- `translations.js` define `window.SITE_TRANSLATIONS`: diccionario de 343 entradas.
- `language.js` traduce nodos de texto y atributos accesibles, conservando el original en `WeakMap` y detectando texto dinámico mediante `MutationObserver`.
- También actualiza título, description, textos Open Graph y `og:locale` (`en_GB` / `es_ES`).
- Los contadores dinámicos de proyectos tienen reglas para `Showing X of Y engagements`, `X selected engagements` y `Show all X engagements`.
- La selección de idioma no reinicia proyecto, panel, etapa de fábrica o tema.
- El HTML contiene todos los proyectos y paneles antes de la mejora progresiva con JS.

### Refactor posible, todavía no realizado

Si se modulariza, preferir claves estables de traducción y datasets estructurados (`projects`, `technologyCategories`, `pipelineStages`, `translations`) en lugar de depender de comparar cadenas inglesas de un DOM arbitrario. No perder cobertura al hacer ese cambio.

Traducir **todos** estos elementos: navegación, hero, secciones, datos de proyecto, contribuciones, filtros, contadores, botones de expansión, paneles tecnológicos, SVG textual, inspector de etapas, explicaciones RAG/MCP/harness, menú móvil, textos de tema, atributos `alt`, `title`, `aria-label`, mensajes de estado y metadatos.

Mantener nombres propios, APIs y productos técnicos sin traducciones artificiales. `Cloud`, `backend`, `frontend`, nombres de patrones y acrónimos pueden conservarse cuando sean naturales para este público.

### Accesibilidad y comportamiento

- Navegación semántica, jerarquía de encabezados y un solo H1.
- Skip link, foco visible, botones reales, `details/summary` para contribuciones.
- Iconos decorativos con `aria-hidden`; regiones interactivas con nombre accesible.
- `aria-pressed` coherente en filtros, etapas e idioma; paneles inactivos con `hidden`.
- Menú móvil con `aria-expanded`, cierre al navegar y Escape; no dejar foco atrapado.
- Usar texto real para clientes, no texto dentro de imágenes.
- Sin scroll horizontal de página; permitirlo solo en el visor local de fábrica.
- Respetar movimiento reducido aunque no exista botón de pausa.
- Si se cambian tamaños o colores, medir contraste y legibilidad; no se ha certificado formalmente cumplimiento WCAG de la versión actual.

## 12. Código actual y recuperación desde el HTML

### Base implementada

HTML, CSS, JavaScript y SVG nativos. No hay React, Next, Astro, Tailwind, dependencia de animación ni proceso de build. No se necesita backend para el contenido actual.

| Archivo | Responsabilidad |
| --- | --- |
| `dist/index.html` | Estructura semántica, contenido EN, proyectos, paneles tecnológicos y SVG |
| `dist/style.css` | Base, variables, tipografía, secciones, responsive y tema |
| `dist/hero.css` | Hero/retrato, iluminación azul-ámbar y tratamiento de secciones oscuras |
| `dist/motion.css` | Fábrica, inspector, partículas, animaciones, reveals y progreso |
| `dist/experience.css` | Galería de proyectos y explorador tecnológico |
| `dist/language.css` | Selector EN/ES y ajustes de composición para ES y tamaños intermedios |
| `dist/translations.js` | Diccionario EN→ES |
| `dist/language.js` | Motor de cambio de idioma y traducción de contenido dinámico |
| `dist/app.js` | Tema, menú, servicios, fábrica y animación |
| `dist/experience.js` | Filtros, expansión de experiencias y paneles de tecnología |
| `dist/assets/` | Retrato, fuentes y favicon |

Orden de estilos: `style.css → hero.css → motion.css → experience.css → language.css`.

Orden de scripts: `translations.js → language.js → app.js → experience.js`.

El HTML autónomo une estos mismos archivos, incrusta sus recursos y ejecuta los scripts al final del body. Los nombres de las clases son una referencia útil, no una obligación de conservar una arquitectura de CSS fragmentada para siempre.

### Decisiones de implementación para el repositorio destino

1. Inspeccionar el framework y pipeline que ya existen; no se conocen desde este documento.
2. Si el repositorio está vacío y solo se requiere la landing, una implementación estática es suficiente. Un generador estático puede justificarse por componentes, contenido y i18n, sin añadir servidor por defecto.
3. Si ya hay framework, adaptar componentes manteniendo DOM semántico, comportamiento y referencia visual.
4. Separar datos de presentación e identificar los proyectos con IDs estables, no índices visibles.
5. Consolidar tokens literales solo después de comparar la cascada efectiva.
6. No trasladar a AWS la configuración específica del alojamiento anterior (`.openai/hosting.json`, identidad de proyecto, autenticación o URLs internas). Son detalles del proveedor anterior, no parte del producto.
7. No incluir secretos, archivos de credenciales, checkout Git, CV originales o recursos de pruebas en la salida web.

## 13. GitHub y AWS: contrato de despliegue

**Estado conocido:** el propietario tiene un repositorio GitHub y quiere desplegar en AWS. No se han facilitado URL del repositorio, dominio final, región, cuenta, bucket, distribución, rol ni infraestructura actual. No presentar ninguno como ya configurado.

### Primera inspección

Revisar `.github/workflows/`, Terraform/CDK/CloudFormation si existen, configuración de Amplify u otro alojamiento, scripts de build, directorio publicable, nombres de entornos y política de caché. Reutilizar la solución existente cuando cumpla el objetivo.

### Opción de referencia si no existe una solución

**Propuesta, no infraestructura ya implementada:** salida estática en S3 privado, CloudFront con Origin Access Control, HTTPS, DNS del dominio y GitHub Actions autenticado mediante OIDC.

- S3 permanece privado; OAC se configura contra el **origen REST del bucket**, no el endpoint S3 website.
- La bucket policy permite lectura a CloudFront restringida a la distribución correspondiente. Configurar firma OAC según la documentación oficial.
- HTTPS para visitantes; certificado ACM para el dominio de CloudFront en **`us-east-1`**, aunque el bucket esté en otra región. No interpretar esto como obligación de ubicar todo en esa región.
- El output actual puede servirse sin cómputo, SSR, contenedores, base de datos ni API de IA.
- Si el repositorio ya usa Amplify u otra ruta AWS adecuada, no migrarlo innecesariamente a esta propuesta.

### GitHub Actions

Preparar fases de validación, build si existe, publicación de artefactos y comprobación posterior. Usar OIDC y un rol acotado al repositorio/entorno; evitar credenciales AWS permanentes.

```yaml
permissions:
  contents: read
  id-token: write
```

Estos permisos permiten obtener el token y leer el checkout; no conceden por sí solos permisos sobre los recursos AWS. Configurar permisos IAM y condiciones de confianza de forma explícita. Validar `aud` y el **formato real de `sub` del repositorio**: puede incluir IDs inmutables. No copiar un patrón de subject antiguo como si fuera universal. Elegir versiones o SHAs de actions tras revisar el repositorio y su documentación vigente; este contexto no fija versiones de dependencias.

Variables que deben resolverse desde configuración real: región, ARN del rol, bucket/output prefix, ID de distribución, dominio y directorio de artefactos. No incrustar tokens en frontend, logs o este documento.

### Caché, release y metadatos

- HTML y metadatos con caché corta o revalidación; recursos con hash y caché larga cuando el build gestione fingerprinting.
- Subir recursos antes de publicar el HTML que los referencia. Mantener recursos de la versión anterior el tiempo necesario para no romper clientes con HTML cacheado.
- No aplicar `aws s3 sync --delete` a un bucket compartido o a un prefijo sin delimitar. Ajustar la estrategia al layout real.
- Invalidar las rutas necesarias cuando el esquema de nombres/caché lo requiera; verificar el estado publicado.
- Conservar una ruta de rollback con artefactos versionados o el mecanismo que ya use la infraestructura.
- Sustituir `canonical` y `og:image` del alojamiento anterior por URLs del dominio final, una vez conocido. Generar imagen social adecuada sin deformar el retrato.
- Si se mantienen locales mediante JS en una sola URL, no declarar páginas `/en/` o `/es/` inexistentes con hreflang. Si se implementan rutas estáticas bilingües, generar las páginas y sus enlaces reales.
- No ocultar todos los errores 403/404 sirviendo `index.html` si no existe una necesidad de routing SPA: los recursos ausentes deben poder detectarse.
- Evaluar CSP y cabeceras sobre la salida realmente elegida. Una CSP estricta exige externalizar scripts/estilos o calcular hashes; el HTML autónomo inline no es compatible con una política `script-src 'self'` sin adaptación.

### Documentación oficial consultada para el traspaso

- [AWS: acceso privado a S3 mediante CloudFront OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
- [AWS: requisitos TLS/ACM para CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html)
- [GitHub: OIDC con AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- [GitHub: claims y permisos OIDC](https://docs.github.com/en/actions/reference/security/oidc)

Comprobarlas de nuevo al implementar si han cambiado la plataforma, el workflow o las políticas del repositorio. Las decisiones de caché y estructura de release anteriores son criterios de implementación propuestos, no configuración existente.

## 14. Validación y criterios de aceptación

### Cobertura funcional mínima

- [ ] Inicio EN sin preferencia previa; ES si existe preferencia guardada.
- [ ] Alternar EN→ES→EN sin perder estado de tema, filtro, proyecto o tecnología.
- [ ] Traducir contenido dinámico del pipeline y contadores después del cambio de idioma.
- [ ] Tema claro/oscuro, persistencia y atributos accesibles coherentes.
- [ ] Menú móvil usable con teclado/táctil; Escape y cierre al seleccionar enlace.
- [ ] Cuatro especialidades; un servicio abierto a la vez.
- [ ] 16 experiencias; las seis iniciales; expansión y reducción; filtros correctos y contadores exactos.
- [ ] Desplegables de contribución completos y tags intactos.
- [ ] Diez áreas tecnológicas y un panel seleccionado; todos los datos disponibles.
- [ ] Cinco estaciones del pipeline, inspección manual, RAG/MCP/harness y Replay.
- [ ] Animación automática sin botones de pausa; movimiento reducido operativo.
- [ ] Suspensión al ocultar pestaña o salir del área de fábrica; sin duplicación de timers.
- [ ] Retrato completo, nítido, con alfa, ropa negra y sin tintes añadidos.
- [ ] CTA LinkedIn correcto; enlaces externos con `noopener noreferrer` cuando proceda.

### Comprobaciones visuales y técnicas

Probar como mínimo 360, 390, 768, 1024 y 1440 px, ambos idiomas y los dos temas. Revisar 320 px si se pretende soportarlo. No aceptar desbordamiento de página por títulos ES, nombres de clientes, menú o tags. El scroll horizontal de la fábrica debe quedar dentro de su región.

Comprobar: errores de consola, archivos 404, fuentes cargadas, transparencias, saltos de layout, anclas, unicidad de IDs, foco visible, contraste de textos pequeños y funcionamiento con JS retrasado o ausente. No describir una captura a 375 px como prueba exhaustiva de todos los dispositivos.

En el traspaso ya se comprobaron: sintaxis JS; selector EN/ES; retorno al inglés; texto dinámico de proyectos y pipeline; ausencia de botones de pausa; navegación/filtros móviles a un viewport efectivo de 375 px; retrato y recursos integrados del HTML; ausencia de desbordamiento en esas vistas. **No se han medido formalmente Lighthouse/Core Web Vitals ni se ha certificado accesibilidad o compatibilidad completa entre navegadores.**

Objetivos posteriores de rendimiento, a medir y no presentar como resultados alcanzados: evitar CLS apreciable, cargar el hero con prioridad, limitar el coste de scripts/animación, reducir peso de fuentes e imagen sin cambiar su aspecto, y medir Core Web Vitals en el entorno publicado.

## 15. Refinamientos posibles, todavía no aprobados como cambio visual

Estas son oportunidades de ingeniería o diseño, no razones para rehacer la landing:

1. Tokens semánticos y CSS organizado, eliminando reglas de versiones antiguas después de demostrar equivalencia.
2. Datasets tipados y traducciones por claves; sustituir observación genérica de DOM si el stack permite una solución más mantenible.
3. Versiones WOFF2 y recursos de imagen optimizados con transparencia, manteniendo el PNG maestro y comparaciones visuales.
4. Pruebas de interacción en ambos idiomas y de preferencias de movimiento.
5. Revisión de tipografía pequeña, contraste, foco y fluidez en tablet/móvil.
6. Fábrica más expresiva mediante rutas/estados/interacción, manteniendo su carácter conceptual y su coste razonable.
7. SEO por idioma mediante páginas estáticas si lo justifica el stack y la estrategia de contenidos.
8. Casos de estudio más profundos cuando el propietario confirme hechos, permisos y resultados publicables.
9. Logos de clientes únicamente después de resolver los permisos y la atribución.

No añadir formularios sin destino real, contadores ficticios, testimonios inventados, métricas de producción falsas, calendarios no conectados ni enlaces `#` que aparenten una acción terminada.

## 16. Manifiesto de recursos aprobados

Los hashes identifican los archivos originales, no una conversión posterior. El extractor del apéndice recupera estos recursos del HTML.

| Archivo | SHA-256 |
| --- | --- |
| `andres-retrato-definitivo.png` | `9075e09dbbd93f301c09ed46869a6284f9652b7fa3a272f2490443ef76e99907` |
| `favicon.svg` | `83993f2e5008bf229949fc427626c788a37e44c1eec26470fa6d066b8862d312` |
| `manrope-400.ttf` | `a13d9b41b0a471ce58f0e46d377fa3cc76615e4632c3b15eb397caadf7a13f0a` |
| `manrope-500.ttf` | `f433e5d333be1128d8ec8a28b8aadd0314d10e14e4105406076666bc830fc15d` |
| `manrope-600.ttf` | `6bad1a774228464cc88b8b0271555b266f7a3c64a7bedf15e165fdab4f6ac0ce` |
| `manrope-700.ttf` | `b9584e099e0e7f1e1e914c3037aabb9010c50346a3ce8df5eeeeecc0563044d8` |
| `plex-mono.ttf` | `a7fdc993f9f0387caedba4e42521136fa97e4c0837ae6239bf0413ccf8af00c2` |

## 17. Apéndice: extraer una base editable desde el HTML autónomo

Solo es necesario si no se dispone del proyecto por archivos. Guardar el siguiente script como `extract_landing.py` y ejecutarlo con Python 3. Usa únicamente la biblioteca estándar. La carpeta de salida debe estar vacía para no sobrescribir un proyecto existente.

```bash
python3 extract_landing.py andres-mejia-landing-en-es.html recovered-landing
```

Recupera las cinco hojas de estilos, los cuatro scripts, las fuentes, el PNG y el favicon. No incorpora configuración del proveedor anterior. Después adaptar esta salida al repositorio y a su carpeta de artefactos; no reemplazar el repositorio entero por la carpeta recuperada.

```python
#!/usr/bin/env python3
"""Recover the approved landing from its self-contained HTML export."""
import argparse
import base64
import hashlib
import re
from pathlib import Path

KNOWN_ASSETS = {
    '9075e09dbbd93f301c09ed46869a6284f9652b7fa3a272f2490443ef76e99907': 'andres-retrato-definitivo.png',
    '83993f2e5008bf229949fc427626c788a37e44c1eec26470fa6d066b8862d312': 'favicon.svg',
    'a13d9b41b0a471ce58f0e46d377fa3cc76615e4632c3b15eb397caadf7a13f0a': 'manrope-400.ttf',
    'f433e5d333be1128d8ec8a28b8aadd0314d10e14e4105406076666bc830fc15d': 'manrope-500.ttf',
    '6bad1a774228464cc88b8b0271555b266f7a3c64a7bedf15e165fdab4f6ac0ce': 'manrope-600.ttf',
    'b9584e099e0e7f1e1e914c3037aabb9010c50346a3ce8df5eeeeecc0563044d8': 'manrope-700.ttf',
    'a7fdc993f9f0387caedba4e42521136fa97e4c0837ae6239bf0413ccf8af00c2': 'plex-mono.ttf',
}
CSS_NAMES = ['style.css', 'hero.css', 'motion.css', 'experience.css', 'language.css']
JS_NAMES = ['translations.js', 'language.js', 'app.js', 'experience.js']


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('html', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    source = args.html.read_text(encoding='utf-8')
    if args.output.exists() and any(args.output.iterdir()):
        parser.error('Output directory must be empty; choose a new directory.')
    styles = re.findall(r'<style>([\s\S]*?)</style>', source)
    scripts = re.findall(r'<script>([\s\S]*?)</script>', source)
    if (len(styles), len(scripts)) != (len(CSS_NAMES), len(JS_NAMES)):
        parser.error('Unexpected export format: expected 5 styles and 4 scripts.')
    args.output.mkdir(parents=True, exist_ok=True)
    assets = args.output / 'assets'
    assets.mkdir(exist_ok=True)
    recovered = set()

    def unpack(match):
        raw = base64.b64decode(match.group(2), validate=True)
        digest = hashlib.sha256(raw).hexdigest()
        name = KNOWN_ASSETS.get(digest)
        if name is None:
            raise ValueError('Unknown embedded asset: ' + digest)
        (assets / name).write_bytes(raw)
        recovered.add(name)
        return 'assets/' + name

    source = re.sub(r'data:([^;,]+);base64,([A-Za-z0-9+/=]+)', unpack, source)
    if recovered != set(KNOWN_ASSETS.values()):
        raise ValueError('Missing approved assets: ' + str(set(KNOWN_ASSETS.values()) - recovered))
    css_index = 0
    js_index = 0

    def write_style(match):
        nonlocal css_index
        name = CSS_NAMES[css_index]
        css_index += 1
        (args.output / name).write_text(match.group(1).strip() + '\n', encoding='utf-8')
        return '<link rel="stylesheet" href="' + name + '">'

    def write_script(match):
        nonlocal js_index
        name = JS_NAMES[js_index]
        js_index += 1
        (args.output / name).write_text(match.group(1).strip() + '\n', encoding='utf-8')
        return '<script src="' + name + '"></script>'

    source = re.sub(r'<style>([\s\S]*?)</style>', write_style, source)
    source = re.sub(r'<script>([\s\S]*?)</script>', write_script, source)
    (args.output / 'index.html').write_text(source, encoding='utf-8')
    print('Recovered:', args.output.resolve())
    print('Assets:', ', '.join(sorted(recovered)))
    print('Next: inspect canonical/og:image and adapt to the repository deployment.')


if __name__ == '__main__':
    main()
```

El script es específico de la exportación aprobada que acompaña este traspaso; valida formato y hashes. Si falla porque se aporta otra exportación, inspeccionar ese archivo y adaptar el extractor explícitamente, sin ignorar silenciosamente la validación del retrato.

### Resultado esperado del primer paso de Claude Code

Una base editable equivalente al HTML aportado, integrada en el repositorio existente, con recursos locales, EN/ES y todas las interacciones operativas. A partir de ahí, continuar los refinamientos solicitados y la integración de despliegue AWS con la configuración real. Documentar diferencias intencionadas respecto a la referencia, comprobaciones realizadas y decisiones que dependan de información todavía no facilitada.
