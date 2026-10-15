// Usage: node qa/capture.mjs <baseline|current> <baseUrl>
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const [name, base] = [process.argv[2], process.argv[3]];
const out = new URL(`./${name}/`, import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });

const VIEWPORTS = [[1440, 900], [1100, 800], [1000, 760], [768, 1024], [390, 844]];
const PAGES = { home: '/', workshop: '/workshop' };

// Next's runtime draws 2 Math.random() values at load; give those a separate stream so the sparkle stream lines up with the original page.
const SKIP = name === 'baseline' || name === 'baseline2' ? 0 : Number(process.env.RSKIP ?? 2);
const init = (SKIP) => {
  const FIXED = Date.parse('2026-10-20T10:00:00+05:30');
  const RD = Date;
  class MD extends RD {
    constructor(...a) { if (a.length === 0) super(FIXED); else super(...a); }
    static now() { return FIXED; }
  }
  window.Date = MD;
  let s = 20261031;
  let calls = 0; const pre = () => 0.5;
  Math.random = () => { if (calls++ < SKIP) return pre(); s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  });
  await page.waitForTimeout(600);
}
async function freeze(page) {
  await page.evaluate(async () => {
    document.getAnimations().forEach(a => { if (a instanceof CSSAnimation) { a.pause(); a.currentTime = 2000; } });
    for (const v of document.querySelectorAll('video')) { v.pause(); v.currentTime = 0; await new Promise(r => { if (v.readyState >= 2 && !v.seeking) r(); else v.addEventListener('seeked', r, { once: true }); setTimeout(r, 1500); }); }
  });
  await page.waitForTimeout(250);
}
async function open(browser, vw, vh, p) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.addInitScript(init, SKIP);
  const errors = [];
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(base + p, { waitUntil: 'load' });
  await settle(page);
  return { ctx, page, errors };
}
const shot = async (page, file, opts = {}) => { await freeze(page); await page.screenshot({ path: out + file, animations: 'allow', ...opts }); console.log('saved', file); };

const browser = await chromium.launch();
for (const [pn, p] of Object.entries(PAGES)) {
  for (const [vw, vh] of VIEWPORTS) {
    const { ctx, page } = await open(browser, vw, vh, p);
    await shot(page, `${pn}-full-${vw}.png`, { fullPage: true });
    await ctx.close();
  }
}
// home hero, pointer away / on her
{
  const { ctx, page } = await open(browser, 1440, 900, PAGES.home);
  await page.mouse.move(40, 500);
  await page.waitForTimeout(1600);
  await shot(page, 'home-hero-1440-away.png');
  const pt = await page.evaluate(() => {
    const img = document.querySelector('.model img'), r = img.getBoundingClientRect();
    const cv = document.createElement('canvas'); cv.width = 200; cv.height = Math.round(200 * img.naturalHeight / img.naturalWidth);
    const c = cv.getContext('2d'); c.drawImage(img, 0, 0, cv.width, cv.height);
    const y = Math.floor(cv.height * .5), d = c.getImageData(0, y, cv.width, 1).data; let sx = 0, n = 0;
    for (let x = 0; x < cv.width; x++) if (d[x * 4 + 3] > 100) { sx += x; n++; }
    return { x: r.left + (sx / n / cv.width) * r.width, y: r.top + r.height * .5 };
  });
  await page.mouse.move(pt.x - 10, pt.y, { steps: 4 });
  await page.mouse.move(pt.x, pt.y, { steps: 4 });
  await page.waitForTimeout(2200);
  const on = await page.evaluate(() => document.querySelector('.model').classList.contains('on'));
  console.log('model.on =', on);
  await shot(page, 'home-hero-1440-hover.png');
  await ctx.close();
}
// workshop form states
{
  const { ctx, page, errors } = await open(browser, 1440, 900, PAGES.workshop);
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.selectOption('#seats', '2');
  await page.evaluate(() => document.querySelector('#register').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(300);
  console.log('total text:', await page.textContent('#total'));
  await shot(page, 'workshop-form-2seats.png', { clip: await page.evaluate(() => { const r = document.querySelector('#register').getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }), fullPage: true });
  await page.fill('#name', 'Priya Raman');
  await page.fill('#phone', '9876543210');
  await page.fill('#area', 'Porur, Chennai');
  await page.click('button[type=submit]');
  await page.waitForTimeout(1200);
  await shot(page, 'workshop-form-submitted.png', { clip: await page.evaluate(() => { const r = document.querySelector('#register').getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }), fullPage: true });
  console.log('page errors:', errors);
  await ctx.close();
}
await browser.close();
