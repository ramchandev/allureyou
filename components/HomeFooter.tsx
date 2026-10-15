import { site } from '@/lib/site';

export default function HomeFooter() {
  return (
    <footer><div className="gutter">
      <span>{`AllureYou Bridal & Beauty Studio · ${site.address.street}, ${site.address.locality} ${site.address.postalCode}`}</span>
      <span><a href={site.instagram} target="_blank" rel="noopener">Instagram</a> · <a href={site.google} target="_blank" rel="noopener">Google</a> · WhatsApp <span style={{ userSelect: 'all' }}>{site.phoneDisplay}</span></span>
    </div></footer>
  );
}
