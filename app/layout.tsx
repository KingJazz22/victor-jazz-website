import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyMobile from '@/components/layout/StickyMobile'
import { SITE_CONFIG } from '@/lib/constants'
import { generateSchemaGraph } from '@/lib/schema'
import { GADS_ID } from '@/lib/gtag'
import GtagLoader from '@/components/GtagLoader'

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
    'book a saxophonist',
    'international saxophonist',
    'live saxophonist',
    'corporate event saxophonist',
    'private event saxophonist',
    'luxury event musician',
    'DJ and saxophone duo',
    'wedding band alternative',
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
        url: 'https://raw.githubusercontent.com/KingJazz22/victor-jazz-website/main/public/images/og-image-v2.jpg',
        width: 1200,
        height: 630,
        alt: 'Victor Jazz — Wedding Saxophonist performing at a beach wedding sunset in Cyprus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Saxophonist Cyprus | Victor Jazz',
    description: SITE_CONFIG.description,
    images: ['https://raw.githubusercontent.com/KingJazz22/victor-jazz-website/main/public/images/og-image-v2.jpg'],
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
        {/* crossOrigin is required so the preconnected TCP socket can be reused for CORS requests */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Ads conversion pixel fires requests to doubleclick.net */}
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="bg-[#080808] text-[#f5f0e8] font-sans antialiased">
        <Header />
        <main className="pb-14 lg:pb-0 overflow-x-hidden">{children}</main>
        <Footer />
        <StickyMobile />
        {/* Stub loads immediately (near-zero cost) so gtag() queues conversions into
            dataLayer even before the real script arrives — see GtagLoader for why the
            150KB gtag/js payload itself is deferred to first interaction. */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GADS_ID}');
          `}
        </Script>
        <GtagLoader />
      </body>
    </html>
  )
}
