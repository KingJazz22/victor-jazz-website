'use client'

import { useRef, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-80px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transform = visible
    ? 'translate(0,0)'
    : direction === 'up'
    ? 'translateY(32px)'
    : direction === 'down'
    ? 'translateY(-32px)'
    : direction === 'left'
    ? 'translateX(32px)'
    : direction === 'right'
    ? 'translateX(-32px)'
    : 'none'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform,
        transition: `opacity 0.7s ${delay}s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s ${delay}s cubic-bezier(0.25,0.1,0.25,1)`,
      }}
    >
      {children}
    </div>
  )
}
