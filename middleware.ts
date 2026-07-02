import { NextResponse, type NextRequest } from 'next/server'

// Cloudflare (cf-ipcountry) and Vercel (x-vercel-ip-country) both inject the visitor's
// country at the edge — no extra request or lookup needed, just read the header the CDN
// already computed. This lets the contact form default its dial code to the visitor's
// own country instead of always showing the UK.
export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (req.cookies.has('vj_country')) return res

  const country =
    req.headers.get('cf-ipcountry') ?? req.headers.get('x-vercel-ip-country')

  if (country && /^[A-Z]{2}$/.test(country)) {
    res.cookies.set('vj_country', country, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|videos|fonts|icons).*)'],
}
