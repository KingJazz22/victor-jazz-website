'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SITE_CONFIG } from '@/lib/constants'

const PHOTOS = [
  {
    src: '/images/instagram/cheers-bw.jpg',
    alt: 'Victor Jazz celebrating in black and white — pure joy at a wedding',
    tall: true,
  },
  {
    src: '/images/instagram/abu-dhabi.jpg',
    alt: 'Victor Jazz performing saxophone at the Sheikh Zayed Grand Mosque Abu Dhabi',
    tall: false,
  },
  {
    src: '/images/instagram/alassos.jpg',
    alt: 'Victor Jazz performing live saxophone at a wedding at Alassos Paphos Cyprus',
    tall: false,
  },
  {
    src: '/images/instagram/coral-photo-2.jpg',
    alt: 'Victor Jazz wedding performance at Coral Residences Cyprus',
    tall: true,
  },
  {
    src: '/images/instagram/portrait-bw.jpg',
    alt: 'Black and white portrait of Victor Jazz — wedding saxophonist Cyprus',
    tall: false,
  },
  {
    src: '/images/instagram/cap-st-georges.jpg',
    alt: 'Victor Jazz performing at Cap St Georges luxury resort Cyprus',
    tall: false,
  },
  {
    src: '/images/instagram/flute.jpg',
    alt: 'Victor Jazz playing flute at a luxury event in Cyprus',
    tall: true,
  },
  {
    src: '/images/instagram/coral-sunset.jpg',
    alt: 'Victor Jazz at Coral Residences — sunset wedding performance Cyprus',
    tall: false,
  },
  {
    src: '/images/instagram/elea.jpg',
    alt: 'Victor Jazz performing saxophone at Elea Golf Club Paphos Cyprus',
    tall: false,
  },
]

export default function InstagramSection() {
  return (
    <section
      id="instagram"
      className="py-20 md:py-28 px-5 bg-[#0a0a0a]"
      aria-label="Follow Victor Jazz on Instagram"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">
            @{SITE_CONFIG.instagram}
          </p>
          <h2 className="font-serif font-light text-3xl md:text-5xl text-[#f5f0e8] tracking-wide mb-4">
            Follow the Journey
          </h2>
          <p className="text-[#9e9e9e] text-sm max-w-lg mx-auto leading-relaxed">
            Behind-the-scenes moments, wedding highlights, and beautiful destinations from Cyprus to Dubai.
          </p>
        </AnimatedSection>

        {/* Masonry photo grid */}
        <AnimatedSection>
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            aria-label={`Visit @${SITE_CONFIG.instagram} on Instagram`}
          >
            <div className="columns-2 sm:columns-3 gap-2 md:gap-3 mb-8">
              {PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl mb-2 md:mb-3 break-inside-avoid ${
                    photo.tall ? 'aspect-[3/4]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#c9a96e]/0 group-hover:bg-[#c9a96e]/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </a>
        </AnimatedSection>

        <AnimatedSection className="text-center">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] text-sm uppercase tracking-[0.15em] hover:bg-[#c9a96e] hover:text-[#080808] transition-all duration-300"
            aria-label="Follow Victor Jazz on Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow @{SITE_CONFIG.instagram}
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
