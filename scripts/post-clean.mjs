// Post-processing des PNG bg-removed :
// 1. Threshold alpha (retire pixels semi-transparents = shadows résiduelles)
// 2. Auto-trim les zones vides autour
// Run: node scripts/post-clean.mjs

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/motos')
// Seuil alpha : pixels < seuil deviennent totalement transparents (retire ombres)
const ALPHA_THRESHOLD = 180

const files = (await fs.readdir(DIR)).filter(
  (f) => f.endsWith('.png') && !f.startsWith('_')
)

for (const f of files) {
  const src = path.join(DIR, f)
  const img = sharp(src).ensureAlpha()
  const { width, height } = await img.metadata()
  const { data } = await img.raw().toBuffer({ resolveWithObject: true })

  // 1. Threshold alpha
  const out = Buffer.from(data)
  let killed = 0
  for (let i = 0; i < out.length; i += 4) {
    if (out[i + 3] < ALPHA_THRESHOLD) {
      out[i + 3] = 0
      killed++
    } else {
      // Boost les alphas quasi-opaques à 255 pour edges nets
      if (out[i + 3] > 240) out[i + 3] = 255
    }
  }

  // 2. Écrit puis auto-trim
  const tmp = path.join(DIR, `_tmp_${f}`)
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp)

  // Auto-trim les zones transparentes
  await sharp(tmp)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
    .png({ compressionLevel: 9 })
    .toFile(src + '.tmp')

  await fs.rename(src + '.tmp', src)
  await fs.unlink(tmp)

  const pct = ((killed / (width * height)) * 100).toFixed(1)
  const newMeta = await sharp(src).metadata()
  console.log(
    `✓ ${f}  killed=${pct}%  ${width}x${height} → ${newMeta.width}x${newMeta.height}`
  )
}
console.log('\nDone.')
