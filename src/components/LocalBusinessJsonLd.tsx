import { CONTACT, SITE } from '@/lib/config'
import { motos } from '@/lib/motos'

/**
 * JSON-LD LocalBusiness / AutoRental — injecté dans le <head>.
 * Cohérence NAP critique : les valeurs sortent de CONTACT (source unique).
 *
 * priceRange calculé à partir de motos.ts pour rester cohérent avec la flotte.
 */
export default function LocalBusinessJsonLd() {
  const prices = motos.map((m) => m.pricePerDay)
  const priceMin = Math.min(...prices)
  const priceMax = Math.max(...prices)

  const data = {
    '@context': 'https://schema.org',
    '@type': ['AutoRental', 'LocalBusiness'],
    '@id': `${SITE.url}/#business`,
    name: CONTACT.legalName,
    alternateName: CONTACT.brandName,
    description:
      'Location de motos et scooters neufs à Marrakech depuis 2003. Agence Rue Oum Errabia, retrait direct, assurance incluse, assistance 7/7.',
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    // Schema.org accepte un array pour multi-lignes
    telephone: [CONTACT.phoneE164, CONTACT.phone2E164],
    email: CONTACT.email,
    priceRange: `${priceMin}–${priceMax} MAD`,
    currenciesAccepted: 'MAD, EUR, USD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '23:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Marrakesh' },
      { '@type': 'AdministrativeArea', name: 'Marrakech-Safi' },
    ],
    hasMap: CONTACT.mapsLink,
    sameAs: [CONTACT.instagramUrl, CONTACT.mapsLink],
    // Identifiant Google Places — renforce l'association fiche ↔ site
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'google_place_id',
        value: CONTACT.googlePlaceId,
      },
    ],
    founder: { '@type': 'Person', name: 'Minuit Midnight' },
    foundingDate: '2003',
    slogan: 'L’excellence du déplacement urbain à Marrakech.',
  }

  return (
    <script
      type="application/ld+json"
      // JSON-LD est du texte statique — pas de risque XSS ici puisque tout provient de constantes.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
