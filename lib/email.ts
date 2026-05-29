import { Resend } from 'resend'
import type { ContactFormData } from './validations'

export async function sendContactEmail(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY environment variable is not set')

  const to = process.env.CONTACT_EMAIL_TO
  if (!to) throw new Error('CONTACT_EMAIL_TO environment variable is not set')

  const resend = new Resend(apiKey)

  return resend.emails.send({
    from: 'Victor Jazz Inquiries <noreply@victorjazz.com>',
    to,
    replyTo: data.email,
    subject: `New Wedding Inquiry: ${data.name}${data.partnerName ? ` & ${data.partnerName}` : ''} — ${data.weddingDate}`,
    html: buildEmailHtml(data),
  })
}

function buildEmailHtml(data: ContactFormData): string {
  const whatsappLink = data.whatsapp
    ? `<a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}" style="display:inline-block;padding:10px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;margin-top:8px;">Open WhatsApp</a>`
    : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr><td>
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#080808;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#c9a96e;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;">New Wedding Inquiry</p>
            <h1 style="margin:8px 0 0;color:#f5f0e8;font-size:24px;font-weight:300;letter-spacing:0.1em;">Victor Jazz</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Bride\'s Name', data.name)}
              ${data.partnerName ? row('Partner\'s Name', data.partnerName) : ''}
              ${row('Wedding Date', data.weddingDate)}
              ${row('Venue / Location', data.venue)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#c9a96e;">${data.email}</a>`)}
              ${data.whatsapp ? row('WhatsApp', data.whatsapp) : ''}
              ${row('How They Found Us', data.source)}
              ${row('Message', `<span style="white-space:pre-line;">${data.message}</span>`)}
            </table>
            ${whatsappLink}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:24px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0;color:#999;font-size:12px;">Victor Jazz · Wedding Saxophonist · Paphos, Cyprus</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">${label}</p>
        <p style="margin:4px 0 0;font-size:15px;color:#222;">${value}</p>
      </td>
    </tr>`
}
