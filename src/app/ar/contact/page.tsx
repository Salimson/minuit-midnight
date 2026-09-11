import ContactView from '@/views/ContactView'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import ContactPageJsonLd from '@/components/ContactPageJsonLd'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/config'
import { pathFor } from '@/lib/i18n'

export const metadata = buildMetadata('ar', 'contact')

export default function ContactAr() {
  return (
    <>
      <LocalBusinessJsonLd />
      <ContactPageJsonLd url={SITE.url + pathFor('ar', 'contact')} />
      <ContactView locale="ar" />
    </>
  )
}
