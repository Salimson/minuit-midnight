'use client'

import { useEffect, useState } from 'react'
import { CONTACT } from '@/lib/config'
import { dict, type Locale } from '@/lib/i18n'

type Review = {
  author: string
  rating: number
  text: string
  date: string
  language: string
}

type ApiResponse = {
  reviews: Review[]
  aggregate: { average: number; total: number }
  source: 'mock' | 'google'
}

export default function GoogleReviews({ locale }: { locale: Locale }) {
  const t = dict[locale].reviews
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/reviews?lang=${locale}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: ApiResponse | null) => {
        if (d && Array.isArray(d.reviews)) setData(d)
      })
      .catch(() => {
        // silencieux — la section disparaît si l'API échoue
      })
    return () => controller.abort()
  }, [locale])

  if (!data || data.reviews.length === 0) return null

  const items = data.reviews.slice(0, 3)

  return (
    <section className="section-warm relative py-24 md:py-32 border-t border-black/5">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="editorial-num">{t.num}</span>
              <span className="h-px w-8 bg-blood" />
              <span className="tag text-blood">{t.tag}</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tightest max-w-2xl">
              {t.titleA}{' '}
              <em className="italic text-blood font-normal">{t.titleEm}</em>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Stars rating={data.aggregate.average} />
            <div>
              <div className="font-mono text-xl text-ink">
                {data.aggregate.average.toFixed(1)}{' '}
                <span className="text-ink/50 text-base">/ 5</span>
              </div>
              <div className="tag text-ink/60 mt-1">
                {t.basedOn.replace('{n}', String(data.aggregate.total))}
              </div>
            </div>
          </div>
        </div>

        {/* Cartes avis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((r, i) => (
            <blockquote
              key={`${r.author}-${i}`}
              className="border border-ink/10 bg-cream/40 p-8 md:p-10 flex flex-col"
            >
              <Stars rating={r.rating} size="sm" />
              <p className="mt-6 text-lg leading-relaxed italic flex-1">
                « {r.text} »
              </p>
              <footer className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-ink">{r.author}</span>
                <span className="tag text-ink/50">{r.date}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Lien vers la fiche Google */}
        <div className="mt-12 md:mt-16 text-center">
          <a
            href={CONTACT.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="tag text-ink link-under"
          >
            {t.seeAll}
          </a>
        </div>
      </div>
    </section>
  )
}

function Stars({
  rating,
  size = 'md',
}: {
  rating: number
  size?: 'sm' | 'md'
}) {
  const rounded = Math.round(rating)
  const cls = size === 'sm' ? 'text-base' : 'text-2xl'
  return (
    <div
      className={`${cls} text-terracotta tracking-widest`}
      aria-label={`${rating} / 5`}
    >
      {'★'.repeat(rounded)}
      <span className="text-ink/20">{'★'.repeat(5 - rounded)}</span>
    </div>
  )
}
