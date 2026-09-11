import Link from 'next/link'
import Reveal from '@/components/Reveal'
import SplitReveal from '@/components/SplitReveal'
import FleetImageCycler from '@/components/FleetImageCycler'
import { dict, pathFor, type Locale } from '@/lib/i18n'

/**
 * Section "flotte réelle" — split photo verticale/texte sur bg midnight.
 * Placée entre Piliers et Reviews sur HomeView.
 *
 * Répond directement à la critique DA "aucune photo réelle, identité moto
 * absente" : c'est LE moment où le site sort du template hôtel-boutique et
 * montre le vrai matos, dans la vraie ambiance nuit du naming.
 */
export default function RealFleetShowcase({ locale }: { locale: Locale }) {
  const t = dict[locale].realFleet
  const fleetHref = pathFor(locale, 'fleet')

  return (
    <section className="section-night relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Photos — verticales, crossfade auto entre 2 vues (arrière/face) */}
        <div className="lg:col-span-5 relative aspect-[9/14] lg:aspect-auto lg:min-h-[85svh]">
          <FleetImageCycler
            slides={[
              { src: '/motos/minuit-flotte-vertical.jpg', alt: t.altText },
              { src: '/motos/photoshoot.jpeg', alt: t.altText2 },
            ]}
          />
          {/* Voile midnight subtil — accord chromatique avec le fond de section */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              background:
                'linear-gradient(to right, transparent 60%, rgba(12,27,51,0.35) 100%)',
            }}
          />
          {/* Fine couture verticale entre photo et texte */}
          <div className="hidden lg:block absolute top-8 bottom-8 right-0 w-px bg-cream/10" />
        </div>

        {/* Texte */}
        <div className="lg:col-span-7 relative flex items-center px-6 md:px-10 lg:px-16 xl:px-20 py-20 lg:py-24">
          <div className="max-w-2xl">
            <Reveal className="flex items-center gap-3 mb-6">
              <span className="editorial-num">{t.num}</span>
              <span className="h-px w-8 bg-coral" />
              <span className="tag text-coral">{t.tag}</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] tracking-tightest"
              lines={[
                <>{t.titleA}</>,
                <>
                  <em className="italic text-coral font-normal">{t.titleEm}</em>
                </>,
                <>{t.titleB}</>,
              ]}
            />
            <Reveal delay={0.4} className="mt-10">
              <p className="text-lg leading-relaxed text-cream/80 max-w-xl">
                {t.lede}
              </p>
            </Reveal>
            <Reveal delay={0.55} className="mt-12">
              <Link href={fleetHref} data-haptic className="btn-blood btn-fx">
                <span>{t.cta}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
