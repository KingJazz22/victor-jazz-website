import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getAllPosts, type ContentBlock } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_CONFIG.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          key={i}
          className="font-serif font-light text-2xl md:text-3xl text-[#f5f0e8] mt-12 mb-4 tracking-wide"
        >
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3
          key={i}
          className="font-serif font-light text-xl text-[#f5f0e8] mt-8 mb-3 tracking-wide"
        >
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p key={i} className="text-[#b8b8b8] leading-relaxed mb-5">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={i} className="space-y-2.5 mb-6 ml-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[#b8b8b8] text-sm leading-relaxed">
              <span className="text-[#c9a96e] mt-1.5 shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'highlight':
      return (
        <blockquote
          key={i}
          className="border-l-2 border-[#c9a96e]/60 pl-6 py-1 my-8 text-[#9e9e9e] text-sm italic leading-relaxed"
        >
          {block.text}
        </blockquote>
      )
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Victor Jazz',
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.fullName,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-[#080808] pt-28 pb-24 px-5">
        <article className="max-w-2xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#9e9e9e] text-xs uppercase tracking-[0.2em] hover:text-[#c9a96e] transition-colors mb-10"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            The Journal
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-[#c9a96e] text-[10px] uppercase tracking-[0.25em] border border-[#c9a96e]/30 rounded-full px-3 py-1">
              {post.category}
            </span>
            <span className="text-[#6b6b6b] text-xs">{formatDate(post.date)}</span>
            <span className="text-[#6b6b6b] text-xs">&middot;</span>
            <span className="text-[#6b6b6b] text-xs">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-light text-3xl md:text-5xl text-[#f5f0e8] leading-[1.15] tracking-wide mb-6">
            {post.title}
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-[#c9a96e]/40 mb-10" />

          {/* Body */}
          <div className="prose-custom">
            {post.body.map((block, i) => renderBlock(block, i))}
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-[#c9a96e]/15 text-center">
            <p className="font-serif font-light text-2xl text-[#f5f0e8] mb-3">
              Ready to hire a wedding saxophonist in Cyprus?
            </p>
            <p className="text-[#9e9e9e] text-sm mb-7 leading-relaxed">
              Victor replies to every enquiry personally within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9a96e] text-[#080808] text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#e8c97a] transition-all duration-300"
              >
                Check Availability
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white text-sm font-semibold uppercase tracking-[0.15em] hover:bg-[#20bd5a] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Victor
              </a>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
