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
import { homeSeo } from '@/lib/seo';

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: { canonical: site.routes.home },
  openGraph: { type: 'website', url: site.routes.home, siteName: site.name, title: homeSeo.title, description: homeSeo.description, locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: homeSeo.title, description: homeSeo.description },
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
