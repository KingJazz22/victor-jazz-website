'use client'

import dynamic from 'next/dynamic'

// Deferred — react-hook-form + zod are large and only needed when the form is in view.
// `ssr: false` requires a Client Component boundary, so this thin wrapper exists purely
// to let app/resorts/page.tsx (a Server Component) use the dynamic import.
export default dynamic(() => import('./ResortContactForm'), { ssr: false })
