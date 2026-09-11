// Conversion des prix MAD → EUR / USD avec une petite marge de sécurité (couvre
// les frais bancaires + fluctuations FX). Arrondi à 5 pour un affichage propre.

import type { Currency, FxRates } from './currency'
import { FALLBACK_RATES } from './currency'

const MARGIN = 0.05

// Arrondi supérieur au multiple de 5 (ex : 74.2 → 75, 76 → 80)
function roundUp5(n: number): number {
  return Math.ceil(n / 5) * 5
}

export type ForeignPrice = {
  eur: number
  usd: number
}

export function convertPrice(mad: number, rates: FxRates = FALLBACK_RATES): ForeignPrice {
  const eur = roundUp5((mad / rates.madPerEur) * (1 + MARGIN))
  const usd = roundUp5((mad / rates.madPerUsd) * (1 + MARGIN))
  return { eur, usd }
}

export function formatForeign(p: ForeignPrice): string {
  return `€${p.eur} · $${p.usd}`
}

// ————————————————————————————————
// API multi-devise (switcher header)
// ————————————————————————————————

export function convertToCurrency(
  mad: number,
  currency: Currency,
  rates: FxRates = FALLBACK_RATES
): number {
  if (currency === 'MAD') return mad
  const { eur, usd } = convertPrice(mad, rates)
  return currency === 'EUR' ? eur : usd
}

// Symbole affiché à côté du chiffre. MAD reste en toutes lettres (pas de symbole
// universellement reconnu — le dirham "DH" est ambigu à l'écrit selon locale).
export function currencySymbol(currency: Currency): string {
  if (currency === 'EUR') return '€'
  if (currency === 'USD') return '$'
  return 'MAD'
}
