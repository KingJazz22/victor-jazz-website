'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Props = {
  src: string
  poster: string
  title: string
}

export default function VideoCard({ src, poster, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Lazy-load via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const play = () => {
    if (!videoRef.current) return
    videoRef.current.muted = isMuted
    videoRef.current.play().catch(() => {})
    setIsPlaying(true)
  }

  const pause = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIsPlaying(false)
  }

  const handleMouseEnter = () => play()
  const handleMouseLeave = () => pause()

  const handleClick = () => {
    isPlaying ? pause() : play()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const newMuted = !isMuted
    videoRef.current.muted = newMuted
    setIsMuted(newMuted)
    // If not already playing, start playing when user unmutes
    if (!isPlaying) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  // Sync muted state to video element whenever it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      className="relative aspect-[9/16] overflow-hidden rounded-lg cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${title} — tap to play`}
      aria-pressed={isPlaying}
    >
      {/* Poster image */}
      <Image
        src={poster}
        alt={title}
        fill
        className={`object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          loop
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

      {/* Play icon — shown when not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-[#c9a96e]/60 flex items-center justify-center bg-[#080808]/40 group-hover:border-[#c9a96e] group-hover:bg-[#080808]/60 transition-all duration-300">
            <svg className="w-4 h-4 text-[#c9a96e] ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Sound toggle — always visible on hover; gold when sound is on */}
      <button
        onClick={toggleSound}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] opacity-0 group-hover:opacity-100 ${
          isMuted
            ? 'bg-[#080808]/60 border border-white/20'
            : 'bg-[#c9a96e] border border-[#c9a96e]'
        }`}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
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

      <p className="absolute bottom-3 left-3 right-10 text-[#f5f0e8] text-xs uppercase tracking-[0.15em] font-light pointer-events-none">
        {title}
      </p>
    </div>
  )
}
