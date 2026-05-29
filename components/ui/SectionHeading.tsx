import { cn } from '@/lib/utils'

type Props = {
  title: string
  subtitle?: string
  centered?: boolean
  as?: 'h2' | 'h3'
  titleClassName?: string
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  as: Tag = 'h2',
  titleClassName,
  className,
}: Props) {
  return (
    <div className={cn(centered && 'text-center', 'mb-12 md:mb-16', className)}>
      <Tag
        className={cn(
          'font-serif font-light tracking-[0.08em] text-[#f5f0e8]',
          'text-3xl md:text-5xl lg:text-6xl',
          titleClassName
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-5 text-[#9e9e9e] text-xs md:text-sm uppercase tracking-[0.25em] font-light">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-12 h-px bg-[#c9a96e]/60" aria-hidden="true" />
    </div>
  )
}
