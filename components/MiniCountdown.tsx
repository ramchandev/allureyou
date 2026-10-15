'use client';
import { site } from '@/lib/site';
import { useCountdown } from '@/lib/useCountdown';

export default function MiniCountdown() {
  const [d, h, m, s] = useCountdown(site.workshop.start, ['00', '00', '00', '00']);
  return (
    <span className="mini-cd" aria-label="Time left until the workshop"><span><b id="a-d">{d}</b><small>D</small></span><i>:</i><span><b id="a-h">{h}</b><small>H</small></span><i>:</i><span><b id="a-m">{m}</b><small>M</small></span><i>:</i><span><b id="a-s">{s}</b><small>S</small></span></span>
  );
}
