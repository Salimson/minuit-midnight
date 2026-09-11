'use client'

import { useState } from 'react'
import { whatsappLink } from '@/lib/config'
import { dict, type Locale } from '@/lib/i18n'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ locale = 'fr' }: { locale?: Locale }) {
  const t = dict[locale].form
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error((await res.json())?.error ?? t.unknownError)
      setStatus('sent')
      form.reset()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.unknownError)
      setStatus('error')
    }
  }

  const wa = whatsappLink(t.waPrefill)

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label={t.name} name="name" required autoComplete="name" />
        <Field label={t.email} name="email" type="email" required autoComplete="email" />
        <Field label={t.phone} name="phone" type="tel" autoComplete="tel" />
        <Field label={t.model} name="model" placeholder={t.modelPlaceholder} />
        <Field label={t.arrival} name="arrival" type="date" />
        <Field label={t.departure} name="departure" type="date" />

        <div className="md:col-span-2">
          <label htmlFor="message" className="tag text-dust block mb-2">{t.message}</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full bg-transparent border-b border-white/20 focus:border-blood outline-none py-3 text-cream placeholder:text-dust/50 resize-none transition-colors"
            placeholder={t.messagePlaceholder}
          />
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            data-haptic
            className="btn-blood btn-fx disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{status === 'sending' ? t.submitting : t.submit}</span>
            {status !== 'sending' && <span aria-hidden="true">→</span>}
          </button>

          <span className="tag text-dust">{t.or}</span>

          <a href={wa} target="_blank" rel="noreferrer" className="btn-ghost btn-fx">
            <span>{t.waDirect}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="md:col-span-2 min-h-[24px]" aria-live="polite">
          {status === 'sent' && (
            <p className="text-sm text-cream border-l-2 border-blood pl-4 py-2">
              {t.sent}
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-blood pl-4 py-2 border-l-2 border-blood">{error}</p>
          )}
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  autoComplete,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="tag text-dust block mb-2">
        {label}
        {required && <span className="text-blood ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/20 focus:border-blood outline-none py-3 text-cream placeholder:text-dust/50 transition-colors [color-scheme:dark]"
      />
    </div>
  )
}
