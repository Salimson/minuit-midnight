import Link from 'next/link'
import { motos } from '@/lib/motos'
import ScooterCard from '@/components/ScooterCard'
import { whatsappLink } from '@/lib/config'
import Reveal from '@/components/Reveal'
import SplitReveal from '@/components/SplitReveal'
import Counter from '@/components/Counter'
import dynamic from 'next/dynamic'
import { dict, pathFor, type Locale } from '@/lib/i18n'

// Below-fold — hydratation différée
const PricingConfigurator = dynamic(
  () => import('@/components/PricingConfigurator'),
  { loading: () => <div style={{ minHeight: 600 }} aria-hidden /> }
)

export default function FleetView({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const inFleet = motos.filter((m) => m.availability === 'in-fleet').length
  const total = motos.length
  const contactHref = pathFor(locale, 'contact')
  const waMsg =
    locale === 'fr'
      ? 'Bonjour, je souhaite réserver un scooter, pouvez-vous me confirmer les disponibilités ?'
      : locale === 'en'
      ? 'Hello, I would like to book a scooter — could you confirm availability?'
      : 'السلام عليكم، أودّ حجز سكوتر — هل يمكنكم تأكيد التوفّر؟'

  const h1Text =
    locale === 'fr'
      ? 'La flotte — scooters et motos neufs à louer à Marrakech'
      : locale === 'en'
      ? 'The Fleet — new scooters and motorcycles for rent in Marrakech'
      : 'الأسطول — سكوترات ودراجات نارية جديدة للإيجار بمراكش'

  return (
    <>
      <h1 className="sr-only">{h1Text}</h1>
      {/* Hero */}
      <section className="section-warm relative pt-40 pb-16 md:pt-56 md:pb-24 border-b border-black/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal delay={0.1} className="flex items-center gap-3 mb-8">
            <span className="editorial-num">{t.fleet.heroNum}</span>
            <span className="tag text-blood">{t.fleet.heroTag}</span>
          </Reveal>
          <SplitReveal
            as="h2"
            delay={0.2}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[9rem] leading-[0.88] tracking-tightest"
            lines={[
              <>{t.fleet.heroA}</>,
              <><em className="italic text-blood font-normal">{t.fleet.heroEm}</em></>,
            ]}
          />
          <Reveal delay={0.7}>
            <p className="mt-10 max-w-2xl text-lg text-dust leading-relaxed">{t.fleet.heroLede}</p>
          </Reveal>

          <Reveal delay={0.9} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
            <StatCounter to={total} label={t.fleet.stat1} />
            <StatCounter to={inFleet} label={t.fleet.stat2} />
            <Stat num={t.fleet.stat3Value} label={t.fleet.stat3} />
            <Stat num={t.fleet.stat4Value} label={t.fleet.stat4} />
          </Reveal>
        </div>
      </section>

      {/* Cards */}
      <section className="section-warm">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          {motos.map((s, i) => (
            <ScooterCard key={s.id} s={s} index={i} locale={locale} />
          ))}
        </div>
      </section>

      {/* Included */}
      <section className="section-warm py-24 md:py-32 relative overflow-hidden border-t border-black/10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, var(--terracotta) 0%, transparent 70%)' }} />
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-3 mb-6">
              <span className="editorial-num">{t.fleet.incNum}</span>
              <span className="tag text-blood">{t.fleet.incTag}</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
              lines={[
                <>{t.fleet.incTitleA}</>,
                <><em className="italic">{t.fleet.incTitleEm}</em></>,
              ]}
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {t.fleet.inclus.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-blood text-xs pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="font-mono text-cream text-sm">{item.title}</div>
                      <div className="text-dust text-sm mt-1 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURATEUR — sur la page flotte le levier est ici, avant la CTA */}
      <PricingConfigurator locale={locale} />

      {/* CTA */}
      <section className="section-night border-t border-white/5 py-32 md:py-40 relative overflow-hidden starlight">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--terracotta) 0%, transparent 60%)' }} />
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 text-center">
          <SplitReveal
            as="h2"
            className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tightest max-w-3xl mx-auto"
            lines={[
              <>{t.fleet.ctaTitleA}</>,
              <><em className="italic text-blood">{t.fleet.ctaTitleEm}</em></>,
            ]}
          />
          <Reveal delay={0.35} className="mt-12 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer" data-haptic className="btn-blood btn-fx">
              <span>{t.fleet.ctaWa}</span>
              <span aria-hidden="true">→</span>
            </a>
            <Link href={contactHref} className="btn-ghost btn-fx">
              <span>{t.fleet.ctaForm}</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl md:text-5xl tracking-tightest">{num}</div>
      <div className="tag text-dust mt-2">{label}</div>
    </div>
  )
}

function StatCounter({ to, label }: { to: number; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl md:text-5xl tracking-tightest">
        <Counter to={to} duration={1.6} />
      </div>
      <div className="tag text-dust mt-2">{label}</div>
    </div>
  )
}
