'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  value: number
  suffix: string
  label: string
}

export default function StatCounter({ value, suffix, label }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = Date.now()
    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center px-4 py-6" aria-label={`${value}${suffix} — ${label}`}>
      <div className="font-serif font-light text-5xl md:text-6xl text-[#c9a96e] leading-none" aria-hidden="true">
        {count}
        <span className="text-3xl md:text-4xl">{suffix}</span>
      </div>
      <p className="mt-3 text-[#9e9e9e] text-xs uppercase tracking-[0.25em]" aria-hidden="true">{label}</p>
    </div>
  )
}
