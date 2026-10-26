# Andrés Mejía: landing personal

Landing de una página para Andrés Mejía, arquitecto de software independiente con posicionamiento global. Se presenta como profesional independiente; Tekhos y Team Cloud aparecen como trayectoria empresarial, no como titular (ADR-005). Bilingüe EN/ES, dos temas completos (oscuro por defecto, claro), movimiento que explica ingeniería y cifras verificables.

- **Repo:** `andres-mejia/landing` (público), rama por defecto `main`. Se creó vacío: el primer commit inicializa `main`; todo lo demás entra por PR.
- **Remoto SSH local:** `github-andres:andres-mejia/landing.git`. El alias está en `~/.ssh/config`.
- **Dominio:** esta landing se publica en `andres.tekhos.com`. `tekhos.com` es la landing de la empresa (Tekhos) y vive en otro repo: desde aquí solo se tocan sus registros DNS de `andres` (Amplify) y los de correo de `infra/email/` (ADR-006).
- **Proyecto de referencia:** `andres-mejia/me-beauty-site`. Todas las landings siguen su mismo flujo (Spec Kit, Impeccable, milestones, Amplify, git). Ante la duda de cómo se hace algo aquí, mira cómo se hizo allí.
- **El proyecto vive en la raíz del repo.**

## Fuentes de verdad (en este orden)

1. Lo que diga Andrés en la conversación.
2. `.specify/memory/constitution.md`: principios del proyecto (Spec Kit), generados a partir de los documentos siguientes.
3. `PRODUCT.md`: quién, para qué y qué no se puede inventar.
4. `DESIGN.md`: tokens normativos y reglas visuales. Los bloques de tokens de `web/css/site.css` son su traducción a CSS; si cambia uno, cambia el otro.
5. `docs/SPEC.md`: secciones, coreografía de movimiento, accesibilidad y gates de calidad.
6. `specs/<feature>/` (Spec Kit): spec, plan y tasks derivados de los anteriores.
7. `docs/adr/`: decisiones de arquitectura. Una decisión nueva de stack, despliegue o contenido estructural requiere ADR (contexto, decisión, alternativas, consecuencias).
8. `docs/BACKLOG.md`: milestones (M0–M5), etiquetas y criterios de cierre.
9. `docs/HANDOFF.md`: estado del traspaso y qué estaba verificado al entrar en el repo.
10. `docs/reference/contexto-chatgpt.md`: contexto histórico de la versión anterior. **Donde contradiga a este fichero o a un ADR, manda este fichero.**
11. `baseline/v1/`: la salida de la fase 1 congelada antes de migrar a Astro (M2). No se edita.

`specs/` se crea con el primer `/speckit-specify`.

## Stack y fases

- **Fase 1 (M0–M1): HTML estático.** `web/` es la fuente: `index.html`, `css/site.css` (un solo CSS), `js/*.js` (sin build ni framework), `assets/` (retrato, fuentes, favicon).
  - `npm run build` ejecuta `scripts/build.mjs`: valida el retrato y las cifras, copia `web/` a `dist/`, inyecta `noindex` y escribe `robots.txt` salvo `SITE_INDEXABLE=true`. Con `SITE_URL` reescribe `canonical` y `og:image`; sin él, los quita.
  - Orden de scripts en `index.html`: `theme-init.js` (en `<head>`, síncrono) → `translations.js` → `i18n.js` → `hero-canvas.js` → `app.js` → `experience.js`.
- **Fase 2 (desde M2): Astro con salida estática (ADR-004).**
  - Versión: la última con al menos 14 días desde su release; compruébalo con `npm view astro time` el día que empiece la migración.
  - Antes de escribir código Astro, lee la documentación oficial de esa versión. No asumas la API de versiones anteriores.
- **Contrato con el despliegue (ADR-002):** `npm run build` deja el sitio en `dist/` en ambas fases. `amplify.yml` no cambia con la migración.

## Comandos

```bash
nvm use                      # Node 22 (.nvmrc); hazlo antes de npm: el Node por defecto de la máquina es 18
npm ci
npm run build                # dist/ con noindex
npm run build:standalone     # además, dist-standalone/andres-mejia-landing.html para revisar sin servidor
npm run serve                # dist/ en http://localhost:4173 con las cabeceras reales de customHttp.yml
npm test                     # build + Playwright: consola/CSP, overflow, i18n, temas, pipeline, cifras, reduced motion, axe
npm run check:deploy         # valida amplify.yml (obligatorio antes de tocarlo)
npm run detect               # tras build: detector de Impeccable 4.5.2 contra dist/ (avisos informativos)
```

