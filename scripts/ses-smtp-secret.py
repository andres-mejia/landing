#!/usr/bin/env python3
"""Credenciales SMTP de SES para enviar como *@tekhos.com (ADR-006).

Crea una clave de acceso para el usuario IAM tekhos-ses-smtp, deriva la contraseña SMTP de SES
(firma SigV4 documentada por AWS) y la guarda en Secrets Manager como tekhos/ses-smtp.
Nunca imprime la clave ni la contraseña.

  python3 scripts/ses-smtp-secret.py            crea o rota la credencial (borra la clave anterior)
  python3 scripts/ses-smtp-secret.py --test TO  envía un correo de prueba por SMTP usando el secreto

Para "Enviar como" en Gmail, Andrés copia usuario y contraseña desde la consola de Secrets Manager.
"""
import argparse, base64, hashlib, hmac, json, smtplib, sys
from email.message import EmailMessage
from email.utils import formatdate, make_msgid

import boto3

PROFILE, ACCOUNT, REGION = "fintrack-dev", "966378755474", "eu-west-1"
USER, SECRET = "tekhos-ses-smtp", "tekhos/ses-smtp"
HOST, PORT = f"email-smtp.{REGION}.amazonaws.com", 587
FROM = "andres.mejia@tekhos.com"


def smtp_password(secret_key: str, region: str) -> str:
    def sign(key: bytes, msg: str) -> bytes:
        return hmac.new(key, msg.encode(), hashlib.sha256).digest()
    sig = sign(("AWS4" + secret_key).encode(), "11111111")
    for part in (region, "ses", "aws4_request", "SendRawEmail"):
        sig = sign(sig, part)
    return base64.b64encode(bytes([0x04]) + sig).decode()


def session() -> boto3.Session:
    s = boto3.Session(profile_name=PROFILE, region_name=REGION)
    account = s.client("sts").get_caller_identity()["Account"]
    if account != ACCOUNT:
        sys.exit(f"La cuenta es {account} y debe ser {ACCOUNT}: se para.")
    return s


def rotate(s: boto3.Session) -> None:
    iam, sm = s.client("iam"), s.client("secretsmanager")
    old = [k["AccessKeyId"] for k in iam.list_access_keys(UserName=USER)["AccessKeyMetadata"]]
    if len(old) >= 2:
        sys.exit("El usuario ya tiene dos claves: revísalas antes de rotar.")
    key = iam.create_access_key(UserName=USER)["AccessKey"]
    value = json.dumps({
        "username": key["AccessKeyId"],
        "password": smtp_password(key["SecretAccessKey"], REGION),
        "host": HOST, "port": PORT, "iam_user": USER, "from": FROM,
    })
    try:
        sm.put_secret_value(SecretId=SECRET, SecretString=value)
        action = "actualizado"
    except sm.exceptions.ResourceNotFoundException:
        sm.create_secret(Name=SECRET, SecretString=value,
                         Description="SMTP de SES para enviar como *@tekhos.com (usuario IAM tekhos-ses-smtp)")
        action = "creado"
    for key_id in old:
        iam.delete_access_key(UserName=USER, AccessKeyId=key_id)
    print(f"Secreto {SECRET} {action} en {REGION}; claves anteriores retiradas: {len(old)}.")
    print("La clave nueva tarda unos minutos en propagarse antes de poder autenticarse en SMTP.")


def test(s: boto3.Session, to: str) -> None:
    cred = json.loads(s.client("secretsmanager").get_secret_value(SecretId=SECRET)["SecretString"])
    msg = EmailMessage()
    msg["From"], msg["To"] = f"Andrés Mejía <{cred['from']}>", to
    msg["Subject"] = "Prueba SMTP de SES (tekhos.com)"
    msg["Date"], msg["Message-ID"] = formatdate(localtime=True), make_msgid(domain="tekhos.com")
    msg.set_content("Correo de prueba enviado por SMTP de SES con las credenciales de Secrets Manager.")
    with smtplib.SMTP(cred["host"], cred["port"], timeout=30) as smtp:
        smtp.starttls()
        smtp.login(cred["username"], cred["password"])
        smtp.send_message(msg)
    print(f"Correo de prueba enviado a {to} desde {cred['from']}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--test", metavar="TO", help="envía un correo de prueba a TO usando el secreto")
    args = parser.parse_args()
    s = session()
    test(s, args.test) if args.test else rotate(s)
