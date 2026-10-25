// Build de la fase 1 (HTML estático): web/ -> dist/, que es lo que publica Amplify.
// Uso:
//   npm run build                      dist/ con noindex (entorno de desarrollo)
//   SITE_INDEXABLE=true npm run build  dist/ indexable (solo producción, lo decide Andrés)
//   SITE_URL=https://... npm run build canonical y og:image apuntan a ese dominio
//   npm run build:standalone           además, un HTML autónomo para revisión local
//
// Antes de copiar nada valida dos invariantes del proyecto:
//   1. El retrato aprobado es exactamente el archivo del manifiesto (SHA-256).
//   2. Cada cifra publicada coincide con el contenido que resume (ver docs/adr/ADR-003).
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WEB = join(ROOT, 'web');
const DIST = join(ROOT, 'dist');
const STANDALONE = join(ROOT, 'dist-standalone', 'andres-mejia-landing.html');
const PORTRAIT = 'assets/andres-retrato-definitivo.png';
const PORTRAIT_SHA256 = '9075e09dbbd93f301c09ed46869a6284f9652b7fa3a272f2490443ef76e99907';
const INDEXABLE = process.env.SITE_INDEXABLE === 'true';
const SITE_URL = process.env.SITE_URL?.replace(/\/+$/, '');
const MIME = { '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif' };

const fail = (message) => {
  console.error(`build failed: ${message}`);
  process.exit(1);
};

const decode = (text) =>
  text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function verifyPortrait() {
  const digest = createHash('sha256').update(await readFile(join(WEB, PORTRAIT))).digest('hex');
  if (digest !== PORTRAIT_SHA256) fail(`el retrato no es el aprobado (sha256 ${digest})`);
}

function validateClaims(html) {
  const cards = [...html.matchAll(/<article class="engagement[^"]*" data-project-category="(\w+)"/g)];
  const kpi = (name) => {
    const match = html.match(new RegExp(`data-kpi="${name}"[^>]*><strong class="kpi-value"><span data-count-to="(\\d+)"`));
    if (!match) fail(`falta el KPI ${name}`);
    return Number(match[1]);
  };
  if (kpi('engagements') !== cards.length) fail(`KPI engagements=${kpi('engagements')} pero hay ${cards.length} tarjetas`);
  for (const [, a, b] of html.matchAll(/(\d+) selected engagements|Show all (\d+) engagements/g)) {
    if (Number(a ?? b) !== cards.length) fail(`un texto dice ${a ?? b} experiencias y hay ${cards.length} tarjetas`);
  }

  // La evidencia tiene que estar fuera de las propias cifras: sus subtítulos se validarían a sí mismos.
  const evidence = decode(
    html
      .replace(/<div class="kpi" data-kpi=[\s\S]*?<\/div>/g, '')
      .replace(/<button type="button" class="stack-kpi[^>]*>[\s\S]*?<\/button>/g, '')
      .replace(/<[^>]+>/g, ' ')
  );
  let checked = 0;
  for (const [, rawItems, value] of html.matchAll(/data-items="([^"]+)"[^>]*>\s*<strong[^>]*><span data-count-to="(\d+)"/g)) {
    const items = decode(rawItems).split('|');
    if (items.length !== Number(value)) fail(`la cifra ${value} cuenta ${items.length} elementos: ${items.join(', ')}`);
    // Coincidencia de token completo: 'Go' no se valida con 'Google'.
    const missing = items.filter((item) => !new RegExp(`(?<![\\w.])${escapeRegExp(item)}(?![\\w])`, 'i').test(evidence));
    if (missing.length) fail(`la cifra ${value} cuenta elementos que no aparecen en la página: ${missing.join(', ')}`);
    checked++;
  }
  if (checked < 9) fail(`se esperaban al menos 9 cifras desglosadas y se validaron ${checked}`);

  const regions = [...html.matchAll(/data-region="(\d+)">[\s\S]*?<b>(\d+)<\/b><\/p><ul>([\s\S]*?)<\/ul>/g)];
  for (const [, declared, shown, items] of regions) {
    const listed = (items.match(/<li>/g) ?? []).length;
    if (!(Number(declared) === Number(shown) && Number(shown) === listed)) fail(`una región declara ${declared}, muestra ${shown} y lista ${listed} países`);
  }
  const countries = regions.reduce((sum, [, , shown]) => sum + Number(shown), 0);
  if (countries !== kpi('countries')) fail(`el KPI de países (${kpi('countries')}) no suma lo listado por región (${countries})`);
}

function applyEnvironment(html) {
  let out = html;
  if (SITE_URL) {
    out = out
      .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${SITE_URL}/">`)
      .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${SITE_URL}/${PORTRAIT}">`);
  } else {
    // Sin dominio definitivo no se declara canonical ni imagen social de otro alojamiento.
    out = out.replace(/<link rel="canonical"[^>]*>\n?/, '').replace(/<meta property="og:image"[^>]*>\n?/, '');
  }
  if (!INDEXABLE) out = out.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex, nofollow">');
  return out;
}

async function dataUri(path) {
  const mime = MIME[extname(path)] ?? 'application/octet-stream';
  return `data:${mime};base64,${(await readFile(path)).toString('base64')}`;
}

async function buildStandalone(html) {
  let css = await readFile(join(WEB, 'css/site.css'), 'utf8');
  for (const [match, asset] of [...css.matchAll(/url\(\.\.\/assets\/([^)]+)\)/g)]) {
    css = css.replace(match, `url(${await dataUri(join(WEB, 'assets', asset))})`);
  }
  let out = html.replace('<link rel="stylesheet" href="css/site.css">', () => `<style>\n${css}\n</style>`);
  const scripts = [...out.matchAll(/<script src="(js\/[^"]+)"><\/script>/g)];
  for (const [tag, src] of scripts) {
    const code = await readFile(join(WEB, src), 'utf8');
    out = out.replace(tag, () => `<script>\n${code}\n</script>`);
  }
  out = out.replace(/<link rel="preload"[^>]*>\n?/g, '');
  for (const [match, attr, asset] of [...out.matchAll(/(src|href)="assets\/([^"]+)"/g)]) {
    out = out.replace(match, `${attr}="${await dataUri(join(WEB, 'assets', asset))}"`);
  }
  await mkdir(dirname(STANDALONE), { recursive: true });
  await writeFile(STANDALONE, out);
  return (await stat(STANDALONE)).size;
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => (e.isDirectory() ? listFiles(join(dir, e.name)) : [join(dir, e.name)])));
  return nested.flat();
}

await verifyPortrait();
const source = await readFile(join(WEB, 'index.html'), 'utf8');
validateClaims(source);
const html = applyEnvironment(source);

await rm(DIST, { recursive: true, force: true });
await cp(WEB, DIST, { recursive: true });
await writeFile(join(DIST, 'index.html'), html);
await writeFile(join(DIST, 'robots.txt'), INDEXABLE ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n');

const files = await listFiles(DIST);
console.log(`dist/ listo · ${files.length} ficheros · ${INDEXABLE ? 'indexable' : 'noindex'}${SITE_URL ? ` · ${SITE_URL}` : ''}`);
if (process.argv.includes('--standalone')) {
  const size = await buildStandalone(html);
  console.log(`autónomo ${(size / 1048576).toFixed(2)} MiB → ${relative(ROOT, STANDALONE)}`);
}
