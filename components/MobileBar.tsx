import { site, waHref } from '@/lib/site';

export default function MobileBar() {
  return (
    <div className="mbar">
      <a className="btn btn-line" href={waHref(`Hi Yashmin, I'm interested in the Saree Pre-Pleating Workshop on ${site.workshop.dateShort}.`)} target="_blank" rel="noopener"><svg className="wa"><use href="#wa" /></svg>WhatsApp</a>
      <a className="btn btn-gold" href="#register">Reserve seat</a>
    </div>
  );
}
