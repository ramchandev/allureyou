import Script from 'next/script';
import GaPageViews from './GaPageViews';

/** Reads GA_MEASUREMENT_ID on the server and injects gtag. Missing env skips the tag. */
export default function GoogleAnalytics() {
  const id = process.env.GA_MEASUREMENT_ID?.trim();
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ${JSON.stringify(id)});
      `}</Script>
      <GaPageViews id={id} />
    </>
  );
}
