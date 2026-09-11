# Midnight Minuit

Site officiel — location de scooters à Marrakech depuis 2003.

## Stack
Next.js 15 · React 19 · Tailwind CSS 3 · TypeScript.
Typographies : Fraunces (display) · Geist Sans/Mono (body + specs).

## Dev
```powershell
npm install
npm run dev
```
Ouvrir http://localhost:3000

## Structure
- `src/app/` — routes (Accueil, `/flotte`, `/contact`)
- `src/components/` — Nav, Footer, ScooterCard, ContactForm, Grain
- `src/lib/` — config (contact, WhatsApp) et data scooters
- `public/` — logo, photos, vidéo hero

## Contact
- Téléphone : +212 6 73 14 26 72
- Adresse : Rue Oum Errebia, Gueliz, Marrakech

## À faire avant prod
- Brancher un vrai provider email dans `src/app/api/contact/route.ts` (Resend, Postmark, nodemailer)
- Remplacer `contact@midnight-minuit.ma` par la vraie adresse dans `src/lib/config.ts`
- Ajouter favicon et OG image dans `public/`
- Vérifier consent RGPD si tracking ajouté plus tard
