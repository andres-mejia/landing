#!/usr/bin/env bash
# Despliega (o actualiza) el correo de tekhos.com (ADR-006): envío en eu-west-1 y recepción comodín en us-east-1.
# No imprime ningún secreto. Uso: FORWARD_TO=buzon@personal scripts/deploy-email.sh
set -euo pipefail
cd "$(dirname "$0")/.."
PROFILE=fintrack-dev
ACCOUNT=966378755474
SEND_REGION=eu-west-1
RECV_REGION=us-east-1
: "${FORWARD_TO:?Falta FORWARD_TO (buzón personal que recibe el reenvío)}"

actual=$(aws sts get-caller-identity --profile "$PROFILE" --query Account --output text)
if [ "$actual" != "$ACCOUNT" ]; then echo "La cuenta es $actual y debe ser $ACCOUNT: se para." >&2; exit 1; fi

node scripts/build-email-stack.mjs --check

echo "==> Envío (SES $SEND_REGION): identidad, DKIM, MAIL FROM, SPF, DMARC y usuario SMTP"
aws cloudformation deploy --profile "$PROFILE" --region "$SEND_REGION" \
  --template-file infra/email/sending.yml --stack-name tekhos-email-sending \
  --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset >/dev/null

echo "==> Recepción (SES $RECV_REGION): MX, S3, Lambda y regla comodín"
aws cloudformation deploy --profile "$PROFILE" --region "$RECV_REGION" \
  --template-file infra/email/receiving.yml --stack-name tekhos-email-receiving \
  --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset \
  --parameter-overrides "ForwardTo=$FORWARD_TO" >/dev/null

# CloudFormation no puede activar un conjunto de reglas; en us-east-1 es el único de la cuenta.
active=$(aws ses describe-active-receipt-rule-set --profile "$PROFILE" --region "$RECV_REGION" --query 'Metadata.Name' --output text)
if [ "$active" != "tekhos-inbound" ]; then
  if [ "$active" != "None" ]; then echo "Hay otro conjunto activo en $RECV_REGION ($active): se para sin cambiarlo." >&2; exit 1; fi
  aws ses set-active-receipt-rule-set --profile "$PROFILE" --region "$RECV_REGION" --rule-set-name tekhos-inbound
  echo "    conjunto tekhos-inbound activado"
fi

for r in "$SEND_REGION" "$RECV_REGION"; do
  aws sesv2 get-email-identity --profile "$PROFILE" --region "$r" --email-identity tekhos.com \
    --query '{region:'"'$r'"',verificado:VerifiedForSendingStatus,dkim:DkimAttributes.Status,mailfrom:MailFromAttributes.MailFromDomainStatus}' --output json
done
