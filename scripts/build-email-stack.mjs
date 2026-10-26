// Genera infra/email/receiving.yml insertando infra/email/forwarder.py en la plantilla (CloudFormation admite código en línea de hasta 4096 caracteres).
// Uso: node scripts/build-email-stack.mjs [--check]   (con --check solo comprueba que el fichero generado está al día)
import { readFile, writeFile } from 'node:fs/promises';

const handler = await readFile('infra/email/forwarder.py', 'utf8');
if (handler.length >= 4096) throw new Error(`forwarder.py ocupa ${handler.length} caracteres: el límite en línea es 4096`);
const template = await readFile('infra/email/receiving.template.yml', 'utf8');
const indented = handler.trimEnd().split('\n').map((line) => (line ? `          ${line}` : '')).join('\n');
const output = template.replace('__HANDLER__', indented);
if (process.argv.includes('--check')) {
  const current = await readFile('infra/email/receiving.yml', 'utf8').catch(() => '');
  if (current !== output) { console.error('infra/email/receiving.yml no está al día: ejecuta node scripts/build-email-stack.mjs'); process.exit(1); }
  console.log('infra/email/receiving.yml al día');
} else {
  await writeFile('infra/email/receiving.yml', output);
  console.log(`infra/email/receiving.yml generado (forwarder de ${handler.length} caracteres)`);
}
