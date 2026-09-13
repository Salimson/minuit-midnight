// NAP (Name / Address / Phone) — cohérence critique avec la fiche Google Business.
// À l'identique partout (footer, contact, JSON-LD, meta) pour le SEO local.
export const CONTACT = {
  // Nom légal complet — utilisé dans le JSON-LD et le footer NAP
  legalName: 'Minuit Midnight Location Moto Marrakech',
  // Nom court — utilisé partout dans le design
  brandName: 'Minuit Midnight',

  // Ligne 1 (primaire — WhatsApp)
  phoneDisplay: '+212 6 73 14 26 72',
  phoneE164: '+212673142672',
  phoneRaw: '212673142672',
  // Ligne 2 (secondaire — appels)
  phone2Display: '+212 7 09 96 67 02',
  phone2E164: '+212709966702',
  phone2Raw: '212709966702',

  street: 'Rue Oum Errabia',
  city: 'Marrakesh',
  postalCode: '40000',
  country: 'Maroc',
  countryEn: 'Morocco',
  countryCode: 'MA',
  address: 'Rue Oum Errabia, Marrakesh 40000, Maroc',
  addressShort: 'Rue Oum Errabia · Marrakesh',

  email: 'contact@midnight-minuit.ma',

  // Coordonnées GPS — fiche Google Business (cohérence NAP)
  geo: { lat: 31.63136391300907, lng: -8.001854797770044 },

  // Horaires uniformes : 9h → 23h, 7/7
  openingHoursDisplay: '09:00 — 23:00 · 7/7',
  openingHoursSchema: 'Mo-Su 09:00-23:00',

  instagram: 'minuitmidnightlocation',
  instagramUrl: 'https://www.instagram.com/minuitmidnightlocation/',

  // Fiche Google Business Profile (avis, horaires, itinéraire)
  mapsLink: 'https://share.google/Y2sD1cADfefLjCb5z',
  // Utilisé par l'iframe embed
  mapsEmbedQuery: 'Rue+Oum+Errabia+Marrakesh',

  // Google Place ID — public, non-secret. Sert à la route /api/reviews et
  // au JSON-LD LocalBusiness comme identifier.google_place_id.
  googlePlaceId: 'ChIJRVv1e63vrw0RThjuOzLMcoI',

  // Lien direct pour laisser un avis Google (pré-ouvre le formulaire d'avis
  // sur la fiche — un seul clic pour l'utilisateur).
  googleReviewLink:
    'https://search.google.com/local/writereview?placeid=ChIJRVv1e63vrw0RThjuOzLMcoI',
}

export const SITE = {
  url: 'https://midnight-minuit.ma',
  brand: 'Minuit Midnight',
  ogImage: '/hero.jpg',
}

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`
}
