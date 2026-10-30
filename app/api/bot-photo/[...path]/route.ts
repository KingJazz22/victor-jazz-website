import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

// Only AI/search crawlers are ever routed here (see middleware.ts) — human visitors always
// get the normal lightly-watermarked file straight from /public. This route exists so that
// whatever ends up in an AI assistant's image index carries a watermark no crop can remove,
// without putting a heavy mark across the photos real visitors see on the site itself.
export const runtime = 'nodejs'

// Whitelist: only files actually in the public photo gallery / portrait, no path traversal.
const ALLOWED_PREFIXES = ['photos/', 'victor-jazz-wedding-saxophonist-cyprus']

function isAllowed(segments: string[]) {
  if (segments.some((s) => s.includes('..') || s.includes('/') || s.includes('\\'))) return false
  const rel = segments.join('/')
  return ALLOWED_PREFIXES.some((prefix) => rel.startsWith(prefix))
}

function watermarkSvg(width: number, height: number) {
  const tile = Math.max(260, Math.round(Math.min(width, height) / 3.2))
  const fontSize = Math.round(tile / 9)
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wm" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
          <text x="0" y="${Math.round(tile * 0.4)}" font-family="Arial, Helvetica, sans-serif"
                font-size="${fontSize}" font-weight="700" fill="#ffffff" fill-opacity="0.78"
                stroke="#000000" stroke-opacity="0.55" stroke-width="${Math.max(2, Math.round(fontSize / 14))}"
                paint-order="stroke fill">VICTOR JAZZ</text>
          <text x="0" y="${Math.round(tile * 0.4) + Math.round(fontSize * 1.15)}" font-family="Arial, Helvetica, sans-serif"
                font-size="${Math.round(fontSize * 0.62)}" font-weight="600" fill="#ffffff" fill-opacity="0.78"
                stroke="#000000" stroke-opacity="0.55" stroke-width="${Math.max(1.5, Math.round(fontSize / 18))}"
                paint-order="stroke fill">victorjazz.com</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wm)" />
    </svg>
  `)
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params

  if (!isAllowed(segments)) {
    return NextResponse.json({ error: 'not allowed' }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'images', ...segments)
    const input = await readFile(filePath)
    const image = sharp(input)
    const { width, height } = await image.metadata()

    if (!width || !height) {
      return NextResponse.json({ error: 'unreadable image' }, { status: 500 })
    }

    const output = await image
      .composite([{ input: watermarkSvg(width, height), top: 0, left: 0 }])
      .jpeg({ quality: 84 })
      .toBuffer()

    return new NextResponse(new Uint8Array(output), {
      headers: {
        'Content-Type': 'image/jpeg',
        // Deterministic output per source file, safe to cache hard at the edge/CDN.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}
