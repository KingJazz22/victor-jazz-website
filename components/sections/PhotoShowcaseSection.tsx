import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { PHOTO_GALLERY } from '@/lib/constants'

export default function PhotoShowcaseSection() {
  return (
    <section
      id="photos"
      className="pt-10 md:pt-12 pb-10 md:pb-14 px-5 bg-[#0a0a0a]"
      aria-label="Victor Jazz — photos and portraits"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Let's Get the Party Started"
            subtitle="Portraits · performances · moments with guests"
          />
        </AnimatedSection>

        <div className="columns-2 md:columns-3 gap-3">
          {PHOTO_GALLERY.map((photo) => (
            <div key={photo.src} className="break-inside-avoid mb-3">
              <div className="overflow-hidden rounded-lg bg-[#141414] group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
