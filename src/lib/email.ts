const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "OK3D Prints <onboarding@resend.dev>";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "ok3dinc@gmail.com";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface QuoteEmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  material: string;
  quantity: string;
  description: string;
  deadline: string;
  notes?: string;
  trackingCode?: string | null;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set, skipping email");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "unknown error");
    console.error(`[Email] Failed to send to ${to}: ${res.status} ${err}`);
  }
}

/** Notify OK3D about a new quote request */
export async function sendOwnerNotification(data: QuoteEmailData) {
  const subject = `New Quote Request from ${esc(data.name)}`;
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F8FAFC; padding: 32px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #0074FF; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="margin: 0; font-size: 22px; color: #FFDD00;">New Quote Request</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #94A3B8; width: 120px;">Name</td><td style="padding: 8px 0;">${esc(data.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #94A3B8;">Email</td><td style="padding: 8px 0;"><a href="mailto:${esc(data.email)}" style="color: #0074FF;">${esc(data.email)}</a></td></tr>
        ${data.company ? `<tr><td style="padding: 8px 0; color: #94A3B8;">Company</td><td style="padding: 8px 0;">${esc(data.company)}</td></tr>` : ""}
        ${data.phone ? `<tr><td style="padding: 8px 0; color: #94A3B8;">Phone</td><td style="padding: 8px 0;">${esc(data.phone)}</td></tr>` : ""}
        <tr><td colspan="2" style="padding: 16px 0 8px 0; border-top: 1px solid #1E3A5F;"></td></tr>
        <tr><td style="padding: 8px 0; color: #94A3B8;">Material</td><td style="padding: 8px 0;">${esc(data.material)}</td></tr>
        <tr><td style="padding: 8px 0; color: #94A3B8;">Quantity</td><td style="padding: 8px 0;">${esc(data.quantity)}</td></tr>
        <tr><td style="padding: 8px 0; color: #94A3B8;">Deadline</td><td style="padding: 8px 0;">${esc(data.deadline)}</td></tr>
        <tr><td style="padding: 8px 0; color: #94A3B8;">Description</td><td style="padding: 8px 0;">${esc(data.description)}</td></tr>
        ${data.notes ? `<tr><td style="padding: 8px 0; color: #94A3B8;">Notes</td><td style="padding: 8px 0;">${esc(data.notes)}</td></tr>` : ""}
      </table>
      ${data.trackingCode ? `<div style="margin-top: 24px; padding: 12px; background: #002A5E; border-radius: 8px; font-family: monospace; color: #0074FF; text-align: center;">${esc(data.trackingCode)}</div>` : ""}
    </div>
  `;

  await sendEmail(NOTIFY_EMAIL, subject, html);
}

/** Send confirmation email to the customer */
export async function sendCustomerConfirmation(data: QuoteEmailData) {
  const subject = "We got your quote request — OK3D Prints";
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F8FAFC; padding: 32px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #0074FF; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="margin: 0; font-size: 22px;">OK3D Prints</h1>
      </div>
      <p style="font-size: 16px; line-height: 1.6;">Hey ${esc(data.name)},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #94A3B8;">
        Thanks for reaching out! We received your quote request and will get back to you within 24 hours with pricing and timeline details.
      </p>
      <div style="margin: 24px 0; padding: 16px; background: #111827; border: 1px solid #1E3A5F; border-radius: 8px;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">Your Request</p>
        <p style="margin: 4px 0; color: #F8FAFC;"><strong>${esc(data.material)}</strong> — ${esc(data.quantity)}</p>
        <p style="margin: 4px 0; color: #94A3B8; font-size: 14px;">${esc(data.description)}</p>
      </div>
      ${data.trackingCode ? `
      <div style="margin: 24px 0; padding: 16px; background: rgba(0, 116, 255, 0.1); border: 1px solid rgba(0, 116, 255, 0.3); border-radius: 8px; text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">Tracking Code</p>
        <p style="margin: 0; font-family: monospace; font-size: 16px; color: #0074FF; word-break: break-all;">${esc(data.trackingCode)}</p>
      </div>
      ` : ""}
      <p style="font-size: 14px; color: #94A3B8; line-height: 1.6;">
        Have CAD files to share? Send them to <a href="mailto:ok3dinc@gmail.com" style="color: #0074FF;">ok3dinc@gmail.com</a> and reference your tracking code.
      </p>
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #1E3A5F; font-size: 12px; color: #64748B;">
        OK3D Prints — Precision Parts On Demand<br>
        (562) 273-6603
      </div>
    </div>
  `;

  await sendEmail(data.email, subject, html);
}
