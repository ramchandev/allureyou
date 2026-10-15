'use client';
import { useEffect, useRef, useState } from 'react';

const reviews = [
  { src: '/img/reviews/review-01.jpg', alt: 'Hema thanks Yashmin for a patient, clear saree pleating and draping session, and says she learned a new skill in one day.' },
  { src: '/img/reviews/review-02.jpg', alt: 'Batch 11 notes from Vasumathi and Janani, praising Yashmin’s patience and the saree draping and pre-pleating class.' },
  { src: '/img/reviews/review-03.jpg', alt: 'Karthika says the pre-pleating class was simple to follow, and that she feels much more confident.' },
  { src: '/img/reviews/review-04.jpg', alt: 'Praveena and Sriharshne say the pleating steps were clear and that the class felt comfortable.' },
  { src: '/img/reviews/review-05.jpg', alt: 'Karthika says she draped a saree on her own for college culturals the day after the class.' },
  { src: '/img/reviews/review-06.jpg', alt: 'A student finished saree box folding on her first attempt, and others say the teaching was clear.' },
  { src: '/img/reviews/review-07.jpg', alt: 'Dhivya and Neelavathi thank Yashmin for a patient class and for staying calm while they struggled.' },
  { src: '/img/reviews/review-08.jpg', alt: 'Preethi says she learned to drape with proper pleats, and that her doubts were answered calmly.' },
  { src: '/img/reviews/review-09.jpg', alt: 'Selvanayaki thanks Yashmin for saree draping, pre-pleating and box folding, and shares her Google review.' },
  { src: '/img/reviews/review-10.jpg', alt: 'A student thanks Yashmin for a clear online saree draping class, beside a photo of a pre-pleated saree.' },
  { src: '/img/reviews/review-11.jpg', alt: 'Dhivya Pandurangan writes that one session gave her the confidence to drape a saree on her own.' },
  { src: '/img/reviews/review-12.jpg', alt: 'A comment from Iyappanthangal saying the pleats were learned from Yashmin’s training.' },
  { src: '/img/reviews/review-13.jpg', alt: 'A student calls it a calm, clear class and the best saree drape and pleating class they have taken.' },
  { src: '/img/reviews/review-14.jpg', alt: 'Divya Bala’s five-star note on a one-on-one saree draping and pre-pleating session with Yashmin.' },
];

export default function Reviews() {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (open === null || !el) return;
    if (!el.open) el.showModal();
    frame.current?.scrollTo({ top: 0 });
  }, [open]);

  function step(dir: number) {
    setOpen((i) => (i === null ? i : (i + dir + reviews.length) % reviews.length));
  }

  const review = open === null ? null : reviews[open];

  return (
    <section className="sec gutter" id="reviews">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">From earlier batches</span>
          <h2>They learned it, tried it, <em>and the drape held.</em></h2>
          <p className="lead">Messages from students who took the class with Yashmin, then pleated and draped on their own. Tap a note to read it.</p>
        </div>
        <ul className="reviews">
          {reviews.map((item, i) => (
            <li key={item.src}>
              <button type="button" onClick={() => setOpen(i)} aria-haspopup="dialog">
                <img src={item.src} width={738} height={1600} alt={item.alt} />
                <span>Read</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <dialog
        ref={dialog}
        className="review-dialog"
        aria-label="Student review"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
        }}
      >
        {review && (
          <>
            <button type="button" className="review-close" onClick={() => dialog.current?.close()}>Close</button>
            <button type="button" className="review-nav prev" aria-label="Previous review" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" /></svg>
            </button>
            <div className="review-frame" ref={frame}>
              <img src={review.src} width={738} height={1600} alt={review.alt} />
            </div>
            <button type="button" className="review-nav next" aria-label="Next review" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" /></svg>
            </button>
          </>
        )}
      </dialog>
    </section>
  );
}