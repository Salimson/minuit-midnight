'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export type Slide = { src: string; alt: string }

/**
 * Cycler d'images crossfade — utilisé par RealFleetShowcase pour alterner
 * plusieurs photos de la flotte sans casser le RSC de la section parente.
 *
 * - Toutes les images sont montées en absolute inset-0, opacity 0/1 selon
 *   l'index actif → transition CSS opacity fluide.
 * - Respect prefers-reduced-motion : figé sur la 1re slide.
 * - La 1re image reçoit `priority` pour un LCP propre.
 */
export default function FleetImageCycler({
  slides,
  intervalMs = 5000,
  fadeMs = 1200,
  sizes = '(max-width: 1024px) 100vw, 42vw',
}: {
  slides: Slide[]
  intervalMs?: number
  fadeMs?: number
  sizes?: string
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(t)
  }, [slides.length, intervalMs])

  return (
    <>
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes={sizes}
          className={`object-cover ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transition: `opacity ${fadeMs}ms ease-in-out`,
          }}
        />
      ))}
    </>
  )
}
