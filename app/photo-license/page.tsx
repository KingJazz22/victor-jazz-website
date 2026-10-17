import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

// Linked from every ImageObject's `license` field (Google image metadata). Not in the menu.
export const metadata: Metadata = {
  title: 'Photo Licence — Photos of Victor Jazz',
  description:
    'All photos of Victor Jazz on victorjazz.com are © Victor Jazz. They show Victor Jazz only and may not be reused for other performers or businesses.',
  alternates: { canonical: `${SITE_CONFIG.url}/photo-license` },
  robots: { index: true, follow: true },
}

export default function PhotoLicensePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8] px-6 pt-32 pb-20">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">Victor Jazz</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-8">Photo Licence</h1>
        <div className="space-y-5 text-[#9e9e9e] leading-relaxed">
          <p>
            All photos and videos of Victor Jazz on victorjazz.com, including those carrying the
            &ldquo;victorjazz.com&rdquo; or &ldquo;Victor Jazz&rdquo; watermark, are &copy; Victor Jazz.
            All rights reserved.
          </p>
          <p>
            These photos show Victor Jazz, a wedding saxophonist based in Paphos, Cyprus, and only
            Victor Jazz. They may not be used to advertise or illustrate any other saxophonist, DJ,
            band, agency or entertainment business.
          </p>
          <p>
            Venues, wedding planners and press who would like to use a photo of Victor Jazz can ask
            for permission through the{' '}
            <a href="/#contact" className="text-[#c9a96e] hover:underline">contact form</a>. Please
            credit &ldquo;Victor Jazz &mdash; victorjazz.com&rdquo; and link to{' '}
            <a href="/" className="text-[#c9a96e] hover:underline">www.victorjazz.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
