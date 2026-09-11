import type { Metadata } from 'next'
import { dict, type Locale, pathFor } from '@/lib/i18n'
import { CONTACT, SITE } from '@/lib/config'

type Page = 'home' | 'fleet' | 'contact'

const OG_LOCALE: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  ar: 'ar_MA',
}

/**
 * Métadonnées centralisées par page + locale.
 * - Title / description depuis dict.<locale>.meta
 * - Canonical absolu
 * - hreflang FR/EN/AR + x-default (par convention = FR)
 * - Open Graph + Twitter Cards avec image hero
 */
export function buildMetadata(locale: Locale, page: Page): Metadata {
  const t = dict[locale].meta
  const title =
    page === 'home' ? t.homeTitle : page === 'fleet' ? t.fleetTitle : t.contactTitle
  const description =
    page === 'home' ? t.homeDesc : page === 'fleet' ? t.fleetDesc : t.contactDesc

  const path = pathFor(locale, page)
  const canonical = SITE.url + path

  const languages: Record<string, string> = {
    fr: SITE.url + pathFor('fr', page),
    en: SITE.url + pathFor('en', page),
    ar: SITE.url + pathFor('ar', page),
    'x-default': SITE.url + pathFor('fr', page),
  }

  const ogImage = {
    url: SITE.url + SITE.ogImage,
    width: 2400,
    height: 1600,
    alt: 'Minuit Midnight — Location moto & scooter à Marrakech',
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.brand,
      locale: OG_LOCALE[locale],
      alternateLocale: (Object.values(OG_LOCALE) as string[]).filter(
        (l) => l !== OG_LOCALE[locale]
      ),
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    other: {
      'geo.region': 'MA-07',
      'geo.placename': 'Marrakesh',
      'geo.position': `${CONTACT.geo.lat};${CONTACT.geo.lng}`,
      ICBM: `${CONTACT.geo.lat}, ${CONTACT.geo.lng}`,
    },
  }
}
