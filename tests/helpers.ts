import { expect, type Page } from '@playwright/test';

/** Freeze "now" to 2026-10-20T10:00:00+05:30 so the countdowns are stable. */
export async function freezeTime(page: Page) {
  await page.addInitScript(() => {
    const FIXED = Date.parse('2026-10-20T10:00:00+05:30'), RD = Date;
    class MD extends RD { constructor(...a: any[]) { if (a.length === 0) super(FIXED); else super(...(a as [any])); } static now() { return FIXED; } }
    (window as any).Date = MD;
  });
}

/** Collect console errors/warnings and page errors (hydration problems show up here). */
export function watchConsole(page: Page) {
  const bad: string[] = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) bad.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => bad.push(`[pageerror] ${e.message}`));
  return bad;
}

export async function ready(page: Page) {
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForLoadState('load');
  await page.waitForTimeout(500);
}

export async function noHorizontalScroll(page: Page) {
  const w = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, bw: document.body.scrollWidth }));
  expect(w.sw).toBeLessThanOrEqual(w.iw);
  expect(w.bw).toBeLessThanOrEqual(w.iw);
}

/** A point on her opaque pixels, and one inside the image box but on a transparent pixel. */
export async function modelPoints(page: Page) {
  return page.evaluate(() => {
    const img = document.querySelector('.model img') as HTMLImageElement, r = img.getBoundingClientRect();
    const cv = document.createElement('canvas'); cv.width = 200; cv.height = Math.round(200 * img.naturalHeight / img.naturalWidth);
    const c = cv.getContext('2d')!; c.drawImage(img, 0, 0, cv.width, cv.height);
    const row = (fy: number) => c.getImageData(0, Math.floor(cv.height * fy), cv.width, 1).data;
    const d = row(.5); let sx = 0, n = 0, empty = -1;
    for (let x = 0; x < cv.width; x++) { if (d[x * 4 + 3] > 100) { sx += x; n++; } else if (empty < 0 && d[x * 4 + 3] < 5) empty = x; }
    return {
      on: { x: r.left + (sx / n / cv.width) * r.width, y: r.top + r.height * .5 },
      off: { x: r.left + ((empty < 0 ? 2 : empty) + .5) / cv.width * r.width, y: r.top + r.height * .5 },
    };
  });
}
