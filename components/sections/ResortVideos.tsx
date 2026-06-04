'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const VIDEOS = [
  { id: 'SjHuV4BDcVA', label: 'Live Performance' },
  { id: 'wIoMiIANRTQ', label: 'Live Performance' },
  { id: '9xwfUhBrMI0', label: 'Sunset Clarinet' },
  { id: 'pVXcKWgfM08', label: 'Ethnic Flute' },
]

export default function ResortVideos() {
  const playersRef = useRef<any[]>([])
  const readyRef = useRef(false)

  useEffect(() => {
    if (readyRef.current) return
    readyRef.current = true

    const initPlayers = () => {
      playersRef.current = VIDEOS.map(({ id }, i) =>
        new window.YT.Player(`rv-${i}`, {
          videoId: id,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            loop: 0,
            playsinline: 1,
          },
          events: {
            onStateChange: (e: any) => {
              if (e.data === window.YT.PlayerState.PLAYING) {
                playersRef.current.forEach((p, j) => {
                  if (j !== i) p?.pauseVideo?.()
                })
              }
            },
          },
        })
      )
    }

    if (window.YT?.Player) {
      initPlayers()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        initPlayers()
      }
      if (!document.getElementById('yt-api')) {
        const s = document.createElement('script')
        s.id = 'yt-api'
        s.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(s)
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {VIDEOS.map(({ label }, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div
            className="relative w-full rounded-xl overflow-hidden bg-[#111]"
            style={{ aspectRatio: '9/16' }}
          >
            <div id={`rv-${i}`} className="absolute inset-0 w-full h-full" />
          </div>
          <p className="text-[#6b6b6b] text-[10px] text-center uppercase tracking-[0.15em]">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}
