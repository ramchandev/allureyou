import { priceLabel, site } from './site';

const w = site.workshop;

/** Titles stay within a typical search result. Descriptions stay within about 160 characters. */
export const homeSeo = {
  title: 'Bridal Makeup in Iyyappanthangal, Chennai | AllureYou',
  description:
    'Yashmin does bridal makeup, hair, saree draping, nails and mehendi at AllureYou in Iyyappanthangal, Chennai. Message on WhatsApp to check your date.',
};

export const workshopSeo = {
  title: `Saree Pre-Pleating & Draping Workshop | ${w.dateShort} 2026`,
  description: `Saree pre-pleating and draping with Yashmin, ${w.dateWeekLongYear.replace(',', '')}, ${w.timeSpoken}, ${w.venue}. ${priceLabel} per person. Limited seats.`,
};
