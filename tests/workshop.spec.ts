import { expect, test } from '@playwright/test';
import { freezeTime, noHorizontalScroll, ready, watchConsole } from './helpers';

test.describe('workshop', () => {
  test.beforeEach(async ({ page }) => { await freezeTime(page); });

  test('loads cleanly: no console errors / hydration warnings, no horizontal scroll at 390', async ({ page }) => {
    const bad = watchConsole(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/workshop/'); await ready(page);
    await noHorizontalScroll(page);
    expect(bad).toEqual([]);
  });

  test('every photo has twinkling sparkles only: no glow, no light sweep', async ({ page }) => {
    await page.goto('/workshop/'); await ready(page);
    const groups: Record<string, number> = { '.collage figure': 3, '.why-img': 1, '.mod': 3, '.gal figure': 12, '.reel': 9, '.poster': 1 };
    for (const [sel, n] of Object.entries(groups)) {
      const counts = await page.$$eval(sel, (els) => els.map((e) => e.querySelectorAll(':scope > .spk').length));
      expect(counts.length, sel).toBe(n);
      for (const c of counts) expect(c, sel).toBe(3);
    }
    expect(await page.locator('.glint, .magic-glow').count()).toBe(0);
    for (const sel of ['.collage figure', '.why-img img', '.mod', '.gal figure', '.reel', '.poster']) {
      const a = await page.$eval(sel, (e) => { const s = getComputedStyle(e), b = getComputedStyle(e, '::before'), af = getComputedStyle(e, '::after'); return [s.animationName, b.animationName, af.animationName]; });
      expect(a, sel).toEqual(['none', 'none', 'none']);
    }
    expect(await page.$eval('.spk', (s) => getComputedStyle(s).animationName)).toBe('twk');
  });

  test('Yashmin arch: floating sparkles + twinkling stars, no halo', async ({ page }) => {
    await page.goto('/workshop/'); await ready(page);
    expect(await page.locator('.arch-wrap > .spk.float').count()).toBe(16);
    expect(await page.locator('.arch .spk').count()).toBe(0);
    const names = await page.$$eval('.arch-wrap .st', (s) => s.map((e) => getComputedStyle(e).animationName));
    expect(names).toEqual(['twk2', 'twk2']);
    expect(await page.$eval('.arch-wrap', (e) => { const c = getComputedStyle(e, '::before'); return c.content; })).toBe('none');
    expect(await page.$eval('.arch-wrap .spk.float', (e) => getComputedStyle(e).animationName)).toBe('twk3, drift');
  });

  test('countdown band: Days : Hours : Mins : Secs', async ({ page }) => {
    await page.goto('/workshop/'); await ready(page);
    const labels = await page.$$eval('#count small', (s) => s.map((e) => e.textContent));
    expect(labels).toEqual(['Days', 'Hours', 'Mins', 'Secs']);
    const vals = await page.$$eval('#count b', (s) => s.map((e) => e.textContent));
    expect(vals).toEqual(['11', '00', '00', '00']);
  });

  test('exactly four sparkles + one shine on every button, no duplicates across reloads', async ({ page }) => {
    for (let i = 0; i < 2; i++) {
      await page.goto('/workshop/'); await ready(page);
      const r = await page.$$eval('.btn', (bs) => bs.map((b) => `${b.querySelectorAll(':scope > .spk').length}/${b.querySelectorAll(':scope > .shine').length}`));
      expect(r.length).toBeGreaterThan(8);
      for (const x of r) expect(x).toBe('4/1');
      expect(await page.$$eval('.spk', (e) => e.length)).toBe(r.length * 4 + 29 * 3 + 16);
    }
  });

  test('reels render from site data, with links and images', async ({ page }) => {
    await page.goto('/workshop/'); await ready(page);
    const reels = await page.$$eval('#reelRow .reel', (a) => a.map((e) => ({ href: (e as HTMLAnchorElement).href, label: e.getAttribute('aria-label'), img: e.querySelector('img')!.getAttribute('src') })));
    expect(reels).toHaveLength(9);
    expect(reels[0]).toEqual({ href: 'https://www.instagram.com/reel/DXEsbgmEml2/', label: 'Watch reel: Bridal silk drape on Instagram', img: '/img/pleats-closeup.webp' });
    expect(reels[8].href).toBe('https://www.instagram.com/reel/DCbouW5yQn-/');
  });

  test.describe('registration form', () => {
    test('fields, live total, validation, submit, WhatsApp link, edit', async ({ page }) => {
      await page.goto('/workshop/'); await ready(page);
      await expect(page.getByLabel('Full name')).toBeVisible();
      await expect(page.getByLabel('WhatsApp number')).toBeVisible();
      await expect(page.getByLabel(/^Email/)).toBeVisible();
      await expect(page.getByLabel('Area / city')).toBeVisible();
      await expect(page.getByLabel('Anything we should know?')).toHaveAttribute('placeholder', 'Any other questions');
      expect(await page.$$eval('#seats option', (o) => o.map((x) => x.textContent))).toEqual(['1', '2', '3', '4']);

      const total = page.locator('#total');
      await expect(total).toHaveText('₹1,499per person');
      await page.selectOption('#seats', '2');
      await expect(total).toHaveText('₹2,9982 × ₹1,499');
      await page.selectOption('#seats', '4');
      await expect(total).toHaveText('₹5,9964 × ₹1,499');
      await page.selectOption('#seats', '2');

      // validation (inline errors)
      await page.fill('#name', 'P'); await page.fill('#phone', '12345');
      await page.click('button[type=submit]');
      await expect(page.locator('#f-name .err')).toHaveText('Please enter your name.');
      await expect(page.locator('#f-phone .err')).toHaveText('Enter a 10-digit mobile number, e.g. 9876543210.');
      await expect(page.locator('#f-name')).toHaveClass(/\bbad\b/);
      await expect(page.locator('#name')).toBeFocused();
      await expect(page.locator('#done')).toBeHidden();
      await page.fill('#name', 'Priya Raman');
      await page.click('button[type=submit]');
      await expect(page.locator('#f-name .err')).toHaveText('');
      await expect(page.locator('#f-name')).not.toHaveClass(/\bbad\b/);
      await expect(page.locator('#phone')).toBeFocused();

      // valid: 91 prefix stripped
      await page.fill('#phone', '+91 98765 43210');
      await page.fill('#email', 'priya@example.com'); await page.fill('#area', 'Porur');
      await page.fill('#msg', 'Is parking available?');
      await page.click('button[type=submit]');
      await expect(page.locator('#done')).toBeVisible();
      await expect(page.locator('#formBody')).toBeHidden();
      await expect(page.locator('#done h3')).toHaveText('One last step');
      const summary = await page.locator('#summary').innerText();
      expect(summary).toBe([
        'Hi Yashmin, I would like to register for the Saree Pre-Pleating & Draping Workshop on Sat, 31 Oct 2026.', '',
        'Name: Priya Raman', 'WhatsApp: +91 9876543210', 'Email: priya@example.com', 'Area: Porur', 'Seats: 2 (Total ₹2,998)', 'Note: Is parking available?', '', 'Please share the payment details.',
      ].join('\n'));
      const href = await page.locator('#waLink').getAttribute('href');
      expect(href!.startsWith('https://wa.me/919597939658?text=')).toBe(true);
      expect(decodeURIComponent(href!.split('?text=')[1])).toBe(summary);
      expect(summary.endsWith('Please share the payment details.')).toBe(true);

      await page.click('#editBtn');
      await expect(page.locator('#formBody')).toBeVisible();
      await expect(page.locator('#done')).toBeHidden();
      await expect(page.locator('#name')).toBeFocused();
      await expect(page.locator('#name')).toHaveValue('Priya Raman');
    });

    test('optional lead endpoint is off by default (no network call on submit)', async ({ page }) => {
      const calls: string[] = [];
      page.on('request', (r) => { if (r.method() === 'POST') calls.push(r.url()); });
      await page.goto('/workshop/'); await ready(page);
      await page.fill('#name', 'Priya Raman'); await page.fill('#phone', '9876543210');
      await page.click('button[type=submit]');
      await expect(page.locator('#done')).toBeVisible();
      expect(calls).toEqual([]);
    });
  });

  test('mobile sticky bar shows at <=640px only', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 900 }); await page.goto('/workshop/'); await ready(page);
    await expect(page.locator('.mbar')).toBeVisible();
    await expect(page.locator('.mbar a')).toHaveText(['WhatsApp', 'Reserve seat']);
    await page.setViewportSize({ width: 641, height: 900 });
    await expect(page.locator('.mbar')).toBeHidden();
  });

  test('prefers-reduced-motion disables all animation', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto('/workshop/'); await p.waitForTimeout(600);
    const running = await p.evaluate(() => document.getAnimations().filter((a) => a instanceof CSSAnimation && a.playState === 'running').length);
    expect(running).toBe(0);
    expect(await p.$eval('html', (e) => getComputedStyle(e).scrollBehavior)).toBe('auto');
    await ctx.close();
  });

  test('details, FAQ and registration copy', async ({ page }) => {
    await page.goto('/workshop/'); await ready(page);
    await expect(page.locator('.fact.price')).toHaveText('₹1,499 per person');
    await expect(page.locator('.ticket dl')).toContainText('Saturday, 31 October 2026');
    await expect(page.locator('.ticket dl')).toContainText('₹1,499 per person');
    await expect(page.locator('.faq details').nth(1)).toContainText('₹1,499 per person.');
    await expect(page.locator('.reg-copy .lead')).toContainText('₹1,499 per person.');
    await expect(page.locator('.reg-copy h2')).toHaveText('Reserve your seat for 31 October.');
    await expect(page.locator('.faq details[open]')).toHaveCount(1);
  });

  test('internal links point at / ; external links unchanged', async ({ page }) => {
    await page.goto('/workshop/'); await ready(page);
    await expect(page.locator('a.logo')).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: 'Studio home' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: 'Ask on WhatsApp' })).toHaveAttribute('href', 'https://wa.me/919597939658?text=Hi%20Yashmin%2C%20I%20have%20a%20question%20about%20the%20Saree%20Pre-Pleating%20%26%20Draping%20Workshop%20on%2031%20Oct.');
    await expect(page.locator('.mbar a').first()).toHaveAttribute('href', 'https://wa.me/919597939658?text=Hi%20Yashmin%2C%20I%27m%20interested%20in%20the%20Saree%20Pre-Pleating%20Workshop%20on%2031%20Oct.');
  });
});

