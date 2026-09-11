'use client'

import { motion, useScroll, useTransform } from 'motion/react'

/**
 * Voile midnight lié au scroll — "la nuit tombe" pendant que l'utilisateur
 * quitte le hero. Aucune dépendance ref : lit window.scrollY, position
 * absolute dans le hero (parent overflow-hidden le clip proprement).
 *
 * L'effet s'atténue naturellement dès qu'on quitte le hero (le voile
 * n'est visible qu'au-dessus du fold).
 */
export default function HeroNightVeil() {
  const { scrollY } = useScroll()
  // 0 → 700px de scroll = veil 0 → 0.85
  const opacity = useTransform(scrollY, [0, 700], [0, 0.85], { clamp: true })

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-[6]"
      style={{
        opacity,
        background:
          'linear-gradient(to top, var(--midnight) 0%, rgba(12, 27, 51, 0.55) 45%, transparent 100%)',
      }}
    />
  )
}
