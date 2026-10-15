const mods = [
  { img: 'pleats-pink-1', alt: 'Fluffy, even pleats falling from the waist', step: 'Step one · Pleating', title: 'Fluffy pleats & fabric handling', text: 'Read the fabric and handle it so pleats fall full and even, from soft cotton to stiff Kanchipuram silk.', items: ['Measuring pleat width to the wearer', 'Even, fluffy pleat technique', 'Handling silk, cotton and synthetics', 'Pinning that holds and stays hidden'] },
  { img: 'student-4', alt: 'A student holding the aqua silk saree she box-folded', step: 'Step two · Folding', title: 'Perfect box folding & hanger folding', text: 'Set the pleats and pallu so the saree travels and stores without losing its shape.', items: ['Box folding for silk and heavy borders', 'Hanger folding for ready-to-wear sarees', 'Pallu set so the saree stores without losing its shape'] },
  { img: 'bride-full', alt: 'Full-length bridal drape in black and violet silk', step: 'Step three · Draping', title: 'Saree draping without ironing', text: 'Take the pre-pleated saree to a finished, camera-ready drape quickly and without an iron.', items: ['Fast drape from a pre-pleated saree', 'Pallu setting and finishing', 'Keeping the drape sharp all day'] },
];

export default function Modules() {
  return (
    <section className="sec gutter modules" id="learn">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">What you will learn</span>
          <h2>Pleat, fold, drape. <em>In that order.</em></h2>
          <p className="lead">The day follows the same sequence Yashmin uses on a wedding morning. You practise every step with your own hands.</p>
        </div>
        <div className="mod-grid">
          {mods.map((m) => (
            <article className="mod" key={m.img}>
              <img width="1100" height="1467" src={`/img/${m.img}.webp`} alt={m.alt} />
              <div className="mod-body">
                <span className="mod-step">{m.step}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <ul>{m.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