test.describe('across pages', () => {
  test('navigating home <-> workshop: no duplicate sparkles, no CSS leakage', async ({ page }) => {
    await freezeTime(page);
    const bad = watchConsole(page);
    await page.goto('/'); await ready(page);
    const homeSpk = await page.$$eval('.spk', (e) => e.length);
    await page.click('.announce a'); await page.waitForURL('**/workshop/'); await ready(page);
    const wsSpk = await page.$$eval('.spk', (e) => e.length);
    // home's rules must not leak: workshop .hero is a normal block with padding, not a 600px+ min-height flex stage
    expect(await page.$eval('.hero', (e) => getComputedStyle(e).minHeight)).toBe("0px");
    expect(await page.$eval('header', (e) => getComputedStyle(e).zIndex)).toBe('30');
    await page.goBack(); await page.waitForURL('http://localhost:4100/'); await ready(page);
    expect(await page.$$eval('.spk', (e) => e.length)).toBe(homeSpk);
    expect(await page.$eval('.hero', (e) => getComputedStyle(e).minHeight)).not.toBe("0px");
    expect(await page.$eval('header', (e) => getComputedStyle(e).zIndex)).toBe('20');
    await page.click('a.logo'); await ready(page);
    expect(await page.$$eval('.spk', (e) => e.length)).toBe(homeSpk);
    await page.goto('/workshop/'); await ready(page);
    expect(await page.$$eval('.spk', (e) => e.length)).toBe(wsSpk);
    expect(bad).toEqual([]);
  });
});
