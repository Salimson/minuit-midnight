'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import type { Moto } from '@/lib/motos'
import { whatsappLink } from '@/lib/config'
import MotoVisual from '@/components/MotoVisual'
import { dict, pathFor, type Locale } from '@/lib/i18n'
import PriceTag from '@/components/PriceTag'

export default function ScooterCard({
  s,
  index,
  locale = 'fr',
}: {
  s: Moto
  index: number
  locale?: Locale
}) {
  const isEven = index % 2 === 0
  const t = dict[locale].common
  const onRequest = s.availability === 'on-request'
  const reduce = useReducedMotion()
  const message =
    locale === 'fr'
      ? `Bonjour, je souhaite réserver le ${s.name} (${s.subtitle}) à ${s.pricePerDay} MAD/jour. Pouvez-vous confirmer vos disponibilités ?`
      : locale === 'en'
      ? `Hello, I would like to book the ${s.name} (${s.subtitle}) at ${s.pricePerDay} MAD/day. Could you confirm availability?`
      : `السلام عليكم، أودّ حجز ${s.name} (${s.subtitle}) بسعر ${s.pricePerDay} درهم/يوم. هل يمكنكم تأكيد التوفّر؟`

  return (
    <motion.article
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-16 lg:py-24 border-t border-white/5"
      initial={{ opacity: 0, y: reduce ? 0 : 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`lg:col-span-7 relative ${isEven ? '' : 'lg:order-2'}`}>
        <div className="relative aspect-[4/3] lg:aspect-[16/11]">
          <MotoVisual moto={s} priority={index < 2} driftDirection={isEven ? 'left' : 'right'} />
          {s.image && (
            <motion.div
              className="absolute top-6 left-6 flex items-center gap-3 z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="editorial-num text-ink">{s.num}</span>
              <span className="h-px w-8 bg-terracotta" />
              <span className="tag text-ink">{s.brand}</span>
            </motion.div>
          )}
          {onRequest && (
            <div className="absolute top-6 right-6 z-10 border border-ink/25 bg-coral/60 backdrop-blur-sm px-3 py-1.5">
              <span className="tag text-terracotta">{t.onRequest}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? '' : 'lg:order-1'}`}>
        <div>
          <div className="tag text-blood mb-4">{s.subtitle}</div>
          <h3 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest">
            {s.name}
          </h3>
          <p className="mt-6 text-dust leading-relaxed max-w-md">{s.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md">
            <div>
              <dt className="tag text-dust">{t.cc}</dt>
              <dd className="font-mono text-cream mt-1">{s.cc} cc</dd>
            </div>
            <div>
              <dt className="tag text-dust">{t.seats}</dt>
              <dd className="font-mono text-cream mt-1">{s.seats}</dd>
            </div>
            <div>
              <dt className="tag text-dust">{t.license}</dt>
              <dd className="font-mono text-cream mt-1 text-sm">{s.license}</dd>
            </div>
            <div>
              <dt className="tag text-dust">{t.year}</dt>
              <dd className="font-mono text-cream mt-1">{s.year} · {locale === 'fr' ? 'Neuf' : locale === 'en' ? 'New' : 'جديد'}</dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {s.features.map((f, i) => (
              <motion.li
                key={f}
                className="tag border border-white/10 px-3 py-1.5 text-dust"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              >
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <div className="tag text-dust mb-1">{t.startingAt}</div>
            <PriceTag mad={s.pricePerDay} locale={locale} variant="full" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              data-haptic
              className="btn-blood btn-fx"
            >
              <span>{onRequest ? t.request : t.reserve}</span>
              <span aria-hidden="true">→</span>
            </a>
            <Link href={pathFor(locale, 'contact')} className="btn-ghost btn-fx">
              <span>{t.quote}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
