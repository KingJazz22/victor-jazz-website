import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyMobile from '@/components/layout/StickyMobile'
import { SITE_CONFIG } from '@/lib/constants'
import { generateSchemaGraph } from '@/lib/schema'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Wedding Saxophonist Cyprus | Victor Jazz — Live Saxophone for Your Dream Day',
    template: '%s | Victor Jazz',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'wedding saxophonist Cyprus',
    'Cyprus wedding saxophone',
    'destination wedding saxophonist',
    'luxury wedding entertainment Cyprus',
    'saxophone player Cyprus wedding',
    'Paphos wedding saxophonist',
    'Ayia Napa wedding entertainment',
    'Cyprus wedding music',
    'cocktail hour saxophone Cyprus',
    'drinks reception saxophone',
    'wedding DJ sax Cyprus',
    'beach wedding saxophone',
    'sunset saxophone Cyprus',
    'yacht party saxophone Cyprus',
    'hen party saxophone Ayia Napa',
    'luxury wedding entertainment Greece',
    'destination wedding entertainment Europe',
    'live saxophone wedding',
    'Aphrodite Hills wedding saxophonist',
    'Elysium Resort wedding music',
    'Coral Residences wedding saxophone',
    'Elea Golf Club wedding music',
  ],
  openGraph: {
    title: 'Wedding Saxophonist Cyprus | Victor Jazz',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.fullName,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Victor Jazz — Wedding Saxophonist Cyprus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Saxophonist Cyprus | Victor Jazz',
    description: SITE_CONFIG.description,
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = generateSchemaGraph()

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" href="/images/hero-poster.jpg" as="image" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="bg-[#080808] text-[#f5f0e8] font-sans antialiased">
        <Header />
        <main className="pb-14 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobile />
      </body>
    </html>
  )
}
