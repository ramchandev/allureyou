import { ImageResponse } from 'next/og';
import type { ReactElement } from 'react';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/lib/site';

const dir = join(process.cwd(), 'lib/og');
const [jost, jostMed, heroBuf, pleatsBuf] = await Promise.all([
  readFile(join(dir, 'Jost-Regular.ttf')),
  readFile(join(dir, 'Jost-Medium.ttf')),
  readFile(join(dir, 'hero.png')),
  readFile(join(dir, 'pleats.jpg')),
]);

const hero = `data:image/png;base64,${heroBuf.toString('base64')}`;
const pleats = `data:image/jpeg;base64,${pleatsBuf.toString('base64')}`;

const size = { width: 1200, height: 630 };

const fonts = [
  { name: 'Jost', data: jost, weight: 400 as const, style: 'normal' as const },
  { name: 'Jost', data: jostMed, weight: 500 as const, style: 'normal' as const },
];

function image(node: ReactElement) {
  return new ImageResponse(node, { ...size, fonts });
}

export function homeOg() {
  const services = ['Makeup', 'Hair', 'Draping', 'Nails', 'Mehendi'];
  return image(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#F7F0E4', color: '#2B0F24', fontFamily: 'Jost' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '52px 48px 48px 56px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 16, letterSpacing: 4, color: '#BF8E2E', fontWeight: 500 }}>ALLUREYOU · CHENNAI</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18, fontWeight: 500, lineHeight: 0.92 }}>
            <div style={{ fontSize: 84 }}>Bridal</div>
            <div style={{ fontSize: 42, color: '#A3245E', marginTop: 8 }}>& Beauty Studio</div>
          </div>
          <div style={{ display: 'flex', marginTop: 22, fontSize: 26, lineHeight: 1.35, maxWidth: 620 }}>Makeup, hair, saree draping, nails and mehendi for the morning you will remember.</div>
          <div style={{ display: 'flex', marginTop: 14, fontSize: 20, color: '#6A5361' }}>Iyyappanthangal, Chennai · by Yashmin</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {services.map((name) => (
              <div key={name} style={{ display: 'flex', border: '1px solid rgba(191,142,46,0.55)', borderRadius: 999, padding: '8px 14px', fontSize: 16 }}>{name}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', background: '#2B0F24', color: '#E3BA58', borderRadius: 999, padding: '16px 28px', fontSize: 24, fontWeight: 500 }}>Book your look</div>
        </div>
      </div>
      <div style={{ display: 'flex', width: 380, height: '100%', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 0 }}>
        <img src={hero} width={340} height={630} style={{ objectFit: 'contain', objectPosition: 'center bottom' }} />
      </div>
    </div>,
  );
}

export function workshopOg() {
  const w = site.workshop;
  const facts = [
    ['DATE', w.dateWeekLongYear],
    ['TIME', w.timeLabel],
    ['VENUE', w.venue],
    ['FEE', `Rs. ${site.price.toLocaleString('en-IN')} per person`],
    ['SEATS', 'Limited, small batch'],
    ['WITH', 'Yashmin, on real silk sarees'],
  ];
  return image(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#2B0F24', color: '#F7F0E4', fontFamily: 'Jost' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 760, padding: '42px 40px 36px 48px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 15, letterSpacing: 3.5, color: '#E3BA58', fontWeight: 500 }}>ONE-DAY HANDS-ON WORKSHOP</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10, fontWeight: 500, fontSize: 52, lineHeight: 0.98 }}>
            <div>Saree Pre-Pleating</div>
            <div style={{ color: '#E3BA58' }}>& Draping</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 672 }}>
          {facts.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', width: 336, padding: '11px 16px 11px 0', borderTop: '1px solid rgba(227,186,88,0.4)' }}>
              <div style={{ display: 'flex', fontSize: 13, letterSpacing: 2.2, color: '#E3BA58', fontWeight: 500 }}>{label}</div>
              <div style={{ display: 'flex', marginTop: 4, fontSize: 22, lineHeight: 1.25 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', background: '#E3BA58', color: '#2B0F24', borderRadius: 999, padding: '14px 26px', fontSize: 24, fontWeight: 500 }}>Reserve your seat</div>
          <div style={{ display: 'flex', fontSize: 14, color: 'rgba(247,240,228,0.75)' }}>{`${site.url.replace(/^https?:\/\//, '')}${site.routes.workshop.replace(/\/$/, '')}`}</div>
        </div>
      </div>
      <div style={{ display: 'flex', width: 440, height: '100%', overflow: 'hidden' }}>
        <img src={pleats} width={440} height={630} style={{ objectFit: 'cover', objectPosition: 'center 18%' }} />
      </div>
    </div>,
  );
}
