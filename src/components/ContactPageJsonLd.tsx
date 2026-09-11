import { SITE } from '@/lib/config'

/**
 * Schema.org ContactPage — rattache la page contact à l'entité business.
 * Renforce le signal SEO local pour les recherches "contact + Marrakech".
 */
export default function ContactPageJsonLd({ url }: { url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}/#contact-page`,
    url,
    mainEntity: { '@id': `${SITE.url}/#business` },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
