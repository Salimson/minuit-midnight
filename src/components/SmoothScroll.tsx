'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Courbe Apple "expoOut" — décélération naturelle, signature iOS.
const easeApple = (t: number) => 1 - Math.pow(1 - t, 4)

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const coarse = window.matchMedia('(pointer: coarse)').matches

    const lenis = new Lenis({
      // Sur tactile : durée un peu plus courte + easing Apple pour ce feeling "glisse et pose"
      duration: coarse ? 1.05 : 1.15,
      easing: easeApple,
      smoothWheel: true,
      // Plus de multiplicateur sur tactile = flick plus vif, style iOS
      touchMultiplier: coarse ? 1.8 : 1.4,
      // Sur tactile on veut de la déceleration douce, pas un "hard stop"
      wheelMultiplier: 1,
      lerp: coarse ? 0.09 : 0.1,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
