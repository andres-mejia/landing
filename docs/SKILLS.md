# Skills de diseño, testing y especificación

Mismo conjunto que `me-beauty-site`, donde está la evaluación completa (13-10-2026, `docs/SKILLS.md` de ese repo). Aquí solo lo que aplica y cómo se instala.

## Qué se usa

| Skill | Para qué | Dónde |
|---|---|---|
| **Impeccable** | Única skill de diseño: `/impeccable shape`, `critique`, `audit`, `animate`, `polish`; `impeccable detect` como verificación automática | `.claude/skills/impeccable/` (proyecto), copiada de me-beauty |
| **playwright-cli** (`@playwright/cli` 0.1.22) | Pruebas manuales e inspección contra el servidor local o el despliegue | `.claude/skills/playwright-cli/` (proyecto) |
| **Spec Kit** 1.1.3 | Constitución, spec, plan, tareas, análisis e issues (`/speckit-*`) | `.specify/` y `.claude/skills/speckit-*` |
| **visual-critique** y **design-systems** (designer-skills) | Revisiones bajo demanda | Plugin de usuario |

## Qué no se usa

taste-skill, frontend-design, presets de estilo (awesome-design-skills, theme-factory) ni ui-ux-pro-max como guía: se activan por descripción y contradicen el sistema de `DESIGN.md`. La extensión `git` de Spec Kit tampoco: hace commits automáticos.

## Versiones

- `impeccable detect` se ejecuta fijado a **4.5.2**, la última con 14 días o más el 2026-10-25 (4.6.0 y 4.7.0 son de los días 15 y 19).
- Las skills `/speckit-*` llevan `disable-model-invocation: true`: solo se ejecutan cuando Andrés las invoca.

## Instalación en una máquina nueva

```bash
nvm use
./scripts/setup-skills.sh
```

El script descarga el binario del motor de Impeccable (no se versiona), deja la telemetría apagada en `.impeccable/config.json`, instala playwright-cli y Chromium. Los plugins de designer-skills se añaden desde Claude Code con `/plugin`.

## Notas de seguridad

- Impeccable descarga su binario desde GitHub Releases y verifica su SHA-256. Telemetría apagada a nivel de proyecto.
- Ninguna skill necesita credenciales.
