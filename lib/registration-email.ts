import { inr, site } from './site';

export type Registration = {
  name: string;
  /** E.164, e.g. +919876543210 */
  phone: string;
  /** What the student typed. Empty when they left email blank. */
  email: string;
  area: string;
  seats: number;
  message: string;
};

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function prettyPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const local = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  if (local.length !== 10) return phone;
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

function waDigits(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('91') ? digits : `91${digits}`;
}

export function registrationSubject(reg: Registration) {
  const seatWord = reg.seats === 1 ? 'seat' : 'seats';
  return `New class registration — ${reg.name} · ${reg.seats} ${seatWord}`;
}

/** Branded HTML for the studio inbox. All student text is escaped. */
export function registrationEmailHtml(reg: Registration) {
  const total = inr(site.price * reg.seats);
  const phone = prettyPhone(reg.phone);
  const digits = waDigits(reg.phone);
  const reply = `Hi ${reg.name}, this is Yashmin from AllureYou. I have your seat request for the ${site.workshop.title} on ${site.workshop.dateWeekLongYear}.`;
  const wa = `https://wa.me/${digits}?text=${encodeURIComponent(reply)}`;
  const email = reg.email.trim();
  const note = reg.message.trim();

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #E7D9C4;font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8A6A3A;width:108px;vertical-align:top;">${label}</td>
      <td style="padding:11px 0;border-bottom:1px solid #E7D9C4;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.4;color:#2B0F24;vertical-align:top;">${value}</td>
    </tr>`;

  const emailCell = email
    ? `<a href="mailto:${esc(email)}" style="color:#A3245E;text-decoration:none;">${esc(email)}</a>`
    : `<span style="color:#6A5361;">Not given</span>`;

  const noteBlock = note
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;background:#F7F0E4;border-radius:14px;">
        <tr><td style="padding:16px 18px;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;color:#2B0F24;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A6A3A;margin-bottom:6px;">Note from ${esc(reg.name.split(' ')[0] || 'the student')}</div>
          ${esc(note).replace(/\n/g, '<br>')}
        </td></tr>
      </table>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F0E4;">
  <div style="display:none;max-height:0;overflow:hidden;">${esc(reg.name)} asked for ${reg.seats} ${reg.seats === 1 ? 'seat' : 'seats'} · ${esc(phone)} · ${total}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F0E4;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFBF4;border-radius:22px;overflow:hidden;">
        <tr><td style="background:#2B0F24;padding:28px 32px 24px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#E3BA58;">AllureYou · New registration</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:#F7F0E4;margin-top:10px;">${esc(site.workshop.title)}</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#E3BA58;margin-top:10px;">${esc(site.workshop.dateWeekLongYear)} · ${esc(site.workshop.timeLabel)}</div>
        </td></tr>
        <tr><td style="height:4px;background:#BF8E2E;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#A3245E;">The class</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">
            ${row('Date', esc(site.workshop.dateWeekLongYear))}
            ${row('Time', esc(site.workshop.timeLabel))}
            ${row('Venue', esc(site.workshop.venue))}
            ${row('Fee', `${esc(inr(site.price))} per person`)}
          </table>
        </td></tr>
        <tr><td style="padding:22px 32px 8px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#A3245E;">The student</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">
            ${row('Name', esc(reg.name))}
            ${row('WhatsApp', `<a href="${wa}" style="color:#A3245E;text-decoration:none;">${esc(phone)}</a>`)}
            ${row('Email', emailCell)}
            ${row('Area', reg.area.trim() ? esc(reg.area.trim()) : '<span style="color:#6A5361;">Not given</span>')}
            ${row('Seats', esc(String(reg.seats)))}
            ${row('Total', `<strong>${esc(total)}</strong>`)}
          </table>
          ${noteBlock}
        </td></tr>
        <tr><td align="center" style="padding:26px 32px 8px;">
          <a href="${wa}" style="display:inline-block;background:#2B0F24;color:#F7F0E4;font-family:Georgia,'Times New Roman',serif;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:999px;">Reply on WhatsApp</a>
        </td></tr>
        <tr><td style="padding:18px 32px 28px;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.5;color:#6A5361;text-align:center;">
          They are opening WhatsApp next, with this same request ready to send.<br>
          AllureYou Bridal &amp; Beauty Studio · Iyyappanthangal, Chennai
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
