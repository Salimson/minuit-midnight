import type { MetadataRoute } from 'next'
import { locales, pathFor } from '@/lib/i18n'
import { SITE } from '@/lib/config'

const pages: Array<'home' | 'fleet' | 'contact'> = ['home', 'fleet', 'contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return pages.flatMap((page) =>
    locales.map((locale) => {
      const url = SITE.url + pathFor(locale, page)
      return {
        url,
        lastModified: now,
        changeFrequency: page === 'home' ? 'weekly' : 'monthly',
        priority: page === 'home' ? 1.0 : page === 'fleet' ? 0.8 : 0.6,
        alternates: {
          languages: {
            fr: SITE.url + pathFor('fr', page),
            en: SITE.url + pathFor('en', page),
            ar: SITE.url + pathFor('ar', page),
            'x-default': SITE.url + pathFor('fr', page),
          },
        },
      }
    })
  )
}
