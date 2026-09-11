import { NextResponse } from 'next/server'
import { CONTACT } from '@/lib/config'
import { AGGREGATE, REVIEWS } from '@/lib/reviews'

/**
 * Avis clients — bascule automatique entre source statique et Google Places.
 *
 * Par défaut : sert les avis statiques de src/lib/reviews.ts (édités à la main).
 * Si `GOOGLE_PLACES_API_KEY` est défini en env, la route interroge Places API
 * (New) et retourne les vrais avis de la fiche Google — le fichier statique
 * devient obsolète et peut être vidé.
 *
 * Le Place ID est dans src/lib/config.ts (CONTACT.googlePlaceId) — override
 * via `GOOGLE_PLACE_ID` en env si besoin.
 *
 * Réponse cache 1h — les avis évoluent lentement.
 */

type Locale = 'fr' | 'en' | 'ar'

type Review = {
  author: string
  rating: number
  text: string
  date: string
  language: Locale
}

function isLocale(v: unknown): v is Locale {
  return v === 'fr' || v === 'en' || v === 'ar'
}

type GoogleReview = {
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: { displayName?: string }
}

export const revalidate = 3600

export async function GET(req: Request) {
  const url = new URL(req.url)
  const lang = url.searchParams.get('lang')
  const locale: Locale = isLocale(lang) ? lang : 'fr'

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID ?? CONTACT.googlePlaceId

  if (apiKey && placeId) {
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?languageCode=${locale}`,
        {
          headers: {
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
          },
          next: { revalidate: 3600 },
        }
      )
      if (res.ok) {
        const data = (await res.json()) as {
          rating?: number
          userRatingCount?: number
          reviews?: GoogleReview[]
        }
        const reviews: Review[] = (data.reviews ?? []).slice(0, 6).map((r) => ({
          author: r.authorAttribution?.displayName ?? '—',
          rating: r.rating ?? 5,
          text: r.text?.text ?? r.originalText?.text ?? '',
          date: r.relativePublishTimeDescription ?? '',
          language: locale,
        }))
        return NextResponse.json(
          {
            reviews,
            aggregate: {
              average: data.rating ?? 5,
              total: data.userRatingCount ?? reviews.length,
            },
            source: 'google' as const,
          },
          {
            headers: {
              'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600',
            },
          }
        )
      }
    } catch {
      // fallthrough to mocks
    }
  }

  const reviews: Review[] = REVIEWS[locale].map((r) => ({ ...r, language: locale }))
  return NextResponse.json(
    {
      reviews,
      aggregate: AGGREGATE,
      source: 'static' as const,
    },
    {
      headers: {
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    }
  )
}
