import type { Metadata } from 'next';
import './home.css';
import AnnounceBar from '@/components/AnnounceBar';
import HomeHeader from '@/components/HomeHeader';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import HomeFooter from '@/components/HomeFooter';
import PageMagic from '@/components/PageMagic';
import JsonLd from '@/components/JsonLd';
import { salonJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';

const description = 'AllureYou Bridal & Beauty Studio by Yashmin — bridal makeup, hair, saree draping, nails and mehendi in Iyyappanthangal, Chennai.';

export const metadata: Metadata = {
  title: 'AllureYou Bridal Studio',
  description,
  alternates: { canonical: site.routes.home },
  openGraph: { type: 'website', url: site.routes.home, siteName: site.name, title: 'AllureYou Bridal Studio', description, images: [{ url: '/img/hero-bride.webp', width: 804, height: 1500, alt: 'A bride in a black and violet silk saree, makeup by Yashmin' }], locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: 'AllureYou Bridal Studio', description, images: ['/img/hero-bride.webp'] },
};

export default function Home() {
  return (
    <>
      <AnnounceBar />
      <HomeHeader />
      <main>
        <Hero />
        <Ticker />
      </main>
      <HomeFooter />
      <PageMagic />
      <JsonLd data={salonJsonLd()} />
    </>
  );
}
