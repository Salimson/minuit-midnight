import Link from 'next/link'
import Image from 'next/image'
import { featuredHome } from '@/lib/motos'
import { CONTACT, whatsappLink } from '@/lib/config'
import Reveal from '@/components/Reveal'
import SplitReveal from '@/components/SplitReveal'
import Counter from '@/components/Counter'
import TiltCard from '@/components/TiltCard'
import dynamic from 'next/dynamic'
import PriceTag from '@/components/PriceTag'
import HeroNightVeil from '@/components/HeroNightVeil'
import RealFleetShowcase from '@/components/RealFleetShowcase'
import { dict, pathFor, type Locale } from '@/lib/i18n'

// Below-fold — hydratation différée, TTI plus rapide sur mobile
const PricingConfigurator = dynamic(
  () => import('@/components/PricingConfigurator'),
  { loading: () => <div style={{ minHeight: 600 }} aria-hidden /> }
)
const GoogleReviews = dynamic(() => import('@/components/GoogleReviews'), {
  loading: () => <div style={{ minHeight: 500 }} aria-hidden />,
})

export default function HomeView({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const fleetHref = pathFor(locale, 'fleet')
  const contactHref = pathFor(locale, 'contact')
  const waMsg =
    locale === 'fr'
      ? 'Bonjour, je souhaite réserver un scooter.'
      : locale === 'en'
      ? 'Hello, I would like to book a scooter.'
      : 'السلام عليكم، أودّ حجز سكوتر.'
  const onlineLabel =
    locale === 'fr' ? 'En ligne · 24h/24' : locale === 'en' ? 'Online · 24/7' : 'متاح · 24/24'

  const h1Text =
    locale === 'fr'
      ? 'Location de motos et scooters à Marrakech — Minuit Midnight'
      : locale === 'en'
      ? 'Motorcycle & Scooter Rental in Marrakech — Minuit Midnight'
      : 'تأجير دراجات نارية وسكوترات بمراكش — Minuit Midnight'

  return (
    <>
      {/* h1 SEO-only — mots-clés d'intention locale.
          Le titre stylistique du hero reste visible en h2 pour ne pas casser le design. */}
      <h1 className="sr-only">{h1Text}</h1>
      {/* HERO — desktop : 48% coral / 52% photo · mobile : photo fullscreen + overlay */}
      <section className="hero relative w-full overflow-hidden">
        {/* Voile midnight scroll-linked — "la nuit tombe" quand on descend */}
        <HeroNightVeil />
        {/* Desktop layout (>= 900px) : deux colonnes côte à côte */}
        <div className="hero-desktop flex min-h-[100svh]">
          {/* GAUCHE — bloc coral (couleur de marque) */}
          <div className="hero-left relative flex flex-col justify-end px-6 md:px-10 lg:px-16 xl:px-20 pt-32 pb-16 md:pt-40 md:pb-24">
            <Reveal delay={0.2} y={16} className="hero-eyebrow flex flex-wrap items-center gap-3 mb-8">
              <span className="tag text-terracotta">
                — {onlineLabel}
              </span>
              <span className="tag text-ink/50">——</span>
              <span className="tag">{t.hero.tag}</span>
            </Reveal>

            <SplitReveal
              as="h2"
              delay={0.35}
              className="font-display text-[13vw] md:text-[9vw] lg:text-[7vw] xl:text-[7.5rem] leading-[0.88] tracking-tightest text-ink"
              lines={[
                <>{t.hero.lineA}</>,
                <>{t.hero.lineB1}<em className="italic text-terracotta font-normal">{t.hero.lineBEm}</em></>,
                <>{t.hero.lineC}</>,
              ]}
            />

            <Reveal delay={0.85} className="mt-10 max-w-md">
              <p className="text-lg leading-relaxed text-ink/85">{t.hero.lede}</p>
            </Reveal>

            <Reveal delay={1.05} className="mt-10 flex flex-wrap gap-3">
              <Link href={fleetHref} data-haptic className="btn-terra btn-fx">
                <span>{t.hero.ctaFleet}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={contactHref} className="btn-outline-ink btn-fx">
                <span>{t.hero.ctaContact}</span>
              </Link>
            </Reveal>
          </div>

          {/* DROITE — photo avec voile terracotta + dégradé de couture + vignettage */}
          <div className="hero-right relative overflow-hidden hero-photo-wrap">
            <Image
              src="/hero.jpg"
              alt="Motard sur une route — Minuit Midnight"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              className="object-cover hero-photo"
            />
            {/* Voile terracotta multiply — réchauffe la photo bleu-nuit */}
            <div className="hero-veil absolute inset-0 pointer-events-none" />
            {/* Dégradé horizontal depuis le bord gauche (couture douce vers le bloc coral) */}
            <div className="hero-seam absolute inset-y-0 start-0 w-[15%] pointer-events-none" />
            {/* Vignettage subtil sur tous les bords */}
            <div className="hero-vignette absolute inset-0 pointer-events-none" />
          </div>
        </div>

        {/* Mobile layout (< 900px) : photo fullscreen + overlay dégradé bas */}
        <div className="hero-mobile relative min-h-[100svh] w-full">
          <Image
            src="/hero.jpg"
            alt="Motard sur une route — Minuit Midnight"
            fill
            priority
            sizes="100vw"
            className="object-cover hero-photo"
          />
          {/* Overlay dégradé — chocolat en haut, bascule vers midnight en bas.
              La nuit tombe visuellement au fil du scroll sur la photo. */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(20,10,8,0.15) 0%, rgba(20,10,8,0.30) 35%, rgba(12,27,51,0.75) 75%, rgba(12,27,51,0.95) 100%)',
          }} />
          {/* Voile terracotta pour la chaleur (haut de photo uniquement) */}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{
            background: 'linear-gradient(to bottom, var(--terracotta) 0%, transparent 60%)',
            opacity: 'calc(var(--hero-veil-opacity) * 0.55)',
          }} />

          <div className="relative z-10 h-full min-h-[100svh] flex flex-col justify-end px-6 pt-32 pb-14">
            <Reveal delay={0.2} y={16} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tag text-coral">
                — {onlineLabel}
              </span>
              <span className="tag text-cream/50">——</span>
              <span className="tag text-cream/90">{t.hero.tag}</span>
            </Reveal>

            <SplitReveal
              as="h2"
              delay={0.35}
              className="font-display text-[13vw] leading-[0.9] tracking-tightest text-cream drop-shadow-lg"
              lines={[
                <>{t.hero.lineA}</>,
                <>{t.hero.lineB1}<em className="italic text-coral font-normal">{t.hero.lineBEm}</em></>,
                <>{t.hero.lineC}</>,
              ]}
            />

            <Reveal delay={0.85} className="mt-6 max-w-md">
              <p className="text-base leading-relaxed text-cream/90">{t.hero.lede}</p>
            </Reveal>

            <Reveal delay={1.05} className="mt-8 flex flex-wrap gap-3">
              <Link href={fleetHref} data-haptic className="btn-terra btn-fx">
                <span>{t.hero.ctaFleet}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={contactHref} className="btn-outline-cream btn-fx">
                <span>{t.hero.ctaContact}</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="section-warm relative py-32 md:py-48 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, var(--ochre) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, var(--terracotta) 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <Reveal className="flex items-center gap-3 mb-8">
              <span className="editorial-num">{t.story.num}</span>
              <span className="h-px w-8 bg-blood" />
              <span className="tag text-blood">{t.story.tag}</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
              lines={[
                <>{t.story.titleA}</>,
                <><em className="italic text-blood font-normal">{t.story.titleEm}</em></>,
                <>{t.story.titleB}</>,
              ]}
            />

            <Reveal delay={0.4} className="mt-12 flex items-baseline gap-4">
              <span className="font-display text-[6rem] md:text-[8rem] leading-none tracking-tightest text-terracotta">
                <Counter to={new Date().getFullYear() - 2003} />
              </span>
              <div className="flex flex-col">
                <span className="tag text-terracotta">{t.story.yearsSuffix}</span>
                <span className="editorial-num">{t.story.yearsFrom}</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-8 text-lg leading-relaxed">
            <Reveal><p>{t.story.p1a}<span className="font-semibold">{t.story.p1b}</span>{t.story.p1c}</p></Reveal>
            <Reveal delay={0.1}><p>{t.story.p2a}<em className="italic">{t.story.p2Em}</em>{t.story.p2b}</p></Reveal>
            <Reveal delay={0.2}>
              <blockquote className="pl-6 border-l-2 border-blood font-display text-3xl italic leading-snug">
                {t.story.quote}
              </blockquote>
            </Reveal>
            <Reveal delay={0.3}>
              <p>{t.story.p3a}<span className="font-semibold">{t.story.p3b}</span>{t.story.p3c}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="section-warm relative py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <Reveal className="flex items-center gap-3 mb-6">
                <span className="editorial-num">{t.pillars.num}</span>
                <span className="h-px w-8 bg-blood" />
                <span className="tag text-blood">{t.pillars.tag}</span>
              </Reveal>
              <SplitReveal
                as="h2"
                className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tightest max-w-2xl"
                lines={[
                  <>{t.pillars.titleA}</>,
                  <><em className="italic">{t.pillars.titleEm}</em></>,
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.pillars.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="[perspective:1000px]">
                <TiltCard intensity={5} className="bg-ink p-10 md:p-12 group h-full">
                  <div className="tag text-dust mb-6">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-display text-4xl leading-[0.95] tracking-tightest mb-6 text-cream">
                    {p.title}
                  </h3>
                  <p className="text-cream/70 leading-relaxed">{p.text}</p>
                  <div className="mt-8 h-px w-12 bg-blood transition-all duration-500 group-hover:w-24" />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLOTTE RÉELLE — bascule nocturne, vraie photo de l'agence */}
      <RealFleetShowcase locale={locale} />

      {/* AVIS — social proof entre pilliers et flotte */}
      <GoogleReviews locale={locale} />

      {/* FLOTTE PREVIEW */}
      <section className="section-warm relative py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Reveal className="flex items-center gap-3 mb-6">
                <span className="editorial-num text-dust">{t.fleetHome.num}</span>
                <span className="h-px w-8 bg-blood" />
                <span className="tag text-blood">{t.fleetHome.tag}</span>
              </Reveal>
              <SplitReveal
                as="h2"
                className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest max-w-2xl"
                lines={[
                  <>{t.fleetHome.titleA}</>,
                  <><em className="italic">{t.fleetHome.titleEm}</em></>,
                ]}
              />
            </div>
            <Reveal delay={0.2} className="self-start md:self-end">
              <Link href={fleetHref} className="btn-ghost btn-fx">
                <span>{t.fleetHome.ctaExplore}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredHome.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.12}>
                <Link
                  href={fleetHref}
                  className="group relative block border border-ink/10 overflow-hidden bg-transparent"
                >
                  {/* Zone image — grand format, moto qui flotte */}
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
                      <span className="editorial-num text-ink">{s.num}</span>
                      <span className="h-px w-6 bg-terracotta" />
                      <span className="tag text-ink">{s.subtitle}</span>
                    </div>
                    {s.image && (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-8 md:p-12 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  {/* Barre info — dark chocolate en bas */}
                  <div className="bg-ink p-6 md:p-8 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl leading-[0.9] tracking-tightest text-cream">
                        {s.name}
                      </h3>
                      <div className="mt-3">
                        <PriceTag mad={s.pricePerDay} locale={locale} variant="compact" />
                      </div>
                    </div>
                    <span className="tag text-coral group-hover:translate-x-2 transition-transform whitespace-nowrap">
                      {t.fleetHome.reserveShort}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURATEUR — estimation live avant l'engagement WhatsApp */}
      <PricingConfigurator locale={locale} />

      {/* CTA — bascule vers la nuit. Contraste chromatique avec toutes les
          sections warm au-dessus : coeur du naming Minuit × Midnight. */}
      <section className="section-night relative py-32 md:py-40 overflow-hidden starlight">
        {/* Halo coral qui monte du bas — "la ville s'allume dans la nuit" */}
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ background: 'radial-gradient(ellipse at 50% 100%, var(--coral) 0%, transparent 55%)' }} />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 text-center">
          <Reveal className="flex items-center justify-center gap-3 mb-10">
            <span className="editorial-num">{t.cta.num}</span>
            <span className="h-px w-8 bg-blood" />
            <span className="tag text-blood">{t.cta.tag}</span>
          </Reveal>
          <SplitReveal
            as="h2"
            className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tightest max-w-5xl mx-auto"
            lines={[
              <>{t.cta.titleA}</>,
              <><em className="italic text-blood">{t.cta.titleEm}</em></>,
            ]}
          />
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl mx-auto text-lg leading-relaxed">{t.cta.lede}</p>
          </Reveal>
          <Reveal delay={0.5} className="mt-12 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer" data-haptic className="btn-blood btn-fx">
              <span>{t.cta.waLabel}</span>
              <span aria-hidden="true">→</span>
            </a>
            <Link href={contactHref} className="btn-ghost btn-fx">
              <span>{t.cta.formLabel}</span>
            </Link>
          </Reveal>
          <Reveal delay={0.65}>
            <p className="mt-10 tag">
              {t.cta.orCall} <a href={`tel:${CONTACT.phoneRaw}`} className="link-under font-semibold">{CONTACT.phoneDisplay}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
