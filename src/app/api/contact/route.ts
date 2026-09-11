import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Payload invalide' }, { status: 400 })
  }

  const { name, email, message } = data as Record<string, string>
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  // Log serveur en dev — brancher plus tard Resend/Postmark/nodemailer
  console.log('[CONTACT]', new Date().toISOString(), {
    name, email,
    phone: data.phone,
    model: data.model,
    arrival: data.arrival,
    departure: data.departure,
    message,
  })

  return NextResponse.json({ ok: true })
}
