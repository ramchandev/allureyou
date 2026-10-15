'use client';
import { useEffect, useState } from 'react';

const pad = (n: number) => (n < 10 ? '0' : '') + n;

/** [days, hours, mins, secs] as 2-digit strings, ticking every second. `initial` must match the server render. */
export function useCountdown(targetIso: string, initial: [string, string, string, string]) {
  const [parts, setParts] = useState(initial.join(':'));
  useEffect(() => {
    const target = Date.parse(targetIso);
    const tick = () => {
      const t = Math.max(0, target - Date.now()), s = Math.floor(t / 1000);
      setParts([pad(Math.floor(s / 86400)), pad(Math.floor((s % 86400) / 3600)), pad(Math.floor((s % 3600) / 60)), pad(s % 60)].join(':'));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return parts.split(':') as [string, string, string, string];
}
