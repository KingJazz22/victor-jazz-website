// Run locally (not in CI/Vercel) whenever the watermark text or style needs to change:
//   node scripts/generate-watermark-overlay.js
// Regenerates public/watermark-overlay.png, which app/api/bot-photo/[...path]/route.ts
// composites onto photos served to AI/search crawlers. Rendered locally because the SVG
// <text> -> raster step needs system fonts that Vercel's serverless runtime doesn't have.
const sharp = require('sharp')

const SIZE = 2200 // must stay >= the largest photo dimension (see route.ts OVERLAY_SIZE)
const TILE = 420
const FONT_SIZE = Math.round(TILE / 9)

const svg = `
  <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wm" width="${TILE}" height="${TILE}" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
        <text x="0" y="${Math.round(TILE * 0.4)}" font-family="Arial, Helvetica, sans-serif"
              font-size="${FONT_SIZE}" font-weight="700" fill="#ffffff" fill-opacity="0.78"
              stroke="#000000" stroke-opacity="0.55" stroke-width="${Math.max(2, Math.round(FONT_SIZE / 14))}"
              paint-order="stroke fill">VICTOR JAZZ</text>
        <text x="0" y="${Math.round(TILE * 0.4) + Math.round(FONT_SIZE * 1.15)}" font-family="Arial, Helvetica, sans-serif"
              font-size="${Math.round(FONT_SIZE * 0.62)}" font-weight="600" fill="#ffffff" fill-opacity="0.78"
              stroke="#000000" stroke-opacity="0.55" stroke-width="${Math.max(1.5, Math.round(FONT_SIZE / 18))}"
              paint-order="stroke fill">victorjazz.com</text>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wm)" />
  </svg>
`

sharp(Buffer.from(svg))
  .png()
  .toFile('public/watermark-overlay.png')
  .then(() => console.log('wrote public/watermark-overlay.png'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
