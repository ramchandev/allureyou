import { site, waHref } from '@/lib/site';
import MenuToggle from './MenuToggle';

export default function HomeHeader() {
  return (
    <header>
      <div className="bar gutter">
        <a className="logo" href={site.routes.home} aria-label="AllureYou home"><img src="/img/logo.webp" alt="AllureYou — Professional Makeup Artistry" width="564" height="194" /></a>
        <nav id="nav" aria-label="Services">
          <ul>
            <li><a href="#makeup" className="active">Makeup</a></li>
            <li><a href="#hair">Hair</a></li>
            <li><a href={site.routes.workshop}>Draping</a></li>
            <li><a href="#nails">Nails</a></li>
            <li><a href="#mehendi">Mehendi</a></li>
          </ul>
        </nav>
        <a className="btn btn-gold" href={waHref("Hi Yashmin, I'd like to book a bridal look.")} target="_blank" rel="noopener">Book your look</a>
        <MenuToggle />
      </div>
    </header>
  );
}
