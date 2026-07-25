'use client'

import { SITE_CONFIG } from '@/lib/constants'
import { gtagConversion, CONVERSION_LABELS } from '@/lib/gtag'

type Props = {
  href?: string
  className?: string
  children: React.ReactNode
  'aria-label'?: string
}

export default function WhatsAppLink({
  href = SITE_CONFIG.whatsappUrl,
  className,
  children,
  'aria-label': ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => gtagConversion(CONVERSION_LABELS.whatsapp || undefined)}
    >
      {children}
    </a>
  )
}
