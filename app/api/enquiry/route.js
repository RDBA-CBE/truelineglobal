import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 2000) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (clean(body.website, 120)) {
      return NextResponse.json({ ok: true });
    }

    const enquiry = {
      name: clean(body.name, 120),
      company: clean(body.company, 160),
      email: clean(body.email, 180),
      phone: clean(body.phone, 80),
      country: clean(body.country, 100),
      enquiryType: clean(body.enquiryType, 80),
      product: clean(body.product, 160),
      quantity: clean(body.quantity, 100),
      origin: clean(body.origin, 120),
      destination: clean(body.destination, 160),
      message: clean(body.message, 4000),
    };

    if (!enquiry.name || !enquiry.email || !enquiry.enquiryType || !enquiry.message) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 },
      );
    }

    if (!emailPattern.test(enquiry.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.ENQUIRY_TO_EMAIL || 'info@truelineglobal.net';

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        {
          error:
            'The enquiry email service is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to the server environment.',
        },
        { status: 503 },
      );
    }

    const rows = [
      ['Name', enquiry.name],
      ['Company', enquiry.company],
      ['Email', enquiry.email],
      ['Phone / WhatsApp', enquiry.phone],
      ['Country', enquiry.country],
      ['Enquiry Type', enquiry.enquiryType],
      ['Product', enquiry.product],
      ['Quantity', enquiry.quantity],
      ['Required Origin', enquiry.origin],
      ['Destination', enquiry.destination],
    ];

    const htmlRows = rows
      .filter(([, value]) => value)
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #dfe3e8;font-weight:700">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #dfe3e8">${escapeHtml(value)}</td></tr>`,
      )
      .join('');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: enquiry.email,
        subject: `New ${enquiry.enquiryType} enquiry from ${enquiry.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#0B1736;line-height:1.6">
            <h2 style="margin:0 0 18px">New Trueline Website Enquiry</h2>
            <table style="border-collapse:collapse;width:100%;max-width:760px">${htmlRows}</table>
            <h3 style="margin:24px 0 8px">Specification / Requirement</h3>
            <p style="white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend enquiry error:', response.status, details);
      return NextResponse.json(
        { error: 'Your enquiry could not be sent. Please try again shortly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Enquiry route error:', error);
    return NextResponse.json(
      { error: 'Your enquiry could not be sent. Please try again shortly.' },
      { status: 500 },
    );
  }
}
