/** Single source of truth for contact details, price, dates and links. */

const IST = 'Asia/Kolkata';

function istParts(iso: string, opts: Intl.DateTimeFormatOptions) {
  const out: Record<string, string> = {};
  for (const p of new Intl.DateTimeFormat('en-GB', { timeZone: IST, ...opts }).formatToParts(new Date(iso))) out[p.type] = p.value;
  return out;
}

/** e.g. fmtDate(iso, 'short', true) -> "Sat, 31 Oct 2026" */
export function fmtDate(iso: string, style: 'short' | 'long', withWeekday: boolean, withYear: boolean) {
  const p = istParts(iso, { weekday: style, day: 'numeric', month: style, year: 'numeric' });
  return (withWeekday ? p.weekday + ', ' : '') + p.day + ' ' + p.month + (withYear ? ' ' + p.year : '');
}

const start = '2026-10-31T10:00:00+05:30';
const end = '2026-10-31T17:00:00+05:30';
const price = 1499;

export const site = {
  name: 'AllureYou Bridal & Beauty Studio',
  shortName: 'AllureYou',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://allureyou.in').replace(/\/$/, ''),
  phone: '919597939658',
  phoneDisplay: '+91 95979 39658',
  price,
  address: {
    street: 'Near Anandha Stores, Padmavathi Nagar, Iyyappanthangal',
    locality: 'Chennai',
    region: 'Tamil Nadu',
    postalCode: '600077',
    country: 'IN',
  },
  instagram: 'https://www.instagram.com/makeupbyyashmin/',
  instagramHandle: '@makeupbyyashmin',
  google: 'https://share.google/3AzbgXEqTsxx5JMOA',
  routes: { home: '/', workshop: '/workshop/' },
  workshop: {
    title: 'Saree Pre-Pleating & Draping Workshop',
    start,
    end,
    timeLabel: '10:00 AM – 5:00 PM',
    timeSpoken: '10 AM to 5 PM',
    venue: 'Kidzee School, Iyyappanthangal',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kidzee+School+Iyyappanthangal+Chennai',
    dateShort: fmtDate(start, 'short', false, false), // 31 Oct
    dateLong: fmtDate(start, 'long', false, false), // 31 October
    dateWeekShort: fmtDate(start, 'short', true, false), // Sat, 31 Oct
    dateWeekShortYear: fmtDate(start, 'short', true, true), // Sat, 31 Oct 2026
    dateWeekLongYear: fmtDate(start, 'long', true, true), // Saturday, 31 October 2026
  },
  /** [instagram reel id, title, poster image in /img] */
  reels: [
    ['DXEsbgmEml2', 'Bridal silk drape', 'pleats-closeup'],
    ['DXHGdIjEg5U', 'Pleats in minutes', 'drape-blue'],
    ['DTcEhsakp1V', 'Studio drape', 'drape-black-studio'],
    ['DTQJEf6DJ8E', 'Setting the pleats', 'draping-hands'],
    ['DTN159hkuT6', 'Box folding', 'pleats-pink-1'],
    ['DKuHEWNSo7U', 'Fluffy pleats', 'pleats-pink-2'],
    ['DKrhwHzSjLV', 'Bridal look', 'bride-full'],
    ['DC8ZclVS47W', 'Drape without ironing', 'student-1'],
    ['DCbouW5yQn-', 'Silk saree finish', 'yashmin'],
  ] as ReadonlyArray<readonly [string, string, string]>,
  /** Optional lead capture (external endpoint; off unless set at build time). */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '',
} as const;

/** 1499 -> "₹1,499" */
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
export const priceLabel = inr(site.price);

/** wa.me link for hand-written copy (matches the original, which encoded ' as %27). */
export const waHref = (text: string) =>
  `https://wa.me/${site.phone}?text=${encodeURIComponent(text).replace(/'/g, '%27')}`;
/** wa.me link for the registration message (plain encodeURIComponent, as before). */
export const waRegisterHref = (text: string) => `https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`;

export const reelUrl = (id: string) => `https://www.instagram.com/reel/${id}/`;
