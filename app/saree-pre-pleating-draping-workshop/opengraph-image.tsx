import { workshopOg } from '@/lib/og/card';
import { priceLabel, site } from '@/lib/site';

const w = site.workshop;

export const alt = `Saree Pre-Pleating & Draping Workshop — ${w.dateWeekLongYear}, ${w.timeLabel}, ${w.venue}. ${priceLabel} per person. Limited seats. Reserve your seat.`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Image() {
  return workshopOg();
}
