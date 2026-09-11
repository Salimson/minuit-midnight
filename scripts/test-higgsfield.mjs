// Test 1 génération pour valider le schema de réponse.
// Run: node --env-file=.env.local scripts/test-higgsfield.mjs

const KEY = process.env.HIGGSFIELD_API_KEY
if (!KEY) throw new Error('HIGGSFIELD_API_KEY manquante (mets-la dans .env.local)')

const BASE = 'https://api.higgsfield.ai'
const HEADERS = {
  Authorization: `Key ${KEY}`,
  'Content-Type': 'application/json',
}

const body = {
  prompt:
    "Studio product photography of a brand new 2026 Yamaha T-Max 560 maxi-scooter, side view profile, sport black and grey color, isolated on pure white background, no shadow, sharp focus, photorealistic, high detail, catalog e-commerce style, 4k",
  num_images: 1,
  resolution: '720p',
  aspect_ratio: '4:3',
}

console.log('POST /higgsfield-ai/soul/v2/standard ...')
const r = await fetch(`${BASE}/higgsfield-ai/soul/v2/standard`, {
  method: 'POST',
  headers: HEADERS,
  body: JSON.stringify(body),
})
console.log('HTTP', r.status)
const initial = await r.json()
console.log('Initial response:\n', JSON.stringify(initial, null, 2))

if (!r.ok) process.exit(1)

const statusUrl = initial.status_url || `${BASE}/requests/${initial.request_id}/status`
console.log('\nPolling', statusUrl)

let attempts = 0
const start = Date.now()
while (attempts < 60) {
  await new Promise((r) => setTimeout(r, 3000))
  attempts++
  const sr = await fetch(statusUrl, { headers: HEADERS })
  const status = await sr.json()
  const elapsed = Math.round((Date.now() - start) / 1000)
  console.log(`[${elapsed}s attempt ${attempts}] status=${status.status}`)

  if (['completed', 'succeeded', 'success', 'done'].includes(status.status)) {
    console.log('\n=== FINAL RESPONSE (garde ce schema en mémoire) ===')
    console.log(JSON.stringify(status, null, 2))
    process.exit(0)
  }
  if (['failed', 'error', 'canceled', 'cancelled'].includes(status.status)) {
    console.log('ÉCHEC:', JSON.stringify(status, null, 2))
    process.exit(1)
  }
}
console.log('TIMEOUT 3 min — abandon polling')
process.exit(2)
