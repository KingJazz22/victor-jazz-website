'use client'

import { Suspense, use } from 'react'

// Below-the-fold sections were all hydrating during the initial load, which was the
// bulk of desktop Total Blocking Time. Suspending inside a Suspense boundary while it
// hydrates makes React keep the server-rendered HTML as-is (fully visible and crawlable)
// and retry hydration only once the promise resolves — here, when the section nears the
// viewport. Clicks on a not-yet-hydrated section trigger React's selective hydration and
// are replayed, so nothing is lost.
const pending = new Map<string, Promise<void>>()

function whenNearViewport(id: string) {
  let promise = pending.get(id)
  if (!promise) {
    promise = new Promise<void>((resolve) => {
      const el = document.getElementById(id)
      if (!el || !('IntersectionObserver' in window)) return resolve()
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect()
            resolve()
          }
        },
        { rootMargin: '100px' }
      )
      observer.observe(el)
    })
    pending.set(id, promise)
  }
  return promise
}

function Gate({ id, children }: { id: string; children: React.ReactNode }) {
  if (typeof window !== 'undefined') use(whenNearViewport(id))
  return children
}

// `id` must match the id of the section element rendered by `children`.
export default function HydrateOnVisible({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Gate id={id}>{children}</Gate>
    </Suspense>
  )
}
