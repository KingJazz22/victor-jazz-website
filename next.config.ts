import type { NextConfig } from 'next'
import path from 'path'

const REDIRECT_DOMAINS = [
  'saxcyprus.com',
  'www.saxcyprus.com',
  'victorsaxcyprus.com',
  'www.victorsaxcyprus.com',
  'weddingsaxcyprus.com',
  'www.weddingsaxcyprus.com',
]

const config: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Replace Next.js built-in polyfills with a noop — every feature they cover is
        // natively supported in our target browsers (Chrome 94+, Safari 15.4+, Edge 94+).
        [path.resolve('./node_modules/next/dist/build/polyfills/polyfill-module.js')]:
          path.resolve('./lib/noop.js'),
      }
    }
    return config
  },
  async redirects() {
    return REDIRECT_DOMAINS.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: 'https://www.victorjazz.com/:path*',
      permanent: true,
    }))
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 31536000,
    remotePatterns: [],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/videos/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
}

export default config
