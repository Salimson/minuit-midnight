'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'section' | 'li' | 'ul'
  once?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  className,
  as = 'div',
  once = true,
}: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.001 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
