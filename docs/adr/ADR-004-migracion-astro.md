# ADR-004: Migración a Astro (fase 2)

- **Estado:** propuesto. Se ejecuta tras el primer despliegue estable de la fase 1 y con el OK de Andrés.
- **Fecha:** 2026-10-25

## Contexto

- **La fase 1 tiene tres límites conocidos:**
  - Las traducciones van por cadenas inglesas y un `MutationObserver`.
  - Solo hay una URL para dos idiomas, así que el contenido en español no es indexable.
  - El HTML es un único fichero editado a mano.
- **`me-beauty-site` ya migró a Astro** (ADR-005 de ese repo), con salida estática, paridad píxel a píxel y el mismo contrato de `dist/`.
- **Versión de Astro:** el 2026-10-25 la última es la 7.4.2, pero la rama 7.4 salió el 2026-10-15 y no cumple la regla de los 14 días. La última que la cumple es la **7.3.8** (2026-10-08), la misma que me-beauty. Hay que revisarlo de nuevo el día que se ejecute la migración (`npm view astro time`).

## Decisión propuesta

- **Astro con `output: 'static'`, `outDir: 'dist'`**, y la configuración de CSP de me-beauty: `assetsInlineLimit: 0`, `inlineStylesheets: 'never'` y `build.format: 'preserve'`.
- **Línea base:**
  - Antes de migrar, se congela la salida de la fase 1 en `baseline/v1/` (EN y ES, tema oscuro y claro).
  - `npm run parity` compara píxel a píxel y debe dar 0 diferencias salvo cambios decididos.
- **Idiomas como páginas reales:**
  - EN en `/` (idioma inicial aprobado) y ES en `/es/`, con `hreflang` y `og:locale` por página.
  - El selector EN/ES pasa a ser un enlace entre páginas y conserva la preferencia.
- **Contenido por claves:**
  - Proyectos, paneles tecnológicos, etapas del pipeline y KPIs pasan a datos tipados (`src/content/` o JSON por idioma).
  - Desaparece la traducción por cadenas inglesas.
  - Las cifras se calculan en build a partir de esos datos, y se mantiene la validación de ADR-003.
- **El JS de cliente se conserva** como scripts de Astro sin framework de UI: canvas, pipeline, decode, filtros.
- **`amplify.yml` no cambia:** `npm run build` pasa a ser `astro build`.

## Alternativas

| Opción | A favor | En contra |
|---|---|---|
| **A. Astro estático con paridad** (propuesta) | Mismo stack y método que me-beauty; i18n indexable; componentes | Hay que portar el i18n a claves |
| B. Seguir en HTML estático | Cero migración | Español no indexable; el HTML crece a mano |
| C. Next.js u otro framework con SSR | Más capacidades | Servidor innecesario para una landing; rompe el patrón |

## Consecuencias

- La CSP sigue en `'self'` y `_astro/*` pasa a caché `immutable`.
- Los tests de Playwright se mantienen y se amplían a las dos rutas.
