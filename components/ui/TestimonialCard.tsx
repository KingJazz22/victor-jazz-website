import GlassCard from './GlassCard'

type Props = {
  name: string
  venue: string
  origin: string
  quote: string
  stars: number
}

export default function TestimonialCard({ name, venue, origin, quote, stars }: Props) {
  return (
    <GlassCard as="article" className="flex flex-col gap-4 h-full">
      <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <blockquote className="font-serif italic text-[#f5f0e8]/90 text-base md:text-lg leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer>
        <p className="text-[#c9a96e] font-semibold text-sm tracking-wide">{name}</p>
        <p className="text-[#9e9e9e] text-xs mt-0.5 uppercase tracking-[0.15em]">
          {venue} &middot; {origin}
        </p>
      </footer>
    </GlassCard>
  )
}
