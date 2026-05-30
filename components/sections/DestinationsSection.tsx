import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import { DESTINATIONS } from '@/lib/constants'

export default function DestinationsSection() {
  return (
    <section
      id="destinations"
      className="py-10 md:py-14 px-5 bg-[#0a0a0a]"
      aria-label="Destination wedding locations"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Where Love Takes You"
            subtitle="Destination weddings worldwide"
          />
        </AnimatedSection>

        <AnimatedSection className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-[#9e9e9e] text-sm md:text-base leading-relaxed">
            Victor is based in Paphos, Cyprus, and is available for destination weddings across
            the Mediterranean and beyond. From the clifftop terraces of{' '}
            <span className="text-[#f5f0e8]">Paphos</span> and the glamorous beach clubs of{' '}
            <span className="text-[#f5f0e8]">Ayia Napa</span>, to the whitewashed villas of{' '}
            <span className="text-[#f5f0e8]">Santorini</span>, the Amalfi cliffs, and the
            ultra-luxury venues of <span className="text-[#f5f0e8]">Dubai</span> — every setting
            becomes more magical with live saxophone.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {DESTINATIONS.map((dest) => (
            <article key={dest.id} className="relative aspect-[2/3] overflow-hidden rounded-xl group cursor-pointer">
              <Image
                src={dest.image}
                alt={dest.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-[#080808]/10" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-[#f5f0e8] text-lg font-light leading-tight">
                  {dest.name}
                </h3>
                <p className="text-[#c9a96e] text-xs uppercase tracking-[0.2em] mt-0.5">
                  {dest.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>

        <AnimatedSection className="mt-6 text-center">
          <p className="text-[#9e9e9e] text-sm mb-6">
            Planning a wedding somewhere not listed? Victor travels internationally —
            <a href="#contact" className="text-[#c9a96e] hover:text-[#e8c97a] transition-colors ml-1">
              get in touch to discuss your destination.
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
