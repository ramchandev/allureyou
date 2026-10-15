import { site } from '@/lib/site';
import { registrationEmailHtml, registrationSubject, type Registration } from '@/lib/registration-email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clean(value: unknown, max: number) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function parse(body: unknown): Registration | null {
  if (!body || typeof body !== 'object') return null;
  const data = body as Record<string, unknown>;
  const name = clean(data.name, 120);
  const digits = String(data.phone ?? '').replace(/\D/g, '');
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  const seats = Number(data.seats);
  if (name.length < 2 || !/^\d{10}$/.test(local) || !Number.isInteger(seats) || seats < 1 || seats > 4) {
    return null;
  }
  const email = clean(data.email, 160);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return {
    name,
    phone: `+91${local}`,
    email,
    area: clean(data.area, 80),
    seats,
    message: String(data.message ?? '').trim().slice(0, 2000),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  if (body && typeof body === 'object' && String((body as { _gotcha?: unknown })._gotcha ?? '').trim()) {
    return Response.json({ ok: true, skipped: true });
  }

  const registration = parse(body);
  if (!registration) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.REGISTRATION_TO || site.leadFallbackEmail;
  if (!key || !from) {
    console.error('Class registration email skipped: set RESEND_API_KEY and RESEND_FROM.');
    return Response.json({ ok: false, skipped: true }, { status: 503 });
  }

  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: registrationSubject(registration),
      html: registrationEmailHtml(registration),
      ...(registration.email ? { reply_to: registration.email } : {}),
    }),
  });

  if (!resend.ok) {
    console.error('Resend rejected the class registration email.', resend.status);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
