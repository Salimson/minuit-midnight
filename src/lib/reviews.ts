// ─────────────────────────────────────────────────────────────
// Avis clients statiques — édités à la main depuis la fiche Google Business.
//
// Pourquoi ici et pas via l'API Google Places : le tier gratuit exige une
// carte bancaire, et pour un business local avec 5-10 nouveaux avis / an,
// une mise à jour manuelle trimestrielle est largement suffisante.
//
// Bascule automatique : si `GOOGLE_PLACES_API_KEY` est défini en env, la
// route /api/reviews prend les vrais avis Google et ignore ce fichier.
//
// ─────────────────────────────────────────────────────────────
// COMMENT AJOUTER UN AVIS :
//   1. Va sur ta fiche Google Business, section "Avis"
//   2. Copie l'avis : nom auteur, note, texte, date relative ("il y a 2 mois")
//   3. Ajoute une entrée dans REVIEWS_FR ci-dessous
//   4. Traduis ou reformule en EN et AR (ou laisse en FR — Google traduit
//      automatiquement selon la langue de l'utilisateur si tu actives l'API un jour)
//   5. Ajuste AGGREGATE (moyenne + total avis) en cohérence avec la fiche
// ─────────────────────────────────────────────────────────────

export type StaticReview = {
  author: string
  rating: number       // 1 → 5
  text: string
  date: string         // format relatif : "il y a 3 semaines", "3 weeks ago"
}

export type StaticReviews = {
  fr: StaticReview[]
  en: StaticReview[]
  ar: StaticReview[]
}

// Note moyenne + total d'avis affichés en header de la section.
// Source : fiche Google Business "Minuit midnight" (à maintenir cohérent).
export const AGGREGATE = {
  average: 5.0,
  total: 4,
}

// ── AVIS RÉELS ────────────────────────────────────────────────
// Extraits de la fiche Google Business. À mettre à jour tous les 3-6 mois
// (nouveaux avis + réajustement du total dans AGGREGATE ci-dessus).
// Les textes originaux (FR/EN/emoji) sont traduits dans les autres langues
// à la manière de Google (translation-friendly display).

export const REVIEWS: StaticReviews = {
  fr: [
    {
      author: 'Khaled Elhabibi',
      rating: 5,
      text: 'Merci pour votre excellent service.',
      date: 'il y a 8 mois',
    },
    {
      author: 'khaled freeman',
      rating: 5,
      text: 'Les meilleurs… merci.',
      date: 'il y a 8 mois',
    },
    {
      author: 'Dounia',
      rating: 5,
      text: 'Merci 🥰🤩',
      date: 'il y a 8 mois',
    },
  ],
  en: [
    {
      author: 'Khaled Elhabibi',
      rating: 5,
      text: 'Thank you for your excellent service.',
      date: '8 months ago',
    },
    {
      author: 'khaled freeman',
      rating: 5,
      text: 'Best one… thank you.',
      date: '8 months ago',
    },
    {
      author: 'Dounia',
      rating: 5,
      text: 'Thank you 🥰🤩',
      date: '8 months ago',
    },
  ],
  ar: [
    {
      author: 'خالد الحبيبي',
      rating: 5,
      text: 'شكراً لكم على خدمتكم الممتازة.',
      date: 'منذ 8 أشهر',
    },
    {
      author: 'خالد فريمان',
      rating: 5,
      text: 'الأفضل… شكراً.',
      date: 'منذ 8 أشهر',
    },
    {
      author: 'دنيا',
      rating: 5,
      text: 'شكراً 🥰🤩',
      date: 'منذ 8 أشهر',
    },
  ],
}
