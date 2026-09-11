import HomeView from '@/views/HomeView'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata('ar', 'home')

export default function HomeAr() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomeView locale="ar" />
    </>
  )
}
