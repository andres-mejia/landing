# Traspaso: estado, verificación y plan

> **Actualización 2026-10-25:** el proyecto sigue el mismo flujo que `me-beauty-site` (Spec Kit, Impeccable, milestones M0–M5, ramas `mN-bN-slug`). El plan por fases de abajo se mantiene como referencia; el orden operativo está en `docs/BACKLOG.md` y `CLAUDE.md`.

- **Fecha:** 2026-10-25
- **Origen:** sesión de refinamiento en Claude.
- **Destino:** Claude Code en VS Code (WSL), dentro de `andres-mejia/landing`.

## 1. Qué hay en este paquete

| Ruta | Qué es |
|---|---|
| `web/` | La landing (fuente de la fase 1). Se abre con `npm run serve` tras `npm run build`. |
| `scripts/build.mjs` | Build y validaciones (retrato, cifras, `noindex`, `canonical`/`og:image` por entorno). |
| `scripts/serve-static.mjs` | Servidor local que aplica `customHttp.yml`. Lo usan los tests. |
| `scripts/check-node.mjs`, `scripts/validate-amplify.mjs` | Mismos guardas que en me-beauty. |
| `amplify.yml`, `customHttp.yml` | Contrato con Amplify y cabeceras (CSP `'self'`). |
| `tests/site.spec.ts` | 30 tests de Playwright. Pasaban todos el 2026-10-25. |
| `.github/workflows/ci.yml` | CI de PR (mismas actions fijadas por SHA que me-beauty). |
| `docs/adr/` | ADR-001 a ADR-004. |
| `docs/BACKLOG.md` | Pendientes, listos para convertir en issues. |
| `docs/reference/contexto-chatgpt.md` | Contexto de la versión anterior. Manda `CLAUDE.md` donde difieran. |

`dist/`, `dist-standalone/` y `node_modules/` no se versionan.

## 2. Qué se hizo en el refinamiento

- **Un solo CSS con tokens.** Los temas claro y oscuro son completos: antes, el claro solo cambiaba 4 de 10 secciones. El oscuro es el tema por defecto. El cambio de tema usa una View Transition circular.
- **Header fijo:** se compacta al hacer scroll, marca la sección activa e integra la barra de lectura.
- **Capa de movimiento:**
  - Canvas de topología en el hero, sobre la retícula de 88 px.
  - Entrada del H1 línea a línea y conteo animado.
  - Efecto decode en las etiquetas mono, compatible con el i18n.
  - Revelado de los H2 con `clip-path` y spotlight que sigue al cursor en las tarjetas.
  - En el pipeline: haz de luz, anillos, elevación de la estación activa, progreso de etapa y bus de contexto en Build.
  - Transiciones en filtros y paneles, y botones magnéticos.
- **Pipeline vertical hasta 860 px**, sin scroll horizontal. El horizontal se queda para escritorio.
- **Copy v2 en EN y ES:**
  - Titular: "Architecture with intent. Software built to evolve." / "Arquitectura con criterio. Software que evoluciona."
  - Fuera "fábrica"; imperativo en ES; Team Cloud en el "Sobre mí"; dato "Hands-on".
- **Cifras verificables (ADR-003):** banda de 6 KPIs, países por región, el stack en cifras e insights calculados a partir de las tarjetas.
- **Correcciones:**
  - Corte de etiquetas ES a 320 px.
  - Texto por debajo de 9 px.
  - CSS muerto.
  - Retrato duplicado en el autónomo.
  - Contraste AA del acento en el tema claro.
  - Desbordamiento de la cabecera a 320 px.

## 3. Qué está verificado (2026-10-25, Chromium, `npm test`)

- **Consola y CSP:** sin errores en EN/ES × oscuro/claro, con la CSP real.
- **Maquetación:**
  - Sin scroll horizontal de página ni desbordes de la cabecera a 320, 360, 390, 768, 1024 y 1440 px, en EN y ES.
  - El H1 no se sale de su columna de 320 a 1920 px.
- **Pipeline:** vertical sin scroll a 320, 390, 768 y 860 px; horizontal en escritorio. Las etapas y los contextos se seleccionan.
- **i18n:**
  - EN → ES → EN conserva los textos dinámicos y no deja overlays.
  - En ES no queda texto en inglés tras recorrer etapas, contextos, filtros y la expansión de proyectos.
- **Tema:** persiste tras recargar y actualiza `theme-color`. El claro cubre header, hero, pipeline, experiencia y contacto.
- **Cifras:** KPIs, países, stack e insights correctos. El filtro de banca muestra 4. Las cifras abren su panel.
- **Movimiento reducido:** todo el contenido visible, el pipeline detenido y el H1 sin transformaciones.
- **Accesibilidad (axe):** sin violaciones graves ni críticas en ninguno de los dos temas.
- **No verificado:** Lighthouse/Core Web Vitals, Safari/Firefox y lectores de pantalla reales.

