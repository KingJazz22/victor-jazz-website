'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'
import { gtagConversion, CONVERSION_LABELS } from '@/lib/gtag'
import { DIAL_CODES, DEFAULT_DIAL_CODE } from '@/lib/constants'

// Middleware reads the visitor's country from the CDN's geo header and stores it in this
// cookie, so the dial code can default to their country without any client-side lookup.
function detectDialCode(): string {
  if (typeof document === 'undefined') return DEFAULT_DIAL_CODE
  const match = document.cookie.match(/(?:^|;\s*)vj_country=([A-Z]{2})/)
  const iso = match?.[1]
  if (!iso) return DEFAULT_DIAL_CODE
  const found = DIAL_CODES.find((d) => (d.iso as readonly string[]).includes(iso))
  return found?.code ?? DEFAULT_DIAL_CODE
}

const inputClass =
  'w-full bg-white/[0.04] border border-[#c9a96e]/20 rounded-lg px-4 py-3.5 text-[#f5f0e8] text-sm placeholder-[#6b6b6b] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none focus:ring-1 focus:ring-[#c9a96e]/30 [&>option]:bg-[#1a1a1a] [&>option]:text-[#f5f0e8]'

const labelClass = 'block text-[#b8b8b8] text-xs uppercase tracking-[0.15em] mb-2'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [dialCode, setDialCode] = useState(detectDialCode)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    const localNumber = (data.whatsapp ?? '').trim().replace(/^0/, '')
    const payload = {
      ...data,
      whatsapp: localNumber ? `${dialCode}${localNumber}` : '',
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      gtagConversion(CONVERSION_LABELS.formEnquiry || undefined)
      setStatus('success')
      reset()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full border border-[#c9a96e]/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-[#f5f0e8] font-light mb-3">
          Thank You, Beautiful!
        </h3>
        <p className="text-[#9e9e9e] text-sm leading-relaxed">
          Your enquiry has been received. I will personally reply within 24 hours to discuss
          your dream day. In the meantime, follow along on Instagram for inspiration.
        </p>
      </div>
    )
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      className="glass rounded-2xl p-6 md:p-8 space-y-5"
      noValidate
      aria-label="Wedding enquiry form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Emma"
            autoComplete="given-name"
            className={cn(inputClass, errors.name && 'border-red-500/60')}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="emma@example.com"
            autoComplete="email"
            className={cn(inputClass, errors.email && 'border-red-500/60')}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="weddingDate" className={labelClass}>
            Wedding Date *
          </label>
          <input
            id="weddingDate"
            type="date"
            className={cn(inputClass, '[color-scheme:dark]', errors.weddingDate && 'border-red-500/60')}
            {...register('weddingDate')}
          />
          {errors.weddingDate && (
            <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.weddingDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="venue" className={labelClass}>
            Venue / Location{' '}
            <span className="text-[#6b6b6b] normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="venue"
            type="text"
            placeholder="e.g. Aphrodite Hills, Paphos — or leave blank if not decided yet"
            className={cn(inputClass, errors.venue && 'border-red-500/60')}
            {...register('venue')}
          />
          {errors.venue && (
            <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.venue.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelClass}>
          WhatsApp Number{' '}
          <span className="text-[#6b6b6b] normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <div className="flex rounded-lg overflow-hidden border border-[#c9a96e]/20 focus-within:border-[#c9a96e] focus-within:ring-1 focus-within:ring-[#c9a96e]/30 transition-colors duration-200">
          <select
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
            aria-label="Country dial code"
            className="shrink-0 bg-white/[0.06] border-r border-[#c9a96e]/20 px-2 py-3.5 text-[#f5f0e8] text-sm focus:outline-none cursor-pointer appearance-none [&>option]:bg-[#1a1a1a] [&>option]:text-[#f5f0e8]"
          >
            {DIAL_CODES.map(({ code, flag, label }) => (
              <option key={code} value={code}>
                {flag} {code} {label}
              </option>
            ))}
          </select>
          <input
            id="whatsapp"
            type="tel"
            inputMode="tel"
            placeholder="7700 900 000"
            autoComplete="tel-local"
            className="flex-1 min-w-0 bg-white/[0.04] px-4 py-3.5 text-[#f5f0e8] text-sm placeholder-[#6b6b6b] focus:outline-none"
            {...register('whatsapp')}
          />
        </div>
        {errors.whatsapp ? (
          <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.whatsapp.message}</p>
        ) : (
          <p className="mt-1.5 text-[#6b6b6b] text-xs">
            Select your country, then enter your local number — no leading zero needed
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Victor About Your Day{' '}
          <span className="text-[#6b6b6b] normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Anything you'd like Victor to know — atmosphere, music you love, or how you imagine the saxophone fitting into your day…"
          className={cn(inputClass, 'resize-none', errors.message && 'border-red-500/60')}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-3" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-full bg-[#c9a96e] text-[#080808] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </span>
        ) : (
          'Check Availability & Enquire'
        )}
      </button>

      <p className="text-[#9e9e9e] text-xs text-center">
        No spam, ever. Victor replies personally within 24 hours.
      </p>
    </form>
  )
}
