'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CONTACT } from '@/lib/config'
import { detectLocale, dict, pathFor } from '@/lib/i18n'

export default function Footer() {
  const pathname = usePathname()
  const locale = detectLocale(pathname)
  const t = dict[locale]
  const year = new Date().getFullYear()
  return (
    // Dégradé ink → midnight-deep : le site termine dans la nuit,
    // fait écho au "Minuit" du nom.
    <footer
      className="relative border-t border-white/5 text-cream"
      style={{
        background:
          'linear-gradient(180deg, var(--ink) 0%, var(--ink) 35%, var(--midnight) 100%)',
      }}
    >
      {/* Bandeau quartiers — sur midnight, en écho au nom "Minuit".
          Rupture chromatique franche avec l'ink chaud du bloc NAP en-dessous. */}
      <div className="relative overflow-hidden py-10 border-b border-white/10 bg-midnight">
        <div className="marquee flex whitespace-nowrap gap-16">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-[7vw] leading-none tracking-tightest flex items-center gap-16 text-cream">
              Marrakech
              <span className="text-coral">—</span>
              Gueliz
              <span className="text-coral">—</span>
              Hivernage
              <span className="text-coral">—</span>
              {locale === 'fr' ? 'Médina' : locale === 'en' ? 'Medina' : 'المدينة العتيقة'}
              <span className="text-coral">—</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* NAP — nom / adresse / téléphone identiques à la fiche Google Business */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Minuit Midnight" width={48} height={48} />
            <div>
              <div className="font-display text-xl tracking-tightest">Minuit Midnight</div>
              <div className="tag text-dust">Est. 2003 · Marrakech</div>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-dust leading-relaxed">{t.footer.lede}</p>
        </div>

        <div className="md:col-span-3">
          <div className="tag text-blood mb-4">{t.footer.contactCol}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="link-under"
                aria-label={`Appeler ${CONTACT.phoneDisplay}`}
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phone2E164}`}
                className="link-under"
                aria-label={`Appeler ${CONTACT.phone2Display}`}
              >
                {CONTACT.phone2Display}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="link-under text-dust">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-dust">{CONTACT.openingHoursDisplay}</li>
            <li>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-dust link-under"
                aria-label={`Instagram @${CONTACT.instagram}`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                @{CONTACT.instagram}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.googleReviewLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-dust link-under"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
                </svg>
                {t.leaveReview.footerLink}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="tag text-blood mb-4">{t.footer.addressCol}</div>
          {/* Nom légal complet — même orthographe que la fiche Google Business (cohérence NAP) */}
          <div className="text-sm text-cream mb-2">{CONTACT.legalName}</div>
          <address className="not-italic text-sm text-dust leading-relaxed">
            {CONTACT.street}
            <br />
            {CONTACT.city} {CONTACT.postalCode}
            <br />
            {locale === 'fr' ? CONTACT.country : locale === 'en' ? CONTACT.countryEn : 'المغرب'}
          </address>
          <a
            href={CONTACT.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block tag text-cream link-under"
          >
            {t.footer.seeMaps}
          </a>
        </div>

        <div className="md:col-span-2">
          <div className="tag text-blood mb-4">{t.footer.navCol}</div>
          <ul className="space-y-2 text-sm">
            <li><Link href={pathFor(locale, 'home')} className="link-under">{t.nav.home}</Link></li>
            <li><Link href={pathFor(locale, 'fleet')} className="link-under">{t.nav.fleet}</Link></li>
            <li><Link href={pathFor(locale, 'contact')} className="link-under">{t.nav.contact}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bandeau nuit — même bleu que la marquee (midnight, source unique) */}
      <div className="border-t border-white/10 bg-midnight">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-3 tag text-cream/50">
          <div>© {year} Minuit Midnight — {t.footer.rights}</div>
          <div>{t.footer.tagline}</div>
        </div>
      </div>
    </footer>
  )
}
