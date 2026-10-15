import { site } from '@/lib/site';

export default function WhyPleating() {
  return (
    <section className="sec gutter">
      <div className="wrap why">
        <div className="why-img"><img width="1100" height="1467" src="/img/drape-black-studio.webp" alt="A bride draped in a black silk saree with violet border, ready in the studio" /></div>
        <div className="why-copy">
          <span className="eyebrow">Why pre-pleating</span>
          <h2>The saree is ready <em>before</em> the bride is.</h2>
          <p className="lead">Pre-pleating means folding and setting a saree&apos;s pleats and pallu ahead of time, so on the day it drapes in minutes and stays sharp for hours. It is the quiet skill behind every calm bridal morning, and one of the most requested services in any studio.</p>
          <blockquote>Walk in with a saree. Walk out knowing how to make it look like this, without an iron.</blockquote>
          <div><a className="btn btn-gold" href="#register">{`Join the ${site.workshop.dateShort} batch`}</a></div>
        </div>
      </div>
    </section>
  );
}
