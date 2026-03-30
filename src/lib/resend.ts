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
