import { site } from '@/lib/site';
import ReelCard from './ReelCard';

export default function Reels() {
  return (
    <section className="sec gutter reels on-dark" id="reels">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Watch the drapes</span>
          <h2>See the pleats come together, <em>reel by reel.</em></h2>
          <p className="lead">Short draping videos from Yashmin&apos;s Instagram. Tap any reel to watch it.</p>
        </div>
        <div className="reel-row" id="reelRow">
          {site.reels.map(([id, title, img]) => <ReelCard key={id} id={id} title={title} img={img} />)}
        </div>
        <div className="reel-foot">
          <span>Scroll sideways for more →</span>
          <a className="btn btn-line" href={site.instagram} target="_blank" rel="noopener">{`Follow ${site.instagramHandle}`}</a>
        </div>
      </div>
    </section>
  );
}
