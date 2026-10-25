# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Fase 1: HTML, CSS y JS nativos en `web/`, sin framework ni bundler; `scripts/build.mjs` valida y copia a `dist/` (ADR-001). Fase 2: Astro con salida estática y la misma salida `dist/` (ADR-004). Despliegue en AWS Amplify Hosting con CSP `'self'` (ADR-002).

## Users

- **Decisores técnicos** (CTO, VP de ingeniería, responsables de arquitectura) que evalúan a un arquitecto independiente para un sistema que tiene que evolucionar o para una decisión técnica difícil. Leen en escritorio, contrastan cifras y quieren ver criterio, no una lista de palabras clave.
- **Consultoras y socios** que buscan un perfil senior para proyectos de clientes finales.
- **Fundadores de producto** que necesitan arquitectura y ejecución práctica a la vez.
- Llegan desde LinkedIn, una recomendación o un enlace compartido. Público global: inglés como idioma inicial y español como segundo idioma.

## Product Purpose

Landing de una página de Andrés Mejía, arquitecto de software independiente. Su trabajo es que un decisor técnico entienda en un minuto qué aporta Andrés (conectar negocio, arquitectura e ingeniería práctica), lo compruebe con evidencia verificable y abra una conversación. Hoy la conversación empieza en LinkedIn.

## Positioning

Arquitectura con criterio y software que evoluciona. Más de 20 años diseñando, integrando y haciendo evolucionar plataformas para organizaciones internacionales, con trabajo práctico (diseño y código, no solo diagramas). La prueba son proyectos concretos en banca, seguros, comercio, aviación, sector público, IoT industrial, medios digitales y productos con IA. Se publica en `andres.tekhos.com`; la redacción de la relación con Tekhos (página personal o de fundador) es la decisión D1.

## Operating Context

- La visita llega con poco tiempo y mucho escepticismo: la primera pregunta de un CTO a una cifra es "¿cómo lo mediste?".
- El contenido lo mantiene Andrés; cambia cuando hay proyectos nuevos o datos de resultado con permiso de publicación.
- Bilingüe EN/ES. EN es el idioma inicial si no hay preferencia guardada.

## Capabilities and Constraints

- Página estática, sin backend ni formularios.
- Dos temas completos (oscuro por defecto y claro), con View Transition al cambiar.
- Pipeline de entrega interactivo (SVG horizontal en escritorio, vertical hasta 860 px), filtros de experiencia, explorador tecnológico y cifras que abren su evidencia.
- Tiene que funcionar completa sin JavaScript y con `prefers-reduced-motion`, sin botón de pausa.
- CSP `'self'`: sin scripts, estilos ni atributos `style` en línea.

## Brand Commitments

- Wordmark tipográfico `am_`, nombre y subtítulo. No se introduce ningún logotipo de Tekhos no aprobado.
- Manrope (400–700) e IBM Plex Mono (400), autoalojadas.
- Ámbar cálido como acento en el tema oscuro y óxido en el claro; azul acero como señal.
- Vocabulario vetado: "fábrica" o "factoría de software", "digital workforce" y la palabra "actualmente" en textos de perfil.
- EN británico (`en_GB`); ES de España con tuteo e imperativo.

## Evidence on Hand

- Retrato aprobado: `web/assets/andres-retrato-definitivo.png`, camisa y americana negras, verificado por hash en el build. No se retoca.
- 16 experiencias documentadas en tarjetas, 18 organizaciones, 14 países, 8 sectores, 5 ecosistemas backend y 3 clouds más on-prem, cada cifra con su lista en `data-items` (ADR-003).
- Trayectoria: Chief Software Architect en PFS Group, fundador de FENORA, fundador de Team Cloud.
- Contacto confirmado: LinkedIn.
- **Ausente:** cifras de resultado por proyecto, testimonios, logotipos de clientes, email de contacto propio, totales de proyectos superiores a los comprobables. No se inventan.

## Product Principles

1. Cada cifra se puede comprobar en la propia página.
2. Evidencia antes que adjetivos: proyectos concretos, contexto identificado (cliente final, consultora, plataforma, producto propio o prueba de concepto).
3. El movimiento explica ingeniería; nunca decora ni bloquea el contenido.
4. Posicionamiento global: nunca se publica residencia ni ubicación personal.
5. No es un CV interminable: se presenta lo esencial y el detalle se explora con filtros y desplegables.

## Accessibility & Inclusion

WCAG 2.2 AA en los dos temas. Contraste de texto ≥ 4,5:1 (en el tema claro el acento es `#A24A28`), navegación completa por teclado, foco visible, contenido íntegro sin JavaScript y con `prefers-reduced-motion`, 0 violaciones serias o críticas de axe.
