import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'

const EXPERIENCES = [
  {
    id: 'ceremony',
    eyebrow: 'Ceremony Saxophone',
    name: 'The Ceremony',
    description:
      'Live saxophone as you walk down the aisle. From your processional entrance to the joyful recessional — an unforgettable soundtrack for your most important moment. Church ceremonies, clifftop vows, and beach weddings across Cyprus.',
    highlights: [
      'Processional, signing & recessional',
      'Bespoke song requests for the aisle',
      'Pre-wedding music consultation',
      'Professional PA system',
    ],
    featured: false,
  },
  {
    id: 'celebration',
    eyebrow: 'Most Requested',
    name: 'Ceremony & Cocktail Hour',
    description:
      'The most requested combination for Cyprus weddings. After the ceremony, Victor continues into your drinks reception — soulful jazz, romantic standards, and feel-good hits while you take your first portraits as newlyweds overlooking the Mediterranean.',
    highlights: [
      'Full ceremony performance',
      'Cocktail hour set (45–60 min)',
      'Unlimited song requests',
      'Custom setlist for every moment',
    ],
    featured: true,
  },
  {
    id: 'fullday',
    eyebrow: 'Complete Wedding Day',
    name: 'The Full Experience',
    description:
      'From ceremony through to the evening party — a complete live music journey for your Cyprus wedding day. Includes DJ + Sax sets, sunset performances, and every moment in between.',
    highlights: [
      'Ceremony + cocktail hour',
      'Evening reception & DJ + Sax',
      'Sunset performance option',
      'Destination weddings welcome',
    ],
    featured: false,
  },
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 md:py-32 px-5 bg-[#080808]"
      aria-label="Wedding saxophone experiences — ceremony, cocktail hour, and full day"
    >
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="The Experiences"
            subtitle="Every performance is personally tailored to your wedding day"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className={`relative rounded-2xl p-8 flex flex-col border transition-colors duration-300 ${
                exp.featured
                  ? 'border-[#c9a96e]/50 bg-[#c9a96e]/[0.04]'
                  : 'border-[#c9a96e]/15 bg-[#0a0a0a]'
              }`}
            >
              {exp.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                  <span className="bg-[#c9a96e] text-[#080808] text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    Most Requested
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-[#c9a96e] text-[10px] uppercase tracking-[0.3em] mb-2">
                  {exp.eyebrow}
                </p>
                <p className="font-serif font-light text-xl text-[#f5f0e8] tracking-wide leading-snug">
                  {exp.name}
                </p>
              </div>

              <p className="text-[#9e9e9e] text-sm leading-relaxed mb-6 flex-1">
                {exp.description}
              </p>

              <ul className="space-y-2.5 mb-8">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-3.5 h-3.5 text-[#c9a96e] mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#9e9e9e] text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] ${
                  exp.featured
                    ? 'bg-[#c9a96e] text-[#080808] font-semibold hover:bg-[#e8c97a]'
                    : 'border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#080808]'
                }`}
              >
                Enquire
              </a>
            </div>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <p className="text-[#6b6b6b] text-xs leading-relaxed max-w-xl mx-auto">
            Every performance is bespoke — final details are agreed personally with Victor.
            Destination weddings in Greece, Italy, France, Dubai, and beyond are very welcome.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
