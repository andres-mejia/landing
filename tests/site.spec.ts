import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Contra dist/ servido con customHttp.yml: cualquier violación de CSP aparece como error de consola.

type Lang = 'en' | 'es';
type Theme = 'dark' | 'light';

async function open(page: Page, { lang = 'en', theme = 'dark' }: { lang?: Lang; theme?: Theme } = {}) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(([l, t]) => {
    localStorage.setItem('andres-language', l);
    localStorage.setItem('andres-theme', t);
  }, [lang, theme]);
  await page.goto('/');
  await page.waitForFunction(() => document.documentElement.classList.contains('is-ready'));
  return errors;
}

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
}

test.describe('carga limpia', () => {
  for (const lang of ['en', 'es'] as const) {
    for (const theme of ['dark', 'light'] as const) {
      test(`sin errores de consola ni CSP · ${lang} · ${theme}`, async ({ page }) => {
        const errors = await open(page, { lang, theme });
        await scrollThrough(page);
        await page.waitForTimeout(300);
        expect(errors).toEqual([]);
      });
    }
  }

  test('noindex y robots.txt cerrados por defecto', async ({ page, request }) => {
    await open(page);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  });

  test('cabeceras de seguridad de customHttp.yml', async ({ request }) => {
    const headers = (await request.get('/')).headers();
    expect(headers['content-security-policy']).toContain("script-src 'self'");
    expect(headers['x-content-type-options']).toBe('nosniff');
  });
});

