// Servidor estático para tests y revisión local. Aplica las cabeceras de customHttp.yml
// (incluida la CSP), para que los tests vean exactamente lo que servirá Amplify.
// Uso: node scripts/serve-static.mjs [dir=dist] [port=4173]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { parse } from 'yaml';

const root = resolve(process.argv[2] ?? 'dist');
const port = Number(process.argv[3] ?? 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json',
};
const rules = parse(await readFile(new URL('../customHttp.yml', import.meta.url), 'utf8'))?.customHeaders ?? [];
// Patrones de Amplify: '**/*' es todo; 'dir/*' y 'dir/**' son prefijos.
const matches = (pattern, path) => pattern === '**/*' || path.startsWith(pattern.replace(/\*+.*$/, ''));

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
  const file = normalize(join(root, relativePath));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const info = await stat(file);
    const target = info.isDirectory() ? join(file, 'index.html') : file;
    const body = await readFile(target);
    const headers = { 'Content-Type': TYPES[extname(target)] ?? 'application/octet-stream' };
    for (const rule of rules) if (matches(rule.pattern, relativePath)) for (const h of rule.headers) headers[h.key] = h.value;
    res.writeHead(200, headers).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found');
  }
}).listen(port, () => console.log(`sirviendo ${root} en http://localhost:${port}`));
