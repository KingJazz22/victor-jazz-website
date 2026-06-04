export const GADS_ID = 'AW-18200806862'

// After creating conversion actions in Google Ads (Goals → Conversions → [action] → Tag setup),
// paste each label here. Format: 'AbCDeFgHijK'
export const CONVERSION_LABELS = {
  formEnquiry: 'zJ1FCIze0LYcEM6L6eZD',
  whatsapp: 'PoQTCP7O6LYcEM6L6eZD',
}

export function gtagConversion(label?: string) {
  if (typeof window === 'undefined') return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = (window as any).gtag
  if (typeof fn !== 'function') return
  const sendTo = label ? `${GADS_ID}/${label}` : GADS_ID
  fn('event', 'conversion', { send_to: sendTo })
}
