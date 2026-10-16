'use client';
import { useEffect } from 'react';
import { site, waHref } from '@/lib/site';
import { spark } from '@/lib/sparkles';

/* Runs at parse time (before first paint), like the original end-of-body script, so she is never seen at the centre before hydration. */
const EARLY_PLACE = "(function(){var m=document.querySelector('.model'),I=document.getElementById('letterI'),n=document.querySelector('.hero-inner');if(!m||!I||!n||window.matchMedia('(max-width:1100px)').matches)return;var r=I.getBoundingClientRect(),p=n.getBoundingClientRect();m.style.left=(r.left+r.width/2-p.left)+'px'})()";

export default function Hero() {
  useEffect(() => {
    /* ported 1:1 from the original inline script */
    const hero = document.getElementById('hero')!, hint = document.getElementById('hintText')!;
    const touch = window.matchMedia('(hover: none)').matches;
    const model = document.querySelector('.model') as HTMLElement, img = model.querySelector('img')!;
    const letterI = document.getElementById('letterI')!, inner = document.querySelector('.hero-inner')!;
    if (touch) hint.textContent = 'Tap her to reveal the look';
    else hint.textContent = 'Hover over her to reveal the look';

    /* colour only when the pointer is on her (opaque pixels), not the empty parts of the image box */
    const cv = document.createElement('canvas');
    let ctx: CanvasRenderingContext2D | null = null, ready = false;
    const timers: number[] = [];
    function prep() {
      try {
        timers.push(window.setTimeout(placeModel, 0));
        cv.width = 200; cv.height = Math.round(200 * img.naturalHeight / img.naturalWidth);
        ctx = cv.getContext('2d', { willReadFrequently: true })!;
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        ctx.getImageData(0, 0, 1, 1);
        ready = true;
      } catch { ready = false; }
    }
    function onHer(e: MouseEvent) {
      const r = img.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return false;
      if (!ready) return true;
      const x = Math.floor((e.clientX - r.left) / r.width * cv.width), y = Math.floor((e.clientY - r.top) / r.height * cv.height);
      return ctx!.getImageData(Math.min(x, cv.width - 1), Math.min(y, cv.height - 1), 1, 1).data[3] > 60;
    }
    const onMove = (e: MouseEvent) => { model.classList.toggle('on', onHer(e)); };
    const onLeave = () => { model.classList.remove('on'); };
    const onClick = (e: MouseEvent) => {
      if (!touch) return;
      if (!onHer(e)) return;
      hero.classList.toggle('reveal');
      hint.textContent = hero.classList.contains('reveal') ? 'Tap her again for monochrome' : 'Tap her to reveal the look';
    };
    /* stand the model on the letter I */
    function placeModel() {
      if (window.matchMedia('(max-width:1100px)').matches) { model.style.left = ''; model.style.marginLeft = ''; return; }
      const r = letterI.getBoundingClientRect(), p = inner.getBoundingClientRect();
      let shift = 0;
      if (ready) {
        const w = cv.width, h = cv.height, y0 = Math.round(h * .35), y1 = Math.round(h * .75), d = ctx!.getImageData(0, y0, w, y1 - y0).data;
        let sx = 0, n = 0;
        for (let y = 0; y < y1 - y0; y += 2) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 100) { sx += x; n++; }
        if (n) shift = (sx / n / w - .5) * img.getBoundingClientRect().width;
      }
      model.style.left = (r.left + r.width / 2 - p.left - shift) + 'px';
    }

    if (img.complete && img.naturalWidth) prep(); else img.addEventListener('load', prep);
    if (!touch) { img.addEventListener('mousemove', onMove); img.addEventListener('mouseleave', onLeave); }
    img.addEventListener('click', onClick);
    placeModel();
    window.addEventListener('resize', placeModel);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeModel);
    window.addEventListener('load', placeModel);

    /* sparkles that appear over her on hover */
    const hs = document.getElementById('herSpk')!;
    const made = [[8, 52, 16], [14, 38, 10], [22, 64, 13], [30, 44, 9], [36, 58, 18], [44, 30, 11], [50, 70, 12], [58, 48, 15], [64, 36, 9], [70, 62, 13], [78, 44, 11], [84, 56, 16], [26, 26, 8], [40, 76, 10], [90, 40, 9], [18, 48, 7]]
      .map((p, j) => spark(hs, p[0] + '%', p[1] + '%', Math.round(p[2] * 1.6), (2 + ((j * 7) % 10) / 6).toFixed(1), ((j * 0.37) % 2.2).toFixed(2)));

    return () => {
      timers.forEach(clearTimeout);
      img.removeEventListener('load', prep);
      img.removeEventListener('mousemove', onMove);
      img.removeEventListener('mouseleave', onLeave);
      img.removeEventListener('click', onClick);
      window.removeEventListener('resize', placeModel);
      window.removeEventListener('load', placeModel);
      made.forEach((n) => n.remove());
      model.classList.remove('on'); hero.classList.remove('reveal');
    };
  }, []);

  return (
    <>
    <section className="hero gutter" id="hero" aria-label="Bridal makeup by Yashmin">
      <div className="glow" aria-hidden="true"></div>
      <div className="spark s1" aria-hidden="true"><span className="line-h"></span><span className="line-v"></span><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" /></svg></div>
      <div className="spark s2" aria-hidden="true"><span className="line-h"></span><span className="line-v"></span><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" /></svg></div>
      <div className="hero-inner">
        <div className="kicker">
          <span className="by">By Yashmin</span>
          <span className="sub">Bridal &amp; Beauty Studio</span>
        </div>
        <h1 className="word" aria-label="Bridal"><span aria-hidden="true">BR</span><span aria-hidden="true" id="letterI">I</span><span aria-hidden="true">DAL</span></h1>
        <div className="model" suppressHydrationWarning><img src="/img/hero-bride.webp" alt="A bride in a pink and gold silk saree with a silver necklace and mehendi — makeup by Yashmin" width="440" height="750" fetchPriority="high" /><span className="her-spk" id="herSpk" aria-hidden="true"></span></div>
        <div className="lede">
          <p>Makeup, hair and draping for the morning you will <em>remember</em>. Made in our studio at Iyyappanthangal, Chennai.</p>
          <div className="cta-row">
            <a className="btn btn-gold" href={waHref("Hi Yashmin, I'd like to check availability for my date.")} target="_blank" rel="noopener">Check your date ↗</a>
            <a className="btn btn-ig" href={site.instagram} target="_blank" rel="noopener" aria-label="Follow @makeupbyyashmin on Instagram">
              <svg className="ig" viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="igG" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#fdf497" /><stop offset=".05" stopColor="#fdf497" /><stop offset=".45" stopColor="#fd5949" /><stop offset=".6" stopColor="#d6249f" /><stop offset=".9" stopColor="#285AEB" /></radialGradient></defs><rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#igG)" /><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="16.4" cy="7.6" r="1.1" fill="#fff" /></svg>
              {site.instagramHandle}
            </a>
          </div>
        </div>
        <div className="side">
          <ul className="services-mini"><li>Makeup</li><li>Hair</li><li>Draping</li><li>Nails</li><li>Mehendi</li></ul>
          <span className="hint" id="hint"><span className="dot"></span><span id="hintText">Hover to reveal the look</span></span>
        </div>
      </div>
    </section>
    <script dangerouslySetInnerHTML={{ __html: EARLY_PLACE }} />
    </>
  );
}
