#!/usr/bin/env node
/**
 * Convertit les PNGs motos en WebP (qualité 88, effort max).
 * Gain typique : -50 à -70% par fichier.
 *
 * Ne touche pas :
 *   - _originals/ (backup source haute déf)
 *   - _previews/  (aperçus historiques)
 *   - .jpg / .jpeg (les vraies photos, déjà bien compressées)
 *
 * Usage :
 *   node scripts/png-to-webp.mjs
 */

import { readdir, stat, unlink } from 'node:fs/promises'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MOTOS_DIR = join(__dirname, '..', 'public', 'motos')

const SKIP_DIRS = new Set(['_originals', '_previews'])

/** @param {number} bytes */
const kb = (bytes) => (bytes / 1024).toFixed(1) + ' KB'

const files = await readdir(MOTOS_DIR, { withFileTypes: true })

let totalBefore = 0
let totalAfter = 0
let converted = 0

for (const entry of files) {
  if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue
  if (!entry.isFile()) continue
  if (!entry.name.endsWith('.png')) continue

  const pngPath = join(MOTOS_DIR, entry.name)
  const webpPath = pngPath.replace(/\.png$/, '.webp')
  const name = basename(entry.name)

  const { size: sizeBefore } = await stat(pngPath)
  totalBefore += sizeBefore

  await sharp(pngPath)
    .webp({ quality: 88, effort: 6 })
    .toFile(webpPath)

  const { size: sizeAfter } = await stat(webpPath)
  totalAfter += sizeAfter
  converted++

  const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0)
  console.log(`  ${name.padEnd(35)} ${kb(sizeBefore).padStart(10)} → ${kb(sizeAfter).padStart(10)}  (-${pct}%)`)

  // Supprime le PNG source
  await unlink(pngPath)
}

const totalPct = ((1 - totalAfter / totalBefore) * 100).toFixed(0)
console.log()
console.log(`✓ ${converted} images converties`)
console.log(`  Total : ${kb(totalBefore)} → ${kb(totalAfter)}  (-${totalPct}%)`)
