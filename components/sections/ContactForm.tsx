'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full bg-white/[0.04] border border-[#c9a96e]/20 rounded-lg px-4 py-3.5 text-[#f5f0e8] text-sm placeholder-[#6b6b6b] transition-colors duration-200 focus:border-[#c9a96e] focus:outline-none focus:ring-1 focus:ring-[#c9a96e]/30 [&>option]:bg-[#1a1a1a] [&>option]:text-[#f5f0e8]'

const labelClass = 'block text-[#b8b8b8] text-xs uppercase tracking-[0.15em] mb-2'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
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
          Your enquiry has been received. Victor will personally reply within 24 hours to discuss
          your dream day. In the meantime, follow along on Instagram for inspiration.
        </p>
      </div>
    )
  }

  return (
    <form
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
          <label htmlFor="partnerName" className={labelClass}>
            Partner&apos;s Name
          </label>
          <input
            id="partnerName"
            type="text"
            placeholder="James (optional)"
            autoComplete="off"
            className={inputClass}
            {...register('partnerName')}
          />
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
            Venue / Location *
          </label>
          <input
            id="venue"
            type="text"
            placeholder="e.g. Aphrodite Hills, Paphos"
            className={cn(inputClass, errors.venue && 'border-red-500/60')}
            {...register('venue')}
          />
          {errors.venue && (
            <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.venue.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div>
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp Number
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="+44 7700 900000"
            autoComplete="tel"
            className={inputClass}
            {...register('whatsapp')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="source" className={labelClass}>
          How Did You Find Me? *
        </label>
        <select
          id="source"
          className={cn(inputClass, errors.source && 'border-red-500/60')}
          defaultValue=""
          {...register('source')}
        >
          <option value="" disabled>Please select…</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google Search</option>
          <option value="blog">Wedding Blog</option>
          <option value="friend">Friend / Recommendation</option>
          <option value="other">Other</option>
        </select>
        {errors.source && (
          <p className="mt-1.5 text-red-400 text-xs" role="alert">{errors.source.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Me About Your Day *
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell me a little about your wedding — the venue, atmosphere, music you love, and how you imagine the saxophone fitting in to your day…"
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
        aria-label="Send wedding enquiry to Victor Jazz"
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
