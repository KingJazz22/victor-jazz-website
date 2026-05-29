import StatCounter from '@/components/ui/StatCounter'
import { STATS } from '@/lib/constants'

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="bg-[#0f0f0f] pt-16 md:pt-20 pb-4 md:pb-6 px-5"
      aria-label="Trust and social proof"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-0 border border-[#c9a96e]/10 rounded-2xl overflow-hidden">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={i < STATS.length - 1 ? 'border-r border-[#c9a96e]/10' : ''}
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
