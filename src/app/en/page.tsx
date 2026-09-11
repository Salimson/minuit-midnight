import HomeView from '@/views/HomeView'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata('en', 'home')

export default function HomeEn() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomeView locale="en" />
    </>
  )
}
