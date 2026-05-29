import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'li'
}

export default function GlassCard({ children, className, hover = true, as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={cn(
        'rounded-xl p-6',
        'bg-white/[0.04] backdrop-blur-[12px]',
        'border border-[#c9a96e]/15',
        hover &&
          'transition-all duration-300 hover:border-[#c9a96e]/30 hover:shadow-[0_0_30px_rgba(201,169,110,0.08)]',
        className
      )}
    >
      {children}
    </Tag>
  )
}
