# ADR-006: Correo de tekhos.com con SES (comodín y envío)

- **Estado:** aceptado
- **Fecha:** 2026-10-26
- **Decide:** Andrés

## Contexto

- Andrés necesita una dirección de dominio propio para el contacto de la landing (C1) y para validar la marca Tekhos: `andres.mejia@tekhos.com`, y más adelante `info@`, `support@`, `hola@` y otras sin tocar infraestructura.
- Más adelante habrá Google Workspace para Tekhos; hasta entonces basta con recibir en el Gmail personal y responder desde la dirección de Tekhos.
- La cuenta `966378755474` tiene SES en producción en eu-west-1. En esa región el conjunto de reglas de recepción activo es `fenora-dev-rules`, de FENORA, y SES solo admite un conjunto activo por región.

## Decisión

- **Recepción en us-east-1** con un conjunto propio (`tekhos-inbound`), independiente de FENORA. Una regla comodín para todo `@tekhos.com` guarda el correo en S3 (cifrado, privado, caducidad de 90 días) y una Lambda (`tekhos-email-forwarder`, Python) lo reenvía al buzón personal. El reenvío sale por SES de eu-west-1 con el remitente `Nombre (via direccion@tekhos.com) <direccion@tekhos.com>` y `Reply-To` del remitente original. Lo que SES marca como spam o virus se descarta.
- **Envío en eu-west-1:** identidad `tekhos.com` con DKIM de 2048 bits, MAIL FROM `mail.tekhos.com`, SPF en la raíz y DMARC en modo observación (`p=none`, informes a `dmarc@tekhos.com`, que recoge el comodín).
- **Responder desde Gmail ("Enviar como"):** usuario IAM `tekhos-ses-smtp` que solo puede usar `ses:SendRawEmail` como `*@tekhos.com`. `scripts/ses-smtp-secret.py` crea su clave, deriva la contraseña SMTP y la guarda en Secrets Manager (`tekhos/ses-smtp`, eu-west-1) sin imprimirla; con `--test` envía un correo de prueba usando el secreto.
- **Infraestructura como código:** `infra/email/sending.yml` y `infra/email/receiving.yml` (generado desde `receiving.template.yml` con `scripts/build-email-stack.mjs`), desplegadas con `scripts/deploy-email.sh`. Mismo patrón que la infraestructura del panel de me-beauty.

## Alternativas

| Opción | A favor | En contra |
|---|---|---|
| **A. SES: recepción en us-east-1, envío en eu-west-1** (elegida) | Independiente de FENORA; todo en la cuenta y como código; coste casi nulo | Dos identidades SES (DKIM por región) |
| B. Regla dentro de `fenora-dev-rules` en eu-west-1 | Una sola región | Acopla el correo de Tekhos a otro proyecto |
| C. Google Workspace ya | Buzón completo | Coste y alta de la empresa antes de tiempo |
| D. Reenvío de terceros (ImprovMX, Cloudflare Email Routing) | Muy simple | Otro proveedor; Cloudflare exige mover el DNS |

## Consecuencias

- El MX de la raíz de `tekhos.com` apunta a SES us-east-1. **Al pasar a Google Workspace** hay que sustituir el MX, añadir `include:_spf.google.com` al SPF de la raíz, activar DKIM de Google y retirar o adaptar la pila de recepción.
- El reenvío reescribe el remitente: en Gmail, "Responder" va al remitente original gracias a `Reply-To`.
- Los correos se conservan 90 días en S3 y los registros de la Lambda, 30.
- La credencial SMTP se rota volviendo a ejecutar `scripts/ses-smtp-secret.py` (crea la nueva, la guarda y retira la anterior); después hay que actualizarla en Gmail.
- Estos recursos son de la empresa, no de la landing: cuando exista el repositorio de Tekhos, `infra/email/` se mueve allí.
