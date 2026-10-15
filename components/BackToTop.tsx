'use client';

import { useEffect, useState } from 'react';

/** Floating control back to the saree draping hero. Hidden until the page has scrolled. */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a className={shown ? 'to-top on' : 'to-top'} href="#saree-pre-pleating-draping" aria-label="Back to top">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14.5 12 8.5l6 6" /></svg>
    </a>
  );
}
