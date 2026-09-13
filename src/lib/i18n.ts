export type Locale = 'fr' | 'en' | 'ar'

export const locales: Locale[] = ['fr', 'en', 'ar']
export const defaultLocale: Locale = 'fr'

// Cycle FR → EN → AR → FR (utilisé par l'ancien switcher single-button)
export function otherLocale(l: Locale): Locale {
  return l === 'fr' ? 'en' : l === 'en' ? 'ar' : 'fr'
}

export function isRtl(l: Locale): boolean {
  return l === 'ar'
}

export function pathFor(locale: Locale, page: 'home' | 'fleet' | 'contact'): string {
  if (locale === 'fr') {
    return page === 'home' ? '/' : page === 'fleet' ? '/flotte' : '/contact'
  }
  if (locale === 'en') {
    return page === 'home' ? '/en' : page === 'fleet' ? '/en/fleet' : '/en/contact'
  }
  // ar
  return page === 'home' ? '/ar' : page === 'fleet' ? '/ar/flotte' : '/ar/contact'
}

export function detectLocale(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return 'ar'
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return 'fr'
}

type Dict = {
  meta: {
    homeTitle: string
    homeDesc: string
    fleetTitle: string
    fleetDesc: string
    contactTitle: string
    contactDesc: string
  }
  nav: {
    home: string
    fleet: string
    contact: string
    menu: string
    switchTo: string
  }
  common: {
    scroll: string
    est: string
    since: string
    onRequest: string
    reserve: string
    request: string
    quote: string
    perDay: string
    startingAt: string
    year: string
    cc: string
    seats: string
    license: string
    photoSoon: string
    photoDesc: string
    fromArrow: string
    contactCta: string
    whatsappCta: string
    formCta: string
    directions: string
    seeMaps: string
    reserveWa: string
    contactForm: string
    ourAddress: string
  }
  hero: {
    tag: string
    lineA: string
    lineB1: string
    lineBEm: string
    lineC: string
    lede: string
    ctaFleet: string
    ctaContact: string
  }
  story: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    titleB: string
    yearsSuffix: string
    yearsFrom: string
    p1a: string
    p1b: string
    p1c: string
    p2a: string
    p2Em: string
    p2b: string
    quote: string
    p3a: string
    p3b: string
    p3c: string
  }
  pillars: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    items: { title: string; text: string }[]
  }
  fleetHome: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    ctaExplore: string
    reserveShort: string
  }
  cta: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    lede: string
    waLabel: string
    formLabel: string
    orCall: string
  }
  fleet: {
    heroTag: string
    heroNum: string
    heroA: string
    heroEm: string
    heroLede: string
    stat1: string
    stat2: string
    stat3Value: string
    stat3: string
    stat4Value: string
    stat4: string
    incTag: string
    incNum: string
    incTitleA: string
    incTitleEm: string
    ctaTitleA: string
    ctaTitleEm: string
    ctaWa: string
    ctaForm: string
    inclus: { title: string; detail: string }[]
  }
  contact: {
    heroTag: string
    heroNum: string
    heroA: string
    heroEm: string
    heroLede: string
    aboutTag: string
    aboutNum: string
    aboutTitleA: string
    aboutTitleEmA: string
    aboutTitleB: string
    aboutP1a: string
    aboutP1b: string
    aboutP2a: string
    aboutP2Em: string
    aboutP2b: string
    aboutP3: string
    coordTag: string
    coordNum: string
    coordTitleA: string
    coordTitleEm: string
    address: string
    phone: string
    whatsapp: string
    email: string
    hours: string
    hoursLine1: string
    hoursLine2: string
    whatsappOpen: string
    instagram: string
    instagramOpen: string
    formTag: string
    formNum: string
    formTitle: string
    formLede: string
    findUs: string
  }
  form: {
    name: string
    email: string
    phone: string
    model: string
    modelPlaceholder: string
    arrival: string
    departure: string
    message: string
    messagePlaceholder: string
    submit: string
    submitting: string
    or: string
    waDirect: string
    sent: string
    unknownError: string
    waPrefill: string
  }
  footer: {
    lede: string
    contactCol: string
    addressCol: string
    navCol: string
    seeMaps: string
    rights: string
    tagline: string
  }
  configurator: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    lede: string
    fieldModel: string
    fieldDays: string
    dayUnit: string
    daysUnit: string
    totalLabel: string
    waCta: string
    waPrefill: string // template avec {model} {days} {price}
  }
  reviews: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    basedOn: string // template avec {n}
    seeAll: string
    loading: string
  }
  realFleet: {
    tag: string
    num: string
    titleA: string
    titleEm: string
    titleB: string
    lede: string
    altText: string
    altText2: string
    cta: string
  }
  leaveReview: {
    tag: string
    titleA: string
    titleEm: string
    lede: string
    cta: string
    footerLink: string
  }
}

