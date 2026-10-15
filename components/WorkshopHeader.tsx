import { site } from '@/lib/site';

export default function WorkshopHeader() {
  return (
    <header>
      <div className="bar gutter wrap">
        <a className="logo" href={site.routes.home} aria-label="AllureYou home"><img src="/img/logo.webp" alt="AllureYou — Professional Makeup Artistry" width="564" height="194" /></a>
        <nav aria-label="Workshop sections"><ul>
          <li><a href="#learn">What you&apos;ll learn</a></li>
          <li><a href="#mentor">Your mentor</a></li>
          <li><a href="#reels">Reels</a></li>
          <li><a href="#details">Details</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul></nav>
        <a className="btn btn-gold" href="#register">Reserve a seat</a>
      </div>
    </header>
  );
}
