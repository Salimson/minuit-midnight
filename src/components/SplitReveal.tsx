'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Fragment, type ReactNode } from 'react'

type Line = ReactNode

type Props = {
  lines: Line[]
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export default function SplitReveal({
  lines,
  delay = 0,
  className,
  as = 'h1',
}: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.h1

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : delay,
        staggerChildren: reduce ? 0 : 0.12,
      },
    },
  }

  const child: Variants = {
    hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 1 : 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: reduce ? 0.001 : 1.05,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  }

  return (
    <MotionTag className={className} initial="hidden" animate="show" variants={container}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span className="inline-block" variants={child}>
              {line}
            </motion.span>
          </span>
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </MotionTag>
  )
}