Si Playwright no tiene navegador instalado: `npx playwright install chromium`. En entornos con Chromium preinstalado, `PW_CHROMIUM_PATH=/ruta/chrome npm test`.

## Cómo está construido (lo que no es obvio)

- **i18n por cadenas inglesas.** `i18n.js` traduce nodos de texto y atributos (`aria-label`, `title`, `alt`, metas) buscando el texto inglés exacto en `window.SITE_TRANSLATIONS` y vigila el DOM con `MutationObserver`, así que el texto que el JS genera también se traduce.
  - **Para añadir o cambiar un texto:** escríbelo en inglés en el marcado o en el JS **y** añade o renombra su clave en `translations.js`. Si cambias el inglés sin tocar la clave, el español vuelve al inglés en silencio. El test "en español no queda texto en inglés" lo detecta.
  - Los nodos bajo `[data-i18n-skip]` no se traducen (son las copias visuales del efecto decode).
  - En la fase 2 (Astro) esto se sustituye por claves estables y páginas por idioma: EN en `/` y ES en `/es/` (ADR-004).
- **Temas:** todos los colores son tokens en los bloques `:root,html[data-theme=dark]` y `html[data-theme=light]` de `site.css`, incluido el SVG del pipeline (`--f-*`). **No escribas colores literales fuera de esos bloques.** Los dos temas son completos. El tema por defecto es oscuro salvo preferencia guardada (`localStorage['andres-theme']`).
- **Contraste AA:** en el tema claro, `--accent` es `#A24A28`. El óxido de marca `#B5502B` no llega a 4.5:1 sobre las superficies alternas y solo se usa en gráficos (`--d1`).
- **CSP estricta (`customHttp.yml`):** `script-src 'self'` y `style-src 'self'`. Nada de `<script>` ni `<style>` en línea ni atributos `style="..."` en el marcado. El JS solo toca estilos vía CSSOM (`element.style.setProperty`), que la CSP permite. Los tests sirven `dist/` con esa CSP: una violación es un test rojo.
- **Pipeline:** dos SVG, horizontal (≥861px) y vertical (≤860px, sin scroll horizontal). Comparten `data-station`. Solo el SVG visible ejecuta su animación SMIL.
- **Cifras verificables (ADR-003):** cada cifra lleva `data-items` con lo que cuenta. El build comprueba que el número coincide con la lista y que cada elemento aparece en el contenido fuera de la propia cifra (coincidencia de token completo). Los insights de Experiencia los calcula `experience.js` a partir de las tarjetas.

## Flujo de trabajo: Spec Kit e issues

- **Ciclo de Spec Kit:**
  - `/speckit-constitution` y luego `/speckit-specify`, `/speckit-clarify`, `/speckit-plan`, `/speckit-tasks` y `/speckit-analyze`.
  - Spec Kit 1.1.3 se inicializa en la raíz (`.specify/`) con la integración de Claude, skills y numeración secuencial, igual que en me-beauty.
  - **Las skills `/speckit-*` llevan `disable-model-invocation: true` puesto a mano** (`specify` 1.1.3 las genera con `false`). `specify integration upgrade` lo revierte: tras cualquier upgrade hay que volver a ponerlo con `sed -i 's/^disable-model-invocation: false$/disable-model-invocation: true/' .claude/skills/speckit-*/SKILL.md` y añadir los dos flags (`user-invocable: true` y `disable-model-invocation: true`) a `speckit-github-taskstoissues`, cuyo frontmatter no los trae.
  - **La extensión `git` de Spec Kit no se instala:** las ramas y los commits los gestiona Claude siguiendo las reglas de git. Sí se instala la extensión `github`.
- **Creación de issues:**
  - Se crean con `/speckit-github-taskstoissues` (extensión `github`) o, si no hay GitHub MCP server, con `gh issue create`.
  - Formato de título `T001: …`, más el milestone (M0–M5) y las etiquetas de `docs/BACKLOG.md`.
- **Un issue por tarea, un PR por bloque visible:**
  - Cada tarea de `specs/*/tasks.md` tiene su issue. Los bloques de PR están en la sección "Bloques de PR" de `tasks.md` y cada issue lleva la línea "PR: bloque N".
  - Rama `m1-b1-slug` (milestone, bloque y tema) desde `main`.
  - Un commit por tarea, con `Refs #N` en el cuerpo (`feat(hero): T012 …`).
  - El PR del bloque lleva `Closes #N` de todos los issues que cubre y se mergea con el CI en verde.
