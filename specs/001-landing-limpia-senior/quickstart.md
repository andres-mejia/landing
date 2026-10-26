# Quickstart: validar la landing más limpia y senior

## Requisitos

```bash
nvm use && npm ci
npx playwright install chromium   # si falta el navegador
```

## Validación automática

```bash
npm test               # build (retrato, cifras, destacados) + Playwright con la CSP real
npm run check:deploy   # solo si cambia amplify.yml
npm run detect         # no puede superar la línea base (216 avisos)
```

Si la máquina va cargada y los tests fallan por tiempo, repite con `npx playwright test --workers=4 --timeout=120000`; un fallo funcional no se arregla con más tiempo.

Qué tiene que pasar, además de lo que ya cubría la suite:

| Escenario | Resultado esperado | Requisito |
|---|---|---|
| Banda de cifras | 4 valores: 15, 17, 14, 8; países por región suman 14 | FR-005 |
| Capacidades | 6 áreas; ninguna con más de 5 tecnologías; 30 o menos en total | FR-007, FR-008, SC-002 |
| Experiencia | Las 6 primeras tarjetas visibles son las destacadas y en el orden del [data-model](../data-model.md); filtro de banca sigue en 4 | FR-010 |
| Trayectoria | 4 hitos con periodo: 2012–2021, 2019–2024, 2025–, 2026– | FR-014 |
| Contacto | Enlace `mailto:andres.mejia@tekhos.com` y LinkedIn | FR-017 |
| Presupuesto de texto | ≤ 1.200 palabras en total y ≤ 1.000 visibles en `<main>` en EN | SC-001 |
| Español | Sin restos en inglés tras recorrer filtros, pipeline y expansión | FR-020 |
| Movimiento reducido y sin JS | Trayectoria, capacidades y destacados visibles | FR-021 |

## Validación manual

1. `npm run serve` y abrir http://localhost:4173.
2. Capturas de escritorio (1440×900) y móvil (390×844) en los dos temas en `docs/reviews/<AAAA-MM-DD>-<tema>/`.
3. Prueba de 60 segundos (SC-003): enseñar la primera y la segunda pantalla a 3 personas del perfil objetivo y anotar si describen a Andrés como senior, mencionan liderazgo y citan dos sectores.
