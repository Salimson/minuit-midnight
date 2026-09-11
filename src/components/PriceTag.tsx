'use client'

import { useCurrency } from '@/lib/currency'
import { convertToCurrency, currencySymbol } from '@/lib/pricing'
import type { Locale } from '@/lib/i18n'
import { dict } from '@/lib/i18n'

type Variant = 'full' | 'compact'

/**
 * Prix converti dans la devise sélectionnée par l'utilisateur.
 * Composant client isolé — permet aux vues (HomeView, FleetView) de rester
 * en Server Components et de conserver leurs bénéfices RSC (SEO, TTFB).
 *
 * - full    : gros chiffre + suffix "MAD / jour" (utilisé sur ScooterCard)
 * - compact : petit chiffre + suffix "€/j" (utilisé sur les cartes preview home)
 */
export default function PriceTag({
  mad,
  locale,
  variant = 'full',
}: {
  mad: number
  locale: Locale
  variant?: Variant
}) {
  const { currency, rates } = useCurrency()
  const value = convertToCurrency(mad, currency, rates)
  const symbol = currencySymbol(currency)

  if (variant === 'compact') {
    const perDayCompact = locale === 'fr' ? '/j' : locale === 'en' ? '/d' : '/ي'
    return (
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xl text-cream">{value}</span>
        <span className="font-mono text-xs text-dust">
          {symbol}
          {perDayCompact}
        </span>
      </div>
    )
  }

  const perDay = dict[locale].common.perDay
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-5xl tracking-tightest">{value}</span>
      <span className="font-mono text-sm text-dust">
        {symbol} {perDay}
      </span>
    </div>
  )
}
