import FleetView from '@/views/FleetView'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import FleetItemListJsonLd from '@/components/FleetItemListJsonLd'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/config'
import { pathFor } from '@/lib/i18n'

export const metadata = buildMetadata('en', 'fleet')

export default function FleetEn() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FleetItemListJsonLd url={SITE.url + pathFor('en', 'fleet')} />
      <FleetView locale="en" />
    </>
  )
}
