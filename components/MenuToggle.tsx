'use client';
import { useEffect, useRef } from 'react';

/** Toggles #nav.open exactly like the original script (imperative, so the header never re-renders). */
export default function MenuToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const btn = ref.current!, nav = document.getElementById('nav')!;
    const onClick = () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); };
    btn.addEventListener('click', onClick);
    return () => { btn.removeEventListener('click', onClick); nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  }, []);
  return (
    <button ref={ref} className="menu-btn" id="menuBtn" aria-controls="nav" aria-expanded="false" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h16M2 14h16" /></svg>
    </button>
  );
}
