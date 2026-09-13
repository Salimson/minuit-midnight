#!/usr/bin/env node
/**
 * Génère les icons Next.js App Router à partir de public/logo.png :
 *   - src/app/icon.png        (512×512) → favicon moderne, browsers & PWA
 *   - src/app/apple-icon.png  (180×180) → écran d'accueil iOS
 *
 * Next.js les détecte automatiquement et injecte les balises HTML correctes.
 * Le fichier public/logo.png reste intact pour Nav / Footer.
 *
 * Usage : node scripts/gen-favicons.mjs
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LOGO = join(__dirname, '..', 'public', 'logo.png')
const APP = join(__dirname, '..', 'src', 'app')

// icon.png — favicon principal. 512×512 est la taille recommandée
// (Next.js resize à 32×32 pour la balise favicon selon le browser).
await sharp(LOGO)
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(join(APP, 'icon.png'))

// apple-icon.png — écran d'accueil iOS. 180×180 est la spec Apple.
// Fond ink car iOS n'affiche pas la transparence pour cet icon.
await sharp(LOGO)
  .resize(180, 180, { fit: 'contain', background: { r: 42, g: 25, b: 18, alpha: 1 } })
  .flatten({ background: { r: 42, g: 25, b: 18 } })
  .png({ compressionLevel: 9 })
  .toFile(join(APP, 'apple-icon.png'))

console.log('✓ src/app/icon.png (512×512, transparent)')
console.log('✓ src/app/apple-icon.png (180×180, fond ink)')
