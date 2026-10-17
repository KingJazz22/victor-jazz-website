import type { Metadata } from 'next'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { VENUES, type Venue } from '@/lib/venues'
import WhatsAppLink from '@/components/ui/WhatsAppLink'

const PATH = '/wedding-venues-cyprus'
const URL = `${SITE_CONFIG.url}${PATH}`
const AREAS: Venue['area'][] = ['Paphos', 'Limassol', 'Larnaca', 'North Cyprus']
const AREA_LINKS: Partial<Record<Venue['area'], string>> = { Paphos: '/wedding-saxophonist-paphos' }

export const metadata: Metadata = {
  title: 'Cyprus Wedding Venues — Live Saxophonist',
  description:
    'Wedding saxophonist at Ktima Alassos, Liopetro, Coral Residences, Minthis, Elea, Aphrodite Hills, Paliomonastiro, Anassa, Annabelle, Columbia Beach and more.',
  keywords: [
    ...VENUES.flatMap((v) => [v.name, ...(v.alsoKnownAs ?? [])]),
    // Common misspellings people type; Google also corrects these on its own.
    'Minths Resort', 'Minths Hotel', 'Paliomonaterio', 'Aphrodites Hills', 'AnaBelle Hotel',
    'saxophonist wedding venue Cyprus', 'Victor Jazz',
  ],
  openGraph: {
    title: 'Cyprus Wedding Venues with Live Sax | Victor Jazz',
    description: 'Where Victor Jazz plays: Paphos, Limassol, Larnaca and North Cyprus wedding venues.',
    url: URL,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/photos/minths-sax.jpg', alt: 'Victor Jazz playing saxophone at Minthis Resort, Paphos' }],
    type: 'website',
  },
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
}

function schema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${URL}#venues`,
    name: 'Cyprus wedding venues where Victor Jazz performs live saxophone',
    itemListElement: VENUES.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${URL}#${v.id}`,
      item: {
        '@type': 'Place',
        name: v.name,
        ...(v.alsoKnownAs ? { alternateName: v.alsoKnownAs } : {}),
        address: { '@type': 'PostalAddress', addressLocality: v.locality, addressCountry: 'CY' },
      },
    })),
  }
}

export default function WeddingVenuesPage() {
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hi Victor! I'd love a quote for live sax at our wedding venue. Date: , Venue: ")}`
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 text-center py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/photos/minths-sax.jpg" alt="Victor Jazz playing saxophone at Minthis Resort, Paphos" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]/90" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-5">Victor Jazz · Wedding Venues</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-[1.1] mb-6">Cyprus Wedding Venues with a Live Saxophonist</h1>
          <p className="text-[#9e9e9e] text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            The venues where Victor Jazz plays ceremonies, sunset cocktails and DJ + Sax parties, from
            Ktima Alassos and Liopetro to Anassa, Columbia Beach and Galu Seaside.
          </p>
        </div>
      </section>

      {/* ── Jump links ───────────────────────────────────────── */}
      <nav aria-label="Venues on this page" className="border-y border-[#c9a96e]/15 py-6 px-6">
        <ul className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
          {VENUES.map((v) => (
            <li key={v.id}>
              <a href={`#${v.id}`} className="inline-block px-4 py-1.5 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] text-sm hover:border-[#c9a96e]/70 transition-colors">
                {v.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Venues by area ───────────────────────────────────── */}
      {AREAS.map((area) => {
        const venues = VENUES.filter((v) => v.area === area)
        if (!venues.length) return null
        return (
          <section key={area} className="py-14 px-6 odd:bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">{area}</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light">{area} Wedding Venues</h2>
                {AREA_LINKS[area] && (
                  <a href={AREA_LINKS[area]} className="inline-block mt-3 text-[#c9a96e] text-sm hover:underline">
                    Wedding saxophonist in {area} &rarr;
                  </a>
                )}
              </div>
              <div className="space-y-6">
                {venues.map((v) => (
                  <article key={v.id} id={v.id} className="glass rounded-xl p-6 md:p-8 scroll-mt-28 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
                    <div>
                      <h3 className="font-serif text-2xl font-light mb-1">Saxophonist at {v.name}</h3>
                      <p className="text-[#8a8a8a] text-xs uppercase tracking-[0.15em] mb-4">{v.locality}</p>
                      {v.alsoKnownAs && (
                        <p className="text-[#6e6e6e] text-xs mb-4">Also known as {v.alsoKnownAs.join(', ')}</p>
                      )}
                      <p className="text-[#9e9e9e] text-sm leading-relaxed mb-3">{v.setting}</p>
                      <p className="text-[#f5f0e8]/85 text-sm leading-relaxed">{v.victor}</p>
                      {v.quote && (
                        <blockquote className="mt-5 border-l border-[#c9a96e]/50 pl-4">
                          <p className="font-serif text-lg font-light text-[#f5f0e8]/90">&ldquo;{v.quote.text}&rdquo;</p>
                          <footer className="text-[#8a8a8a] text-xs uppercase tracking-[0.15em] mt-2">{v.quote.by}</footer>
                        </blockquote>
                      )}
                    </div>
                    {v.video ? (
                      <video
                        src={v.video.src}
                        poster={v.video.poster}
                        controls
                        playsInline
                        preload="none"
                        className="w-full max-w-[220px] mx-auto aspect-[9/16] object-cover rounded-xl bg-[#141414]"
                        aria-label={`Victor Jazz — ${v.video.label}`}
                      />
                    ) : v.image ? (
                      <div className="relative w-full max-w-[220px] mx-auto aspect-[3/4] rounded-xl overflow-hidden">
                        <Image src={v.image.src} alt={v.image.alt} fill sizes="220px" className="object-cover" />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Your Venue Not Listed?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-3">Victor Plays Island-Wide</h2>
          <p className="text-[#9e9e9e] text-sm mb-8">Send your date and venue. Victor replies within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppLink
              href={whatsapp}
              className="flex items-center justify-center flex-1 py-3.5 rounded-full bg-[#1a7f42] text-white font-semibold text-sm uppercase tracking-[0.12em] hover:brightness-110 transition-all duration-300"
            >
              WhatsApp Victor
            </WhatsAppLink>
            <a href="/#contact" className="flex items-center justify-center flex-1 py-3.5 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] font-semibold text-sm uppercase tracking-[0.12em] hover:bg-[#c9a96e]/10 transition-colors duration-300">
              Enquiry Form
            </a>
          </div>
          <nav aria-label="Related pages" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: '/', label: 'Victor Jazz home' },
              { href: '/wedding-saxophonist-paphos', label: 'Wedding saxophonist Paphos' },
              { href: '/saxophonist-ayia-napa', label: 'Saxophonist Ayia Napa' },
              { href: '/dj-sax-paphos', label: 'DJ + Sax' },
            ].map((r) => (
              <a key={r.href} href={r.href} className="text-[#8a8a8a] text-xs hover:text-[#c9a96e] transition-colors uppercase tracking-[0.15em]">
                {r.label} &rarr;
              </a>
            ))}
          </nav>
        </div>
      </section>
    </div>
  )
}
