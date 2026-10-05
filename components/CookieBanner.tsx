'use client'

import { useEffect, useState } from 'react'
import { needsConsentBanner, readConsent, saveConsent, type ConsentChoice } from '@/lib/consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent() === null && needsConsentBanner()) setVisible(true)
  }, [])

  if (!visible) return null

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[#c9a96e]/20 bg-[#0d0d0d]/97 backdrop-blur-md"
    >
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-[#b8b8b8] text-xs sm:text-sm leading-relaxed flex-1">
          I use cookies to see which Google ads bring wedding enquiries. They are optional — the
          site works the same either way.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#c9a96e]/60 text-[#f5f0e8] text-xs uppercase tracking-[0.12em] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#c9a96e] text-[#080808] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#e8c97a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
