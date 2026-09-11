import { SITE } from '@/lib/config'
import { motos } from '@/lib/motos'

/**
 * Schema.org ItemList + Product/Offer par moto — indexation catalogue.
 * Injecté sur les pages /flotte (les 3 langues).
 *
 * Chaque moto est un Vehicle (spec structurée) + Product (prix, dispo).
 * Google Merchant Center peut consommer directement ce schema.
 */
export default function FleetItemListJsonLd({ url }: { url: string }) {
  const listItems = motos.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': ['Product', 'Vehicle'],
      '@id': `${SITE.url}/#moto-${m.id}`,
      name: m.name,
      description: m.description,
      brand: { '@type': 'Brand', name: m.brand },
      category: m.category,
      vehicleEngine: {
        '@type': 'EngineSpecification',
        engineDisplacement: {
          '@type': 'QuantitativeValue',
          value: m.cc,
          unitCode: 'CMQ',
        },
      },
      vehicleSeatingCapacity: m.seats,
      productionDate: String(m.year),
      image: m.image ? `${SITE.url}${m.image}` : undefined,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'MAD',
        price: m.pricePerDay,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: m.pricePerDay,
          priceCurrency: 'MAD',
          unitCode: 'DAY',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitCode: 'DAY',
          },
        },
        availability:
          m.availability === 'in-fleet'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
        seller: { '@id': `${SITE.url}/#business` },
      },
    },
  }))

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}/#fleet-list`,
    name: 'Flotte de motos et scooters — Minuit Midnight Marrakech',
    numberOfItems: motos.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: listItems,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
