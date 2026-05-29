'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import VideoCard from '@/components/ui/VideoCard'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { GALLERY_VIDEOS } from '@/lib/constants'

export default function VideoGallerySection() {
  return (
    <section
      id="gallery"
      className="pt-8 md:pt-12 pb-10 md:pb-12 px-5 bg-[#080808]"
      aria-label="Video gallery — Victor Jazz performances"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="The Gallery"
            subtitle="Live performances — tap or hover to play"
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY_VIDEOS.map((video) => (
            <VideoCard key={video.src} src={video.src} poster={video.poster} title={video.title} />
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] text-sm uppercase tracking-[0.15em] hover:bg-[#c9a96e] hover:text-[#080808] transition-all duration-300"
            aria-label="Book your wedding saxophone experience"
          >
            Book Your Wedding Sax Experience
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
