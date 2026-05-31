import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sendContactEmail } from '@/lib/email'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 60_000 // 1 minute
  const max = 3

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

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join(', ')
      return NextResponse.json({ error: messages }, { status: 422 })
    }

    await sendContactEmail(result.data)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact via WhatsApp.' },
      { status: 500 }
    )
  }
}
