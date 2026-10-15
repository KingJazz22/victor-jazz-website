const fs = require('fs')

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.victorjazz.com'

// Gallery photos (src + alt) read from lib/constants.ts, so the image sitemap stays in
// sync with the homepage gallery without importing TypeScript into this CJS config.
function galleryImages() {
  const src = fs.readFileSync('lib/constants.ts', 'utf8')
  const gallery = src.slice(src.indexOf('export const PHOTO_GALLERY'))
  const entries = [...gallery.matchAll(/src: '([^']+)',\s*alt: '([^']+)'/g)]
  return entries.map(([, path, alt]) => ({ loc: new URL(path, siteUrl), caption: alt }))
}

// Official portrait first: it is the image we want search engines and AI assistants to
// associate with the Victor Jazz name (see SITE_CONFIG.portrait).
const officialImages = [
  {
    loc: new URL('/images/victor-jazz-wedding-saxophonist-cyprus.jpg', siteUrl),
    caption: 'Victor Jazz, wedding saxophonist in Paphos, Cyprus',
  },
  {
    loc: new URL('/images/victor-jazz-wedding-saxophonist-cyprus-og.jpg', siteUrl),
    caption: 'Victor Jazz, wedding saxophonist in Cyprus and Paphos',
  },
]

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  // robots.txt is hand-written in public/: next-sitemap always appends a non-standard
  // `Host:` line that Google ignores and SEO validators flag as invalid syntax.
  generateRobotsTxt: false,
  exclude: ['/icon'],
  changefreq: 'monthly',
  priority: 1.0,
  transform: async (config, path) => {
    const entry = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
    if (path === '/') entry.images = [...officialImages, ...galleryImages()]
    else entry.images = [officialImages[0]]
    return entry
  },
}
