import { expect, test } from '@playwright/test';
import { freezeTime, modelPoints, noHorizontalScroll, ready, watchConsole } from './helpers';

const filterOf = (page: import('@playwright/test').Page) => page.$eval('.model img', (i) => getComputedStyle(i).filter);

test.describe('home', () => {
  test.beforeEach(async ({ page }) => { await freezeTime(page); });

  test('loads cleanly: no console errors / hydration warnings, no horizontal scroll at 390', async ({ page }) => {
    const bad = watchConsole(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/'); await ready(page);
    await noHorizontalScroll(page);
    expect(bad).toEqual([]);
  });

  test('model is black and white; colour + gold glow + sparkles only on her opaque pixels', async ({ page }) => {
    await page.goto('/'); await ready(page);
    expect(await filterOf(page)).toContain('grayscale(1)');
    const pts = await modelPoints(page);

    await page.mouse.move(pts.off.x, pts.off.y, { steps: 3 });
    await page.waitForTimeout(1300);
    await expect(page.locator('.model')).not.toHaveClass(/\bon\b/);
    expect(await filterOf(page)).toContain('grayscale(1)');
    expect(await page.$eval('#herSpk', (e) => getComputedStyle(e).opacity)).toBe('0');

    await page.mouse.move(pts.on.x, pts.on.y, { steps: 3 });
    await expect(page.locator('.model')).toHaveClass(/\bon\b/);
    await page.waitForTimeout(1400);
    expect(await filterOf(page)).toContain('grayscale(0)');
    expect(await page.$eval('#herSpk', (e) => getComputedStyle(e).opacity)).toBe('1');
    expect(await page.$eval('.glow', (e) => getComputedStyle(e).opacity)).toBe('1');
    expect(await page.locator('#herSpk .spk').count()).toBe(16);

    await page.mouse.move(pts.off.x, pts.off.y, { steps: 3 });
    await expect(page.locator('.model')).not.toHaveClass(/\bon\b/);
  });

  test('hover hint copy', async ({ page }) => {
    await page.goto('/'); await ready(page);
    await expect(page.locator('#hintText')).toHaveText('Hover over her to reveal the look');
  });

  test.describe('touch', () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    test('tapping her toggles colour + sparkles and the hint text', async ({ page }) => {
      await page.goto('/'); await ready(page);
      await expect(page.locator('#hintText')).toHaveText('Tap her to reveal the look');
      const pts = await modelPoints(page);
      await page.touchscreen.tap(pts.off.x, pts.off.y);
      await expect(page.locator('#hero')).not.toHaveClass(/\breveal\b/);
      await page.touchscreen.tap(pts.on.x, pts.on.y);
      await expect(page.locator('#hero')).toHaveClass(/\breveal\b/);
      await expect(page.locator('#hintText')).toHaveText('Tap her again for monochrome');
      await page.waitForTimeout(1400);
      expect(await filterOf(page)).toContain('grayscale(0)');
      expect(await page.$eval('#herSpk', (e) => getComputedStyle(e).opacity)).toBe('1');
      await page.touchscreen.tap(pts.on.x, pts.on.y);
      await expect(page.locator('#hero')).not.toHaveClass(/\breveal\b/);
      await expect(page.locator('#hintText')).toHaveText('Tap her to reveal the look');
    });
  });

  test('she stands in the gap at the "I" of BRIDAL and follows resizes; stacks at <=1100px', async ({ page }) => {
    await page.goto('/'); await ready(page);
    const geo = () => page.evaluate(() => {
      const I = document.getElementById('letterI')!.getBoundingClientRect(), img = document.querySelector('.model img')!.getBoundingClientRect();
      const kids = [...document.querySelectorAll('.word > span')].map((s) => s.getBoundingClientRect());
      return { iCx: I.left + I.width / 2, imgCx: img.left + img.width / 2, imgL: img.left, imgR: img.right, brR: kids[0].right, dalL: kids[2].left, left: (document.querySelector('.model') as HTMLElement).style.left, pos: getComputedStyle(document.querySelector('.model')!).position };
    });
    let g = await geo();
    expect(g.pos).toBe('absolute');
    expect(g.brR).toBeLessThan(g.dalL);
    expect(g.iCx).toBeGreaterThan(g.imgL); expect(g.iCx).toBeLessThan(g.imgR);
    expect(Math.abs(g.iCx - g.imgCx)).toBeLessThan(g.imgR - g.imgL); // torso-centred on the I (alpha-centre shift stays inside the image)
    const x1 = g.imgCx;
    await page.setViewportSize({ width: 1240, height: 900 }); await page.waitForTimeout(400);
    g = await geo();
    expect(g.imgCx).not.toBe(x1); // recalculated on resize
    expect(g.iCx).toBeGreaterThan(g.imgL); expect(g.iCx).toBeLessThan(g.imgR);
    await page.setViewportSize({ width: 1100, height: 900 }); await page.waitForTimeout(400);
    g = await geo();
    expect(g.pos).toBe('relative'); expect(g.left).toBe('');
    expect(await page.$eval('.hero', (e) => getComputedStyle(e).flexDirection)).toBe('column');
  });

  test('pre-header shows date, price and a live countdown to 31 Oct 2026 10:00 IST', async ({ page }) => {
    await page.goto('/'); await ready(page);
    await expect(page.locator('.announce')).toContainText('Sat, 31 Oct · ₹1,499');
    const txt = (await page.locator('.mini-cd').innerText()).replace(/\s+/g, ' ');
    expect(txt).toMatch(/^11\s*D\s*:\s*00\s*H\s*:\s*00\s*M\s*:\s*00\s*S$/);
    for (const id of ['a-d', 'a-h', 'a-m', 'a-s']) await expect(page.locator('#' + id)).toHaveText(/^\d\d$/);
  });

  test('countdown ticks with a real clock', async ({ browser }) => {
    const p = await browser.newPage();
    await p.goto('/'); await p.waitForTimeout(500);
    const a = await p.locator('#a-s').innerText(); await p.waitForTimeout(2200);
    expect(await p.locator('#a-s').innerText()).not.toBe(a);
    await p.close();
  });

  test('CTAs: Check your date + Instagram', async ({ page }) => {
    await page.goto('/'); await ready(page);
    const cta = page.getByRole('link', { name: /Check your date/ });
    await expect(cta).toHaveText('Check your date ↗');
    await expect(cta).toHaveAttribute('href', 'https://wa.me/919597939658?text=Hi%20Yashmin%2C%20I%27d%20like%20to%20check%20availability%20for%20my%20date.');
    const ig = page.locator('a.btn-ig');
    await expect(ig).toHaveAttribute('href', 'https://www.instagram.com/makeupbyyashmin/');
    await expect(ig).toContainText('@makeupbyyashmin');
    await expect(ig.locator('svg radialGradient')).toHaveCount(1);
  });

  test('exactly four gold sparkles + one shine per button; no duplicates after reload', async ({ page }) => {
    for (let i = 0; i < 2; i++) {
      await page.goto('/'); await ready(page);
      const r = await page.$$eval('.btn', (bs) => bs.map((b) => ({ spk: b.querySelectorAll(':scope > .spk').length, shine: b.querySelectorAll(':scope > .shine').length })));
      expect(r.length).toBe(3);
      for (const x of r) expect(x).toEqual({ spk: 4, shine: 1 });
      expect(await page.$$eval('.spk', (e) => e.length)).toBe(3 * 4 + 16);
    }
  });

  test('shine sweep runs only on hover / :focus-visible; sparkles always twinkle', async ({ page }) => {
    await page.goto('/'); await ready(page);
    const anim = (sel: string) => page.$eval(sel, (b) => getComputedStyle(b.querySelector('.shine')!, '::before').animationName);
    const spkAnim = await page.$eval('.btn-gold .spk', (s) => getComputedStyle(s).animationName);
    expect(spkAnim).toBe('twk');
    expect(await anim('a.btn-gold >> nth=0')).toBe('none');
    await page.hover('.lede .btn-gold');
    expect(await anim('.lede .btn-gold')).toBe('sweep2');
    await page.mouse.move(5, 500);
    expect(await anim('.lede .btn-gold')).toBe('none');
    await page.keyboard.press('Tab');
    const focusedAnim = await page.evaluate(() => { const a = document.activeElement as HTMLElement; const s = a.querySelector('.shine'); return s ? getComputedStyle(s, '::before').animationName : 'n/a:' + a.tagName; });
    expect(['sweep2', 'n/a:A']).toContain(focusedAnim);
    await page.focus('.lede .btn-gold'); await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab');
    expect(await anim('.lede .btn-gold')).toBe('sweep2');
  });

  test('reduced motion disables animation', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto('/'); await p.waitForTimeout(500);
    expect(await p.$eval('.btn .spk', (s) => getComputedStyle(s).animationName)).toBe('none');
    expect(await p.$eval('.track', (s) => getComputedStyle(s).animationName)).toBe('none');
    await ctx.close();
  });

  test('menu button toggles the nav on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/'); await ready(page);
    await expect(page.locator('#nav')).toBeHidden();
    await page.click('#menuBtn');
    await expect(page.locator('#nav')).toBeVisible();
    await expect(page.locator('#menuBtn')).toHaveAttribute('aria-expanded', 'true');
    await page.click('#menuBtn');
    await expect(page.locator('#nav')).toBeHidden();
  });

  test('internal links: logo -> /, Draping + announce -> /saree-pre-pleating-draping-workshop/', async ({ page }) => {
    await page.goto('/'); await ready(page);
    await expect(page.locator('a.logo')).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: 'Draping', exact: true })).toHaveAttribute('href', '/saree-pre-pleating-draping-workshop/');
    await expect(page.getByRole('link', { name: /Reserve your seat/ })).toHaveAttribute('href', '/saree-pre-pleating-draping-workshop/');
  });
});
