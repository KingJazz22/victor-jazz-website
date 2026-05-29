import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Wedding Music & Planning Blog | Victor Jazz',
  description:
    'Advice, inspiration, and guides for couples planning a wedding in Cyprus — from choosing the perfect ceremony music to planning your destination wedding from the UK.',
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
  openGraph: {
    title: 'Wedding Music & Planning Blog | Victor Jazz',
    description:
      'Advice and inspiration for couples planning a wedding in Cyprus — ceremony music, venue guides, entertainment tips.',
    url: `${SITE_CONFIG.url}/blog`,
    type: 'website',
  },
}

const CATEGORY_COLOURS: Record<string, string> = {
  Planning: 'text-[#c9a96e] border-[#c9a96e]/30',
  'Destination Weddings': 'text-[#9eb8c9] border-[#9eb8c9]/30',
  Entertainment: 'text-[#c9b09e] border-[#c9b09e]/30',
  Venues: 'text-[#9ec9ae] border-[#9ec9ae]/30',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-[#080808] pt-28 pb-24 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.35em] mb-4">
            Wedding Inspiration
          </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl text-[#f5f0e8] tracking-wide mb-4">
            The Journal
          </h1>
          <p className="text-[#9e9e9e] text-sm max-w-lg mx-auto leading-relaxed">
            Guides, inspiration, and honest advice for couples planning their dream wedding in Cyprus
            and beyond.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-[#c9a96e]/15 rounded-2xl p-8 bg-[#0a0a0a] hover:border-[#c9a96e]/35 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`text-[10px] uppercase tracking-[0.25em] border rounded-full px-3 py-1 ${
                    CATEGORY_COLOURS[post.category] ?? 'text-[#c9a96e] border-[#c9a96e]/30'
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-[#6b6b6b] text-xs">{formatDate(post.date)}</span>
                <span className="text-[#6b6b6b] text-xs">&middot;</span>
                <span className="text-[#6b6b6b] text-xs">{post.readTime}</span>
              </div>

              <h2 className="font-serif font-light text-xl md:text-2xl text-[#f5f0e8] leading-snug mb-3 group-hover:text-[#c9a96e] transition-colors duration-300">
                {post.title}
              </h2>

              <p className="text-[#9e9e9e] text-sm leading-relaxed line-clamp-2">
                {post.description}
              </p>

              <p className="mt-5 text-[#c9a96e] text-xs uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300">
                Read more →
              </p>
            </Link>
          ))}
        </div>

        {/* Back to site */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            className="text-[#9e9e9e] text-sm hover:text-[#c9a96e] transition-colors"
          >
            ← Back to VictorJazz.com
          </Link>
        </div>
      </div>
    </main>
  )
}
