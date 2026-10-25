# Primer despliegue en Amplify (2026-10-25)

App `landing-andres-mejia` (`d1hswm1m43q8p7`, eu-west-1), rama `main`, publicada en https://andres.tekhos.com y en https://main.d1hswm1m43q8p7.amplifyapp.com.

## Verificación

- **Build:** job 1 con BUILD, DEPLOY y VERIFY en `SUCCEED`; Node 22 desde Live package updates y `amplify.yml` del repo.
- **Indexación:** `<meta name="robots" content="noindex, nofollow">` y `robots.txt` con `Disallow: /`.
- **Cabeceras (`curl -sI`):** CSP `'self'` de `customHttp.yml`, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`. `css/` y `js/` con `max-age=300, must-revalidate`.
- **Dominio:** `andres.tekhos.com` asociado a `main` con certificado gestionado por Amplify (estado `AVAILABLE`). `SITE_URL=https://andres.tekhos.com` en las variables de la rama: `canonical` y `og:image` apuntan al dominio.
- **Consola:** sin errores ni avisos en escritorio y móvil, en los dos temas (Chromium, movimiento reducido).

## Capturas

Viewport, no página completa, con `prefers-reduced-motion` para que sean estables: escritorio 1440×900 y móvil 390×844, tema oscuro y claro. Solo Chromium; no prueban otros navegadores.

- `escritorio-dark.png`, `escritorio-light.png`
- `movil-dark.png`, `movil-light.png`

## Pendiente

- Imagen OG de 1200×630 (T1): `og:image` usa el PNG del retrato.
- Lighthouse y Core Web Vitals sobre el dominio (T4, M3).
