#!/usr/bin/env node
/**
 * Génère les QR codes de Minuit Midnight :
 *   - public/qr/site.png       (1024x1024, ink/cream, print quality)
 *   - public/qr/site.svg       (scale infini, print/web)
 *   - public/qr/review.png     (lien direct avis Google, pour stickers post-location)
 *   - public/qr/review.svg
 *
 * Palette : ink (#2A1912 — chocolat chaud) sur cream (#FFF5EB — ivoire chaud).
 * Correction d'erreur H = ~30% pour rester lisible même si logo/coin abîmé.
 *
 * Usage : node scripts/gen-qr-codes.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'qr')

// Palette Minuit Midnight (identique globals.css)
const COLORS = {
  dark: '#2A1912', // ink
  light: '#FFF5EB', // cream
}

const OPTIONS_PNG = {
  errorCorrectionLevel: 'H',
  type: 'png',
  margin: 3,
  width: 1024,
  color: {
    dark: COLORS.dark,
    light: COLORS.light,
  },
}

const OPTIONS_SVG = {
  errorCorrectionLevel: 'H',
  type: 'svg',
  margin: 3,
  width: 1024,
  color: {
    dark: COLORS.dark,
    light: COLORS.light,
  },
}

const targets = [
  {
    slug: 'site',
    url: 'https://midnight-minuit.ma',
    label: 'Site web',
  },
  {
    slug: 'review',
    url:
      'https://search.google.com/local/writereview?placeid=ChIJRVv1e63vrw0RThjuOzLMcoI',
    label: 'Avis Google',
  },
]

await mkdir(OUT_DIR, { recursive: true })

for (const t of targets) {
  const pngPath = join(OUT_DIR, `${t.slug}.png`)
  const svgPath = join(OUT_DIR, `${t.slug}.svg`)

  await QRCode.toFile(pngPath, t.url, OPTIONS_PNG)

  const svg = await QRCode.toString(t.url, OPTIONS_SVG)
  await writeFile(svgPath, svg, 'utf-8')

  console.log(`✓ ${t.label.padEnd(15)} → ${t.slug}.png + ${t.slug}.svg`)
  console.log(`  ${t.url}`)
}

console.log('\n✓ QR codes dans public/qr/')
console.log('  Utilisables directement : https://midnight-minuit.ma/qr/site.png')