- **Decisiones de Andrés:** las tareas con etiqueta `decision` (D1–D5 de `docs/BACKLOG.md`) las resuelve Andrés. Se le pregunta; no se resuelven por él.
- **Ciclo de refinamiento (M1):**
  1. Cambio en `web/`.
  2. `npm test` y `npm run detect`.
  3. Capturas de escritorio (1440×900) y móvil (390×844), en ambos temas, con `playwright-cli` en `docs/reviews/<AAAA-MM-DD>-<tema>/`.
  4. Parada con resumen.
  5. PR y, con el CI en verde, merge a `main`: Amplify lo publica solo en https://andres.tekhos.com.
  6. Los comentarios de Andrés se convierten en issues con la etiqueta `refine`.

## Skills

- **Diseño: solo Impeccable.**
  - Úsala con `/impeccable shape`, `critique`, `audit`, `animate` y `polish`.
  - No actives otras skills de "gusto" (taste-skill, frontend-design, presets de estilo): contradicen el stack y el sistema.
- **Pruebas manuales en navegador:** `playwright-cli`.
- **Revisiones:** `visual-critique` y `design-systems` de designer-skills, bajo demanda.
- **Especificación:** Spec Kit (`/speckit-*`).
- Instalación con `scripts/setup-skills.sh`; detalle y motivos en `docs/SKILLS.md`.

## Excepciones del detector

- **Línea base (2026-10-25):** 221 avisos en la landing heredada (texto mono por debajo de 12 px, etiquetas sobre los H2, índices numerados, brillos de color, puntos que laten, barrido del pipeline y retícula del hero). Detalle en `DESIGN.md`.
- **Ninguna excepción aceptada todavía.** Su revisión es tarea de M1: Andrés decide qué se corrige y qué se acepta, y lo aceptado se lista aquí con su motivo.
- Mientras tanto, un cambio no puede añadir avisos nuevos respecto a la línea base.

## Reglas de contenido (no negociables)

- **Nunca inventes** clientes, cifras, resultados, fechas, testimonios, logos, métricas ni autorizaciones. Una cifra nueva necesita el dato de Andrés y su evidencia visible en la página.
- **No publicar residencia.** Ni ciudad ni ubicación personal en copy, metadatos, JSON-LD, formularios, commits, issues o documentación (el repo es público). El posicionamiento es global. Los países de la banda de KPIs son países de clientes y equipos, no residencia.
- **Retrato intacto:** `web/assets/andres-retrato-definitivo.png`, SHA-256 `9075e09d…e99907` (el build lo verifica). No se regenera ni se retoca; no se le aplican filtros, LUT ni luces sobre la piel; la americana sigue siendo negra.
- **Vocabulario vetado** (ADR-001 de marca Tekhos): "fábrica" o "factoría de software" y "digital workforce" en copy visible. Se usa "pipeline" o "taller".
- **Nunca uses la palabra "actualmente"** en textos de perfil.
- **Copy:** EN británico, coherente con `og:locale en_GB`. ES de España, con tuteo e imperativo en las instrucciones ("Selecciona", "Desliza"). Sin rayas largas nuevas en el copy español.
- **Nombres de organizaciones en texto, sin logos.** Distinguir cliente final, consultora, plataforma, producto propio y prueba de concepto. Los clientes se nombran, sin anonimizar (ADR-005).
- **Sin botón de pausa.** `prefers-reduced-motion` se respeta sin controles visibles.
- Sin formularios sin destino, contadores ficticios ni enlaces `#` que aparenten una acción.

## Reglas de movimiento

- Cada animación comunica jerarquía, relato, feedback o cambio de estado.
- Solo `transform`, `opacity`, `clip-path` y atributos SVG.
- La rama de `prefers-reduced-motion` se escribe primero: con movimiento reducido todo el contenido es visible y nada se mueve.
- Sin JS el contenido es íntegro: solo la entrada del hero depende de `.js`, y `theme-init.js` libera el estado a los 2,5 s pase lo que pase.
- Pausar lo que no se ve: el canvas del hero y el pipeline se detienen fuera de pantalla y con la pestaña oculta.

## Verificación

- **Verificación acotada:** cambio completo, `npm test`, una captura de escritorio (1440×900) y una de móvil (390×844) en ambos temas, y corregir todo en una tanda. Nada de bucles de pulido.
- No describas una captura como prueba de todos los dispositivos.

## Despliegue: AWS Amplify (ADR-002)

