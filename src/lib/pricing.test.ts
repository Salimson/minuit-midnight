import { describe, expect, it } from 'vitest'
import {
  convertPrice,
  convertToCurrency,
  currencySymbol,
  formatForeign,
} from './pricing'
import { FALLBACK_RATES } from './currency'

describe('convertPrice', () => {
  it('convertit 250 MAD → prix EUR/USD arrondis au multiple de 5 supérieur', () => {
    // 250 MAD ÷ 10.8 × 1.05 = 24.3 → 25 EUR
    // 250 MAD ÷ 10.0 × 1.05 = 26.25 → 30 USD
    const p = convertPrice(250)
    expect(p.eur).toBe(25)
    expect(p.usd).toBe(30)
  })

  it('utilise les taux passés si fournis (pas les FALLBACK)', () => {
    const p = convertPrice(1000, { madPerEur: 20, madPerUsd: 20 })
    // 1000 ÷ 20 × 1.05 = 52.5 → 55
    expect(p.eur).toBe(55)
    expect(p.usd).toBe(55)
  })

  it('gère un prix élevé (2000 MAD)', () => {
    const p = convertPrice(2000)
    // 2000 ÷ 10.8 × 1.05 ≈ 194.4 → 195
    // 2000 ÷ 10.0 × 1.05 = 210 → 210
    expect(p.eur).toBeGreaterThanOrEqual(190)
    expect(p.eur).toBeLessThanOrEqual(200)
    expect(p.usd).toBeGreaterThanOrEqual(205)
    expect(p.usd).toBeLessThanOrEqual(215)
  })

  it('inclut la marge FX de 5 % (jamais sous le taux nominal)', () => {
    const p = convertPrice(1080) // exactement 100 EUR sans marge
    // Avec marge : 100 × 1.05 = 105 → 105
    expect(p.eur).toBeGreaterThanOrEqual(105)
  })
})

describe('convertToCurrency', () => {
  it('retourne le montant MAD tel quel pour la devise MAD', () => {
    expect(convertToCurrency(250, 'MAD')).toBe(250)
    expect(convertToCurrency(2000, 'MAD')).toBe(2000)
  })

  it('convertit vers EUR selon les taux', () => {
    expect(convertToCurrency(250, 'EUR')).toBe(25)
  })

  it('convertit vers USD selon les taux', () => {
    expect(convertToCurrency(250, 'USD')).toBe(30)
  })

  it('accepte des taux custom (pour test live rates)', () => {
    const rates = { madPerEur: 11.0, madPerUsd: 10.5 }
    // 250 / 11 * 1.05 = 23.86 → 25
    expect(convertToCurrency(250, 'EUR', rates)).toBe(25)
    // 250 / 10.5 * 1.05 = 25 → 25
    expect(convertToCurrency(250, 'USD', rates)).toBe(25)
  })
})

describe('currencySymbol', () => {
  it('retourne les symboles attendus', () => {
    expect(currencySymbol('MAD')).toBe('MAD')
    expect(currencySymbol('EUR')).toBe('€')
    expect(currencySymbol('USD')).toBe('$')
  })
})

describe('formatForeign', () => {
  it('formate au motif "€X · $Y"', () => {
    expect(formatForeign({ eur: 25, usd: 30 })).toBe('€25 · $30')
  })
})

describe('FALLBACK_RATES', () => {
  it('reste dans une fourchette réaliste 2026 pour éviter surprise ×10', () => {
    // Filet de sécurité : si un dev change les fallbacks, un ordre de grandeur
    // aberrant (ex: 1.08 au lieu de 10.8) déclenche ce test.
    expect(FALLBACK_RATES.madPerEur).toBeGreaterThan(9)
    expect(FALLBACK_RATES.madPerEur).toBeLessThan(13)
    expect(FALLBACK_RATES.madPerUsd).toBeGreaterThan(8)
    expect(FALLBACK_RATES.madPerUsd).toBeLessThan(12)
  })
})
