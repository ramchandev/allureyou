'use client';
import { site } from '@/lib/site';
import { useCountdown } from '@/lib/useCountdown';

export default function Countdown() {
  const [d, h, m, s] = useCountdown(site.workshop.start, ['16', '00', '00', '00']);
  return (
    <div className="band gutter on-dark">
      <div className="wrap">
        <p>Because every bride deserves a perfect drape.</p>
        <div className="count" id="count" aria-live="polite">
          <div><b id="cd-d">{d}</b><small>Days</small></div>
          <span className="sep" aria-hidden="true">:</span>
          <div><b id="cd-h">{h}</b><small>Hours</small></div>
          <span className="sep" aria-hidden="true">:</span>
          <div><b id="cd-m">{m}</b><small>Mins</small></div>
          <span className="sep" aria-hidden="true">:</span>
          <div><b id="cd-s">{s}</b><small>Secs</small></div>
        </div>
      </div>
    </div>
  );
}