## 4. Plan por fases

### F0. Repositorio (primera sesión)

1. Clonar `andres-mejia/landing` (está vacío) con el alias `github-andres` y copiar el contenido de este paquete.
2. Configurar la identidad y la firma SSH en `.git/config` del repo, con el mismo criterio que me-beauty y con el OK de Andrés.
3. Proponer la convención de commits (la de me-beauty) y esperar el OK.
4. **Primer commit en `main`**, porque el repo vacío no admite PR: solo `README.md`, `CLAUDE.md`, `.gitignore` y `docs/`. Parada antes del push.
5. **Rama `m0-b1-base-estatica`** con el resto (`web/`, `scripts/`, `tests/`, configuración) y PR a `main`. CI en verde y parada antes del merge.
6. **Rama `m0-b2-spec-kit`:** Spec Kit, skills, `PRODUCT.md`, `DESIGN.md`, `docs/SPEC.md` y constitución, como en me-beauty; después spec, plan, tasks e issues.

### F1. Amplify (con OK de Andrés en cada paso que cree recursos)

1. `aws sts get-caller-identity --profile fintrack-dev` debe dar `966378755474`.
2. Comprobar que no existe ya una app: `aws amplify list-apps --profile fintrack-dev --region eu-west-1`.
3. **Crear la app la hace Andrés en la consola** (New app, GitHub, `andres-mejia/landing`, rama `main`). La autorización de la GitHub App es suya. En la consola: Node 22 (Live package updates) y build desde `amplify.yml`.
4. Tras el primer build, comprobar en `https://main.<appId>.amplifyapp.com`:
   - `noindex` presente;
   - CSP aplicada (`curl -sI`);
   - sin errores de consola;
   - capturas en escritorio y móvil.
5. Anotar el `appId` en `CLAUDE.md` (sección de despliegue).

### F2. Refinamiento (ver `docs/BACKLOG.md`)

Ciclo de cada cambio:

1. Cambio en `web/`.
2. `npm test`.
3. Capturas en `docs/reviews/`.
4. Parada.
5. PR.
6. Merge con OK.

Amplify publica al mergear.

### F3. Migración a Astro (ADR-004)

1. Congelar `baseline/v1/` desde `dist/`.
2. Proyecto Astro en la raíz, con la versión que cumpla la regla de 14 días (el 2026-10-25, la 7.3.8). Antes de escribir código, lee la documentación oficial de esa versión.
3. Paridad píxel a píxel (`npm run parity`) por idioma y tema.
4. i18n por claves con rutas `/` y `/es/`.
5. Mismo contrato de `dist/`.

### F4. Dominio y producción

Ver la sección 5. Con el dominio:

1. Asociación de dominio en Amplify, que crea los registros en Route 53 y el certificado de ACM.
2. `SITE_URL` en las variables de entorno de Amplify (corrige `canonical` y `og:image`).
3. Imagen OG de 1200×630.
4. `SITE_INDEXABLE=true` solo cuando Andrés lo decida.

## 5. Dominio

**Sí, se puede comprar en AWS:** Route 53 Domains registra el dominio y crea la zona alojada. Con la zona en Route 53, Amplify añade los registros DNS y el certificado de ACM automáticamente, como en me-beauty.

- **Coste orientativo:** un `.com` cuesta 16 USD al año en registro y renovación. La zona alojada cuesta 0,50 USD al mes. Confírmalo con `aws route53domains list-prices --tld com --region us-east-1 --profile fintrack-dev` antes de proponer la compra.
- **Comprobación sin coste:** `aws route53domains check-domain-availability --domain-name <nombre> --region us-east-1 --profile fintrack-dev`. Route 53 no admite todos los TLD; compruébalo con `list-prices --tld <tld>`.
- **Decisión de Andrés (2026-10-25):** `tekhos.com` es la landing de la empresa (otro repo) y **esta landing se publica en `andres.tekhos.com`**. `tekhos.com` quedó registrado en Route 53 el 2026-10-25 (estado ACTIVE, zona alojada en la cuenta). `tekhos.es` está pendiente: el primer intento falló por el formato del documento de identidad.
- La redacción de la relación con Tekhos en el copy (página personal o de fundador) sigue siendo la decisión D1.
- **Registrar es una compra:** se hace solo con el OK explícito de Andrés y con el nombre exacto confirmado por escrito.
