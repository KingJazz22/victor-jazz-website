import { Resend } from 'resend'
import { z } from 'zod'

// RSVPs from the private wedding page served at /NelaandVictor (public/wedding/index.html).
export const weddingRsvpSchema = z.object({
  id: z.string().max(40).optional(),
  name: z.string().trim().min(1, 'Name is required').max(200),
  attending: z.enum(['yes', 'no']),
  count: z.coerce.number().int().min(0).max(10).default(0),
  dietary: z.string().trim().max(500).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  lang: z.enum(['en', 'pl', 'pt']).optional().default('en'),
})

export type WeddingRsvp = z.infer<typeof weddingRsvpSchema>

const LANG_NAMES: Record<WeddingRsvp['lang'], string> = {
  en: 'English',
  pl: 'Polish',
  pt: 'Portuguese',
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  )
}

export async function sendWeddingRsvpEmail(data: WeddingRsvp) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY environment variable is not set')

  const to = process.env.WEDDING_RSVP_TO || process.env.CONTACT_EMAIL_TO
  if (!to) throw new Error('WEDDING_RSVP_TO / CONTACT_EMAIL_TO environment variable is not set')

  const yes = data.attending === 'yes'
  const status = yes ? `Attending (${data.count || 1})` : 'Not attending'

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: 'Kornelia & Victor Wedding <onboarding@resend.dev>',
    to,
    subject: `RSVP: ${data.name} — ${status}`,
    html: buildRsvpHtml(data, status),
  })

  if (error) throw new Error(`Resend error: ${error.message}`)
}

function buildRsvpHtml(data: WeddingRsvp, status: string): string {
  const rows: [string, string][] = [
    ['Name', esc(data.name)],
    ['Reply', status],
  ]
  if (data.attending === 'yes') rows.push(['Dietary', esc(data.dietary || '—')])
  rows.push(['Message', `<span style="white-space:pre-line;">${esc(data.message || '—')}</span>`])
  rows.push(['Page language', LANG_NAMES[data.lang]])

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#EFF8F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td>
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#0A5A73;padding:28px 40px;text-align:center;">
            <p style="margin:0;color:#5AC9DA;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;">New RSVP</p>
            <h1 style="margin:8px 0 0;color:#F7FCFB;font-size:24px;font-weight:300;">Kornelia &amp; Victor · 02.10.2027</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${rows
                .map(
                  ([label, value]) => `<tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#5B7D84;font-size:13px;width:140px;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#123B47;font-size:15px;">${value}</td>
              </tr>`
                )
                .join('')}
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
