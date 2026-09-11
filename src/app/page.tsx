import HomeView from '@/views/HomeView'
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata('fr', 'home')

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomeView locale="fr" />
    </>
  )
}
