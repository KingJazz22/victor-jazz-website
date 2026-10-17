import type { Metadata } from 'next'
import { SITE_CONFIG, TESTIMONIALS } from '@/lib/constants'
import AreaLandingPage from '@/components/sections/AreaLandingPage'

const PATH = '/wedding-saxophonist-paphos'

export const metadata: Metadata = {
  title: 'Wedding Saxophonist in Paphos — Live Sax',
  description:
    'Paphos-based wedding saxophonist Victor Jazz: live sax for ceremonies, sunset cocktails and DJ + Sax parties at Liopetro, Ktima Alassos, Elea and Coral Bay.',
  keywords: [
    'sax Paphos', 'saxophonist Paphos', 'wedding saxophonist Paphos', 'saxophonist wedding Paphos',
    'Paphos wedding music', 'live sax Paphos', 'Liopetro wedding saxophonist', 'Victor Jazz',
  ],
  openGraph: {
    title: 'Wedding Saxophonist in Paphos | Victor Jazz',
    description: 'Live sax for Paphos weddings: ceremonies, sunset cocktails and DJ + Sax parties.',
    url: `${SITE_CONFIG.url}${PATH}`,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/photos/minths-sax.jpg', alt: 'Victor Jazz playing saxophone at a Paphos wedding venue' }],
    type: 'website',
  },
  alternates: { canonical: `${SITE_CONFIG.url}${PATH}` },
  robots: { index: true, follow: true },
}

export default function PaphosPage() {
  return (
    <AreaLandingPage
      path={PATH}
      area="Paphos"
      eyebrow="Victor Jazz · Sax Paphos"
      h1="Wedding Saxophonist in Paphos"
      intro={[
        'Live saxophone for your Paphos wedding: the ceremony, sunset cocktails and a DJ + Sax party. Victor lives in Paphos and plays its best venues every season.',
        'Victor Jazz is a professional saxophonist and flutist based in Paphos, with more than 350 weddings performed. Many of those weddings are right here in the Paphos district, from the farmstead courtyards of Kouklia to the clifftops of Coral Bay, so he knows the venues, their sound rules and where the sunset lands.',
        'Couples usually book him for three moments: the processional and signing at the ceremony, a relaxed jazz and pop set while guests have drinks at sunset, and a high-energy DJ + Sax set that fills the dance floor. Each set is played live and built around the songs you love.',
        'Many couples plan their Paphos wedding from the UK or Ireland. Send your date and venue on WhatsApp and Victor will reply within 24 hours with availability and a personal quote.',
      ]}
      heroImage={{ src: '/images/photos/minths-sax.jpg', alt: 'Victor Jazz, wedding saxophonist in Paphos, playing at Minthis Resort' }}
      videos={[
        { src: '/videos/reviews/review-liopetro-1.mp4',   poster: '/images/posters/reviews/review-liopetro-1.jpg',   label: 'Liopetro, Kouklia' },
        { src: '/videos/reviews/review-alassos.mp4',      poster: '/images/posters/reviews/review-alassos.jpg',      label: 'Ktima Alassos' },
        { src: '/videos/reviews/review-coral.mp4',        poster: '/images/posters/reviews/review-coral.jpg',        label: 'Coral Residences, Coral Bay' },
        { src: '/videos/reviews/review-elea-1.mp4',       poster: '/images/posters/reviews/review-elea-1.jpg',       label: 'Elea Golf Club' },
        { src: '/videos/reviews/review-liopetro-2.mp4',   poster: '/images/posters/reviews/review-liopetro-2.jpg',   label: 'Liopetro, Kouklia' },
        { src: '/videos/reviews/review-coral-sunset.mp4', poster: '/images/posters/reviews/review-coral-sunset.jpg', label: 'Coral Residences at sunset' },
      ]}
      venuesTitle="Paphos Wedding Venues"
      venues={[
        { name: 'Liopetro, Kouklia', note: 'A restored 16th-century stone farmstead about 15 minutes from Paphos. Victor has five couple video reviews from Liopetro, from aisle walks to DJ + Sax parties.' },
        { name: 'Ktima Alassos', note: 'Ceremony followed by a DJ + Sax evening is a favourite here. Two couple video reviews on this page and in the gallery.' },
        { name: 'Coral Residences, Coral Bay', note: 'Sunset cocktail hours above Coral Bay. Three couple video reviews, including a sunset set and a party with percussion.' },
        { name: 'Elea Golf Club', note: 'Golf-course views for ceremonies and sunset drinks. Two couple video reviews.' },
        { name: 'Aphrodite Hills', note: 'Drinks receptions and ceremonies at one of the best-known resorts near Paphos.' },
        { name: 'Minthis Resort & Cap St Georges', note: 'Hillside and coastal resorts in the Paphos district where Victor has performed for weddings and events.' },
      ]}
      testimonials={TESTIMONIALS.filter((t) => t.venue.includes('Paphos'))}
      faqs={[
        {
          q: 'Are you based in Paphos?',
          a: 'Yes. Victor Jazz lives in Paphos and plays weddings across the Paphos district: Liopetro, Ktima Alassos, Coral Bay, Elea, Aphrodite Hills, Minthis and more.',
        },
        {
          q: 'How much does a wedding saxophonist cost in Paphos?',
          a: 'Packages start from €350 for the ceremony, €600 for ceremony and cocktail hour, and €900 for the full day including the evening. The final quote depends on your date, venue and timings.',
        },
        {
          q: 'Can you play the ceremony and the party?',
          a: 'Yes. Many Paphos couples book the ceremony, a sunset cocktail set and a DJ + Sax set for the evening, so the music changes mood through the day with the same musician.',
        },
        {
          q: 'How far ahead should we book?',
          a: 'Most couples book 6 to 12 months ahead. Summer Saturdays in Paphos fill first, often from January, so it is worth checking your date early.',
        },
      ]}
      whatsappText="Hi Victor! I'm getting married in Paphos and would love a quote. Date: , Venue: "
      related={[
        { href: '/', label: 'Victor Jazz home' },
        { href: '/dj-sax-paphos', label: 'DJ + Sax Paphos' },
        { href: '/saxophonist-ayia-napa', label: 'Saxophonist Ayia Napa' },
        { href: '/wedding-venues-cyprus', label: 'All Cyprus wedding venues' },
      ]}
    />
  )
}
