import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'whatsapp'

type Props = {
  children: React.ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#c9a96e] text-[#080808] hover:bg-[#e8c97a] font-semibold tracking-wider',
  ghost:
    'border border-[#c9a96e]/60 text-[#f5f0e8] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#20bd5a] font-semibold',
}

const base =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:opacity-50 disabled:cursor-not-allowed'

export default function CTAButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: Props) {
  const classes = cn(base, variantClasses[variant], className)

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('https')
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
