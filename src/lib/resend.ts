import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendContactNotification(submission: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await getResend().emails.send({
    from: "Jonathan Brink <onboarding@resend.dev>",
    to: "brink.jonathan@gmail.com",
    replyTo: submission.email,
    subject: `[jonathanbrink.com] Message from ${submission.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1814;">
        <h2 style="color: #6d28d9; margin-bottom: 24px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top; width: 80px;">Name:</td>
            <td style="padding: 8px 12px;">${submission.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Email:</td>
            <td style="padding: 8px 12px;"><a href="mailto:${submission.email}">${submission.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px 12px; white-space: pre-wrap;">${submission.message}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #888;">
          Reply directly to this email to respond to ${submission.name}.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send contact notification:", error);
    throw error;
  }
}

// ── Workshops ───────────────────────────────────────────────────

function formatWorkshopDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

export async function sendWorkshopConfirmation(params: {
  to: string;
  name: string;
  workshopTitle: string;
  startsAt: string; // ISO
  joinUrl: string;
}) {
  const when = formatWorkshopDate(params.startsAt);

  const { error } = await getResend().emails.send({
    from: "Jonathan Brink <onboarding@resend.dev>",
    to: params.to,
    subject: `You're in — ${params.workshopTitle}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1814;">
        <h1 style="font-size: 28px; margin: 0 0 8px; color: #1a1814;">You're in.</h1>
        <p style="font-size: 16px; color: #4a4740; margin: 0 0 24px;">
          Hey ${params.name}, your seat for <strong>${params.workshopTitle}</strong> is confirmed.
        </p>

        <div style="border: 1px solid #e5e3de; border-radius: 12px; padding: 20px; margin-bottom: 24px; background: #f8f7f4;">
          <div style="font-family: 'Fira Code', monospace; font-size: 11px; color: #8a8680; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">When</div>
          <div style="font-size: 16px; color: #1a1814; margin-bottom: 16px;">${when}</div>
          <a href="${params.joinUrl}" style="display: inline-block; background: #6d28d9; color: #fff; padding: 12px 22px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px;">Join the Zoom →</a>
          <div style="font-size: 12px; color: #8a8680; margin-top: 14px; word-break: break-all;">Your personal link: ${params.joinUrl}</div>
        </div>

        <p style="font-size: 15px; color: #4a4740; line-height: 1.6;">
          Before the session: come with a project idea — big or small. You don't need to know how to build it.
          That's the whole point.
        </p>

        <p style="font-size: 15px; color: #4a4740; line-height: 1.6; margin-top: 20px;">
          See you soon,<br/>Jonathan
        </p>

        <hr style="border: 0; border-top: 1px solid #e5e3de; margin: 32px 0 16px;" />
        <p style="font-size: 12px; color: #8a8680;">
          Questions? Reply to this email. If you need to cancel, let me know and I'll refund your seat.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send workshop confirmation:", error);
    throw error;
  }
}

/**
 * Sent when Stripe succeeded but Zoom registration failed.
 * The customer paid — we owe them visibility, then a manual follow-up.
 */
export async function sendWorkshopPendingLink(params: {
  to: string;
  name: string;
  workshopTitle: string;
}) {
  const { error } = await getResend().emails.send({
    from: "Jonathan Brink <onboarding@resend.dev>",
    to: params.to,
    subject: `Payment received — ${params.workshopTitle}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1814;">
        <h1 style="font-size: 24px; margin: 0 0 12px;">Payment received.</h1>
        <p style="font-size: 16px; color: #4a4740; line-height: 1.6;">
          Hey ${params.name}, your payment for <strong>${params.workshopTitle}</strong> came through.
          Something briefly got in the way of generating your Zoom link automatically — I'll send it over manually within a few hours.
        </p>
        <p style="font-size: 15px; color: #4a4740; line-height: 1.6; margin-top: 16px;">
          Thanks for your patience.<br/>Jonathan
        </p>
      </div>
    `,
  });
  if (error) console.error("Failed to send pending-link email:", error);
}

/** Internal alert when the webhook hits an integration failure. */
export async function sendWorkshopOpsAlert(params: {
  subject: string;
  body: string;
}) {
  const { error } = await getResend().emails.send({
    from: "Jonathan Brink <onboarding@resend.dev>",
    to: "brink.jonathan@gmail.com",
    subject: `[workshops] ${params.subject}`,
    html: `<pre style="font-family: ui-monospace, monospace; font-size: 13px; white-space: pre-wrap;">${params.body}</pre>`,
  });
  if (error) console.error("Failed to send ops alert:", error);
}
