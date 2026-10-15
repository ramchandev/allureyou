import { priceLabel, site } from '@/lib/site';
import MiniCountdown from './MiniCountdown';

export default function AnnounceBar() {
  return (
    <div className="announce"><div className="gutter">
      <b>New workshop</b>
      <span>{`Saree Pre-Pleating & Draping · ${site.workshop.dateWeekShort} · ${priceLabel}`}</span>
      <MiniCountdown />
      <a href={site.routes.workshop}>Reserve your seat →</a>
    </div></div>
  );
}
