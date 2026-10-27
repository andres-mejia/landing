# Quickstart: validar el ciclo de vida

```bash
nvm use && npm ci
npm test
npm run detect   # sin avisos nuevos sobre la línea base (76)
```

| Escenario | Resultado esperado | Requisito |
|---|---|---|
| Estaciones | 7 `li.phase` en orden, con artefacto | FR-001, FR-002 |
| Selección | Clic o flecha en una fase: `aria-pressed="true"`, el panel muestra su papel y riesgo, el recorrido se detiene | FR-006, FR-007 |
| Recorrido | Con movimiento permitido, al entrar en pantalla las fases pasan a `is-reached` una a una; fuera de pantalla no avanza | FR-007 |
| Movimiento reducido / sin JS | Las 7 fases alcanzadas y los 7 detalles visibles; nada se mueve | FR-008 |
| Anchos | Sin desplazamiento horizontal de 320 a 2560 px; apilado vertical hasta 860 px | FR-009 |
| Texto | ≤ 200 palabras en EN en `#factory` | FR-010 |
| Español | Sin restos en inglés salvo siglas | FR-011 |

Capturas de escritorio (1440×900) y móvil (390×844) en los dos temas en `docs/reviews/<AAAA-MM-DD>-ciclo-de-vida/`.
