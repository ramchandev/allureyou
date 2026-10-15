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
import Reviews from '@/components/Reviews';
import Reels from '@/components/Reels';
import Details from '@/components/Details';
import Faq from '@/components/Faq';
import RegisterSection from '@/components/RegisterSection';
import WorkshopFooter from '@/components/WorkshopFooter';
import BackToTop from '@/components/BackToTop';
import MobileBar from '@/components/MobileBar';
import PageMagic from '@/components/PageMagic';
import JsonLd from '@/components/JsonLd';
import { eventJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import { workshopSeo } from '@/lib/seo';

export const metadata: Metadata = {
  title: workshopSeo.title,
  description: workshopSeo.description,
  alternates: { canonical: site.routes.workshop },
  openGraph: { type: 'website', url: site.routes.workshop, siteName: site.name, title: workshopSeo.title, description: workshopSeo.description, locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: workshopSeo.title, description: workshopSeo.description },
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
        <Reviews />
        <Reels />
        <Details />
        <Faq />
        <RegisterSection />
      </main>
      <WorkshopFooter />
      <BackToTop />
      <MobileBar />
      <PageMagic photos />
      <JsonLd data={eventJsonLd()} />
    </>
  );
}
