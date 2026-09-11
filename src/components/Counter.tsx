'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  from?: number
  to: number
  duration?: number
  suffix?: string
  className?: string
}

export default function Counter({
  from = 0,
  to,
  duration = 2.4,
  suffix = '',
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(from)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, from, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
