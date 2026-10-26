import email, json, os
from email import policy
from email.utils import formataddr, parseaddr
import boto3

s3 = boto3.client("s3")
ses = boto3.client("ses", region_name=os.environ["SES_REGION"])
BUCKET, PREFIX, TO = os.environ["BUCKET"], os.environ["PREFIX"], os.environ["FORWARD_TO"]
DROP = ("DKIM-Signature", "Return-Path", "Sender", "Message-ID", "Reply-To",
        "Authentication-Results", "Received-SPF", "X-SES-Spam-Verdict",
        "X-SES-Virus-Verdict", "X-SES-RECEIPT", "X-SES-DKIM-SIGNATURE")


def handler(event, _context):
    rec = event["Records"][0]["ses"]
    receipt, mail = rec["receipt"], rec["mail"]
    mid = mail["messageId"]
    verdicts = {k: receipt.get(k, {}).get("status") for k in ("spamVerdict", "virusVerdict")}
    if "FAIL" in verdicts.values():
        print(json.dumps({"dropped": mid, **verdicts}))
        return
    raw = s3.get_object(Bucket=BUCKET, Key=PREFIX + mid)["Body"].read()
    msg = email.message_from_bytes(raw, policy=policy.SMTP)
    name, addr = parseaddr(msg.get("From", ""))
    reply_to = msg.get("Reply-To") or addr
    # Remitente: la dirección de tekhos.com que recibió el correo (dominio verificado en SES).
    rcpt = next((r for r in receipt["recipients"] if r.lower().endswith("@" + os.environ["DOMAIN"])),
                receipt["recipients"][0])
    for header in DROP + ("From",):
        del msg[header]
    msg["From"] = formataddr((f"{name or addr} (via {rcpt})", rcpt))
    msg["Reply-To"] = reply_to
    msg["X-Original-From"] = addr
    ses.send_raw_email(Source=rcpt, Destinations=[TO], RawMessage={"Data": msg.as_bytes()})
    print(json.dumps({"forwarded": mid, "to": rcpt}))
