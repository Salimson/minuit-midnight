'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import type { Moto } from '@/lib/motos'

/**
 * Affiche la photo si trouvée (avec multiply blend qui fait disparaître
 * le fond blanc/gris sur les sections coral), sinon un placeholder éditorial.
 *
 * Drift horizontal scroll-linked → uniquement desktop (pointer:fine).
 * Sur mobile, chaque moto avec son useScroll = coût GPU cumulatif énorme.
 */
export default function MotoVisual({
  moto,
  priority = false,
  driftDirection = 'left',
}: {
  moto: Moto
  priority?: boolean
  driftDirection?: 'left' | 'right'
}) {
  const [failed, setFailed] = useState(false)
  const [enableDrift, setEnableDrift] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    // Drift scroll uniquement sur desktop avec vrai pointeur (souris/trackpad).
    // Sur mobile/tactile, on skip → pas de useScroll observer, pas de transform continu.
    if (typeof window === 'undefined') return
    setEnableDrift(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const dir = driftDirection === 'left' ? 1 : -1
  const x = useTransform(scrollYProgress, [0, 1], [40 * dir, -40 * dir])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02])

  if (!moto.image || failed) {
    return <PhotoPending moto={moto} />
  }

  const applyDrift = enableDrift && !reduce

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0"
      style={applyDrift ? { x, scale } : undefined}
    >
      <Image
        src={moto.image}
        alt={`${moto.name} — ${moto.subtitle}`}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-contain p-4 md:p-8"
        priority={priority}
        onError={() => setFailed(true)}
      />
    </motion.div>
  )
}

function PhotoPending({ moto }: { moto: Moto }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 25% 25%, rgba(124,45,31,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(124,45,31,0.25) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span
          className="font-display leading-none tracking-tightest text-terracotta/10 whitespace-nowrap select-none"
          style={{ fontSize: 'clamp(10rem, 28vw, 26rem)' }}
        >
          {moto.brand.split('-')[0].toUpperCase()}
        </span>
      </div>

      <svg
        className="absolute bottom-8 right-8 w-40 md:w-56 h-auto text-terracotta/40"
        viewBox="0 0 120 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="24" cy="46" r="12" />
        <circle cx="96" cy="46" r="12" />
        <path d="M24 46 L46 22 L76 22 L96 46" />
        <path d="M50 22 L58 10 L70 10" />
        <path d="M60 22 L80 22" strokeWidth="4" opacity="0.5" />
      </svg>

      <div className="relative h-full w-full p-8 md:p-12 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <span className="editorial-num text-ink">{moto.num}</span>
          <span className="h-px w-8 bg-terracotta" />
          <span className="tag text-ink">{moto.brand}</span>
        </div>

        <div>
          <div className="tag text-terracotta mb-3">— Photo à venir</div>
          <div className="font-mono text-xs text-ink/70 max-w-[30ch] leading-relaxed">
            Machine neuve 2026 disponible via sourçage sous 48h auprès de notre réseau local.
          </div>
        </div>
      </div>
    </div>
  )
}
