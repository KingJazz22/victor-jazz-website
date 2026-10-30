import { NextRequest, NextResponse } from 'next/server'
import {
  weddingRsvpSchema,
  sendWeddingRsvpEmail,
  appendWeddingRsvpToSheet,
} from '@/lib/wedding-rsvp'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 60_000 // 1 minute
  const max = 5

  const entry = rateLimit.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + window })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const result = weddingRsvpSchema.safeParse(body)
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join(', ')
      return NextResponse.json({ error: messages }, { status: 422 })
    }

    // Email and spreadsheet are independent copies: the guest's reply counts as saved
    // as long as at least one of them recorded it.
    const [email, sheet] = await Promise.allSettled([
      sendWeddingRsvpEmail(result.data),
      appendWeddingRsvpToSheet(result.data),
    ])
    if (email.status === 'rejected') console.error('[wedding-rsvp route] email', email.reason)
    if (sheet.status === 'rejected') console.error('[wedding-rsvp route] sheet', sheet.reason)

    const saved =
      email.status === 'fulfilled' || (sheet.status === 'fulfilled' && sheet.value === true)
    if (!saved) {
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[wedding-rsvp route]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
