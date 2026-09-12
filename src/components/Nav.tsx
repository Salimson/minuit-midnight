'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { detectLocale, dict, pathFor, locales, type Locale } from '@/lib/i18n'
import CurrencySwitcher from '@/components/CurrencySwitcher'

const HIDE_AFTER = 120   // px de scroll avant de commencer à masquer
const HOVER_ZONE = 90    // px depuis le haut où la souris fait réapparaître

export default function Nav() {
  const pathname = usePathname()
  const locale = detectLocale(pathname)
  const t = dict[locale].nav
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const nearTopRef = useRef(false)
  const openRef = useRef(false)

  useEffect(() => { openRef.current = open }, [open])

  useEffect(() => {
    // Fade + rappel souris uniquement quand il y a une vraie souris.
    // Sur tactile, la nav reste toujours visible.
    const hasMouse =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const compute = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (!hasMouse || openRef.current || y < HIDE_AFTER || nearTopRef.current) {
        setHidden(false)
      } else {
        setHidden(true)
      }
    }

    const onScroll = () => compute()
    const onMouseMove = (e: MouseEvent) => {
      const near = e.clientY < HOVER_ZONE
      if (near !== nearTopRef.current) {
        nearTopRef.current = near
        compute()
      }
    }
    const onMouseLeave = () => {
      if (nearTopRef.current) {
        nearTopRef.current = false
        compute()
      }
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (hasMouse) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      document.addEventListener('mouseleave', onMouseLeave)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const links = [
    { href: pathFor(locale, 'home'), label: t.home, num: '01' },
    { href: pathFor(locale, 'fleet'), label: t.fleet, num: '02' },
    { href: pathFor(locale, 'contact'), label: t.contact, num: '03' },
  ]

  // Détecte la page courante pour proposer le miroir dans les autres langues
  const currentPage: 'home' | 'fleet' | 'contact' =
    pathname === pathFor(locale, 'fleet')
      ? 'fleet'
      : pathname === pathFor(locale, 'contact')
      ? 'contact'
      : 'home'

  const localeLabel: Record<Locale, string> = { fr: 'FR', en: 'EN', ar: 'ع' }

  return (
    <header
      // backdrop-blur-sm sur mobile (moins cher), md sur desktop
      // will-change transform force GPU compositing → 0 jank au show/hide
      style={{ willChange: 'transform, opacity' }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm md:backdrop-blur-md border-b transition-[opacity,transform,background-color,border-color] duration-500 ease-out ${
        scrolled ? 'bg-ink/85 border-white/5' : 'bg-ink/60 border-cream/10'
      } ${
        hidden
          ? 'opacity-0 -translate-y-3 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href={pathFor(locale, 'home')} className="flex items-center gap-3 group" aria-label="Minuit Midnight">
          <Image
            src="/logo.png"
            alt="Minuit Midnight"
            width={44}
            height={44}
            priority
            className="transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg tracking-tightest">Minuit Midnight</span>
            <span className="tag text-dust">Marrakech · Est. 2003</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navigation">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group flex items-baseline gap-2 tag transition-colors ${
                  active ? 'text-cream' : 'text-dust hover:text-cream'
                }`}
              >
                <span className={active ? 'text-blood' : 'text-dust group-hover:text-blood transition-colors'}>
                  {l.num}
                </span>
                <span className="nav-link" aria-current={active ? 'page' : undefined}>{l.label}</span>
              </Link>
            )
          })}

          <div className="flex items-center gap-3 border-l border-white/15 ps-6">
            <CurrencySwitcher variant="desktop" />
            <span className="w-px h-4 bg-white/15" aria-hidden />
            <div className="flex items-center gap-1">
              {locales.map((l) => {
                const active = l === locale
                return (
                  <Link
                    key={l}
                    href={pathFor(l, currentPage)}
                    hrefLang={l}
                    aria-current={active ? 'true' : undefined}
                    aria-label={`Switch to ${l.toUpperCase()}`}
                    className={`tag px-2.5 py-1.5 rounded text-center min-w-[2.25rem] transition-colors ${
                      active
                        ? 'text-cream bg-white/10'
                        : 'text-dust hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {localeLabel[l]}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={t.menu}
          aria-expanded={open}
        >
          <span className={`block w-6 h-px bg-cream transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-px bg-cream transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-cream transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out bg-ink border-b border-white/5 ${
          open ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 pb-8" aria-label={t.menu}>
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-baseline gap-4 py-4 border-b border-white/5"
              >
                <span className={`tag ${active ? 'text-blood' : 'text-dust'}`}>{l.num}</span>
                <span className="font-display text-3xl tracking-tightest">{l.label}</span>
              </Link>
            )
          })}
          <div className="flex flex-wrap items-center gap-3 py-4 mt-2">
            <span className="tag text-dust">— —</span>
            <CurrencySwitcher variant="mobile" />
            <span className="w-px h-5 bg-white/15" aria-hidden />
            <div className="flex items-center gap-1">
              {locales.map((l) => {
                const active = l === locale
                return (
                  <Link
                    key={l}
                    href={pathFor(l, currentPage)}
                    hrefLang={l}
                    className={`tag px-3 py-1.5 rounded text-center min-w-[2.75rem] transition-colors ${
                      active
                        ? 'text-cream bg-white/10'
                        : 'text-dust hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {localeLabel[l]}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
