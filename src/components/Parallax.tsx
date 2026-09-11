'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  distance?: number
  axis?: 'x' | 'y'
  reverse?: boolean
}

export default function Parallax({
  children,
  className,
  distance = 60,
  axis = 'x',
  reverse = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const range = reverse ? [distance, -distance] : [-distance, distance]
  const value = useTransform(scrollYProgress, [0, 1], range)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { [axis]: value }}
    >
      {children}
    </motion.div>
  )
}