test.describe('maquetación', () => {
  for (const lang of ['en', 'es'] as const) {
    for (const width of [320, 360, 390, 768, 1024, 1440]) {
      test(`sin scroll horizontal de página · ${lang} · ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await open(page, { lang });
        await scrollThrough(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        const headerOverflow = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          return [...document.querySelectorAll('header *')].filter((el) => (el as HTMLElement).offsetParent && el.getBoundingClientRect().right > vw + 1).length;
        });
        expect(headerOverflow).toBe(0);
      });
    }
  }

  test('ninguna línea del H1 se sale de su columna', async ({ page }) => {
    for (const lang of ['en', 'es'] as const) {
      for (const width of [320, 390, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        await open(page, { lang });
        const over = await page.evaluate(() => {
          const column = document.querySelector('.hero-copy')!.getBoundingClientRect().right;
          return [...document.querySelectorAll('.hero h1 .line > span')].filter((s) => s.getBoundingClientRect().right > column + 1).map((s) => s.textContent);
        });
        expect(over, `${lang} ${width}px`).toEqual([]);
      }
    }
  });

  test('el header sigue visible al hacer scroll y marca la sección', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page);
    await page.locator('#experiencia').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const header = page.locator('[data-header]');
    await expect(header).toHaveClass(/is-scrolled/);
    expect((await header.boundingBox())!.y).toBe(0);
    await expect(page.locator('.main-nav a[aria-current="true"]')).toHaveAttribute('href', '#experiencia');
  });
});

test.describe('pipeline', () => {
  test('vertical en móvil y tablet, sin scroll horizontal', async ({ page }) => {
    for (const width of [320, 390, 768, 860]) {
      await page.setViewportSize({ width, height: 900 });
      await open(page, { lang: 'es' });
      await expect(page.locator('.factory-svg--v')).toBeVisible();
      await expect(page.locator('.factory-svg--h')).toBeHidden();
      const scrolls = await page.evaluate(() => { const v = document.querySelector('.factory-viewport')!; return v.scrollWidth > v.clientWidth + 1; });
      expect(scrolls, `${width}px`).toBe(false);
    }
  });

  test('horizontal en escritorio; las etapas se seleccionan', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page);
    await expect(page.locator('.factory-svg--h')).toBeVisible();
    await page.locator('#factory').scrollIntoViewIfNeeded();
    await page.locator('[data-stage="3"]').click();
    await expect(page.locator('[data-stage="3"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#stage-number')).toHaveText('04 / VERIFY THE OUTCOME');
    await page.locator('[data-context="mcp"]').click();
    await expect(page.locator('[data-stage="2"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#factory')).toHaveAttribute('data-context', 'mcp');
  });
});

test.describe('idiomas', () => {
  test('EN → ES → EN conserva textos dinámicos y no deja overlays', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page);
    await page.locator('#factory').scrollIntoViewIfNeeded();
    await page.locator('[data-stage="3"]').click();
    await page.locator('[data-language="es"]').click();
    await page.waitForTimeout(900);
    await expect(page.locator('#stage-number')).toHaveText('04 / VERIFICAR EL RESULTADO');
    await expect(page.locator('.hero .eyebrow')).toContainText('Claridad antes que complejidad');
    await page.locator('[data-language="en"]').click();
    await page.waitForTimeout(900);
    await expect(page.locator('#stage-number')).toHaveText('04 / VERIFY THE OUTCOME');
    await expect(page.locator('.hero .eyebrow')).toContainText('Clarity before complexity');
    expect(await page.locator('.decode-overlay').count()).toBe(0);
  });

  test('en español no queda texto en inglés tras recorrer los estados dinámicos', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page, { lang: 'es' });
    const leftovers = new Set<string>();
    const collect = async () => {
      const found = await page.evaluate(() => {
        const english = /\b(the|and|with|from|your|my|to|for|of|built|open|see|select|scroll|explore|showing|engagements|counted)\b/i;
        const allow = /^(Open Banking|end-to-end|Hands-on)$|Open Banking|end-to-end/i;
        const out: string[] = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const parent = (node as Text).parentElement!;
          if (parent.closest('script,style,[data-i18n-skip]')) continue;
          const text = node.nodeValue!.trim();
          if (text && english.test(text) && !allow.test(text)) out.push(text);
        }
        return out;
      });
      found.forEach((t) => leftovers.add(t));
    };
    await collect();
    for (let i = 0; i < 5; i++) { await page.locator(`[data-stage="${i}"]`).click(); await collect(); }
    for (const c of ['rag', 'mcp', 'harness']) { await page.locator(`[data-context="${c}"]`).click(); await collect(); }
    for (const f of ['finance', 'commerce', 'platforms', 'product', 'all']) { await page.locator(`[data-project-filter="${f}"]`).click(); await collect(); }
    await page.locator('.project-more').click();
    await collect();
    expect([...leftovers]).toEqual([]);
    expect(await page.title()).toBe('Andrés Mejía — Arquitectura de software que evoluciona.');
  });
});

test.describe('tema', () => {
  test('el cambio de tema persiste y actualiza theme-color', async ({ page }) => {
    // Sin addInitScript: la recarga debe leer lo que guardó el clic, no un valor inyectado.
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await page.evaluate(() => localStorage.getItem('andres-theme'))).toBe('light');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#F6F5F2');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('el tema claro cubre las secciones que antes quedaban oscuras', async ({ page }) => {
    await open(page, { theme: 'light' });
    const backgrounds = await page.evaluate(() =>
      ['.header', '.hero', '#factory', '#experiencia', '#contacto'].map((s) => getComputedStyle(document.querySelector(s)!).backgroundColor));
    for (const bg of backgrounds) {
      const [r, g, b] = bg.match(/\d+/g)!.map(Number);
      expect((r + g + b) / 3, bg).toBeGreaterThan(200);
    }
  });
});

test.describe('cifras', () => {
  test('KPIs e insights coinciden con el contenido', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page);
    await scrollThrough(page);
    await page.waitForTimeout(1800);
    const kpis = await page.locator('.kpi [data-count-to]').allTextContents();
    expect(kpis).toEqual(['16', '38', '16', '16']);
    expect(await page.locator('.region li').count()).toBe(16);
    expect(await page.locator('.engagement').count()).toBe(16);
    await expect(page.locator('.recurring li').first()).toContainText('Event streaming (Kafka)');
    await expect(page.locator('.recurring li').first()).toContainText('5 / 16');
    await page.locator('[data-project-filter="finance"]').click();
    await expect(page.locator('#project-count')).toHaveText('4 selected engagements');
  });

  test('capacidades: 6 áreas con 5 tecnologías como máximo y 30 en total', async ({ page }) => {
    await open(page);
    const areas = page.locator('#capabilities .capability');
    await expect(areas).toHaveCount(6);
    const perArea = await areas.evaluateAll((els) => els.map((el) => el.querySelectorAll('.capability-tech li').length));
    for (const n of perArea) expect(n).toBeLessThanOrEqual(5);
    expect(perArea.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(30);
    for (const text of await areas.locator('.capability-projects').allTextContents()) expect(text.length).toBeGreaterThan(20);
    expect(await page.locator('.stack-kpi, [data-tech-select], .technology-panel').count()).toBe(0);
  });
});

test.describe('experiencia', () => {
  test('los 6 destacados, uno por sector, van primero y son los visibles al cargar', async ({ page }) => {
    await open(page);
    const featured = ['Santander', 'Reale Seguros', 'Indra / Minsait · Beabloo', 'Iberia Airlines', 'Indra / Minsait → INE Chile', 'FENORA'];
    expect(await page.locator('.engagement[data-featured] .engagement-org').allTextContents()).toEqual(featured);
    expect(await page.locator('.engagement:visible .engagement-org').allTextContents()).toEqual(featured);
    for (const tags of await page.locator('.engagement').evaluateAll((els) => els.map((el) => el.querySelectorAll('.engagement-tags li').length))) {
      expect(tags).toBeLessThanOrEqual(4);
    }
  });
});

test.describe('contacto', () => {
  test('correo visible como acción principal y LinkedIn como alternativa, sin formularios', async ({ page }) => {
    await open(page);
    const email = page.locator('#contacto a[href="mailto:andres.mejia@tekhos.com"]');
    await expect(email).toBeVisible();
    await expect(email).toContainText('andres.mejia@tekhos.com');
    await expect(page.locator('#contacto a[href="https://www.linkedin.com/in/andresmejiatcl/"]')).toBeVisible();
    expect(await page.locator('form').count()).toBe(0);
    expect(await page.locator('main h2').evaluateAll((hs) => hs.filter((h) => h.previousElementSibling?.classList.contains('eyebrow')).length)).toBe(0);
  });
});

test.describe('cartera de clientes', () => {
  test('30 clientes en 5 canales, con enlaces solo a los socios', async ({ page }) => {
    await open(page);
    await expect(page.locator('.channel')).toHaveCount(5);
    await expect(page.locator('.channel li')).toHaveCount(30);
    for (const link of await page.locator('.channel-name a, .milestone-links a').all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(await page.locator('.channel li a').count()).toBe(0);
  });
});

test.describe('trayectoria', () => {
  test('5 hitos con sus periodos, liderazgo e idiomas en los dos idiomas', async ({ page }) => {
    await open(page);
    const milestones = page.locator('#trayectoria .milestone');
    await expect(milestones).toHaveCount(5);
    expect(await milestones.locator('h3').allTextContents()).toEqual(['Early career', 'Team Cloud', 'PFS Group', 'FENORA', 'Tekhos']);
    expect(await milestones.locator('.milestone-period').allTextContents()).toEqual(['2005 – 2012', '2012 – 2021', '2019 – 2024', 'Since 2025', 'Since 2026']);
    await expect(page.locator('#trayectoria .leadership')).toContainText('up to 12 people');
    // Carriles proporcionales: cada barra empieza donde dice su año y las etapas abiertas llegan a "hoy".
    await page.locator('.journey-chart').scrollIntoViewIfNeeded();
    await expect(page.locator('.journey-chart')).toHaveClass(/is-live/);
    await expect(page.locator('.journey-chart')).toHaveAttribute('data-reveal', 'visible');
    await page.waitForTimeout(2200);
    const bars = await page.locator('.milestone-bar').evaluateAll((els) => els.map((el) => { const r = el.getBoundingClientRect(); return { left: r.left, width: r.width }; }));
    expect(bars).toHaveLength(5);
    for (const bar of bars) expect(bar.width).toBeGreaterThan(5);
    for (let i = 1; i < bars.length; i++) expect(bars[i].left).toBeGreaterThan(bars[i - 1].left);
    await expect(page.locator('#trayectoria .is-ongoing')).toHaveCount(2);
    await expect(page.locator('.journey-now')).toBeVisible();
    await expect(page.locator('.main-nav a[href="#trayectoria"]')).toHaveText('Track record');
    await page.locator('[data-language="es"]').click();
    await expect(milestones.locator('.milestone-period').nth(3)).toHaveText('Desde 2025');
    await expect(page.locator('#trayectoria .languages dd')).toHaveText('Español (nativo) · Inglés (nivel profesional)');
  });
});

test.describe('mapa de países', () => {
  test('un punto por país, en el orden de la leyenda, y vivo solo en pantalla', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page);
    const map = page.locator('.world-map');
    await expect(map).toHaveAttribute('aria-hidden', 'true');
    await expect(map.locator('.pin')).toHaveCount(16);
    await expect(page.locator('.region li')).toHaveCount(16);
    await map.scrollIntoViewIfNeeded();
    await expect(map).toHaveClass(/is-live/);
    await page.locator('.region li').first().hover();
    await expect(map.locator('.pin').first()).toHaveClass(/is-active/);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(map).not.toHaveClass(/is-live/);
  });
});

test.describe('movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });
  test('todo el contenido visible y el pipeline detenido', async ({ page }) => {
    await open(page);
    expect(await page.locator('[data-reveal="waiting"]').count()).toBe(0);
    await expect(page.locator('#pipeline-status')).toHaveText('Reduced motion enabled');
    await expect(page.locator('#factory')).toHaveAttribute('data-factory-running', 'false');
    const transform = await page.locator('.hero h1 .line > span').first().evaluate((el) => getComputedStyle(el).transform);
    expect(transform).toBe('none');
    await page.locator('.world-map').scrollIntoViewIfNeeded();
    await expect(page.locator('.world-map')).not.toHaveClass(/is-live/);
    await page.locator('.journey-chart').scrollIntoViewIfNeeded();
    await expect(page.locator('.journey-chart')).not.toHaveClass(/is-live/);
  });
});

test.describe('accesibilidad (axe)', () => {
  for (const theme of ['dark', 'light'] as const) {
    test(`sin violaciones graves o críticas · ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await open(page, { theme });
      await scrollThrough(page);
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.scrollTo(0, 0));
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => `${v.id}: ${v.nodes.length} nodos (${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')})`);
      expect(serious).toEqual([]);
    });
  }
});

