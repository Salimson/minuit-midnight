// Retire le fond (blanc/gris studio) des images motos.
// Détecte auto la couleur de fond via les 4 coins, applique flood fill + alpha.
// Run: node scripts/remove-bg.mjs

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/motos')
// Tolérance : distance max (0-255) entre pixel et couleur BG pour être flooded
const TOLERANCE = 45
// Feathering : pixels près du bord bg deviennent semi-transparents
const FEATHER = 12

async function processImage(file) {
  const src = path.join(DIR, file)
  const outName = file.replace(/\.(jpe?g|webp|png)$/i, '.png')
  const dst = path.join(DIR, `_out_${outName}`)

  const img = sharp(src).ensureAlpha()
  const meta = await img.metadata()
  const { width, height } = meta
  const { data } = await img.raw().toBuffer({ resolveWithObject: true })

  // 4 coins pour détecter couleur bg
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ].map(([x, y]) => {
    const i = (y * width + x) * 4
    return [data[i], data[i + 1], data[i + 2]]
  })
  // Moyenne des coins comme couleur bg de référence
  const bg = [0, 1, 2].map((c) => Math.round(corners.reduce((s, cn) => s + cn[c], 0) / 4))

  // File-based flood fill par distance couleur
  const out = Buffer.from(data)
  let removed = 0
  for (let i = 0; i < out.length; i += 4) {
    const dr = out[i] - bg[0]
    const dg = out[i + 1] - bg[1]
    const db = out[i + 2] - bg[2]
    const dist = Math.sqrt(dr * dr + dg * dg + db * db)
    if (dist < TOLERANCE) {
      out[i + 3] = 0 // fully transparent
      removed++
    } else if (dist < TOLERANCE + FEATHER) {
      // feathering : alpha proportionnel à la distance
      const t = (dist - TOLERANCE) / FEATHER
      out[i + 3] = Math.round(t * 255)
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(dst)
  await fs.rename(dst, path.join(DIR, outName))
  if (outName !== file) {
    await fs.unlink(src).catch(() => {})
  }
  const pct = ((removed / (width * height)) * 100).toFixed(1)
  console.log(`✓ ${file} → ${outName}  bg=rgb(${bg.join(',')})  removed ${pct}%`)
  return outName
}

const files = (await fs.readdir(DIR)).filter((f) =>
  /\.(jpe?g|webp|png)$/i.test(f) && !f.startsWith('_')
)
console.log(`Traitement de ${files.length} fichier(s)…`)
for (const f of files) {
  try {
    await processImage(f)
  } catch (e) {
    console.error(`✗ ${f} : ${e.message}`)
  }
}
console.log('\nDone.')
