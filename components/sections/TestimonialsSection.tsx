'use client'

import { useEffect, useRef, useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import TestimonialCard from '@/components/ui/TestimonialCard'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { TESTIMONIALS } from '@/lib/constants'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const touchStartX = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = TESTIMONIALS.length

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, 5000)
  }

  useEffect(() => {
    startAutoPlay()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = (index: number) => {
    setActive(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
    startAutoPlay()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) goTo((active + 1) % total)
      else goTo((active - 1 + total) % total)
    }
  }

  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 px-5 bg-[#0a0a0a] [content-visibility:auto] [contain-intrinsic-size:auto_700px]"
      aria-label="Testimonials from couples"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Stories From the Aisle"
            subtitle="Real couples, real moments"
          />
        </AnimatedSection>

        {/* One set of cards: 3-column grid on desktop, swipeable carousel on mobile.
            (Rendering them twice for each layout doubled this section's DOM and hydration cost.) */}
        <AnimatedSection>
          <div className="max-md:overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div
              className="flex md:grid md:grid-cols-3 md:gap-4 max-md:translate-x-(--slide) max-md:transition-transform max-md:duration-500 max-md:ease-in-out"
              style={{ '--slide': `-${active * 100}%` } as React.CSSProperties}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="min-w-full px-1 md:min-w-0 md:px-0">
                  <TestimonialCard
                    name={t.name}
                    venue={t.venue}
                    origin={t.origin}
                    quote={t.quote}
                    stars={t.stars}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="md:hidden">
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] p-3 box-content ${
                  i === active ? 'bg-[#c9a96e] w-5' : 'bg-[#c9a96e]/30'
                }`}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <AnimatedSection className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9a96e] text-[#080808] text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-all duration-300"
          >
            Get a Quote
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
