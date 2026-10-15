export default function Gallery() {
  return (
    <section className="sec gutter" id="batches">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">From earlier batches</span>
          <h2>Their first perfect pleats, <em>held up proudly.</em></h2>
          <p className="lead">Every student leaves with a saree they pleated themselves. Here are a few from our past workshops at the studio.</p>
        </div>
        <div className="gal">
          <figure><img width="1100" height="825" src="/img/batch-studio.webp" alt="A workshop batch at the AllureYou studio holding their pre-pleated sarees" /><figcaption>A full batch at the studio</figcaption></figure>
          <figure><img width="1100" height="1465" src="/img/student-4.webp" alt="Student with a pleated aqua silk saree beside Yashmin" /></figure>
          <figure><video width="960" height="540" src="/img/studio-clip.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="A student setting pleats with an iron during a workshop"></video><figcaption>Setting the pleats, workshop day</figcaption></figure>
          <figure><img width="1100" height="1467" src="/img/student-1.webp" alt="Student holding a pre-pleated pink and silver saree" /></figure>
          <figure><img width="1100" height="1465" src="/img/student-5.webp" alt="Student with a pleated orange and gold saree" /></figure>
          <figure><img width="1100" height="1467" src="/img/batch-1.webp" alt="Students lined up with their finished sarees" /></figure>
          <figure><img width="1100" height="1467" src="/img/student-signage.webp" alt="Student with Yashmin under the AllureYou studio sign" /><figcaption>At the studio</figcaption></figure>
          <figure><img width="1100" height="1465" src="/img/student-6.webp" alt="Student with a pleated green and gold saree" /></figure>
          <figure><img width="1100" height="1467" src="/img/student-2.webp" alt="Student holding a pleated teal and coral saree" /></figure>
          <figure><img width="1100" height="1467" src="/img/batch-2.webp" alt="Another batch of students with their sarees" /></figure>
          <figure><img width="1100" height="1467" src="/img/student-3.webp" alt="Student holding a pleated violet and gold saree" /></figure>
          <figure><img width="1100" height="1465" src="/img/student-7.webp" alt="Student holding a pleated pink and gold saree" /></figure>
        </div>
      </div>
    </section>
  );
}
