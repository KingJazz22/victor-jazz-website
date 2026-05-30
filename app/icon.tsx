import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#080808',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Gold border ring */}
        <div
          style={{
            position: 'absolute',
            inset: 1,
            borderRadius: 6,
            border: '1px solid #c9a96e',
            opacity: 0.6,
          }}
        />
        {/* VJ initials */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#c9a96e',
              fontFamily: 'Georgia, serif',
              lineHeight: 1,
              letterSpacing: '-1px',
            }}
          >
            VJ
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