- **App y destino:** app `landing-andres-mejia` (`d1hswm1m43q8p7`), región `eu-west-1`, cuenta `966378755474`, la misma que `me-beauty-site`. Rama `main` publicada en https://andres.tekhos.com (y en https://main.d1hswm1m43q8p7.amplifyapp.com), con `noindex` hasta que Andrés decida `SITE_INDEXABLE=true`.
- **Variables de la rama `main`:** `SITE_URL=https://andres.tekhos.com`. `SITE_INDEXABLE` no está definida.
- **Cada merge a `main` despliega.** Nunca se hace push directo a `main`: todo entra por PR con el CI en verde.
- **El build se controla desde el repo:** `amplify.yml`, `customHttp.yml` y `scripts/build.mjs`. Los cambios en estos ficheros pasan por PR.
- **`amplify.yml` solo contiene comandos simples o llamadas a scripts; nada de código en línea.** `npm run check:deploy` es obligatorio antes de cualquier push que toque `amplify.yml`.
- **AWS CLI:**
  - Usa siempre `--profile fintrack-dev` (cuenta 966378755474); el perfil por defecto apunta a otra cuenta.
  - Verifica antes de usarla: `aws sts get-caller-identity --profile fintrack-dev` debe devolver la cuenta `966378755474`. Si no coincide, para.
  - **Permitido sin preguntar:** Andrés autorizó el 2026-10-25 cualquier comando de AWS en cualquier servicio para este proyecto. Cada acción que cree o cambie recursos se reporta al terminar.
  - **Sigue requiriendo OK explícito:**
    - compras: **registrar o renovar un dominio solo con el nombre exacto confirmado por escrito**;
    - borrar recursos;
    - tocar recursos que no son de esta landing (las apps de me-beauty, fintrack o docufly; la raíz de `tekhos.com` y otras zonas alojadas).
  - No leas, imprimas ni copies secretos ni tokens. La conexión de Amplify con GitHub la autoriza Andrés en la consola; no se crean ni se piden tokens personales.
- **Registros DNS:** los de validación de ACM no se borran nunca. En la zona `tekhos.com` se tocan los registros de `andres` (Amplify) y los de correo, que gestionan las pilas de `infra/email/` y no se editan a mano.

## Correo de tekhos.com (ADR-006)

- **Recepción:** comodín `*@tekhos.com` en SES us-east-1 (pila `tekhos-email-receiving`, conjunto `tekhos-inbound`): S3 y Lambda `tekhos-email-forwarder` que reenvía al Gmail personal con `Reply-To` del remitente.
- **Envío:** identidad `tekhos.com` en SES eu-west-1 (pila `tekhos-email-sending`) con DKIM, MAIL FROM `mail.tekhos.com`, SPF y DMARC `p=none`. SMTP para "Enviar como" con el usuario `tekhos-ses-smtp`; credencial en Secrets Manager `tekhos/ses-smtp`.
- **Comandos:**
  - `FORWARD_TO=… scripts/deploy-email.sh` despliega o actualiza las dos pilas (antes, `node scripts/build-email-stack.mjs` si cambia `forwarder.py`).
  - `python3 scripts/ses-smtp-secret.py` crea o rota la credencial SMTP; `--test <correo>` envía una prueba. Nunca imprimen el secreto.
- **No toques `fenora-dev-rules`** (eu-west-1): es el conjunto activo de FENORA.

## Git (regla dura)

- **Autoría:**
  - Nunca añadas a Claude, Anthropic ni ninguna IA como autor o coautor.
  - Prohibido `Co-Authored-By: Claude`, "Generated with Claude Code" o similares, en commits y en PR.
- **Formato del mensaje:**
  - Conventional Commits en español: `tipo(ámbito): descripción` en imperativo (`feat`, `fix`, `docs`, `ci`, `chore`, `refactor`, `test`).
  - Cuerpo multilínea con alcance e issue (`Refs #N`).
  - Sin emojis.
- **Firma:** la identidad y la firma SSH están configuradas en `.git/config` de este repo, no en el global, con el mismo criterio que me-beauty. No toques la configuración global de git (tiene otro email de otro contexto).
- **Pull requests:**
  - Se mergean con merge commit (`gh pr merge --merge`), para conservar los commits firmados por tarea. Nunca squash ni rebase.
  - La descripción del PR: de 2 a 5 frases, sin "Generated with Claude Code" ni ninguna coautoría o mención de IA.
  - Andrés autorizó el 2026-10-25 a hacer push, abrir PR y mergearlos sin parada previa, **siempre con el CI en verde**. Cada merge publica en https://andres.tekhos.com, así que tras mergear se le reporta qué se publicó.
- **Dependencias y actions:** versiones con al menos 14 días desde su release; actions fijadas por SHA. Los PR de Dependabot se revisan con la misma regla y no se mergean el mismo día de la release.
- **Nunca se mergea con el CI en rojo** ni con `npm test` fallando en local. Las decisiones D1–D5 y las excepciones del detector siguen requiriendo a Andrés aunque el merge sea automático.
- **Si algo falla:** para y repórtalo. No hagas stash ni descartes cambios.
