'use client';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

const links = [
  ['learn', "What you'll learn"],
  ['mentor', 'Your mentor'],
  ['reviews', 'Reviews'],
  ['reels', 'Reels'],
  ['details', 'Details'],
  ['faq', 'FAQ'],
] as const;

export default function WorkshopHeader() {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const mark = () => {
      const line = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 76) + 12;
      let active = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) active = section.id;
      }
      setCurrent(active);
    };
    mark();
    window.addEventListener('scroll', mark, { passive: true });
    window.addEventListener('resize', mark);
    return () => {
      window.removeEventListener('scroll', mark);
      window.removeEventListener('resize', mark);
    };
  }, []);

  return (
    <header>
      <div className="bar gutter wrap">
        <a className="logo" href={site.routes.home} aria-label="AllureYou home"><img src="/img/logo.webp" alt="AllureYou — Professional Makeup Artistry" width="564" height="194" /></a>
        <nav aria-label="Workshop sections"><ul>
          {links.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className={current === id ? 'active' : undefined} aria-current={current === id ? 'location' : undefined}>{label}</a></li>
          ))}
        </ul></nav>
        <a className="btn btn-gold" href="#register">Reserve a seat</a>
      </div>
    </header>
  );
}
