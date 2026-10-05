// Google Consent Mode v2. Visitors in the EEA, UK and Switzerland start with ad/analytics
// storage denied (set inline in layout.tsx before the Google tag config runs) and see the
// cookie banner; everyone else is granted by default and never sees it.
export const CONSENT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV',
  'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH',
] as const

export const CONSENT_STORAGE_KEY = 'vj_consent'

export type ConsentChoice = 'granted' | 'denied'

export function readConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = (window as any).gtag
  if (typeof fn === 'function') {
    fn('consent', 'update', {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
    })
  }
}

// Middleware stores the visitor's country (from the CDN geo header) in this cookie.
// Unknown country → treat as in-region, so the banner errs on the side of asking.
export function needsConsentBanner(): boolean {
  if (typeof document === 'undefined') return false
  const iso = document.cookie.match(/(?:^|;\s*)vj_country=([A-Z]{2})/)?.[1]
  return !iso || (CONSENT_REGIONS as readonly string[]).includes(iso)
}
