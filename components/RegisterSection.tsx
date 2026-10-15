import { priceLabel, site } from '@/lib/site';
import RegisterForm from './RegisterForm';

export default function RegisterSection() {
  const w = site.workshop;
  return (
    <section className="sec gutter register on-dark" id="register">
      <div className="wrap reg-grid">
        <div className="reg-copy">
          <span className="eyebrow">Register</span>
          <h2>Reserve your seat for <em>{`${w.dateLong}.`}</em></h2>
          <p className="lead">{`${priceLabel} per person. Send us your details and we will reply on WhatsApp with the payment details and what to bring. Seats are limited and go in order of confirmation.`}</p>
          <ul className="contact-list">
            <li><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg><span>{`${w.dateWeekLongYear} · ${w.timeLabel}`}</span></li>
            <li><svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg><span>{`${w.venue}, ${site.address.locality}`}</span></li>
            <li><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg><span>WhatsApp <span className="num">{site.phoneDisplay}</span></span></li>
          </ul>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}
