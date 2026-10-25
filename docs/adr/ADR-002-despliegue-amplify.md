# ADR-002: Despliegue en AWS Amplify Hosting

- **Estado:** aceptado. App `landing-andres-mejia` (`d1hswm1m43q8p7`) creada el 2026-10-25 y `andres.tekhos.com` asociado a `main`.
- **Fecha:** 2026-10-25

## Contexto

- **Objetivo:** cada cambio en `main` se publica solo, primero en el dominio por defecto de Amplify y después en `andres.tekhos.com`. `tekhos.com` es la landing de la empresa y se aloja aparte; esta app solo usa el subdominio `andres` de su zona en Route 53.
- **Cuenta:** `966378755474`, región `eu-west-1`, perfil `fintrack-dev`. Es la misma que `me-beauty-site` (app `d88tf9s35az05`), donde el patrón ya funciona.
- **Requisito:** mínima complejidad operativa, igual que en me-beauty.

## Decisión

- **Amplify Hosting conectado al repo de GitHub**, proyecto en la raíz y sin modo monorepo.
- **`amplify.yml`** comprueba Node (`scripts/check-node.mjs`), instala con `npm ci`, construye con `npm run build` y publica `dist/`. Tiene prioridad sobre la configuración de la consola.
- **Node 22** en la consola de Amplify. El build falla pronto con Node < 22.12, porque Astro 7 lo exigirá en la fase 2.
- **Cabeceras y CSP en `customHttp.yml`.** Los tests sirven `dist/` con esas cabeceras (`scripts/serve-static.mjs`).
- **Ramas:** `main` publica con `noindex`. `main` se asocia a `andres.tekhos.com` (Amplify crea los registros en la zona `tekhos.com` y el certificado de ACM). La indexación (`SITE_INDEXABLE=true`) se activa cuando Andrés lo decida.
- **CI de GitHub** en cada PR: validación de `amplify.yml` y `npm test`. Amplify no ejecuta navegadores en su build, así que el gate de calidad es el PR.

## Alternativas

| Opción | A favor | En contra |
|---|---|---|
| **A. Amplify conectado al repo** (elegida) | Push a `main` equivale a desplegar; dominios y certificados gestionados; mismo patrón que me-beauty | El build de Amplify no ejecuta los tests de navegador |
| B. S3 privado + CloudFront con OAC y GitHub Actions con OIDC | Control total del pipeline; los tests bloquean el despliegue | Más piezas que mantener: bucket, distribución, rol, política de caché |
| C. Subir el zip a mano a Amplify | Inmediato | Sin historial ni CI; una app conectada a Git no lo admite |

## Consecuencias

- **Crear la app requiere el OK de Andrés**, y la autorización de GitHub (GitHub App) se hace en la consola. Con la app conectada a GitHub, la CLI solo se usa para consultar el estado.
- **Los registros de validación de ACM no se borran nunca.** Si desaparecen, Amplify no renueva el certificado.
- **Caché:** corta para `css/` y `js/` en la fase 1, porque los nombres no llevan hash. En la fase 2, `_astro/*` pasa a `immutable`.
