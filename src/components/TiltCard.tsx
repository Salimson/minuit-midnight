'use client'

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function TiltCard({ children, className, intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const reduce = useReducedMotion()

  const springCfg = { stiffness: 220, damping: 22, mass: 0.5 }
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), springCfg)
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), springCfg)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
