import { site } from '@/lib/site';

export default function WorkshopFooter() {
  return (
    <footer className="gutter">
      <div className="wrap">
        <img src="/img/logo-light.webp" alt="AllureYou" width="564" height="194" />
        <span>AllureYou Bridal &amp; Beauty Studio · Near Anandha Stores, Padmavathi Nagar,<br />{`Iyyappanthangal, ${site.address.locality} ${site.address.postalCode}`}</span>
        <span><a href={site.instagram} target="_blank" rel="noopener">Instagram</a> · <a href={site.google} target="_blank" rel="noopener">Google reviews</a> · <a href={site.routes.home}>Studio home</a></span>
      </div>
    </footer>
  );
}
