// Valida amplify.yml antes de hacer push: YAML correcto, todos los comandos son cadenas
// y la salida es dist/. Uso: npm run check:deploy
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const spec = parse(await readFile(new URL('../amplify.yml', import.meta.url), 'utf8'));
const errors = [];
const phases = spec?.frontend?.phases ?? {};
for (const [phase, { commands = [] } = {}] of Object.entries(phases)) {
  commands.forEach((cmd, i) => {
    if (typeof cmd !== 'string') errors.push(`${phase}.commands[${i}] no es una cadena: ${JSON.stringify(cmd)}`);
  });
}
if (spec?.frontend?.artifacts?.baseDirectory !== 'dist') errors.push('artifacts.baseDirectory debe ser "dist"');
if (errors.length) {
  console.error(`amplify.yml no es válido:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('amplify.yml OK');
