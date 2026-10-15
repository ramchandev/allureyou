const items = ['Bridal Makeup', 'Hair Styling', 'Saree Draping', 'Pre-Pleating', 'Nail Art', 'Bridal Mehendi'];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true"><div className="track">
      {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
    </div></div>
  );
}
