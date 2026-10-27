# Research: Pipeline del ciclo de vida

## R1. HTML y CSS en lugar de un SVG grande

- **Decision:** las 7 estaciones son una lista ordenada de botones en HTML; la línea, las cotas y el marcador son pseudoelementos y un elemento posicionado con CSS. Solo el arco de retorno es un SVG pequeño.
- **Rationale:** el texto se traduce con el i18n actual (los textos dentro de SVG complicaban el EN/ES), se apila en vertical con una media query, es accesible por teclado sin trabajo extra y elimina la barra de desplazamiento horizontal del SVG fijo.
- **Alternatives considered:** un SVG horizontal y otro vertical como hoy (duplica contenido y es la causa del desbordamiento a 2000 px); canvas (no accesible).

## R2. Movimiento: un recorrido, no un bucle

- **Decision:** al entrar en pantalla el marcador avanza una vez por las 7 fases (unos 1,6 s por fase), marca cada estación como alcanzada, dibuja el arco de retorno y se detiene en reposo. "Replay" lo repite. Elegir una fase detiene el recorrido y deja esa fase seleccionada.
- **Rationale:** comunica el relato sin la fatiga de una animación infinita (el detector marca los bucles continuos como `marquee`) y respeta "pausar lo que no se ve".
- **Alternatives considered:** bucle continuo (ruido); scroll ligado al recorrido (más complejo, peor en móvil y con teclado).

## R3. Sin JS y con movimiento reducido

- **Decision:** el estado por defecto del HTML es "todas las estaciones alcanzadas" y el panel muestra el papel y el riesgo de las 7 fases como lista. Con JS y movimiento permitido, el CSS pasa a mostrar solo el detalle de la fase elegida.
- **Rationale:** FR-008 y el principio V: el contenido no depende de la animación.

## R4. Aceleradores de IA

- **Decision:** franja bajo las estaciones con 3 tramos: RAG (contexto del proyecto) en Analyse y Architect; agentes en Build y Verify; MCP (herramientas y entornos) en Build, Release y Operate. Cada tramo se alinea con sus columnas en escritorio y se lista en móvil.
- **Rationale:** FR-005: la IA presente como acelerador sin protagonismo. Las fases asignadas son el uso habitual descrito en el pipeline anterior (RAG para conocimiento del proyecto, MCP para herramientas, agentes en la construcción); Andrés las revisa en la parada.

## R5. Presupuesto de palabras

- **Decision:** ~150 palabras en EN: cabecera y entradilla (~32), 7 nombres (~9), 7 artefactos (~45), 7 papeles y riesgos (~45), retorno (~9) y franja (~15).
- **Rationale:** FR-010 (≤ 200) y el presupuesto global de la página.
