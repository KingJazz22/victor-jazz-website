import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import ResortContactForm from '@/components/sections/ResortContactForm'

export const metadata: Metadata = {
  title: 'Resort & Hotel Saxophonist | Victor Jazz — Luxury Live Music for Hospitality',
  description:
    'Professional saxophonist for luxury resorts, hotels and venues worldwide. Available November–March for residencies. Maldives, Dubai, Egypt, Caribbean and beyond. Accommodation-inclusive contracts welcome.',
  keywords: [
    'resort saxophonist',
    'hotel saxophonist',
    'live saxophone hotel',
    'luxury resort entertainment',
    'Maldives saxophonist',
    'Dubai saxophonist',
    'Egypt resort entertainment',
    'Caribbean saxophonist',
    'hotel live music',
    'resort residency saxophone',
    'hospitality entertainment',
    'winter residency musician',
  ],
  openGraph: {
    title: 'Resort & Hotel Saxophonist | Victor Jazz',
    description:
      'Professional saxophonist for luxury resorts and hotels worldwide. Available Nov–Mar for residencies.',
    url: `${SITE_CONFIG.url}/resorts`,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Victor Jazz — Resort Saxophonist' }],
    type: 'website',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/resorts` },
  robots: { index: true, follow: true },
}

const PERFORMANCE_FORMATS = [
  {
    title: 'Restaurant & Lounge',
    desc: 'Ambient dinner sets and sophisticated lounge performances that elevate the dining atmosphere and keep guests relaxed and engaged.',
  },
  {
    title: 'Pool & Beach Bar',
    desc: 'Energetic poolside and beach bar sets — from smooth jazz through to contemporary pop that guests request all week.',
  },
  {
    title: 'Gala Dinners & Events',
    desc: 'Premium headline entertainment for gala nights, VIP receptions, corporate dinners and exclusive private events.',
  },
  {
    title: 'Lobby & Welcome',
    desc: 'Live saxophone on arrival turns a hotel check-in into a moment guests remember and talk about. First impressions delivered.',
  },
]

const DESTINATIONS = [
  'Maldives', 'Dubai & UAE', 'Egypt — Red Sea', 'Caribbean',
  'Seychelles', 'Mauritius', 'Thailand', 'Greece', 'Malta', 'Cyprus',
]

const TERMS = [
  {
    title: 'Season',
    body: 'November through March — perfectly aligned with peak winter resort season across the tropics, Gulf, and Red Sea.',
  },
  {
    title: 'Accommodation',
    body: 'Accommodation-inclusive contracts are very welcome and preferred. Flight costs are discussed transparently per booking.',
  },
  {
    title: 'Equipment',
    body: 'Professional wireless PA system fully included. No backline required — just a standard power outlet and performance space.',
  },
]

export default function ResortsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center justify-center px-6 text-center py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0c0c0c] to-[#080808]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#c9a96e]/40" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-6">
            Victor Jazz · Professional Saxophonist
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f5f0e8] leading-[1.1] mb-8">
            Live Saxophone for Your<br />Resort, Hotel or Venue
          </h1>
          <p className="text-[#9e9e9e] text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Premium live saxophone that transforms the guest experience — lobby performances, pool sets,
            restaurant ambience, gala dinners and private events. Available worldwide November through March.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-block px-10 py-4 rounded-full bg-[#c9a96e] text-[#080808] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-colors duration-300"
            >
              Request Availability
            </a>
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full border border-[#c9a96e]/40 text-[#c9a96e] font-semibold text-sm uppercase tracking-[0.15em] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors duration-300"
            >
              Watch Performances
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#c9a96e]/40 to-transparent" aria-hidden="true" />
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="border-y border-[#c9a96e]/15 py-10 px-6" aria-label="Key statistics">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '350+', label: 'Events Performed' },
            { value: '10+', label: 'Countries' },
            { value: '5 ★', label: 'Average Rating' },
            { value: 'Nov–Mar', label: 'Available' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl md:text-4xl text-[#c9a96e] font-light">{s.value}</p>
              <p className="text-[#9e9e9e] text-xs uppercase tracking-[0.15em] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Performance formats ──────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">What We Offer</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">Performance Formats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERFORMANCE_FORMATS.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-7 flex flex-col">
                <div className="w-8 h-px bg-[#c9a96e] mb-6" aria-hidden="true" />
                <h3 className="font-serif text-xl font-light text-[#f5f0e8] mb-3">{f.title}</h3>
                <p className="text-[#9e9e9e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Availability + Terms ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-10 md:p-14">
            <div className="text-center mb-12">
              <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">Availability &amp; Terms</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">Available November to March</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {TERMS.map((t) => (
                <div key={t.title}>
                  <p className="text-[#c9a96e] text-xs uppercase tracking-[0.2em] mb-3">{t.title}</p>
                  <p className="text-[#9e9e9e] text-sm leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations ─────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">Where We Work</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">Worldwide Availability</h2>
          <p className="text-[#9e9e9e] text-sm mb-12 max-w-xl mx-auto leading-relaxed">
            Based in Cyprus, Victor performs internationally and is available for residencies
            and one-off engagements across the world&apos;s finest destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {DESTINATIONS.map((d) => (
              <span
                key={d}
                className="px-5 py-2 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] text-sm hover:border-[#c9a96e]/60 transition-colors duration-200"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">Get in Touch</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Request Availability</h2>
            <p className="text-[#9e9e9e] text-sm leading-relaxed">
              Fill in the details below and Victor will reply within 24 hours with a tailored proposal.
            </p>
          </div>

          <ResortContactForm />

          <div className="mt-8 text-center">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9e9e9e] text-sm hover:text-[#c9a96e] transition-colors duration-200"
            >
              Prefer WhatsApp? Message Victor directly &rarr;
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
