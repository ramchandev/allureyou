import { site } from '@/lib/site';

export default function MentorCard() {
  return (
    <section className="sec gutter mentor" id="mentor">
      <div className="wrap mentor-card">
        <div className="mentor-copy">
          <span className="hi">Hi, I&apos;m</span>
          <span className="name">Yashmin</span>
          <span className="role">Makeup Artist &amp; Saree Draping Specialist</span>
          <p>I run <b>AllureYou Bridal &amp; Beauty Studio</b> in Iyyappanthangal, where brides come to us for makeup, hair, draping, nails and mehendi. Pre-pleating is the step that makes a bridal morning calm, and I have taught it batch after batch to students who now drape for their own clients. In this workshop I teach you the exact methods I use on wedding days, one step at a time, with your hands on the saree.</p>
          <div className="chips"><span className="chip">Makeup</span><span className="chip">Hair</span><span className="chip">Draping</span><span className="chip">Nails</span><span className="chip">Mehendi</span></div>
          <div className="ctas" style={{ justifyContent: 'center' }}>
            <a className="btn btn-gold" href="#register">Learn with Yashmin ↗</a>
            <a className="btn btn-line" href={site.instagram} target="_blank" rel="noopener">{site.instagramHandle}</a>
          </div>
        </div>
        <div className="arch-wrap">
          <svg className="st a" aria-hidden="true"><use href="#star" /></svg>
          <svg className="st b" aria-hidden="true"><use href="#star" /></svg>
          <div className="arch"><img width="982" height="1200" src="/img/yashmin-cutout.webp" alt="Yashmin in a mustard silk saree with a bronze pallu" /></div>
        </div>
      </div>
    </section>
  );
}
