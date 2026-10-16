'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a page view on App Router navigations. The first load is already covered by gtag config. */
export default function GaPageViews({ id }: { id: string }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.gtag?.('config', id, { page_path: pathname });
  }, [id, pathname]);

  return null;
}
