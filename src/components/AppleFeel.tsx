'use client'

/**
 * AppleFeel — apporte la texture iOS aux interactions tactiles sans toucher au design :
 * - scale-down "spring" à la pression (comme un bouton natif iOS)
 * - rebond retour amorti à la relâche
 * - haptic léger sur les CTAs marqués [data-haptic]
 * - annulation propre si l'utilisateur fait glisser hors de la cible (comme iOS)
 *
 * Actif uniquement sur pointeur tactile fin (mobile/tablet).
 * Respecte prefers-reduced-motion.
 */

import { useEffect } from 'react'
import { animate } from 'motion/react'

const TAP_SELECTOR = [
  'a[href]',
  'button',
  '[role="button"]',
  'input[type="submit"]',
  '[data-apple-tap]',
].join(',')

const IGNORE_SELECTOR = '[data-no-apple-tap]'

// Spring iOS : rigide pour "colle" à la pression, damping haut pour éviter l'over-oscillation.
const SPRING_DOWN = { type: 'spring' as const, stiffness: 700, damping: 34, mass: 0.9 }
const SPRING_UP = { type: 'spring' as const, stiffness: 380, damping: 22, mass: 0.9 }

export default function AppleFeel() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!coarse || reduce) return

    let active: HTMLElement | null = null
    let pressed = false

    const findTarget = (e: Event): HTMLElement | null => {
      const path = (e.composedPath?.() ?? []) as EventTarget[]
      for (const node of path) {
        if (!(node instanceof HTMLElement)) continue
        if (node.matches?.(IGNORE_SELECTOR)) return null
        if (node.matches?.(TAP_SELECTOR)) return node
      }
      return null
    }

    const release = () => {
      if (!active) return
      animate(active, { scale: 1 }, SPRING_UP)
      active = null
      pressed = false
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      const el = findTarget(e)
      if (!el) return
      // Si un autre élément est encore "actif", on le relâche proprement.
      if (active && active !== el) release()
      active = el
      pressed = true
      // will-change hint pour éviter jank sur premier press
      el.style.willChange = 'transform'
      animate(el, { scale: 0.965 }, SPRING_DOWN)
      if (el.hasAttribute('data-haptic') && typeof navigator.vibrate === 'function') {
        navigator.vibrate(8)
      }
    }

    const onPointerUp = () => {
      if (!pressed) return
      release()
    }

    // Si le doigt glisse hors de la cible, on annule le press (comportement iOS natif).
    const onPointerMove = (e: PointerEvent) => {
      if (!pressed || !active) return
      const rect = active.getBoundingClientRect()
      const slop = 24 // tolérance de glissement
      const inside =
        e.clientX >= rect.left - slop &&
        e.clientX <= rect.right + slop &&
        e.clientY >= rect.top - slop &&
        e.clientY <= rect.bottom + slop
      if (!inside) release()
    }

    const onPointerCancel = () => release()

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('pointerup', onPointerUp, { passive: true })
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointercancel', onPointerCancel, { passive: true })
    document.addEventListener('pointerleave', onPointerCancel, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointercancel', onPointerCancel)
      document.removeEventListener('pointerleave', onPointerCancel)
    }
  }, [])

  return null
}