export const dict: Record<Locale, Dict> = {
  fr: {
    meta: {
      homeTitle: 'Location de motos et scooters à Marrakech | Minuit Midnight',
      homeDesc:
        'Location de scooters et motos neufs à Marrakech depuis 2003. Agence Rue Oum Errabia, à cinq minutes de Gueliz. Assurance incluse. Réservez sur WhatsApp.',
      fleetTitle: 'La Flotte — Scooters & Motos neufs à louer | Minuit Midnight',
      fleetDesc:
        'Scooters, maxi-scooters et trails à louer à Marrakech. Millésime 2026 : SYM, Kymco, Yamaha, Honda, BMW. Tarifs nets, réservation directe.',
      contactTitle: 'Contact — Location Moto Marrakech | Minuit Midnight',
      contactDesc:
        'Contactez Minuit Midnight à Marrakech. Rue Oum Errabia · 09h–23h, 7/7. WhatsApp +212 6 73 14 26 72. Devis en moins de 24 h.',
    },
    nav: {
      home: 'Accueil',
      fleet: 'La Flotte',
      contact: 'Contact',
      menu: 'Menu',
      switchTo: 'EN',
    },
    common: {
      scroll: 'Scroll',
      est: 'Est. 2003',
      since: 'Depuis 2003',
      onRequest: 'Sur demande · 48h',
      reserve: 'Réserver',
      request: 'Demander',
      quote: 'Devis',
      perDay: '/ jour',
      startingAt: 'À partir de',
      year: 'Année',
      cc: 'Cylindrée',
      seats: 'Places',
      license: 'Permis',
      photoSoon: '— Photo à venir',
      photoDesc:
        'Machine neuve 2026 disponible via sourçage sous 48h auprès de notre réseau local.',
      fromArrow: '→',
      contactCta: 'Nous contacter',
      whatsappCta: 'WhatsApp direct',
      formCta: 'Formulaire complet',
      directions: 'Itinéraire →',
      seeMaps: 'Voir sur Maps →',
      reserveWa: 'Réserver par WhatsApp',
      contactForm: 'Formulaire de contact',
      ourAddress: '— Nous trouver',
    },
    hero: {
      tag: 'Marrakech · Depuis 2003',
      lineA: "L'excellence",
      lineB1: 'du ',
      lineBEm: 'déplacement',
      lineC: 'urbain.',
      lede: 'Minuit Midnight. Location de scooters à Marrakech depuis plus de 20 ans. Une flotte neuve, un service haut de gamme, une connaissance intime de la ville.',
      ctaFleet: 'Voir la flotte',
      ctaContact: 'Nous contacter',
    },
    story: {
      tag: "L'Histoire",
      num: '01',
      titleA: 'Vingt ans à',
      titleEm: 'connaître',
      titleB: 'la ville.',
      yearsSuffix: 'Ans',
      yearsFrom: '— depuis 2003',
      p1a: 'Fondée en ',
      p1b: '2003',
      p1c: ", Minuit Midnight est née d'une conviction : circuler à Marrakech n'est pas anodin. Les ruelles de la Médina, la fluidité de Gueliz, les hôtels d'Hivernage. Chaque quartier a sa logique, ses raccourcis, ses pièges.",
      p2a: 'Vingt ans plus tard, nous restons une ',
      p2Em: 'maison indépendante',
      p2b: ', choisie par les MRE de passage, les résidents exigeants, et les voyageurs qui refusent le hasard des marketplaces génériques.',
      quote: '« Un scooter qui connaît la ville vaut dix voitures qui vous y perdent. »',
      p3a: 'Notre flotte est intégralement ',
      p3b: 'renouvelée en 2024',
      p3c: ' : SYM neufs, entretien atelier, retrait à l\'agence à cinq minutes de Gueliz. Assurance incluse. Assistance 7/7.',
    },
    pillars: {
      tag: 'La Maison',
      num: '02',
      titleA: 'Trois principes.',
      titleEm: 'Vingt ans tenus.',
      items: [
        {
          title: 'Flotte neuve.',
          text: 'Renouvellement intégral en 2024. SYM automatiques, entretien atelier chaque semaine, casques neufs fournis.',
        },
        {
          title: 'Agence centrale.',
          text: "Rue Oum Errabia, à cinq minutes de Gueliz et de l'Hivernage. Retrait rapide, papiers signés en dix minutes.",
        },
        {
          title: 'Assistance 7/7.',
          text: "Une ligne directe, un vrai humain, une réponse en moins d'une heure. La ville ne dort pas, nous non plus.",
        },
      ],
    },
    fleetHome: {
      tag: 'La Flotte',
      num: '03',
      titleA: 'Deux modèles.',
      titleEm: 'Aucun compromis.',
      ctaExplore: 'Explorer la flotte',
      reserveShort: 'Réserver →',
    },
    cta: {
      tag: 'Réservation',
      num: '04',
      titleA: 'Rendez-vous',
      titleEm: 'à Marrakech.',
      lede: "Un scooter préparé, une clé en main, un accueil personnel. Nous ne prenons pas plus de dix nouveaux clients par jour, pour tenir le niveau.",
      waLabel: 'WhatsApp direct',
      formLabel: 'Formulaire complet',
      orCall: 'Ou appelez :',
    },
    fleet: {
      heroTag: 'La Flotte & Les Tarifs',
      heroNum: '02 —',
      heroA: 'Que du neuf.',
      heroEm: 'Millésime 2026.',
      heroLede:
        "Une gamme choisie, aucune machine de plus de deux ans. Scooters urbains dispos à l'agence. Maxi-scooters, roadsters et cruisers sourcés sous 48h auprès de notre réseau local. SYM, Kymco, Yamaha, Honda, Kawasaki.",
      stat1: 'Modèles au catalogue',
      stat2: 'En agence',
      stat3Value: '48h',
      stat3: 'Sourçage à la demande',
      stat4Value: '2026',
      stat4: 'Millésime neuf',
      incTag: 'Inclus & Conditions',
      incNum: 'A —',
      incTitleA: 'Tarifs nets.',
      incTitleEm: 'Zéro surprise.',
      ctaTitleA: 'Une réservation ?',
      ctaTitleEm: 'Un mot suffit.',
      ctaWa: 'Réserver par WhatsApp',
      ctaForm: 'Formulaire de contact',
      inclus: [
        { title: 'Assurance responsabilité civile', detail: 'Couverture complète pendant la durée de location.' },
        { title: 'Casques neufs', detail: 'Fournis pour le conducteur et le passager.' },
        { title: 'Kilométrage illimité', detail: "Pas de plafond, roulez comme vous l'entendez." },
        { title: 'Assistance 7/7', detail: 'Ligne directe, intervention rapide dans Marrakech.' },
        { title: "Retrait à l'agence", detail: 'Rue Oum Errabia. 5 min de Gueliz et Hivernage. Ouverte 9h à 23h.' },
        { title: 'Caution flexible', detail: 'Espèces ou carte, restituée intégralement à la remise.' },
        { title: 'Sourçage 48h', detail: 'T-Max, Shadow, Z900... via notre réseau local.' },
        { title: 'Machine préparée la veille', detail: 'Contrôle atelier avant chaque retrait.' },
      ],
    },
    contact: {
      heroTag: "L'Expérience & Contact",
      heroNum: '03 —',
      heroA: 'Parlons.',
      heroEm: 'Simplement.',
      heroLede:
        "Réservation, question technique, demande particulière. Nous répondons personnellement sous 24h ouvrées. Pour l'urgence, WhatsApp reste le plus rapide.",
      aboutTag: 'La Maison',
      aboutNum: 'A —',
      aboutTitleA: 'Un service pensé pour les',
      aboutTitleEmA: 'voyageurs',
      aboutTitleB: 'exigeants.',
      aboutP1a: 'Depuis ',
      aboutP1b:
        "2003, Minuit Midnight sert une clientèle qui refuse l'approximation : MRE de passage annuel, cadres en résidence, familles installées à Gueliz, voyageurs recommandés par bouche-à-oreille.",
      aboutP2a: 'Notre approche est ',
      aboutP2Em: 'personnelle',
      aboutP2b:
        ". Chaque réservation est traitée par un humain. Chaque scooter est préparé la veille. Chaque retrait respecte l'horaire à la minute.",
      aboutP3:
        "Nous sommes une maison indépendante. Pas une plateforme, pas un intermédiaire. C'est cette relation directe qui fait la différence sur vingt ans.",
      coordTag: 'Coordonnées',
      coordNum: 'B —',
      coordTitleA: 'Marrakech',
      coordTitleEm: 'Gueliz',
      address: 'Adresse',
      phone: 'Téléphone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      hours: 'Horaires',
      hoursLine1: 'Lundi — Dimanche',
      hoursLine2: '09h00 — 23h00 · 7 jours sur 7',
      whatsappOpen: 'Ouvrir la conversation →',
      instagram: 'Instagram',
      instagramOpen: 'Voir le profil →',
      formTag: 'Formulaire',
      formNum: 'C —',
      formTitle: 'Écrivez-nous.',
      formLede:
        'Décrivez votre besoin : modèle, dates, questions particulières. Nous confirmons sous 24h ouvrées avec une proposition ferme.',
      findUs: '— Nous trouver',
    },
    form: {
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      model: 'Modèle souhaité',
      modelPlaceholder: 'SYM Jet 14 · Symphony 150…',
      arrival: "Date d'arrivée",
      departure: 'Date de départ',
      message: 'Message',
      messagePlaceholder: 'Précisez la durée, votre lieu de séjour, questions particulières…',
      submit: 'Envoyer la demande',
      submitting: 'Envoi…',
      or: 'ou',
      waDirect: 'WhatsApp direct',
      sent: 'Message reçu. Nous revenons vers vous sous 24h ouvrées.',
      unknownError: 'Erreur inconnue',
      waPrefill: 'Bonjour, je souhaite un renseignement sur vos scooters.',
    },
    footer: {
      lede:
        "L'excellence du déplacement urbain à Marrakech. Location de scooters neufs pour touristes exigeants et MRE.",
      contactCol: 'Contact',
      addressCol: 'Adresse',
      navCol: 'Navigation',
      seeMaps: 'Voir sur Maps →',
      rights: 'Tous droits réservés',
      tagline: 'Made in Marrakech',
    },
    configurator: {
      tag: 'Estimation',
      num: '03·B',
      titleA: 'Estimez',
      titleEm: 'votre location.',
      lede:
        'Choisissez votre modèle et votre durée. Prix net calculé en direct. Sans surprise, sans engagement. Retrait à l\'agence Rue Oum Errabia.',
      fieldModel: 'Modèle',
      fieldDays: 'Durée',
      dayUnit: 'jour',
      daysUnit: 'jours',
      totalLabel: 'Total estimé',
      waCta: 'Réserver ce prix sur WhatsApp',
      waPrefill:
        'Bonjour, je souhaite réserver le {model} pour {days}. Prix estimé : {price}. Pouvez-vous confirmer les disponibilités ?',
    },
    reviews: {
      tag: 'Avis clients',
      num: '02·B',
      titleA: 'Ils',
      titleEm: 'nous ont choisi.',
      basedOn: 'Basé sur {n} avis Google',
      seeAll: 'Voir tous les avis →',
      loading: 'Chargement…',
    },
    realFleet: {
      tag: 'La flotte réelle',
      num: '02·C',
      titleA: 'Ce que vous',
      titleEm: 'louez.',
      titleB: 'Vraiment.',
      lede:
        "Pas de rendus. Pas de photos catalogue. Nos scooters, garés devant l'agence, préparés la veille de chaque location.",
      altText:
        "Scooters Minuit Midnight garés de nuit devant l'agence à Marrakech",
      altText2:
        "Scooters Minuit Midnight vue face avec sacoches Moto Rent et numéros de contact, sous les néons de Marrakech",
      cta: 'Voir toute la flotte',
    },
    leaveReview: {
      tag: '— Merci',
      titleA: 'Vous nous avez',
      titleEm: 'déjà loué',
      lede:
        'Deux minutes pour partager votre expérience. Chaque avis compte, et nous répondons à tous.',
      cta: 'Laisser un avis Google',
      footerLink: 'Laisser un avis Google',
    },
  },
  en: {
    meta: {
      homeTitle: 'Motorcycle & Scooter Rental in Marrakech | Minuit Midnight',
      homeDesc:
        'Rent new scooters and motorcycles in Marrakech, since 2003. Agency on Rue Oum Errabia, five minutes from Gueliz. Insurance included. Book instantly on WhatsApp.',
      fleetTitle: 'The Fleet — New Scooters & Motorcycles for Rent | Minuit Midnight',
      fleetDesc:
        'Scooters, maxi-scooters and adventure bikes for rent in Marrakech. 2026 vintage: SYM, Kymco, Yamaha, Honda, BMW. Fair rates, direct booking.',
      contactTitle: 'Contact — Marrakech Motorcycle Rental | Minuit Midnight',
      contactDesc:
        'Reach Minuit Midnight in Marrakech. Rue Oum Errabia · 9am–11pm daily. WhatsApp +212 6 73 14 26 72. Quote within one business day.',
    },
    nav: {
      home: 'Home',
      fleet: 'The Fleet',
      contact: 'Contact',
      menu: 'Menu',
      switchTo: 'FR',
    },
    common: {
      scroll: 'Scroll',
      est: 'Est. 2003',
      since: 'Since 2003',
      onRequest: 'On request · 48h',
      reserve: 'Book',
      request: 'Enquire',
      quote: 'Quote',
      perDay: '/ day',
      startingAt: 'From',
      year: 'Year',
      cc: 'Engine',
      seats: 'Seats',
      license: 'License',
      photoSoon: '— Photo coming',
      photoDesc:
        'New 2026 model, sourced within 48 hours through our local network.',
      fromArrow: '→',
      contactCta: 'Contact us',
      whatsappCta: 'WhatsApp us',
      formCta: 'Full contact form',
      directions: 'Get directions →',
      seeMaps: 'Open in Maps →',
      reserveWa: 'Book on WhatsApp',
      contactForm: 'Contact form',
      ourAddress: '— Find us',
    },
    hero: {
      tag: 'Marrakech · Since 2003',
      lineA: 'The finer way',
      lineB1: 'to ',
      lineBEm: 'move through',
      lineC: 'the city.',
      lede: 'Minuit Midnight. Scooter and motorcycle rental in Marrakech for over twenty years. A new fleet, a considered service, an intimate knowledge of the city.',
      ctaFleet: 'See the fleet',
      ctaContact: 'Get in touch',
    },
    story: {
      tag: 'The Story',
      num: '01',
      titleA: 'Twenty years',
      titleEm: 'knowing',
      titleB: 'the city.',
      yearsSuffix: 'Years',
      yearsFrom: '— since 2003',
      p1a: 'Founded in ',
      p1b: '2003',
      p1c: ', Minuit Midnight was built on a simple belief: moving through Marrakech is never trivial. The lanes of the Medina, the flow of Gueliz, the hotels of Hivernage. Every district has its own logic, its shortcuts, its pitfalls.',
      p2a: 'Twenty years later, we remain an ',
      p2Em: 'independent house',
      p2b: ', chosen by Moroccans returning home, discerning residents, and travellers who refuse the roulette of generic marketplaces.',
      quote: '"A scooter that knows the city is worth ten cars that lose you in it."',
      p3a: 'Our fleet is fully ',
      p3b: 'renewed in 2024',
      p3c: '. New SYMs, workshop-maintained, pick-up at the agency five minutes from Gueliz. Insurance included. Support seven days a week.',
    },
    pillars: {
      tag: 'The House',
      num: '02',
      titleA: 'Three principles.',
      titleEm: 'Twenty years kept.',
      items: [
        {
          title: 'A new fleet.',
          text: 'Fully renewed in 2024. Automatic SYMs, weekly workshop checks, new helmets provided for every ride.',
        },
        {
          title: 'Central agency.',
          text: 'Rue Oum Errabia. Five minutes from Gueliz and Hivernage. Fast pick-up, paperwork done in ten minutes.',
        },
        {
          title: 'On call, always.',
          text: 'A direct line, a real human, an answer within the hour. The city never sleeps. Neither do we.',
        },
      ],
    },
    fleetHome: {
      tag: 'The Fleet',
      num: '03',
      titleA: 'Two models.',
      titleEm: 'No compromise.',
      ctaExplore: 'Explore the fleet',
      reserveShort: 'Book →',
    },
    cta: {
      tag: 'Booking',
      num: '04',
      titleA: 'See you',
      titleEm: 'in Marrakech.',
      lede: 'A prepared scooter, the key in hand, a personal welcome. We take no more than ten new clients a day, to hold the standard.',
      waLabel: 'WhatsApp us',
      formLabel: 'Full contact form',
      orCall: 'Or call:',
    },
    fleet: {
      heroTag: 'The Fleet & The Rates',
      heroNum: '02 —',
      heroA: 'All new.',
      heroEm: '2026 vintage.',
      heroLede:
        'A curated line-up, nothing more than two years old. City scooters ready at the agency. Maxi-scooters, roadsters and cruisers sourced within 48 hours through our local network. SYM, Kymco, Yamaha, Honda, BMW.',
      stat1: 'Catalogue models',
      stat2: 'At the agency',
      stat3Value: '48h',
      stat3: 'Sourced on request',
      stat4Value: '2026',
      stat4: 'Vintage new',
      incTag: 'Included & Terms',
      incNum: 'A —',
      incTitleA: 'Straight prices.',
      incTitleEm: 'No surprises.',
      ctaTitleA: 'Ready to book?',
      ctaTitleEm: 'One word is enough.',
      ctaWa: 'Book on WhatsApp',
      ctaForm: 'Contact form',
      inclus: [
        { title: 'Third-party insurance', detail: 'Full coverage throughout the rental period.' },
        { title: 'New helmets', detail: 'Provided for rider and passenger.' },
        { title: 'Unlimited mileage', detail: 'No cap. Ride as far as you like.' },
        { title: '7-day support', detail: 'A direct line, fast response anywhere in Marrakech.' },
        { title: 'Pick-up at agency', detail: 'Rue Oum Errabia. 5 min from Gueliz and Hivernage. Open 9am to 11pm.' },
        { title: 'Flexible deposit', detail: 'Cash or card, fully refunded on return.' },
        { title: '48-hour sourcing', detail: 'T-Max, Shadow, Z900… through our local network.' },
        { title: 'Prepared the day before', detail: 'Workshop check before every pick-up.' },
      ],
    },
    contact: {
      heroTag: 'The Experience & Contact',
      heroNum: '03 —',
      heroA: "Let's talk.",
      heroEm: 'Simply.',
      heroLede:
        'A booking, a technical question, a specific request. We answer personally, within one business day. For anything urgent, WhatsApp is fastest.',
      aboutTag: 'The House',
      aboutNum: 'A —',
      aboutTitleA: 'A service made for',
      aboutTitleEmA: 'discerning',
      aboutTitleB: 'travellers.',
      aboutP1a: 'Since ',
      aboutP1b:
        '2003, Minuit Midnight has served a clientele that refuses approximation: Moroccans returning home each year, resident executives, families settled in Gueliz, travellers who arrive by word of mouth.',
      aboutP2a: 'Our approach is ',
      aboutP2Em: 'personal',
      aboutP2b:
        '. Every booking is handled by a human. Every scooter is prepared the day before. Every pick-up is on time, to the minute.',
      aboutP3:
        "We are an independent house. Not a platform, not an intermediary. That direct relationship is what has made the difference for twenty years.",
      coordTag: 'Contact details',
      coordNum: 'B —',
      coordTitleA: 'Marrakech',
      coordTitleEm: 'Gueliz',
      address: 'Address',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      hours: 'Opening hours',
      hoursLine1: 'Monday — Sunday',
      hoursLine2: '9am — 11pm · 7 days a week',
      whatsappOpen: 'Open the conversation →',
      instagram: 'Instagram',
      instagramOpen: 'View profile →',
      formTag: 'Form',
      formNum: 'C —',
      formTitle: 'Write to us.',
      formLede:
        'Tell us the model, the dates, any specific questions. We confirm within one business day with a firm offer.',
      findUs: '— Find us',
    },
    form: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      model: 'Preferred model',
      modelPlaceholder: 'SYM Jet 14 · Symphony 150…',
      arrival: 'Arrival date',
      departure: 'Departure date',
      message: 'Message',
      messagePlaceholder: 'Tell us the duration, where you are staying, any specific questions…',
      submit: 'Send the request',
      submitting: 'Sending…',
      or: 'or',
      waDirect: 'WhatsApp direct',
      sent: 'Message received. We will get back to you within one business day.',
      unknownError: 'Unknown error',
      waPrefill: 'Hello, I would like to enquire about your scooters.',
    },
    footer: {
      lede:
        'The finer way to move through Marrakech. New-model scooter and motorcycle rental for discerning travellers.',
      contactCol: 'Contact',
      addressCol: 'Address',
      navCol: 'Navigation',
      seeMaps: 'Open in Maps →',
      rights: 'All rights reserved',
      tagline: 'Made in Marrakech',
    },
    configurator: {
      tag: 'Estimate',
      num: '03·B',
      titleA: 'Estimate',
      titleEm: 'your rental.',
      lede:
        'Pick your model and duration. Live price. No surprises, no commitment. Pick-up at our agency on Rue Oum Errabia.',
      fieldModel: 'Model',
      fieldDays: 'Duration',
      dayUnit: 'day',
      daysUnit: 'days',
      totalLabel: 'Estimated total',
      waCta: 'Book this price on WhatsApp',
      waPrefill:
        'Hello, I would like to book the {model} for {days}. Estimated price: {price}. Could you confirm availability?',
    },
    reviews: {
      tag: 'Client reviews',
      num: '02·B',
      titleA: 'They',
      titleEm: 'chose us.',
      basedOn: 'Based on {n} Google reviews',
      seeAll: 'Read all reviews →',
      loading: 'Loading…',
    },
    realFleet: {
      tag: 'The real fleet',
      num: '02·C',
      titleA: 'What you',
      titleEm: 'actually',
      titleB: 'rent.',
      lede:
        'No renders. No stock photos. Our scooters, parked outside the agency, prepped the day before every rental.',
      altText:
        'Minuit Midnight scooters parked at night outside the Marrakech agency',
      altText2:
        'Minuit Midnight scooters front view with Moto Rent branding and phone numbers, under the neon lights of Marrakech',
      cta: 'See the full fleet',
    },
    leaveReview: {
      tag: '— Thank you',
      titleA: 'Have you',
      titleEm: 'ridden with us?',
      lede:
        'Two minutes to share your experience. Every review counts, and we read every one.',
      cta: 'Leave a Google review',
      footerLink: 'Leave a Google review',
    },
  },
  ar: {
    meta: {
      homeTitle: 'تأجير دراجات نارية وسكوترات بمراكش | Minuit Midnight',
      homeDesc:
        'تأجير سكوترات ودراجات نارية جديدة بمراكش منذ 2003. الوكالة بزنقة أم الربيع، على بعد خمس دقائق من كليز. التأمين مشمول. احجز عبر واتساب.',
      fleetTitle: 'الأسطول — سكوترات ودراجات نارية جديدة | Minuit Midnight',
      fleetDesc:
        'سكوترات، ماكسي سكوترات ودراجات المغامرة للإيجار بمراكش. طراز 2026: سيم، كايمكو، ياماها، هوندا، بي إم دبليو.',
      contactTitle: 'التواصل — تأجير الدراجات بمراكش | Minuit Midnight',
      contactDesc:
        'تواصل مع Minuit Midnight بمراكش. زنقة أم الربيع · من 9 صباحاً إلى 11 مساءً، 7 أيام/7. واتساب ‎+212 6 73 14 26 72.',
    },
    nav: {
      home: 'الرئيسية',
      fleet: 'الأسطول',
      contact: 'تواصل',
      menu: 'القائمة',
      switchTo: 'FR',
    },
    common: {
      scroll: 'تصفّح',
      est: 'منذ 2003',
      since: 'منذ 2003',
      onRequest: 'حسب الطلب · 48 ساعة',
      reserve: 'احجز',
      request: 'استفسر',
      quote: 'عرض سعر',
      perDay: '/ يوم',
      startingAt: 'ابتداءً من',
      year: 'السنة',
      cc: 'السعة',
      seats: 'المقاعد',
      license: 'الرخصة',
      photoSoon: '— الصورة قريباً',
      photoDesc:
        'موديل جديد 2026، متوفّر عبر شبكتنا المحلية خلال 48 ساعة.',
      fromArrow: '←',
      contactCta: 'تواصل معنا',
      whatsappCta: 'واتساب مباشر',
      formCta: 'استمارة كاملة',
      directions: 'الاتجاهات ←',
      seeMaps: 'افتح في الخرائط ←',
      reserveWa: 'احجز عبر واتساب',
      contactForm: 'استمارة التواصل',
      ourAddress: '— اعثر علينا',
    },
    hero: {
      tag: 'مراكش · منذ 2003',
      lineA: 'أرقى أسلوبٍ',
      lineB1: 'للتنقّل ',
      lineBEm: 'في',
      lineC: 'المدينة.',
      lede: 'Minuit Midnight. تأجير سكوترات بمراكش منذ أكثر من عشرين عاماً. أسطول جديد، خدمة رفيعة، ومعرفة حميمة بالمدينة.',
      ctaFleet: 'شاهد الأسطول',
      ctaContact: 'تواصل معنا',
    },
    story: {
      tag: 'الحكاية',
      num: '01',
      titleA: 'عشرون عاماً',
      titleEm: 'من معرفة',
      titleB: 'المدينة.',
      yearsSuffix: 'سنة',
      yearsFrom: '— منذ 2003',
      p1a: 'تأسّست عام ',
      p1b: '2003',
      p1c: '، وقد وُلدت Minuit Midnight من قناعة راسخة: التنقّل في مراكش ليس أمراً هيّناً. أزقّة المدينة العتيقة، سلاسة كليز، وفنادق الهيفرناج. لكلّ حيٍّ منطقُه، اختصاراتُه، ومطبّاته.',
      p2a: 'بعد عشرين عاماً، ما زلنا ',
      p2Em: 'مؤسّسة مستقلّة',
      p2b: '، يختارها المغاربة المقيمون بالخارج في زياراتهم، والمقيمون الأذواق الرفيعة، والمسافرون الذين يرفضون عشوائيّة المنصّات العامّة.',
      quote: '«سكوتر يعرف المدينة يعادل عشر سيّاراتٍ تُتيهك فيها.»',
      p3a: 'أسطولنا ',
      p3b: 'مُجدَّد بالكامل عام 2024',
      p3c: ': سيم جديدة، صيانة في الورشة، استلام من الوكالة على بعد خمس دقائق من كليز. التأمين مشمول. مساندة سبعة أيّام في الأسبوع.',
    },
    pillars: {
      tag: 'الدار',
      num: '02',
      titleA: 'ثلاثة مبادئ.',
      titleEm: 'عشرون عاماً من الوفاء.',
      items: [
        {
          title: 'أسطول جديد.',
          text: 'تجديد شامل عام 2024. سيم أوتوماتيكيّة، فحص أسبوعيّ في الورشة، وخوذات جديدة مع كلّ رحلة.',
        },
        {
          title: 'وكالة مركزيّة.',
          text: 'زنقة أم الربيع. على بعد خمس دقائق من كليز والهيفرناج. استلام سريع، أوراق موقّعة في عشر دقائق.',
        },
        {
          title: 'مساندة 7/7.',
          text: 'خطٌّ مباشر، إنسانٌ حقيقيّ، وجوابٌ في أقلّ من ساعة. المدينة لا تنام، ونحن كذلك.',
        },
      ],
    },
    fleetHome: {
      tag: 'الأسطول',
      num: '03',
      titleA: 'موديلان.',
      titleEm: 'بلا تنازل.',
      ctaExplore: 'استكشف الأسطول',
      reserveShort: 'احجز ←',
    },
    cta: {
      tag: 'الحجز',
      num: '04',
      titleA: 'لقاؤنا',
      titleEm: 'بمراكش.',
      lede: 'سكوتر مُجهَّز، مفتاحٌ في اليد، واستقبالٌ شخصيّ. لا نستقبل أكثر من عشرة زبائن جدد في اليوم، للحفاظ على مستوانا.',
      waLabel: 'واتساب مباشر',
      formLabel: 'استمارة كاملة',
      orCall: 'أو اتصل:',
    },
    fleet: {
      heroTag: 'الأسطول والتعريفة',
      heroNum: '02 —',
      heroA: 'جديد بالكامل.',
      heroEm: 'طراز 2026.',
      heroLede:
        'تشكيلة منتقاة، لا آلة تتجاوز عامين. سكوترات المدينة متوفّرة بالوكالة. ماكسي سكوترات، رودسترز وكروزرز عبر شبكتنا المحلية خلال 48 ساعة. سيم، كايمكو، ياماها، هوندا، بي إم دبليو.',
      stat1: 'موديل في الكاتالوغ',
      stat2: 'بالوكالة',
      stat3Value: '48س',
      stat3: 'توفير حسب الطلب',
      stat4Value: '2026',
      stat4: 'طراز جديد',
      incTag: 'مشمول والشروط',
      incNum: 'A —',
      incTitleA: 'أسعار واضحة.',
      incTitleEm: 'بلا مفاجآت.',
      ctaTitleA: 'استعدادٌ للحجز؟',
      ctaTitleEm: 'كلمة واحدة تكفي.',
      ctaWa: 'احجز عبر واتساب',
      ctaForm: 'استمارة التواصل',
      inclus: [
        { title: 'تأمين المسؤوليّة المدنيّة', detail: 'تغطية كاملة طوال فترة الإيجار.' },
        { title: 'خوذات جديدة', detail: 'مقدَّمة للسائق والراكب.' },
        { title: 'كيلومترات غير محدودة', detail: 'بلا سقف. اقطع المسافة التي تشاء.' },
        { title: 'مساندة 7 أيّام', detail: 'خطٌّ مباشر، تدخّل سريع في أرجاء مراكش.' },
        { title: 'الاستلام من الوكالة', detail: 'زنقة أم الربيع. 5 دقائق من كليز والهيفرناج. مفتوحة من 9 إلى 23.' },
        { title: 'ضمان مرن', detail: 'نقداً أو بالبطاقة، يُسترَدّ بالكامل عند الإرجاع.' },
        { title: 'توفير خلال 48 ساعة', detail: 'تي ماكس، شادو، Z900... عبر شبكتنا المحلّية.' },
        { title: 'الآلة مُجهَّزة اليوم السابق', detail: 'فحص في الورشة قبل كلّ استلام.' },
      ],
    },
    contact: {
      heroTag: 'التجربة والتواصل',
      heroNum: '03 —',
      heroA: 'لِنتحدَّث.',
      heroEm: 'ببساطة.',
      heroLede:
        'حجزٌ، سؤالٌ تقنيّ، طلبٌ خاصّ. نجيب شخصيّاً في أقلّ من 24 ساعة عمل. للحالات المستعجلة، واتساب هو الأسرع.',
      aboutTag: 'الدار',
      aboutNum: 'A —',
      aboutTitleA: 'خدمة مصمَّمة',
      aboutTitleEmA: 'للمسافرين',
      aboutTitleB: 'الأذواق الرفيعة.',
      aboutP1a: 'منذ ',
      aboutP1b:
        '2003، تخدم Minuit Midnight زبائنَ يرفضون التقريب: مغاربة العالم في زياراتهم السنويّة، مسؤولون مقيمون، عائلاتٌ مستقرّة في كليز، ومسافرون يصلون بتوصية شخصيّة.',
      aboutP2a: 'منهجنا ',
      aboutP2Em: 'شخصيّ',
      aboutP2b:
        '. كلّ حجز يعالجه إنسان. كلّ سكوتر يُجهَّز اليوم السابق. كلّ استلام يحترم الموعد إلى الدقيقة.',
      aboutP3:
        'نحن مؤسّسة مستقلّة. لسنا منصّة، لسنا وسيطاً. هذه العلاقة المباشرة هي ما صنع الفارق منذ عشرين عاماً.',
      coordTag: 'معلومات التواصل',
      coordNum: 'B —',
      coordTitleA: 'مراكش',
      coordTitleEm: 'كليز',
      address: 'العنوان',
      phone: 'الهاتف',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      hours: 'أوقات العمل',
      hoursLine1: 'الإثنين — الأحد',
      hoursLine2: 'من 09:00 إلى 23:00 · سبعة أيّام في الأسبوع',
      whatsappOpen: 'افتح المحادثة ←',
      instagram: 'إنستغرام',
      instagramOpen: 'افتح البروفايل ←',
      formTag: 'الاستمارة',
      formNum: 'C —',
      formTitle: 'اكتب لنا.',
      formLede:
        'صِف حاجتك : الموديل، التواريخ، أيّ أسئلة خاصّة. نؤكّد في أقلّ من 24 ساعة عمل بعرض حازم.',
      findUs: '— اعثر علينا',
    },
    form: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      model: 'الموديل المطلوب',
      modelPlaceholder: 'SYM Jet 14 · Symphony 150…',
      arrival: 'تاريخ الوصول',
      departure: 'تاريخ المغادرة',
      message: 'الرسالة',
      messagePlaceholder: 'حدّد المدّة، مكان إقامتك، وأيّ أسئلة خاصّة…',
      submit: 'أرسل الطلب',
      submitting: 'جارٍ الإرسال…',
      or: 'أو',
      waDirect: 'واتساب مباشر',
      sent: 'تمّ استلام رسالتك. سنعود إليك في أقلّ من 24 ساعة عمل.',
      unknownError: 'خطأ غير معروف',
      waPrefill: 'السلام عليكم، أودّ الاستفسار عن السكوترات لديكم.',
    },
    footer: {
      lede:
        'أرقى وسيلة للتنقّل في مراكش. تأجير سكوترات ودراجات نارية جديدة للمسافرين الأذواق الرفيعة.',
      contactCol: 'تواصل',
      addressCol: 'العنوان',
      navCol: 'التصفّح',
      seeMaps: 'افتح في الخرائط ←',
      rights: 'جميع الحقوق محفوظة',
      tagline: 'صُنع في مراكش',
    },
    configurator: {
      tag: 'التقدير',
      num: '03·B',
      titleA: 'قدّر',
      titleEm: 'إيجارك.',
      lede:
        'اختر الموديل والمدّة. السعر مباشر. بلا مفاجآت، بلا التزام. الاستلام من الوكالة بزنقة أم الربيع.',
      fieldModel: 'الموديل',
      fieldDays: 'المدّة',
      dayUnit: 'يوم',
      daysUnit: 'أيّام',
      totalLabel: 'المجموع المقدَّر',
      waCta: 'احجز هذا السعر عبر واتساب',
      waPrefill:
        'السلام عليكم، أودّ حجز {model} لمدّة {days}. السعر المقدَّر: {price}. هل يمكنكم تأكيد التوفّر؟',
    },
    reviews: {
      tag: 'آراء الزبائن',
      num: '02·B',
      titleA: 'اختارونا',
      titleEm: 'لسبب.',
      basedOn: 'استناداً إلى {n} تقييماً على Google',
      seeAll: 'شاهد كل التقييمات ←',
      loading: 'جارٍ التحميل…',
    },
    realFleet: {
      tag: 'الأسطول الحقيقي',
      num: '02·C',
      titleA: 'ما',
      titleEm: 'تستأجره',
      titleB: 'حقّاً.',
      lede:
        'لا صور تركيبيّة. لا صور كاتالوغ. سكوتراتنا، متوقّفة أمام الوكالة، مُجهَّزة في اليوم السابق لكلّ إيجار.',
      altText:
        'سكوترات Minuit Midnight متوقّفة ليلاً أمام الوكالة في مراكش',
      altText2:
        'سكوترات Minuit Midnight من الأمام مع سلات Moto Rent وأرقام الهاتف، تحت أضواء النيون في مراكش',
      cta: 'شاهد الأسطول كاملاً',
    },
    leaveReview: {
      tag: '— شكراً',
      titleA: 'هل استأجرت',
      titleEm: 'منّا سابقاً؟',
      lede:
        'دقيقتان لتشارك تجربتك. كلّ تقييم يهمّنا، ونجيب على الجميع.',
      cta: 'اترك تقييماً على Google',
      footerLink: 'اترك تقييماً على Google',
    },
  },
}

export function useDict(locale: Locale) {
  return dict[locale]
}
