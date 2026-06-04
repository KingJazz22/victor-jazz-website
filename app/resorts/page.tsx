import type { Metadata } from 'next'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import ResortContactForm from '@/components/sections/ResortContactForm'
import ResortVideos from '@/components/sections/ResortVideos'

export const metadata: Metadata = {
  title: 'Resort & Hotel Saxophonist | Victor Jazz — Luxury Live Music for Hospitality',
  description:
    'Professional saxophonist for luxury resorts, hotels and venues worldwide. Available November–March for residencies. Maldives, Dubai, Egypt, Caribbean and beyond. Accommodation-inclusive contracts welcome.',
  keywords: [
    'resort saxophonist', 'hotel saxophonist', 'live saxophone hotel',
    'luxury resort entertainment', 'Maldives saxophonist', 'Dubai saxophonist',
    'Egypt resort entertainment', 'Caribbean saxophonist', 'hotel live music',
    'resort residency saxophone', 'hospitality entertainment', 'winter residency musician',
  ],
  openGraph: {
    title: 'Resort & Hotel Saxophonist | Victor Jazz',
    description: 'Professional saxophonist for luxury resorts and hotels worldwide. Available Nov–Mar for residencies.',
    url: `${SITE_CONFIG.url}/resorts`,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Victor Jazz — Resort Saxophonist' }],
    type: 'website',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/resorts` },
  robots: { index: true, follow: true },
}

const RESORT_WHATSAPP = `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi%20Victor!%20I%20found%20your%20resort%20page%20and%20I%27m%20interested%20in%20live%20saxophone%20for%20our%20hotel%20or%20resort.`

const PERFORMANCE_FORMATS = [
  { title: 'Restaurant & Lounge', desc: 'Ambient dinner sets that elevate the dining atmosphere and keep guests relaxed and engaged all evening.' },
  { title: 'Pool & Beach Bar',    desc: 'Energetic poolside sets — from smooth jazz through to contemporary pop that guests request all week.' },
  { title: 'Gala Dinners & Events', desc: 'Premium headline entertainment for gala nights, VIP receptions, corporate dinners and private events.' },
  { title: 'Lobby & Welcome',    desc: 'Live saxophone on arrival turns a check-in into a moment guests remember and talk about for years.' },
]

const DESTINATIONS = [
  'Maldives', 'Dubai & UAE', 'Egypt — Red Sea', 'Caribbean',
  'Seychelles', 'Mauritius', 'Thailand', 'Greece', 'Malta', 'Cyprus',
]

const TERMS = [
  { title: 'Season',        body: 'November through March — aligned with peak winter resort season across the tropics, Gulf, and Red Sea.' },
  { title: 'Accommodation', body: 'Accommodation-inclusive contracts are very welcome and preferred. Flights discussed transparently per booking.' },
  { title: 'Equipment',     body: 'Professional wireless PA fully included. No backline required — just a power outlet and performance space.' },
]

const PHOTOS = [
  { src: '/images/photos/tropical-portrait.jpg',     alt: 'Victor Jazz performing at a tropical beach resort' },
  { src: '/images/photos/professional-portrait.jpg', alt: 'Victor Jazz professional saxophonist portrait' },
  { src: '/images/photos/nice-sunset-portrait.jpg',  alt: 'Victor Jazz sunset performance' },
]

export default function ResortsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center justify-center px-6 text-center py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photos/tropical-portrait.jpg"
            alt="Victor Jazz performing at a luxury resort"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]/90" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-5">
            Victor Jazz · Professional Saxophonist
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-[#f5f0e8] leading-[1.1] mb-6">
            Live Saxophone for Your<br />Resort, Hotel or Venue
          </h1>
          <p className="text-[#9e9e9e] text-base md:text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Premium live saxophone for lobby performances, pool sets, restaurant ambience,
            gala dinners and private events. Available worldwide November through March.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="inline-block px-9 py-3.5 rounded-full bg-[#c9a96e] text-[#080808] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-colors duration-300">
              Request Availability
            </a>
            <a href="#videos" className="inline-block px-9 py-3.5 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] font-semibold text-sm uppercase tracking-[0.15em] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors duration-300">
              Watch Performances
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="border-y border-[#c9a96e]/15 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '500+',    label: 'Events Worldwide' },
            { value: '30K+',    label: 'Instagram Followers' },
            { value: '5 ★',     label: 'Average Rating' },
            { value: 'Nov–Mar', label: 'Available' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl text-[#c9a96e] font-light">{s.value}</p>
              <p className="text-[#9e9e9e] text-xs uppercase tracking-[0.15em] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Videos ───────────────────────────────────────────── */}
      <section id="videos" className="py-14 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">See It Live</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Watch Victor Perform</h2>
          </div>
          <ResortVideos />
          <p className="text-center mt-6">
            <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#6b6b6b] text-xs hover:text-[#c9a96e] transition-colors uppercase tracking-[0.15em]">
              More on Instagram @victorjazzsaxophone &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ── Photos ───────────────────────────────────────────── */}
      <section className="py-4 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-3">
          {PHOTOS.map((p) => (
            <div key={p.src} className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <Image src={p.src} alt={p.alt} fill className="object-cover object-center hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Performance formats ──────────────────────────────── */}
      <section id="formats" className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">What We Offer</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Performance Formats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERFORMANCE_FORMATS.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 flex flex-col">
                <div className="w-6 h-px bg-[#c9a96e] mb-4" aria-hidden="true" />
                <h3 className="font-serif text-lg font-light text-[#f5f0e8] mb-2">{f.title}</h3>
                <p className="text-[#9e9e9e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Availability + Terms ─────────────────────────────── */}
      <section id="availability" className="py-12 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Availability &amp; Terms</p>
              <h2 className="font-serif text-3xl font-light">Available November to March</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TERMS.map((t) => (
                <div key={t.title}>
                  <p className="text-[#c9a96e] text-xs uppercase tracking-[0.2em] mb-2">{t.title}</p>
                  <p className="text-[#9e9e9e] text-sm leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations ─────────────────────────────────────── */}
      <section id="destinations" className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Where We Work</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">Worldwide Availability</h2>
          <p className="text-[#9e9e9e] text-sm mb-8 max-w-xl mx-auto leading-relaxed">
            Based in Cyprus, available for residencies and one-off engagements across the world&apos;s finest destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {DESTINATIONS.map((d) => (
              <span key={d} className="px-4 py-1.5 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] text-sm hover:border-[#c9a96e]/60 transition-colors duration-200">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────── */}
      <section id="contact" className="py-14 px-6 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Get in Touch</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-3">Request Availability</h2>
            <p className="text-[#9e9e9e] text-sm">
              Victor replies within 24 hours with a tailored proposal.
            </p>
          </div>
          <ResortContactForm />

          <div className="mt-8">
            <p className="text-center text-[#6b6b6b] text-xs uppercase tracking-[0.2em] mb-4">Or reach out directly</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={RESORT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 flex-1 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm uppercase tracking-[0.12em] hover:brightness-110 transition-all duration-300"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold text-sm uppercase tracking-[0.12em] hover:brightness-110 transition-all duration-300"
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}
