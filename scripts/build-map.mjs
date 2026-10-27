// Genera web/assets/world-dots.svg: mapa del mundo en puntos (proyección equirrectangular) a partir de Natural Earth
// (paquete world-atlas, licencia ISC). Se ejecuta una vez y el SVG se versiona; la página no descarga nada externo.
// Uso:
//   node scripts/build-map.mjs          regenera el SVG
//   node scripts/build-map.mjs --pins   imprime las coordenadas de los puntos de países para web/index.html
//   node scripts/build-map.mjs --check  falla si el SVG versionado no coincide con lo que se generaría
import { readFile, writeFile } from 'node:fs/promises';
import { feature } from 'topojson-client';

export const MAP = { scale: 5, north: 84, south: -58, step: 1.5 };
export const WIDTH = 360 * MAP.scale;
export const HEIGHT = (MAP.north - MAP.south) * MAP.scale;
const OUT = 'web/assets/world-dots.svg';

// Países de clientes y equipos (banda de cifras). Coordenadas del centro aproximado de cada país, nunca de una ciudad.
export const COUNTRIES = {
  Spain: [40.2, -3.6], Portugal: [39.6, -8.0], France: [46.6, 2.4], Germany: [51.1, 10.4], Austria: [47.6, 14.1],
  Switzerland: [46.8, 8.2], Netherlands: [52.2, 5.5], 'United States': [39.8, -98.6], Mexico: [23.6, -102.5],
  'Costa Rica': [9.9, -84.1], Colombia: [4.1, -73.0], Peru: [-9.2, -75.0], Chile: [-35.7, -71.5],
  Argentina: [-34.0, -64.0], Israel: [31.4, 35.0], Egypt: [26.8, 30.8],
};

export const project = ([lat, lon]) => [Math.round((lon + 180) * MAP.scale * 10) / 10, Math.round((MAP.north - lat) * MAP.scale * 10) / 10];

function inRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

async function landPolygons() {
  const topo = JSON.parse(await readFile(new URL('../node_modules/world-atlas/land-50m.json', import.meta.url), 'utf8'));
  const geo = feature(topo, topo.objects.land);
  const polygons = [];
  for (const f of geo.features ?? [geo]) {
    const g = f.geometry;
    for (let poly of g.type === 'Polygon' ? [g.coordinates] : g.coordinates) {
      // Polígonos que cruzan el antimeridiano (Eurasia por Chukotka): se desenrolla cada anillo de forma continua,
      // así quedan longitudes por encima de 180 en lugar de un salto de -180 a 180 que rompe el recuento de cruces.
      const wraps = poly[0].some(([x], i, ring) => i && Math.abs(x - ring[i - 1][0]) > 180);
      if (wraps) poly = poly.map((ring) => {
        let offset = 0;
        return ring.map(([x, y], i) => {
          if (i) { const jump = x - ring[i - 1][0]; if (jump > 180) offset -= 360; else if (jump < -180) offset += 360; }
          return [x + offset, y];
        });
      });
      const xs = poly[0].map((p) => p[0]);
      const ys = poly[0].map((p) => p[1]);
      polygons.push({ rings: poly, wraps, box: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] });
    }
  }
  return polygons;
}

async function render() {
  const polygons = await landPolygons();
  const isLand = (lon0, lat) => polygons.some(({ rings, box, wraps }) => {
    const test = (lon) => lon >= box[0] && lon <= box[2] && lat >= box[1] && lat <= box[3] &&
      inRing(lon, lat, rings[0]) && !rings.slice(1).some((hole) => inRing(lon, lat, hole));
    return test(lon0) || (wraps && (test(lon0 + 360) || test(lon0 - 360)));
  });
  const dots = [];
  let row = 0;
  for (let lat = MAP.north - MAP.step / 2; lat > MAP.south; lat -= MAP.step, row++) {
    // Filas alternas desplazadas medio paso: retícula hexagonal, más orgánica que una cuadrícula.
    for (let lon = -180 + MAP.step / 2 + (row % 2 ? MAP.step / 2 : 0); lon < 180; lon += MAP.step) {
      if (isLand(lon, lat)) dots.push(project([lat, lon]));
    }
  }
  const d = dots.map(([x, y]) => `M${x} ${y}h0`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">` +
    `<!-- Natural Earth (dominio público) vía world-atlas 2.0.2 (ISC). Generado por scripts/build-map.mjs. ${dots.length} puntos. -->` +
    `<symbol id="land" viewBox="0 0 ${WIDTH} ${HEIGHT}"><path d="${d}" fill="none" stroke="currentColor" stroke-width="${(MAP.step * MAP.scale * 0.46).toFixed(2)}" stroke-linecap="round"/></symbol></svg>\n`;
  return { svg, count: dots.length };
}

if (process.argv.includes('--pins')) {
  for (const [name, coords] of Object.entries(COUNTRIES)) console.log(name.padEnd(14), project(coords).join(' '));
} else {
  const { svg, count } = await render();
  if (process.argv.includes('--check')) {
    const current = await readFile(OUT, 'utf8').catch(() => '');
    if (current !== svg) { console.error(`${OUT} no está al día: ejecuta node scripts/build-map.mjs`); process.exit(1); }
    console.log(`${OUT} al día (${count} puntos)`);
  } else {
    await writeFile(OUT, svg);
    console.log(`${OUT} generado: ${count} puntos, ${(svg.length / 1024).toFixed(1)} KB`);
  }
}
