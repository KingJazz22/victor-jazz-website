'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body
        style={{
          background: '#080808',
          color: '#f5f0e8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'sans-serif',
          gap: '1rem',
        }}
      >
        <p>Something went wrong.</p>
        <button
          onClick={reset}
          style={{
            padding: '0.5rem 1.5rem',
            border: '1px solid #c9a96e',
            borderRadius: '9999px',
            color: '#c9a96e',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
