// Vrai bg-removal via AI (imgly, modèle ONNX local)
// Priorise les fichiers dans _originals/, fallback vers l'existant
// Run: node scripts/remove-bg-ai.mjs

import { removeBackground } from '@imgly/background-removal-node'
import fs from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/motos')
const ORIG = path.join(DIR, '_originals')

// Liste des motos + nom de sortie souhaité (toujours .png)
const targets = [
  'sym-jet',
  'sym-symphony-150',
  'kymco-agility-125',
  'kymco-people-s-150',
  'yamaha-tmax-560',
  'yamaha-xmax-300',
  'honda-forza-350',
  'bmw-r1300gs',
]

async function findSource(base) {
  // Cherche d'abord dans _originals/, puis dans public/motos/
  const exts = ['.jpg', '.jpeg', '.png', '.webp']
  for (const dir of [ORIG, DIR]) {
    for (const ext of exts) {
      const p = path.join(dir, base + ext)
      try {
        await fs.access(p)
        return p
      } catch {}
    }
  }
  return null
}

for (const base of targets) {
  const src = await findSource(base)
  if (!src) {
    console.log(`✗ ${base} : introuvable`)
    continue
  }
  const dst = path.join(DIR, base + '.png')
  console.log(`… ${base}  (from ${path.relative(DIR, src)})`)

  try {
    const buf = await fs.readFile(src)
    const ext = path.extname(src).toLowerCase()
    const mime =
      ext === '.png' ? 'image/png'
      : ext === '.webp' ? 'image/webp'
      : 'image/jpeg'
    const blob = new Blob([buf], { type: mime })
    const result = await removeBackground(blob)
    const outBuf = Buffer.from(await result.arrayBuffer())
    await fs.writeFile(dst, outBuf)
    console.log(`✓ ${base} → ${outBuf.length} bytes`)
  } catch (e) {
    console.error(`✗ ${base} : ${e.message}`)
  }
}
console.log('\nDone.')
