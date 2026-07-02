'use client'

import { useEffect } from 'react'
import { GADS_ID } from '@/lib/gtag'

const INTERACTION_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'scroll'] as const

// The gtag() stub (defined inline in layout.tsx) queues events into window.dataLayer
// immediately, so conversions are never lost — but the actual 150KB gtag/js payload
// is one of the heaviest scripts on the page and was inflating mobile TBT even under
// Next.js's "lazyOnload" strategy. Loading it on first interaction (or a short idle
// fallback for engaged-but-inactive visitors) keeps it off the critical initial-load path.
export default function GtagLoader() {
  useEffect(() => {
    let loaded = false

    const load = () => {
      if (loaded) return
      loaded = true
      INTERACTION_EVENTS.forEach((evt) => window.removeEventListener(evt, load))
      clearTimeout(fallback)

      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`
      script.async = true
      document.head.appendChild(script)
    }

    INTERACTION_EVENTS.forEach((evt) => window.addEventListener(evt, load, { once: true, passive: true }))
    const fallback = setTimeout(load, 4000)

    return () => {
      INTERACTION_EVENTS.forEach((evt) => window.removeEventListener(evt, load))
      clearTimeout(fallback)
    }
  }, [])

  return null
}
