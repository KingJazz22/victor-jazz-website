import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-5 text-center">
      <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">404</p>
      <h1 className="font-serif font-light text-4xl md:text-6xl text-[#f5f0e8] mb-6">
        Page Not Found
      </h1>
      <p className="text-[#9e9e9e] text-sm mb-10 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the music.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9a96e] text-[#080808] text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-all duration-300"
      >
        Back to Home
      </a>
    </div>
  )
}
