import { priceLabel, site, waHref } from '@/lib/site';

export default function WorkshopHero() {
  const w = site.workshop;
  return (
    <section className="hero gutter" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">One-day hands-on workshop</span>
          <h1>
            <span>Saree</span>
            <span className="gold">Pre-Pleating</span>
            <span className="script">&amp; Draping</span>
            <small>Workshop</small>
          </h1>
          <div className="lpg">Learn<span>✦</span>Practice<span>✦</span>Grow</div>
          <p className="lead">Master the art of perfect pleats and flawless draping, the way it is done on a bridal morning. Learn it from Yashmin, on real silk sarees, in one day.</p>
          <div className="facts">
            <span className="fact"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>{w.dateWeekShortYear}</span>
            <span className="fact"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{w.timeLabel}</span>
            <span className="fact price"><svg viewBox="0 0 24 24"><path d="M7 4h10M7 9h10M7 4c6 0 6 10 0 10l7 7" /></svg>{`${priceLabel} per person`}</span>
            <span className="fact"><svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>{w.venue}</span>
          </div>
          <div className="ctas">
            <a className="btn btn-gold" href="#register">Reserve my seat</a>
            <a className="btn btn-line" href={waHref(`Hi Yashmin, I have a question about the Saree Pre-Pleating & Draping Workshop on ${w.dateShort}.`)} target="_blank" rel="noopener"><svg className="wa"><use href="#wa" /></svg>Ask on WhatsApp</a>
          </div>
          <span className="seats"><i></i>Limited seats · small batch for one-to-one attention</span>
        </div>
        <div className="collage" aria-label="Pre-pleated sarees from earlier batches">
          <figure className="c1"><span className="tape"></span><img width="1100" height="1467" src="/img/pleats-closeup.webp" alt="Neatly pre-pleated rose-gold silk saree" /><figcaption>From pleats…</figcaption></figure>
          <figure className="c2"><span className="tape"></span><img width="1100" height="1467" src="/img/drape-blue.webp" alt="Blue and gold silk saree draped with crisp pleats" /><figcaption>to a perfect drape</figcaption></figure>
          <figure className="c3"><span className="tape"></span><img width="1100" height="1467" src="/img/draping-hands.webp" alt="Yashmin setting the pleats of a black and violet silk saree" /><figcaption>grace in every fold</figcaption></figure>
          <div className="badge"><span>Limited<br />Seats</span></div>
        </div>
      </div>
    </section>
  );
}
