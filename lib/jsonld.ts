import { homeSeo, workshopSeo } from './seo';
import { site } from './site';

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export const salonJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': `${site.url}/#salon`,
  name: site.name,
  description: homeSeo.description,
  url: `${site.url}/`,
  image: `${site.url}/img/logo.webp`,
  telephone: '+' + site.phone.replace(/^(\d{2})(\d{5})(\d{5})$/, '$1 $2 $3'),
  address,
  areaServed: [
    { '@type': 'Place', name: 'Iyyappanthangal' },
    { '@type': 'City', name: 'Chennai' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Bridal services',
    itemListElement: ['Bridal makeup', 'Hair styling', 'Saree draping', 'Nail art', 'Bridal mehendi'].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
  sameAs: [site.instagram, site.google],
});

export const eventJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: site.workshop.title,
  startDate: site.workshop.start,
  endDate: site.workshop.end,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [`${site.url}/img/workshop-poster.webp`],
  description: workshopSeo.description,
  inLanguage: 'en',
  performer: { '@type': 'Person', name: 'Yashmin', url: site.instagram },
  location: {
    '@type': 'Place',
    name: site.workshop.venue,
    address: { '@type': 'PostalAddress', addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
  },
  organizer: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
  offers: {
    '@type': 'Offer',
    price: String(site.price),
    priceCurrency: 'INR',
    availability: 'https://schema.org/LimitedAvailability',
    url: `${site.url}${site.routes.workshop}#register`,
  },
});
