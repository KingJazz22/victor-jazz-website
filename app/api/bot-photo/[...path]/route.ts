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

// Pre-rendered once locally (scripts/generate-watermark-overlay.js) rather than built from
// SVG <text> at request time: Vercel's serverless runtime has no system fonts, so librsvg
// silently rendered every character as a tofu box in production. A static raster overlay
// has no font dependency at all.
const OVERLAY_PATH = path.join(process.cwd(), 'public', 'watermark-overlay.png')
const OVERLAY_SIZE = 2200 // covers every current photo (max 1440px) with room to spare

async function watermarkOverlay(width: number, height: number) {
  const overlay = sharp(OVERLAY_PATH)
  if (width <= OVERLAY_SIZE && height <= OVERLAY_SIZE) {
    return overlay.extract({ left: 0, top: 0, width, height }).toBuffer()
  }
  // Safety net if a future photo exceeds the pre-rendered canvas.
  return overlay.resize(width, height, { fit: 'fill' }).toBuffer()
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
      .composite([{ input: await watermarkOverlay(width, height), top: 0, left: 0 }])
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
