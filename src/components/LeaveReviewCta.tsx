import { CONTACT } from '@/lib/config'
import { dict, type Locale } from '@/lib/i18n'
import Reveal from '@/components/Reveal'

/**
 * Bandeau discret post-Reviews — sollicite un avis Google chez les clients
 * satisfaits de retour sur le site. Levier SEO local majeur : chaque avis
 * augmente le score de la fiche Google Business et le ranking sur les
 * requêtes non-brandées ("location moto Marrakech").
 */
export default function LeaveReviewCta({ locale }: { locale: Locale }) {
  const t = dict[locale].leaveReview

  return (
    <section className="section-warm relative border-t border-black/5 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
          <Reveal className="flex-1">
            <div className="tag text-blood mb-4">{t.tag}</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tightest max-w-xl">
              {t.titleA}{' '}
              <em className="italic text-blood font-normal">{t.titleEm}</em>
            </h2>
            <p className="mt-5 max-w-lg text-dust leading-relaxed">{t.lede}</p>
          </Reveal>

          <Reveal delay={0.15} className="shrink-0">
            <a
              href={CONTACT.googleReviewLink}
              target="_blank"
              rel="noreferrer"
              data-haptic
              className="btn-blood btn-fx inline-flex items-center gap-3"
            >
              <GoogleStar />
              <span>{t.cta}</span>
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Icône étoile pleine — même palette que le bouton, sobre.
function GoogleStar() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
    </svg>
  )
}
