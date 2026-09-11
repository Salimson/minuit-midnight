'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { detectLocale, isRtl } from '@/lib/i18n'

export default function HtmlDir() {
  const pathname = usePathname()
  useEffect(() => {
    const locale = detectLocale(pathname)
    const root = document.documentElement
    root.setAttribute('lang', locale)
    root.setAttribute('dir', isRtl(locale) ? 'rtl' : 'ltr')
  }, [pathname])
  return null
}
