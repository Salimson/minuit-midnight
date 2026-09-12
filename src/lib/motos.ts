export type Category =
  | 'scooter'
  | 'maxi-scooter'
  | 'roadster'
  | 'adventure'

export type Availability = 'in-fleet' | 'on-request'

export type Moto = {
  id: string
  num: string
  name: string
  subtitle: string
  brand: string
  category: Category
  cc: number
  pricePerDay: number
  image: string | null
  features: string[]
  description: string
  seats: number
  license: string
  availability: Availability
  year: number
}

export const motos: Moto[] = [
  {
    id: 'sym-jet-14',
    num: '01',
    name: 'SYM Jet 14',
    subtitle: 'Scooter urbain · 125cc',
    brand: 'SYM',
    category: 'scooter',
    cc: 125,
    pricePerDay: 250,
    image: '/motos/sym-jet-v2.webp',
    features: ['Automatique', 'Coffre casque', 'Neuf 2026', 'Roues 14"'],
    description:
      "Le compagnon urbain de référence à Marrakech. Maniable dans les ruelles de la Médina, à l'aise sur les grands axes de Gueliz. Livraison possible à votre riad ou hôtel.",
    seats: 2,
    license: 'Permis A / B',
    availability: 'in-fleet',
    year: 2026,
  },
  {
    id: 'sym-symphony-150',
    num: '02',
    name: 'SYM Symphony 150',
    subtitle: 'Scooter urbain · 150cc',
    brand: 'SYM',
    category: 'scooter',
    cc: 150,
    pricePerDay: 300,
    image: '/motos/sym-symphony-150-v3.webp',
    features: ['Automatique', 'ABS', 'Neuf 2026', 'Autonomie longue'],
    description:
      "Puissance et confort supérieurs. Idéal pour les trajets étendus vers l'Atlas, Essaouira ou la Palmeraie. Un cran au-dessus pour les motards confirmés.",
    seats: 2,
    license: 'Permis A / B',
    availability: 'in-fleet',
    year: 2026,
  },
  {
    id: 'kymco-agility-125',
    num: '03',
    name: 'Kymco Agility 125',
    subtitle: 'Scooter urbain · 125cc',
    brand: 'Kymco',
    category: 'scooter',
    cc: 125,
    pricePerDay: 280,
    image: '/motos/kymco-agility-125-v2.webp',
    features: ['Automatique', 'Injection', 'Neuf 2026', 'Frein disque avant'],
    description:
      "Le Kymco Agility joue la carte de la sobriété fiable. Consommation basse, entretien minimal, accès au permis B. Un choix rationnel pour la ville.",
    seats: 2,
    license: 'Permis A1 / B',
    availability: 'in-fleet',
    year: 2026,
  },
  {
    id: 'kymco-people-s-150',
    num: '04',
    name: 'Kymco People S 150',
    subtitle: 'Scooter mixte · 150cc',
    brand: 'Kymco',
    category: 'scooter',
    cc: 150,
    pricePerDay: 320,
    image: '/motos/kymco-people-s-150-v2.webp',
    features: ['Grandes roues 16"', 'ABS', 'Neuf 2026', 'Selle 2 places'],
    description:
      "Grandes roues pour amortir les pavés de la Médina, silhouette élégante, moteur souple. Le Kymco haut de gamme au format compact.",
    seats: 2,
    license: 'Permis A2 / A',
    availability: 'in-fleet',
    year: 2026,
  },
  {
    id: 'yamaha-tmax-560',
    num: '05',
    name: 'Yamaha T-Max 560',
    subtitle: 'Maxi-scooter sport · 562cc',
    brand: 'Yamaha',
    category: 'maxi-scooter',
    cc: 562,
    pricePerDay: 900,
    image: '/motos/yamaha-tmax-560-v2.webp',
    features: ['48 ch', 'ABS', 'Traction control', 'Neuf 2026'],
    description:
      "La référence maxi-scooter. Sensations moto, confort scooter. Position sportive, freinage puissant. Idéal pour l'Ourika, Essaouira, Ouarzazate.",
    seats: 2,
    license: 'Permis A / A2',
    availability: 'on-request',
    year: 2026,
  },
  {
    id: 'yamaha-xmax-300',
    num: '06',
    name: 'Yamaha X-Max 300',
    subtitle: 'Maxi-scooter GT · 292cc',
    brand: 'Yamaha',
    category: 'maxi-scooter',
    cc: 292,
    pricePerDay: 800,
    image: '/motos/yamaha-xmax-300-v2.webp',
    features: ['Automatique', 'ABS', 'Coffre XXL', 'Neuf 2026'],
    description:
      "L'équilibre parfait pour les trajets moyens. Autonomie confortable, deux coffres, pare-brise ajustable. Une machine adulte, sans excès.",
    seats: 2,
    license: 'Permis A2 / A',
    availability: 'on-request',
    year: 2026,
  },
  {
    id: 'honda-forza-350',
    num: '07',
    name: 'Honda Forza 350',
    subtitle: 'Grand tourisme · 330cc',
    brand: 'Honda',
    category: 'maxi-scooter',
    cc: 330,
    pricePerDay: 750,
    image: '/motos/honda-forza-350-v3.webp',
    features: ['Automatique', 'Coffre topcase', 'ABS', 'Neuf 2026'],
    description:
      "Le maxi-scooter premium Honda pour les longs trajets. Pare-brise ajustable, deux coffres, position confortable. Marrakech ↔ Essaouira sans effort.",
    seats: 2,
    license: 'Permis A2 / A',
    availability: 'on-request',
    year: 2026,
  },
  {
    id: 'bmw-r1300gs',
    num: '08',
    name: 'BMW R 1300 GS',
    subtitle: 'Trail routier · 1300cc',
    brand: 'BMW',
    category: 'adventure',
    cc: 1300,
    pricePerDay: 1400,
    image: '/motos/bmw-r1300gs-v2.webp',
    features: ['Boxer 145 ch', 'ESA suspension', 'Mode Enduro', 'Neuf 2026'],
    description:
      "La référence trail 2026. Pour l'Atlas, Ouarzazate, la vallée des Roses. Confort route, capable en piste. Le vrai voyage aventure, quand la moto compte autant que la destination.",
    seats: 2,
    license: 'Permis A',
    availability: 'on-request',
    year: 2026,
  },
]

export const featuredHome = motos.filter((m) => m.availability === 'in-fleet').slice(0, 2)
