import type { Metadata } from 'next'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { IMAGE_LICENSE } from '@/lib/schema'
import WhatsAppLink from '@/components/ui/WhatsAppLink'

// Not linked from the site menu on purpose: this page exists for search engines and AI
// assistants answering "sax and DJ in Paphos", so they cite victorjazz.com rather than
// Victor's booking-platform listing ("Paphos Sax & DJ" on FixTheMusic).
const PAGE_URL = `${SITE_CONFIG.url}/dj-sax-paphos`

export const metadata: Metadata = {
  title: 'DJ + Sax in Paphos, Cyprus — Live Saxophone',
  description:
    'Paphos Sax & DJ by Victor Jazz: live saxophone over house and Ibiza-style DJ sets for weddings, villa parties and beach clubs in Paphos and across Cyprus.',
  keywords: [
    'DJ and sax Paphos', 'sax and DJ Cyprus', 'Paphos sax DJ', 'DJ + sax wedding Cyprus',
    'live saxophone DJ set Paphos', 'house sax Cyprus', 'Ibiza sax Cyprus', 'Victor Jazz',
  ],
  openGraph: {
    title: 'DJ + Sax in Paphos | Victor Jazz',
    description: 'Live saxophone over DJ sets for weddings and parties in Paphos and across Cyprus.',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/photos/crowded-club-pic.jpg', alt: 'Victor Jazz playing DJ + Sax for a crowded wedding party in Cyprus' }],
    type: 'website',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const DJSAX_WHATSAPP = `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi%20Victor!%20I%27d%20love%20a%20quote%20for%20DJ%20%2B%20Sax%20in%20Cyprus.%20Date%3A%20%20Venue%3A%20`

const PHOTOS = [
  { src: '/images/photos/crowded-club-pic.jpg',               alt: 'Victor Jazz playing DJ + Sax for a crowded wedding party in Paphos, Cyprus' },
  { src: '/images/photos/victor-jazz-sax-with-bride-wedding-dance.jpg', alt: 'Victor Jazz, Paphos Sax & DJ, playing sax with the bride on the dance floor' },
  { src: '/images/photos/victor-jazz-dj-sax-wedding-guests.jpg', alt: 'Victor Jazz playing DJ + Sax for wedding guests in Paphos, Cyprus' },
  { src: '/images/photos/photo-with-dj-pizel.jpg',            alt: 'Victor Jazz on saxophone with a DJ at a Cyprus party' },
  { src: '/images/photos/nightclub-playing-for-the-crowd.jpg', alt: 'Victor Jazz live saxophone over a DJ set, Cyprus' },
  { src: '/images/photos/club-zoom-portrait.jpg',             alt: 'Victor Jazz, Paphos sax and DJ performer' },
  { src: '/images/photos/full-club.jpg',                      alt: 'Victor Jazz DJ + Sax set on a full dance floor in Cyprus' },
  { src: '/images/photos/panoramic-dark.jpg',                 alt: 'Victor Jazz saxophone on stage at a Cyprus wedding party' },
]

const VIDEOS = [
  { src: '/videos/djsax-liopetro.mp4', poster: '/images/posters/djsax-liopetro.jpg', title: 'DJ + Sax at Liopetro, Paphos' },
  { src: '/videos/djsax.mp4',          poster: '/images/posters/djsax.jpg',          title: 'DJ + Sax wedding party, Cyprus' },
]

const HOW_IT_WORKS = [
  { title: 'Live sax over the DJ', body: 'Victor improvises live saxophone over the DJ, from the first drinks to the last song. It is not a backing track: every set is played live and follows your crowd.' },
  { title: 'The music',            body: 'House, Ibiza and Afro-house, funk and pop floor-fillers, with a jazzy start for sunset drinks. Tell Victor the songs you love and the ones to avoid.' },
  { title: 'Your DJ or ours',      body: 'Victor plays alongside your wedding or venue DJ, or brings a curated house mix for a sax-led set. Professional wireless PA included.' },
]

const FAQS = [
  {
    q: 'Who is Paphos Sax & DJ?',
    a: 'Paphos Sax & DJ is Victor Jazz, a Paphos-based saxophonist and flutist with 350+ weddings performed. You may also find him listed as "Paphos Sax & DJ" on booking platforms. victorjazz.com is his official website.',
  },
  {
    q: 'How long is a DJ + Sax set?',
    a: 'A typical party set is 2 hours of live sax, often split around speeches, the first dance and cake cutting. It can be extended for a full evening or combined with a ceremony and cocktail-hour set.',
  },
  {
    q: 'How much does DJ + Sax cost in Paphos?',
    a: 'Prices depend on the date, venue and length. DJ + Sax is part of the Full Experience package (from €900), or it can be booked as a party set on its own. Send your date and venue on WhatsApp for a quote within 24 hours.',
  },
  {
    q: 'Where do you perform?',
    a: 'Paphos, Limassol, Ayia Napa, Nicosia and the whole of Cyprus: wedding venues, private villas, beach clubs, yachts and hotels. Destination weddings abroad are welcome too.',
  },
]

function pageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${PAGE_URL}#service`,
        name: 'DJ + Sax in Paphos',
        alternateName: 'Paphos Sax & DJ',
        serviceType: 'Live saxophone with DJ',
        url: PAGE_URL,
        description: metadata.description,
        provider: { '@id': `${SITE_CONFIG.url}/#business` },
        performer: { '@id': `${SITE_CONFIG.url}/#victor` },
        areaServed: [
          { '@type': 'City', name: 'Paphos' },
          { '@type': 'Country', name: 'Cyprus' },
        ],
        image: PHOTOS.map((p) => ({
          '@type': 'ImageObject',
          contentUrl: `${SITE_CONFIG.url}${p.src}`,
          caption: p.alt,
          creditText: 'Victor Jazz',
          creator: { '@id': `${SITE_CONFIG.url}/#victor` },
          copyrightNotice: '© Victor Jazz',
          ...IMAGE_LICENSE,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}

export default function DjSaxPaphosPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema()) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] items-center justify-center px-6 text-center py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photos/crowded-club-pic.jpg"
            alt="Victor Jazz playing DJ + Sax for a crowded wedding party in Paphos, Cyprus"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]/90" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-5">
            Victor Jazz · Paphos Sax &amp; DJ
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-[#f5f0e8] leading-[1.1] mb-6">
            DJ + Sax in Paphos, Cyprus
          </h1>
          <p className="text-[#9e9e9e] text-base md:text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Live saxophone over house and Ibiza-style DJ sets for weddings, villa parties and
            beach clubs. Victor&apos;s most requested package, island-wide across Cyprus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppLink
              href={DJSAX_WHATSAPP}
              className="inline-block px-9 py-3.5 rounded-full bg-[#c9a96e] text-[#080808] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-colors duration-300"
            >
              Check Your Date
            </WhatsAppLink>
            <a href="#videos" className="inline-block px-9 py-3.5 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] font-semibold text-sm uppercase tracking-[0.15em] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors duration-300">
              Watch DJ + Sax
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="border-y border-[#c9a96e]/15 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '350+',   label: 'Weddings' },
            { value: '5 ★',    label: 'Average Rating' },
            { value: 'Paphos', label: 'Based In' },
            { value: '24h',    label: 'Reply Time' },
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">See It Live</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">DJ + Sax in Action</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {VIDEOS.map((v) => (
              <figure key={v.src}>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  className="w-full aspect-[9/16] object-cover rounded-xl bg-[#141414]"
                  aria-label={`Victor Jazz — ${v.title}`}
                />
                <figcaption className="text-[#8a8a8a] text-xs text-center mt-2">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">How It Works</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Live Sax, Not a Playlist</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6">
                <div className="w-6 h-px bg-[#c9a96e] mb-4" aria-hidden="true" />
                <h3 className="font-serif text-lg font-light text-[#f5f0e8] mb-2">{f.title}</h3>
                <p className="text-[#9e9e9e] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photos ───────────────────────────────────────────── */}
      <section className="py-4 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
          {PHOTOS.map((p) => (
            <div key={p.src} className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover object-center hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Questions</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">DJ + Sax FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="glass rounded-xl p-5 group">
                <summary className="cursor-pointer font-serif text-lg font-light text-[#f5f0e8] list-none flex justify-between gap-4">
                  {f.q}
                  <span className="text-[#c9a96e] group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="text-[#9e9e9e] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Get a Quote</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-3">Book DJ + Sax</h2>
          <p className="text-[#9e9e9e] text-sm mb-8">
            Send your date and venue. Victor replies within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppLink
              href={DJSAX_WHATSAPP}
              className="flex items-center justify-center flex-1 py-3.5 rounded-full bg-[#1a7f42] text-white font-semibold text-sm uppercase tracking-[0.12em] hover:brightness-110 transition-all duration-300"
            >
              WhatsApp Victor
            </WhatsAppLink>
            <a
              href="/#contact"
              className="flex items-center justify-center flex-1 py-3.5 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] font-semibold text-sm uppercase tracking-[0.12em] hover:bg-[#c9a96e]/10 transition-colors duration-300"
            >
              Enquiry Form
            </a>
          </div>
          <p className="mt-8">
            <a href="/" className="text-[#8a8a8a] text-xs hover:text-[#c9a96e] transition-colors uppercase tracking-[0.15em]">
              Victor Jazz — Wedding Saxophonist Cyprus &rarr;
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
