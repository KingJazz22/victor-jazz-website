import { NextResponse, type NextRequest } from 'next/server'

// AI assistants and search engines that might index these photos and later misattribute
// them to someone else (see /photo-license). Human visitors never match this and always get
// the normal file straight from /public — only these get redirected to the watermarked copy.
const BOT_UA = new RegExp(
  [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ChatGPT',
    'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'claude',
    'PerplexityBot', 'Perplexity-User',
    'Google-Extended', 'Googlebot-Image', 'Googlebot',
    'bingbot', 'BingPreview', 'msnbot',
    'DuckDuckBot', 'YandexBot', 'Applebot',
    'CCBot', 'Bytespider', 'Amazonbot',
    'facebookexternalhit', 'Twitterbot', 'LinkedInBot',
  ].join('|'),
  'i'
)

// Gallery/portrait photos only — the ones AI assistants have been shown misusing.
const WATERMARKED_IMAGE = /^\/images\/(photos\/.+\.jpe?g|victor-jazz-wedding-saxophonist-cyprus.*\.jpe?g)$/i

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (WATERMARKED_IMAGE.test(pathname)) {
    const ua = req.headers.get('user-agent') ?? ''
    if (BOT_UA.test(ua)) {
      const url = req.nextUrl.clone()
      // pathname is e.g. /images/photos/nightclub-portrait.jpg — strip the /images/ prefix,
      // the route re-adds it when resolving the file on disk.
      url.pathname = `/api/bot-photo${pathname.replace(/^\/images/, '')}`
      url.search = ''
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  // Cloudflare (cf-ipcountry) and Vercel (x-vercel-ip-country) both inject the visitor's
  // country at the edge — no extra request or lookup needed, just read the header the CDN
  // already computed. This lets the contact form default its dial code to the visitor's
  // own country instead of always showing the UK.
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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|videos|fonts|icons).*)',
  ],
}
