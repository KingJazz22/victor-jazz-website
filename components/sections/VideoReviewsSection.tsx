'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import { VIDEO_REVIEWS } from '@/lib/constants'

function ReviewCard({
  src,
  poster,
  venue,
  isActive,
  onActivate,
}: {
  src: string
  poster: string
  venue: string
  isActive: boolean
  onActivate: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect() } },
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stop this card when another one becomes active
  useEffect(() => {
    if (!isActive && isPlaying && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [isActive, isPlaying])

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted
  }, [isMuted])

  const handlePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      onActivate()
      videoRef.current.muted = isMuted
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const next = !isMuted
    videoRef.current.muted = next
    setIsMuted(next)
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] overflow-hidden rounded-xl cursor-pointer group bg-[#141414]"
      onClick={handlePlay}
      aria-label={`Play couple review from ${venue}`}
    >
      <Image
        src={poster}
        alt={`Wedding review — ${venue}`}
        fill
        className={`object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />

      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          playsInline
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

      {/* Play / pause button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full border border-[#c9a96e]/60 flex items-center justify-center bg-[#080808]/50 group-hover:border-[#c9a96e] group-hover:bg-[#080808]/70 transition-all duration-300">
            <svg className="w-5 h-5 text-[#c9a96e] ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] opacity-0 group-hover:opacity-100 ${
          isMuted ? 'bg-[#080808]/60 border border-white/20' : 'bg-[#c9a96e] border border-[#c9a96e]'
        }`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg className="w-3.5 h-3.5 text-white/80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-[#080808]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>

      {/* Venue label */}
      <p className="absolute bottom-3 left-3 right-10 text-[#f5f0e8] text-xs uppercase tracking-[0.15em] font-light pointer-events-none">
        {venue}
      </p>
    </div>
  )
}

export default function VideoReviewsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      id="reviews"
      className="pt-10 md:pt-12 pb-20 md:pb-32 px-5 bg-[#080808]"
      aria-label="Couple video reviews"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Straight From the Heart"
            subtitle="Real couples — real moments"
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {VIDEO_REVIEWS.map((review, i) => (
            <ReviewCard
              key={review.src}
              {...review}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
