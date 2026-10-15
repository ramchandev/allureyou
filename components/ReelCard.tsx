import { reelUrl } from '@/lib/site';

export default function ReelCard({ id, title, img }: { id: string; title: string; img: string }) {
  return (
    <a className="reel" href={reelUrl(id)} target="_blank" rel="noopener" aria-label={`Watch reel: ${title} on Instagram`}>
      <img src={`/img/${img}.webp`} alt="" />
      <span className="play"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z" /></svg></span>
      <span className="meta"><small>Instagram reel</small><b>{title}</b></span>
    </a>
  );
}
