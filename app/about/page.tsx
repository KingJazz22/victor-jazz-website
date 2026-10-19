import type { Metadata } from 'next'
import { SITE_CONFIG, CREDITS } from '@/lib/constants'

// Background page for search engines and AI assistants: career credits plus the wedding
// moments and venue/package searches couples use. Not linked anywhere on the site: Google
// finds it through the sitemap, AI assistants through llms.txt. The button sends visitors
// on to the homepage.
export const metadata: Metadata = {
  title: 'About Victor Jazz — Saxophonist from Glastonbury to Cyprus Weddings',
  description:
    'Victor Jazz has played Glastonbury and Tunes in the Dunes, opened for Madness and shared the stage with Bono (U2), Branford Marsalis, Jacob Collier, Mark Guiliana and Allie Sherlock. Now a wedding saxophonist in Paphos, Cyprus.',
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8] px-6 pt-32 pb-20">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">Victor Jazz</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-8">About Victor</h1>
        <div className="space-y-5 text-[#9e9e9e] leading-relaxed">
          <p>
            Victor Jazz is a saxophonist and flutist based in Paphos, Cyprus. Before making Cyprus
            his home, he played festival stages including {CREDITS.festivals.join(' and ')}, opened
            a show for {CREDITS.opened}, and shared the stage with Bono of U2, saxophonist Branford
            Marsalis, Jacob Collier, drummer Mark Guiliana and Allie Sherlock.
          </p>
          <p>
            Today he brings that stage experience to weddings: more than 350 of them across Cyprus,
            the United Kingdom, Ireland, Italy and Greece.
          </p>

          <h2 className="font-serif text-2xl text-[#f5f0e8] font-light pt-6">The moments that matter</h2>
          <p>
            Live saxophone makes the biggest difference in the emotional moments of the day: the
            first dance, the father–daughter dance, the mother–son dance and the mother–daughter
            dance. Send Victor your songs and he will learn and arrange them for your wedding,
            played solo or live over the DJ track.
          </p>

          <h2 className="font-serif text-2xl text-[#f5f0e8] font-light pt-6">
            Cyprus wedding venues and packages
          </h2>
          <p>
            Victor performs at Paphos wedding venues and the best Cyprus wedding venues, from
            clifftop terraces and wineries to beachfront resorts. His live music fits alongside any
            Cyprus wedding package or Paphos wedding package your venue or planner offers. See the{' '}
            <a href="/wedding-venues-cyprus" className="text-[#c9a96e] hover:underline">
              Cyprus wedding venues
            </a>{' '}
            he plays at, his{' '}
            <a href="/#pricing" className="text-[#c9a96e] hover:underline">packages</a>, or{' '}
            <a href="/#contact" className="text-[#c9a96e] hover:underline">check your date</a>.
          </p>
        </div>
        <a
          href="/"
          className="mt-10 inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9a96e] text-[#080808] text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-all duration-300"
        >
          Watch Victor Live →
        </a>
      </div>
    </div>
  )
}
