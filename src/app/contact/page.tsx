import ContactView from '@/views/ContactView'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import ContactPageJsonLd from '@/components/ContactPageJsonLd'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/config'
import { pathFor } from '@/lib/i18n'

export const metadata = buildMetadata('fr', 'contact')

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <ContactPageJsonLd url={SITE.url + pathFor('fr', 'contact')} />
      <ContactView locale="fr" />
    </>
  )
}
