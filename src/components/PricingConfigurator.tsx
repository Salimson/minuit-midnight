'use client'

import { useState } from 'react'
import { motos } from '@/lib/motos'
import { useCurrency } from '@/lib/currency'
import { convertToCurrency, currencySymbol } from '@/lib/pricing'
import { whatsappLink } from '@/lib/config'
import { dict, type Locale } from '@/lib/i18n'

type ZoneId = 'agency' | 'gueliz' | 'hivernage' | 'medina' | 'palmeraie' | 'other'

const ZONE_ORDER: ZoneId[] = ['agency', 'gueliz', 'hivernage', 'medina', 'palmeraie', 'other']

// Frais de livraison en MAD. La Palmeraie est plus loin — surcoût réaliste.
// 'other' laisse à 0 dans le calcul, mais le WA prefill le signale à l'agence.
const ZONE_FEES: Record<ZoneId, number> = {
  agency: 0,
  gueliz: 0,
  hivernage: 0,
  medina: 0,
  palmeraie: 50,
  other: 0,
}

export default function PricingConfigurator({ locale }: { locale: Locale }) {
  const t = dict[locale].configurator
  const [motoId, setMotoId] = useState<string>(motos[0].id)
  const [days, setDays] = useState<number>(1)
  const [zoneId, setZoneId] = useState<ZoneId>('agency')

  const moto = motos.find((m) => m.id === motoId) ?? motos[0]
  const deliveryFee = ZONE_FEES[zoneId]
  const totalMad = moto.pricePerDay * days + deliveryFee

  const { currency, rates } = useCurrency()
  const total = convertToCurrency(totalMad, currency, rates)
  const symbol = currencySymbol(currency)

  const daysText = days === 1 ? t.dayUnit : t.daysUnit
  const zoneText = t.zones[zoneId]

  const waMsg = t.waPrefill
    .replace('{model}', moto.name)
    .replace('{days}', `${days} ${daysText}`)
    .replace('{zone}', zoneText)
    .replace('{price}', `${total} ${symbol}`)

  return (
    <section className="section-warm relative py-24 md:py-32 border-t border-black/5">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* En-tête */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="editorial-num">{t.num}</span>
            <span className="h-px w-8 bg-blood" />
            <span className="tag text-blood">{t.tag}</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tightest max-w-3xl">
            {t.titleA}{' '}
            <em className="italic text-blood font-normal">{t.titleEm}</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">{t.lede}</p>
        </div>

        {/* Panneau configurateur */}
        <div className="border border-ink/10 bg-cream/40 backdrop-blur-sm p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Modèle */}
            <label className="block">
              <span className="tag text-ink/60 block mb-3">{t.fieldModel}</span>
              <select
                value={motoId}
                onChange={(e) => setMotoId(e.target.value)}
                className="w-full bg-transparent border-b border-ink/25 focus:border-terracotta py-3 font-mono text-lg text-ink outline-none transition-colors"
              >
                {motos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.pricePerDay} MAD/{t.dayUnit}
                  </option>
                ))}
              </select>
            </label>

            {/* Durée */}
            <label className="block">
              <span className="tag text-ink/60 block mb-3">{t.fieldDays}</span>
              <div className="flex items-center gap-3 border-b border-ink/25 focus-within:border-terracotta py-3 transition-colors">
                <button
                  type="button"
                  onClick={() => setDays((d) => Math.max(1, d - 1))}
                  aria-label="-"
                  className="w-8 h-8 flex items-center justify-center border border-ink/25 hover:border-terracotta hover:text-terracotta transition-colors font-mono"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={days}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setDays(Number.isFinite(v) ? Math.max(1, Math.min(90, Math.floor(v))) : 1)
                  }}
                  className="flex-1 min-w-0 bg-transparent font-mono text-lg text-ink text-center outline-none"
                />
                <button
                  type="button"
                  onClick={() => setDays((d) => Math.min(90, d + 1))}
                  aria-label="+"
                  className="w-8 h-8 flex items-center justify-center border border-ink/25 hover:border-terracotta hover:text-terracotta transition-colors font-mono"
                >
                  +
                </button>
              </div>
              <span className="tag text-ink/50 mt-2 block">{daysText}</span>
            </label>

            {/* Zone de livraison */}
            <label className="block">
              <span className="tag text-ink/60 block mb-3">{t.fieldZone}</span>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value as ZoneId)}
                className="w-full bg-transparent border-b border-ink/25 focus:border-terracotta py-3 font-mono text-lg text-ink outline-none transition-colors"
              >
                {ZONE_ORDER.map((z) => (
                  <option key={z} value={z}>
                    {t.zones[z]}
                    {ZONE_FEES[z] > 0 ? ` (+${ZONE_FEES[z]} MAD)` : ''}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Total + CTA */}
          <div className="mt-10 md:mt-14 pt-8 border-t border-ink/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="tag text-ink/60 mb-3">{t.totalLabel}</div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-7xl md:text-8xl leading-none tracking-tightest text-terracotta">
                  {total}
                </span>
                <span className="font-mono text-xl text-ink/70">{symbol}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="text-ink/60">
                  {moto.pricePerDay} MAD × {days} {daysText}
                </span>
                {deliveryFee > 0 ? (
                  <span className="tag text-terracotta">
                    {t.paidDelivery.replace('{fee}', String(deliveryFee))}
                  </span>
                ) : zoneId !== 'agency' ? (
                  <span className="tag text-terracotta">{t.freeDelivery}</span>
                ) : null}
              </div>
            </div>

            <a
              href={whatsappLink(waMsg)}
              target="_blank"
              rel="noreferrer"
              data-haptic
              className="btn-blood btn-fx self-start md:self-end"
            >
              <span>{t.waCta}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
