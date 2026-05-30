'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import { FAQS } from '@/lib/constants'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="py-10 md:py-14 px-5 bg-[#080808]"
      aria-label="Frequently asked questions about hiring a wedding saxophonist"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Common Questions"
            subtitle="Everything you need to know before booking"
          />
        </AnimatedSection>

        <div className="space-y-1.5">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-[#c9a96e]/15 rounded-lg overflow-hidden bg-[#0a0a0a]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-inset"
                aria-expanded={open === i}
              >
                <span className="text-[#f5f0e8] text-sm md:text-base font-light leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#c9a96e]/40 flex items-center justify-center transition-all duration-300 ${
                    open === i ? 'rotate-45 border-[#c9a96e] bg-[#c9a96e]/10' : ''
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-2.5 h-2.5 text-[#c9a96e]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 pt-1 text-[#9e9e9e] text-sm leading-relaxed border-t border-[#c9a96e]/10">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatedSection className="mt-6 text-center">
          <p className="text-[#9e9e9e] text-sm mb-5">
            Still have a question not answered here?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9a96e] text-[#080808] text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
          >
            Ask Victor Directly
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