test.describe('presupuesto de texto', () => {
  test.use({ reducedMotion: 'reduce' });
  // SC-001 de la spec 001: palabras de <main> en inglés (total, incluido lo plegable); se anotan también las visibles sin desplegar.
  // El umbral se activa al cerrar la spec (T015); hasta entonces solo se mide y se anota.
  const WORD_BUDGET: { total: number; visible: number } | null = null;
  test('palabras de la página en inglés', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page);
    // Total: todo el texto de <main>, incluido lo plegado (desplegables, tarjetas ocultas), sin SVG ni copias visuales.
    const { visible, total } = await page.evaluate(() => {
      const count = (text: string) => (text.match(/[A-Za-zÀ-ÿ0-9][\w'’./+-]*/g) ?? []).length;
      const main = document.querySelector('main') as HTMLElement;
      const clone = main.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('svg,script,[data-i18n-skip],.decode-overlay').forEach((el) => el.remove());
      return { visible: count(main.innerText), total: count(clone.textContent ?? '') };
    });
    test.info().annotations.push({ type: 'palabras', description: `visibles ${visible} · total ${total}` });
    console.log(`palabras en <main>: visibles ${visible} · total ${total}`);
    if (WORD_BUDGET !== null) {
      expect(total).toBeLessThanOrEqual(WORD_BUDGET.total);
      expect(visible).toBeLessThanOrEqual(WORD_BUDGET.visible);
    }
  });
});
