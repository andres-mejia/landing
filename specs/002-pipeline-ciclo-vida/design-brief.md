# Brief de diseño (Impeccable shape, 2026-10-27)

Decisiones de Andrés del 2026-10-27. Entrada de `/speckit-plan` para la spec 002.

1. **Trabajo y audiencia:** decisores técnicos que quieren saber si Andrés puede llevar un sistema de la idea a producción. Modo *Persuade*.
2. **Resultado y prueba:** entender en 20 segundos que Andrés acompaña todo el ciclo de vida y qué aporta en cada fase. Prueba: un cambio real de FENORA con un artefacto concreto por fase.
3. **Dirección:** **plano técnico de arquitecto**, no cubos isométricos. Trazos finos de 1 px, cotas, retícula tenue, numeración de fase como en un plano; mismos tokens y temas. Secuencia de izquierda a derecha con 7 estaciones; debajo de cada una aparece su artefacto cuando el cambio llega; una línea de retorno de Operate a Discover & plan cierra el ciclo. Una franja fina de aceleradores (agentes, RAG, MCP) cruza las fases que toca.
   - Momento focal: el cambio avanzando por la línea y dejando su artefacto en cada estación.
4. **Alcance y límites:** sustituye entera la sección `#factory`. Anti-objetivos: cubos, brillos, IA en el centro, barra de scroll horizontal, más texto que hoy.
5. **Interacción:** recorrido automático al entrar en pantalla (pausa fuera de ella), selección de fase con ratón, toque o teclado que detiene el recorrido; en móvil, estaciones apiladas en vertical con la línea a la izquierda. Movimiento reducido: todo visible y estático.
6. **Restricciones:** CSP `'self'`, AA, EN/ES, sin vocabulario vetado, sin avisos nuevos del detector, máximo 200 palabras.

## Borrador del ejemplo de FENORA (pendiente de confirmar por Andrés)

Cambio: **conectar un banco nuevo por Open Banking (PSD2)**.

| Fase | Qué hace Andrés | Artefacto del cambio | Riesgo que evita |
|---|---|---|---|
| Discover & plan | Prioriza con negocio y define el alcance | Entrada del roadmap con criterio de éxito | Construir lo que no aporta |
| Analyse | Requisitos y no funcionales | Flujo de consentimiento y NFR (SCA, seguridad, latencia) | Sorpresas regulatorias |
| Architect | Decide y documenta | ADR del conector y diagrama C4 | Decisiones implícitas |
| Build | Diseña contratos y código | Servicio conector y contrato OpenAPI | Integraciones frágiles |
| Verify | Pruebas como gate | Tests de contrato contra el sandbox | Romper en producción |
| Release | Entrega repetible | Pipeline CI/CD e infraestructura como código | Despliegues manuales |
| Operate | Observa y aprende | Métricas, alertas y caducidad de consentimientos | Fallos silenciosos |

Retorno: lo aprendido en Operate vuelve al roadmap.
