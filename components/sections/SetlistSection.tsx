'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import { SETLIST } from '@/lib/constants'

export default function SetlistSection() {
  const [activeId, setActiveId] = useState(SETLIST[0].id)
  const active = SETLIST.find((s) => s.id === activeId) ?? SETLIST[0]

  return (
    <section
      id="setlist"
      className="py-20 md:py-32 px-5 bg-[#0a0a0a]"
      aria-label="Wedding saxophone repertoire and setlist"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="The Repertoire"
            subtitle="Every setlist is tailored to you — these are just the highlights"
          />
        </AnimatedSection>

        {/* Tab bar */}
        <AnimatedSection className="flex justify-center mb-10">
          <div
            className="inline-flex border border-[#c9a96e]/20 rounded-full p-1 gap-1"
            role="tablist"
            aria-label="Setlist categories"
          >
            {SETLIST.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeId === tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] ${
                  activeId === tab.id
                    ? 'bg-[#c9a96e] text-[#080808] font-semibold'
                    : 'text-[#9e9e9e] hover:text-[#f5f0e8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Description */}
        <p className="text-center text-[#9e9e9e] text-sm mb-8 leading-relaxed">
          {active.description}
        </p>

        {/* Song grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {active.songs.map((song, i) => (
            <div
              key={`${activeId}-${i}`}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl border border-[#c9a96e]/10 bg-[#0f0f0f] hover:border-[#c9a96e]/25 transition-colors duration-200"
            >
              <span className="text-[#c9a96e]/30 font-serif text-sm w-5 text-right shrink-0 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[#f5f0e8] text-sm font-light truncate">{song.title}</p>
                <p className="text-[#6b6b6b] text-xs mt-0.5 truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <p className="text-[#9e9e9e] text-sm mb-5">
            Don&apos;t see your song? Victor learns new pieces for your wedding at no extra charge.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#c9a96e]/60 text-[#c9a96e] text-sm uppercase tracking-[0.15em] hover:bg-[#c9a96e] hover:text-[#080808] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
          >
            Request a Song
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
