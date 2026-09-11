'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Currency = 'MAD' | 'EUR' | 'USD'

export const CURRENCIES: Currency[] = ['MAD', 'EUR', 'USD']

// Taux de secours (valeurs 2026 approximatives) — utilisés en SSR et si la route
// /api/fx échoue. Remplacés par les taux live ECB quelques ms après montage.
export const FALLBACK_RATES = { madPerEur: 10.8, madPerUsd: 10.0 } as const

export type FxRates = { madPerEur: number; madPerUsd: number }

const STORAGE_KEY = 'mm.currency'
const DEFAULT: Currency = 'MAD'

type Ctx = {
  currency: Currency
  setCurrency: (c: Currency) => void
  rates: FxRates
}

const CurrencyContext = createContext<Ctx | null>(null)

function isCurrency(v: unknown): v is Currency {
  return v === 'MAD' || v === 'EUR' || v === 'USD'
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // SSR : toujours démarrer sur MAD pour éviter un mismatch d'hydratation.
  // La préférence utilisateur est lue depuis localStorage juste après montage.
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT)
  const [rates, setRates] = useState<FxRates>(FALLBACK_RATES)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isCurrency(stored)) setCurrencyState(stored)
    } catch {
      // localStorage inaccessible (mode privé Safari, etc.) — on reste sur DEFAULT.
    }

    // Fetch des taux live (ECB via /api/fx, cache 24h côté serveur).
    // Non-bloquant : si ça échoue on garde FALLBACK_RATES.
    const controller = new AbortController()
    fetch('/api/fx', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: FxRates | null) => {
        if (data && typeof data.madPerEur === 'number' && typeof data.madPerUsd === 'number') {
          setRates({ madPerEur: data.madPerEur, madPerUsd: data.madPerUsd })
        }
      })
      .catch(() => {
        // silencieux — on garde FALLBACK_RATES
      })

    return () => controller.abort()
  }, [])

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c)
    try {
      window.localStorage.setItem(STORAGE_KEY, c)
    } catch {
      // idem
    }
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency doit être utilisé dans <CurrencyProvider>')
  return ctx
}
