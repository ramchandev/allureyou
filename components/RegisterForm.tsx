'use client';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { inr, priceLabel, site, waRegisterHref } from '@/lib/site';

export default function RegisterForm() {
  const nameRef = useRef<HTMLInputElement>(null), phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null), areaRef = useRef<HTMLInputElement>(null), msgRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const [seats, setSeats] = useState('1');
  const [nameErr, setNameErr] = useState(''), [phoneErr, setPhoneErr] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [summary, setSummary] = useState(''), [waLink, setWaLink] = useState('#');
  const n = +seats;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const name = nameRef.current!.value.trim();
    let phone = phoneRef.current!.value.replace(/[^\d]/g, '');
    if (phone.length === 12 && phone.indexOf('91') === 0) phone = phone.slice(2);
    let ok = true;
    if (name.length < 2) { setNameErr('Please enter your name.'); ok = false; } else setNameErr('');
    if (phone.length !== 10) { setPhoneErr('Enter a 10-digit mobile number, e.g. 9876543210.'); ok = false; } else setPhoneErr('');
    if (!ok) { (name.length < 2 ? nameRef.current! : phoneRef.current!).focus(); return; }
    const email = emailRef.current!.value.trim(), area = areaRef.current!.value.trim(), note = msgRef.current!.value.trim();
    const lines = [`Hi Yashmin, I would like to register for the ${site.workshop.title} on ${site.workshop.dateWeekShortYear}.`, '',
      'Name: ' + name, 'WhatsApp: +91 ' + phone];
    if (email) lines.push('Email: ' + email);
    if (area) lines.push('Area: ' + area);
    const count = +seats;
    lines.push('Seats: ' + count + ' (Total ' + inr(site.price * count) + ')');
    if (note) lines.push('Note: ' + note);
    lines.push('', 'Please share the payment details.');
    const text = lines.join('\n');

    const href = waRegisterHref(text);
    const gotcha = new FormData(e.currentTarget).get('_gotcha');
    if (gotcha) return;

    sendingRef.current = true;
    flushSync(() => setSending(true));
    fetch(site.leadForm, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: new URLSearchParams({
        name,
        email: email || site.leadFallbackEmail,
        phone: '+91' + phone,
        message: note,
        area,
        seats: String(count),
      }),
    }).catch(() => {});
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      await fetch('/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({ name, phone: '+91' + phone, email, area, seats: count, message: note }),
      });
    } catch {
      /* WhatsApp still opens if the inbox email cannot be sent. */
    } finally {
      clearTimeout(timer);
    }
    flushSync(() => { setSummary(text); setWaLink(href); setSubmitted(true); setSending(false); });
    sendingRef.current = false;
    window.location.href = href;
  }

  return (
    <form id="regForm" action={site.leadForm} method="POST" noValidate onSubmit={onSubmit}>
      <div id="formBody" style={{ display: 'grid', gap: '18px' }} hidden={submitted}>
        <h3>Your details</h3>
        <div className="row">
          <div className={'field' + (nameErr ? ' bad' : '')} id="f-name"><label htmlFor="name">Full name</label><input ref={nameRef} id="name" name="name" autoComplete="name" placeholder="e.g. Priya Raman" required /><span className="err" aria-live="polite">{nameErr}</span></div>
          <div className={'field' + (phoneErr ? ' bad' : '')} id="f-phone"><label htmlFor="phone">WhatsApp number</label><input ref={phoneRef} id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" required /><span className="err" aria-live="polite">{phoneErr}</span></div>
        </div>
        <div className="row">
          <div className="field"><label htmlFor="email">Email <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.6 }}>(optional)</span></label><input ref={emailRef} id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></div>
          <div className="field"><label htmlFor="area">Area / city</label><input ref={areaRef} id="area" name="area" placeholder="e.g. Porur, Chennai" /></div>
        </div>
        <div className="row">
          <div className="field"><label htmlFor="seats">Seats</label><select id="seats" name="seats" value={seats} onChange={(e) => setSeats(e.target.value)}><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
          <div className="field"><span className="flabel">Total</span><output className="total" id="total" htmlFor="seats">{inr(site.price * n)}{n > 1 ? <small>{`${n} × ${priceLabel}`}</small> : <small>per person</small>}</output></div>
        </div>
        <div className="field"><label htmlFor="message">Anything we should know?</label><textarea ref={msgRef} id="message" name="message" placeholder="Any other questions"></textarea></div>
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn btn-gold" type="submit" disabled={sending} aria-busy={sending || undefined}><svg className="wa"><use href="#wa" /></svg>{sending ? 'Sending…' : 'Send registration on WhatsApp'}</button>
      </div>
      <div className="done" id="done" ref={doneRef} hidden={!submitted}>
        <div className="tick"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10" /></svg></div>
        <h3>One last step</h3>
        <p style={{ margin: 0, color: 'var(--ink-soft)' }}>Tap below to open WhatsApp with your details filled in, then press send. We will reply with the payment details.</p>
        <pre id="summary">{summary}</pre>
        <a className="btn btn-gold" id="waLink" href={waLink} target="_blank" rel="noopener"><svg className="wa"><use href="#wa" /></svg>Open WhatsApp to send</a>
        <button type="button" className="btn btn-line" id="editBtn" onClick={() => { flushSync(() => setSubmitted(false)); nameRef.current!.focus(); }}>Edit details</button>
      </div>
    </form>
  );
}
