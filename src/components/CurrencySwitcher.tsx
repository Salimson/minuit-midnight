'use client'

import { CURRENCIES, useCurrency, type Currency } from '@/lib/currency'

type Variant = 'desktop' | 'mobile'

export default function CurrencySwitcher({
  variant = 'desktop',
  ariaLabel,
}: {
  variant?: Variant
  ariaLabel?: string
}) {
  const { currency, setCurrency } = useCurrency()

  const size =
    variant === 'mobile'
      ? 'px-3 py-1.5 min-w-[2.75rem]'
      : 'px-2.5 py-1.5 min-w-[2.5rem]'

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={ariaLabel ?? 'Devise'}
    >
      {CURRENCIES.map((c) => {
        const active = c === currency
        return (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            aria-pressed={active}
            aria-label={`Afficher les prix en ${c}`}
            className={`tag rounded text-center transition-colors ${size} ${
              active
                ? 'text-coral bg-coral/10 ring-1 ring-inset ring-coral/30'
                : 'text-dust hover:text-cream hover:bg-white/5'
            }`}
          >
            {label(c)}
          </button>
        )
      })}
    </div>
  )
}

function label(c: Currency): string {
  return c === 'MAD' ? 'MAD' : c === 'EUR' ? '€' : '$'
}
