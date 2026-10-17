import Image from 'next/image'
import { SITE_CONFIG, PACKAGES } from '@/lib/constants'
import { IMAGE_LICENSE } from '@/lib/schema'
import WhatsAppLink from '@/components/ui/WhatsAppLink'

// Shared layout for the area pages (/wedding-saxophonist-paphos, /saxophonist-ayia-napa).
// Each page passes its own copy, venues and video reviews, so the pages are genuinely
// different rather than town-name swaps (Google treats those as doorway pages).

type Video = { src: string; poster: string; label: string }
type Venue = { name: string; note: string }
type Faq = { q: string; a: string }
type Testimonial = { name: string; venue: string; origin: string; quote: string }

export type AreaPageProps = {
  path: string
  area: string
  eyebrow: string
  h1: string
  intro: string[]
  heroImage: { src: string; alt: string }
  videos: Video[]
  venuesTitle: string
  venues: Venue[]
  testimonials?: Testimonial[]
  faqs: Faq[]
  whatsappText: string
  related: { href: string; label: string }[]
}

export default function AreaLandingPage(p: AreaPageProps) {
  const url = `${SITE_CONFIG.url}${p.path}`
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(p.whatsappText)}`
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.h1,
        serviceType: 'Wedding saxophonist',
        url,
        provider: { '@id': `${SITE_CONFIG.url}/#business` },
        performer: { '@id': `${SITE_CONFIG.url}/#victor` },
        areaServed: { '@type': 'City', name: p.area },
        image: {
          '@type': 'ImageObject',
          contentUrl: `${SITE_CONFIG.url}${p.heroImage.src}`,
          caption: p.heroImage.alt,
          creditText: 'Victor Jazz',
          creator: { '@id': `${SITE_CONFIG.url}/#victor` },
          copyrightNotice: '© Victor Jazz',
          ...IMAGE_LICENSE,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] items-center justify-center px-6 text-center py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={p.heroImage.src} alt={p.heroImage.alt} fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]/90" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-5">{p.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-[1.1] mb-6">{p.h1}</h1>
          <p className="text-[#9e9e9e] text-base md:text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
            {p.intro[0]}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppLink
              href={whatsapp}
              className="inline-block px-9 py-3.5 rounded-full bg-[#c9a96e] text-[#080808] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-colors duration-300"
            >
              Check Your Date
            </WhatsAppLink>
            <a href="#reviews" className="inline-block px-9 py-3.5 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] font-semibold text-sm uppercase tracking-[0.15em] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors duration-300">
              Watch Couples&apos; Reviews
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-5 text-[#9e9e9e] leading-relaxed">
          {p.intro.slice(1).map((t) => <p key={t}>{t}</p>)}
        </div>
      </section>

      {/* ── Video reviews ────────────────────────────────────── */}
      <section id="reviews" className="py-14 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Real Couples</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Video Reviews from {p.area}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {p.videos.map((v) => (
              <figure key={v.src}>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  className="w-full aspect-[9/16] object-cover rounded-xl bg-[#141414]"
                  aria-label={`Couple's review of Victor Jazz — ${v.label}`}
                />
                <figcaption className="text-[#8a8a8a] text-xs text-center mt-2">{v.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Venues ───────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Where Victor Plays</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">{p.venuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.venues.map((v) => (
              <div key={v.name} className="glass rounded-xl p-6">
                <div className="w-6 h-px bg-[#c9a96e] mb-4" aria-hidden="true" />
                <h3 className="font-serif text-lg font-light mb-2">{v.name}</h3>
                <p className="text-[#9e9e9e] text-sm leading-relaxed">{v.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      {p.testimonials && p.testimonials.length > 0 && (
        <section className="py-14 px-6 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">In Their Words</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">{p.area} Couples on Victor</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.testimonials.map((t) => (
                <blockquote key={t.name} className="glass rounded-xl p-6">
                  <p className="text-[#f5f0e8]/90 font-serif text-lg font-light leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="text-[#8a8a8a] text-xs uppercase tracking-[0.15em]">
                    {t.name} · {t.venue} · {t.origin}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Packages ─────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Packages</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Wedding Sax Packages in {p.area}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PACKAGES.map((pk) => (
              <div key={pk.id} className="glass rounded-xl p-6 text-center">
                <h3 className="font-serif text-xl font-light mb-1">{pk.name}</h3>
                <p className="text-[#8a8a8a] text-xs uppercase tracking-[0.15em] mb-4">{pk.tagline}</p>
                <p className="font-serif text-3xl text-[#c9a96e] font-light">from {pk.currency}{pk.from}</p>
                <p className="text-[#8a8a8a] text-xs mt-1">{pk.duration}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <a href="/dj-sax-paphos" className="text-[#c9a96e] text-sm hover:underline">DJ + Sax for the party &rarr;</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Questions</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">{p.area} Wedding Sax FAQ</h2>
          </div>
          <div className="space-y-3">
            {p.faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-5 group">
                <summary className="cursor-pointer font-serif text-lg font-light list-none flex justify-between gap-4">
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
      <section className="py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-3">Get a Quote</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-3">Book Victor for {p.area}</h2>
          <p className="text-[#9e9e9e] text-sm mb-8">Send your date and venue. Victor replies within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppLink
              href={whatsapp}
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
          <nav aria-label="Related pages" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {p.related.map((r) => (
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
