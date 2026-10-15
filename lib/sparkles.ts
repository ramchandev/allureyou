/** Shared sparkle / shine helpers. Every function returns a cleanup that removes what it injected, so effects are idempotent. */

export const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export function spark(host: Element, top: string, left: string, size: number, dur: number | string, delay: number | string) {
  const s = document.createElement('i');
  s.className = 'spk';
  s.setAttribute('aria-hidden', 'true');
  s.style.cssText = 'top:' + top + ';left:' + left + ';--s:' + size + 'px;--d:' + dur + 's;--dl:' + delay + 's';
  host.appendChild(s);
  return s;
}

/** Shine span + four twinkling sparkles on every .btn */
export function addButtonMagic(): () => void {
  const added: Element[] = [];
  document.querySelectorAll<HTMLElement>('.btn').forEach((b, i) => {
    if (b.querySelector(':scope > .shine')) return;
    const sh = document.createElement('span');
    sh.className = 'shine';
    sh.setAttribute('aria-hidden', 'true');
    b.insertBefore(sh, b.firstChild);
    added.push(sh);
    const o = (i % 5) * 0.37;
    added.push(
      spark(b, '-9px', '78%', 17, 2.4, o),
      spark(b, 'calc(100% - 7px)', '14%', 12, 2.8, o + 0.9),
      spark(b, '28%', '-8px', 10, 3.1, o + 1.6),
      spark(b, '-6px', '30%', 8, 2.2, o + 1.2),
    );
  });
  return () => added.forEach((n) => n.remove());
}

/** Twinkling sparkles on every workshop photo (no glow, no sweep). */
export function addPhotoSparkles(): () => void {
  const added: Element[] = [];
  document.querySelectorAll('.collage figure,.why-img,.mod,.gal figure,.reel,.poster,.arch').forEach((el) => {
    if (el.classList.contains('arch')) return;
    for (let k = 0; k < 3; k++)
      added.push(spark(el, rnd(8, 80).toFixed(0) + '%', rnd(8, 88).toFixed(0) + '%', Math.round(rnd(8, 15)), rnd(2.6, 4.2).toFixed(1), rnd(0, 5).toFixed(1)));
  });
  return () => added.forEach((n) => n.remove());
}

/** Yashmin: floating sparkles around and over the arch */
export function addArchSparkles(): () => void {
  const added: Element[] = [];
  const aw = document.querySelector('.arch-wrap');
  if (aw) {
    [[4, 10, 24], [12, 86, 16], [26, -6, 14], [38, 97, 28], [50, 14, 12], [60, 86, 18], [72, 2, 22], [86, 93, 14], [18, 52, 10], [44, 28, 13], [56, 70, 11], [93, 38, 16], [1, 62, 12], [80, 22, 10], [30, 74, 9], [68, 46, 10]].forEach((p, j) => {
      const s = spark(aw, p[0] + '%', p[1] + '%', p[2], rnd(2.4, 4).toFixed(1), (j * 0.45).toFixed(2)) as HTMLElement;
      s.classList.add('float');
      s.style.setProperty('--dx', (j % 2 ? -1 : 1) * Math.round(rnd(4, 12)) + 'px');
      added.push(s);
    });
  }
  return () => added.forEach((n) => n.remove());
}
