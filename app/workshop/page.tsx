import type { Metadata } from 'next';
import '../workshop.css';
import Sprites from '@/components/Sprites';
import WorkshopHeader from '@/components/WorkshopHeader';
import WorkshopHero from '@/components/WorkshopHero';
import Countdown from '@/components/Countdown';
import WhyPleating from '@/components/WhyPleating';
import Modules from '@/components/Modules';
import Audience from '@/components/Audience';
import MentorCard from '@/components/MentorCard';
import Gallery from '@/components/Gallery';
import Reels from '@/components/Reels';
import Details from '@/components/Details';
import Faq from '@/components/Faq';
import RegisterSection from '@/components/RegisterSection';
import WorkshopFooter from '@/components/WorkshopFooter';
import MobileBar from '@/components/MobileBar';
import PageMagic from '@/components/PageMagic';
import JsonLd from '@/components/JsonLd';
import { eventJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';

const w = site.workshop;
const description = `Saree Pre-Pleating & Draping Workshop by Yashmin of AllureYou — ${w.dateWeekLongYear.replace(',', '')}, ${w.timeSpoken}, Kidzee School, Iyyappanthangal, Chennai. Limited seats.`;
const title = 'Saree Pre-Pleating Workshop';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: site.routes.workshop },
  openGraph: { type: 'website', url: site.routes.workshop, siteName: site.name, title, description, images: [{ url: '/img/workshop-poster.webp', width: 1024, height: 1536, alt: 'Saree Pre-Pleating and Draping Workshop poster' }], locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title, description, images: ['/img/workshop-poster.webp'] },
};

export default function WorkshopPage() {
  return (
    <>
      <Sprites />
      <WorkshopHeader />
      <main>
        <WorkshopHero />
        <Countdown />
        <WhyPleating />
        <Modules />
        <Audience />
        <MentorCard />
        <Gallery />
        <Reels />
        <Details />
        <Faq />
        <RegisterSection />
      </main>
      <WorkshopFooter />
      <MobileBar />
      <PageMagic photos />
      <JsonLd data={eventJsonLd()} />
    </>
  );
}
