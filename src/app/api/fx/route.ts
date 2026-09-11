import { NextResponse } from 'next/server'

/**
 * Taux de change MAD → EUR / USD via Frankfurter (données ECB, gratuit, sans clé).
 * Réponse cachée 24h par Next Data Cache — un seul appel externe par jour et par région.
 *
 * Fallback statique si l'API est down : les taux 2026 approximatifs qui étaient
 * hardcodés dans pricing.ts avant cette route. Le champ `fallback: true`
 * permet au client de savoir qu'il tape sur les valeurs de secours.
 */

const FALLBACK = {
  madPerEur: 10.8,
  madPerUsd: 10.0,
  date: null as string | null,
  fallback: true,
}

// Cache 24h par Vercel/Next Data Cache
export const revalidate = 86400

export async function GET() {
  try {
    const res = await fetch(
      'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=MAD,USD',
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) throw new Error(`FX upstream ${res.status}`)
    const data = (await res.json()) as {
      rates: { MAD: number; USD: number }
      date: string
    }
    const madPerEur = data.rates.MAD
    const madPerUsd = data.rates.MAD / data.rates.USD
    return NextResponse.json(
      {
        madPerEur,
        madPerUsd,
        date: data.date,
        fallback: false,
      },
      {
        // CDN cache 24h + stale-while-revalidate 1h (SEO client-friendly)
        headers: {
          'cache-control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        },
      }
    )
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: {
        'cache-control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    })
  }
}
