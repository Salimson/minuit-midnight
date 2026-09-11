// Honda Forza 350 : pipeline dédié (pas d'IA).
// Source studio blanche → transparence par distance colorimétrique
// (tolère l'anti-aliasing sans manger les bords chromés).
// Run: node scripts/clean-honda.mjs

import sharp from 'sharp'
import path from 'node:path'

const SRC = path.resolve('public/motos/_originals/honda-forza-350.png')
const DST = path.resolve('public/motos/honda-forza-350-v3.png')

const NEAR_WHITE = 245   // >= : totalement transparent
const EDGE_START = 225   // <= : totalement opaque
                          // entre les deux : alpha progressif (anti-alias propre)

const img = sharp(SRC).ensureAlpha()
const { width, height } = await img.metadata()
const { data } = await img.raw().toBuffer({ resolveWithObject: true })

const out = Buffer.from(data)
for (let i = 0; i < out.length; i += 4) {
  const r = out[i], g = out[i + 1], b = out[i + 2]
  const minChannel = Math.min(r, g, b)
  // On agit uniquement sur les pixels quasi-neutres et clairs
  const isNeutral = Math.max(r, g, b) - minChannel < 12
  if (!isNeutral) continue
  if (minChannel >= NEAR_WHITE) {
    out[i + 3] = 0
  } else if (minChannel > EDGE_START) {
    const t = (minChannel - EDGE_START) / (NEAR_WHITE - EDGE_START)
    out[i + 3] = Math.round(255 * (1 - t))
  }
}

const tmp = DST + '.tmp'
await sharp(out, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(tmp)

await sharp(tmp)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
  .png({ compressionLevel: 9 })
  .toFile(DST)

const meta = await sharp(DST).metadata()
console.log(`✓ honda-forza-350-v3.png  ${meta.width}x${meta.height}`)
