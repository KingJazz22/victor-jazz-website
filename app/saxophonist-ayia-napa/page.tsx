import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import AreaLandingPage from '@/components/sections/AreaLandingPage'

const PATH = '/saxophonist-ayia-napa'

export const metadata: Metadata = {
  title: 'Saxophonist in Ayia Napa & Protaras — Weddings',
  description:
    'Live sax in Ayia Napa, Protaras and Paralimni: wedding ceremonies, beach cocktail hours and DJ + Sax parties by Victor Jazz, with real couple video reviews.',
  keywords: [
    'sax Ayia Napa', 'saxophonist Ayia Napa', 'wedding saxophonist Ayia Napa', 'saxophonist Protaras',
    'sax Protaras', 'saxophonist Paralimni', 'Ayia Napa wedding music', 'Victor Jazz',
  ],
  openGraph: {
    title: 'Saxophonist in Ayia Napa & Protaras | Victor Jazz',
    description: 'Live sax for weddings and beach parties in Ayia Napa, Protaras and Paralimni.',
    url: `${SITE_CONFIG.url}${PATH}`,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/photos/tropical-portrait.jpg', alt: 'Victor Jazz, saxophonist for Ayia Napa beach weddings' }],
    type: 'website',
  },
  alternates: { canonical: `${SITE_CONFIG.url}${PATH}` },
  robots: { index: true, follow: true },
}

export default function AyiaNapaPage() {
  return (
    <AreaLandingPage
      path={PATH}
      area="Ayia Napa"
      eyebrow="Victor Jazz · Sax Ayia Napa"
      h1="Wedding Saxophonist in Ayia Napa & Protaras"
      intro={[
        'Live saxophone for weddings and beach parties on the east coast: Ayia Napa, Protaras and Paralimni. Ceremonies, sunset cocktails and DJ + Sax.',
        'Victor Jazz is a professional saxophonist and flutist based in Cyprus who performs island-wide. On the east coast he has played weddings in Ayia Napa, Protaras and Paralimni, and the couples’ own video reviews are on this page.',
        'Ayia Napa and Protaras weddings tend to be about the sea and the party: a ceremony by the water, golden-hour drinks on the beach and an evening that turns into a dance floor. Victor plays smooth jazz and pop for the first part of the day and switches to house, Ibiza and Afro-house with a DJ for the party.',
        'Send your date and venue on WhatsApp and Victor will reply within 24 hours with availability and a personal quote for the east coast.',
      ]}
      heroImage={{ src: '/images/photos/tropical-portrait.jpg', alt: 'Victor Jazz, saxophonist for weddings in Ayia Napa and Protaras' }}
      videos={[
        { src: '/videos/reviews/review-ayia-napa.mp4',   poster: '/images/posters/reviews/review-ayia-napa.jpg',   label: 'Ayia Napa' },
        { src: '/videos/reviews/review-paralimni.mp4',   poster: '/images/posters/reviews/review-paralimni.jpg',   label: 'Paralimni' },
        { src: '/videos/reviews/review-golden-coast.mp4', poster: '/images/instagram/golden-coast.jpg',            label: 'Golden Coast, Protaras' },
      ]}
      venuesTitle="Ayia Napa, Protaras & Paralimni"
      venues={[
        { name: 'Ayia Napa', note: 'Beach ceremonies, sunset drinks and party nights. A couple’s video review from an Ayia Napa wedding is on this page.' },
        { name: 'Protaras', note: 'Quieter bays and beachfront hotels. Victor has played a wedding at Golden Coast in Protaras; that couple’s video review is on this page too.' },
        { name: 'Paralimni', note: 'Villa and restaurant weddings just inland from Protaras. A couple’s video review from Paralimni is on this page.' },
        { name: 'Villas, beach clubs & yachts', note: 'Private villa parties, beach-club receptions and boat parties along the east coast, with wireless sound so Victor can move among your guests.' },
      ]}
      faqs={[
        {
          q: 'Do you travel to Ayia Napa and Protaras?',
          a: 'Yes. Victor Jazz performs island-wide and has played weddings in Ayia Napa, Protaras and Paralimni. Send your date and venue and your quote will cover the east-coast booking.',
        },
        {
          q: 'How much does a wedding saxophonist cost in Ayia Napa?',
          a: 'Packages start from €350 for the ceremony, €600 for ceremony and cocktail hour, and €900 for the full day including the evening. The final quote depends on your date, venue and timings.',
        },
        {
          q: 'Can you play a beach wedding?',
          a: 'Yes. Victor uses a professional wireless PA, so he can play on the sand, by the pool or on a terrace, and move among guests during the cocktail hour.',
        },
        {
          q: 'Do you play with DJs for the party?',
          a: 'Yes. DJ + Sax is Victor’s most requested package: live saxophone over house, Ibiza and Afro-house sets, with your DJ or a curated mix.',
        },
      ]}
      whatsappText="Hi Victor! I'd love a quote for live sax in Ayia Napa / Protaras. Date: , Venue: "
      related={[
        { href: '/', label: 'Victor Jazz home' },
        { href: '/wedding-saxophonist-paphos', label: 'Wedding saxophonist Paphos' },
        { href: '/dj-sax-paphos', label: 'DJ + Sax' },
        { href: '/blog/destination-wedding-cyprus-guide', label: 'Cyprus wedding guide' },
      ]}
    />
  )
}
