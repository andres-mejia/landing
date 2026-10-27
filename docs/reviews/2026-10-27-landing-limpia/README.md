# Cierre de la spec 001: landing más limpia y senior (2026-10-27)

Página completa en escritorio (1440 de ancho) y móvil (390), tema oscuro y claro, con movimiento reducido. Chromium; no prueba otros navegadores.

## Verificación

- `npm test`: 37 tests en verde (consola y CSP en EN/ES × dos temas, desbordes de 320 a 1440 px, i18n, temas, cifras, mapa, trayectoria, experiencia, cartera de clientes, contacto, movimiento reducido, axe y presupuesto de texto).
- `npm run detect`: 76 avisos (221 al entrar en el repo).
- Cifras: 16 experiencias, 38 organizaciones, 16 países y 16 sectores, validadas en el build.
- Texto de `<main>` en inglés: 1.610 palabras en total y 1.365 visibles (1.808 y 1.153 al empezar, antes de añadir trayectoria, cartera de clientes y Belcorp).
- Consola sin errores en las cuatro capturas.

## Pendiente fuera de la spec 001

- Rediseño del pipeline (spec 002).
- Certificaciones, metodologías y normativa (datos de Andrés).
- Imagen OG (T1), rendimiento y navegadores (M3), migración a Astro (M2).
