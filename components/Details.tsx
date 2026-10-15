import { priceLabel, site } from '@/lib/site';

export default function Details() {
  const w = site.workshop;
  return (
    <section className="sec gutter" id="details">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Workshop details</span>
          <h2>Save the date.</h2>
        </div>
        <div className="details-grid">
          <div className="ticket on-dark">
            <h3>Saree Pre-Pleating &amp; Draping Workshop</h3>
            <dl>
              <div><dt>Date</dt><dd>{w.dateWeekLongYear}</dd></div>
              <div><dt>Time</dt><dd>{w.timeLabel}<small>Full day, hands-on</small></dd></div>
              <div><dt>Venue</dt><dd>{w.venue}<small><a className="maplink" href={w.mapsUrl} target="_blank" rel="noopener">Open in Google Maps ↗</a></small></dd></div>
              <div><dt>Fee</dt><dd>{`${priceLabel} per person`}<small>Payment details shared on WhatsApp after you register</small></dd></div>
              <div><dt>Seats</dt><dd>Limited, small batch</dd></div>
            </dl>
            <div className="ctas"><a className="btn btn-gold" href="#register">Reserve my seat</a></div>
          </div>
          <div className="poster"><img width="1024" height="1536" src="/img/workshop-poster.webp" alt={`Workshop poster: Saree Pre-Pleating and Draping Workshop, ${w.dateShort} 2026, ${w.timeSpoken}, ${w.venue}`} /></div>
        </div>
      </div>
    </section>
  );
}
