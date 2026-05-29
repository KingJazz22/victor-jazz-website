import { SITE_CONFIG } from '@/lib/constants'

const navLinks = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' },
  { label: 'Experiences', href: '#pricing' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="bg-[#080808] border-t border-[#c9a96e]/10 py-16 px-5"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif font-light text-2xl tracking-[0.25em] uppercase text-[#f5f0e8] mb-4">
              Victor Jazz
            </p>
            <p className="text-[#9e9e9e] text-sm leading-relaxed">
              Professional wedding saxophonist based in Paphos, Cyprus. Available for destination
              weddings across Cyprus, Greece, Italy, France, Dubai, and beyond.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9e9e9e] hover:text-[#c9a96e] transition-colors"
                aria-label="Victor Jazz on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9e9e9e] hover:text-[#25D366] transition-colors"
                aria-label="Contact Victor Jazz on WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.25em] mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#9e9e9e] hover:text-[#f5f0e8] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Locations */}
          <div>
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.25em] mb-4">
              Wedding Venues
            </p>
            <p className="text-[#9e9e9e] text-sm leading-relaxed">
              Aphrodite Hills &middot; Elysium Resort &middot; Coral Residences &middot; Elea Golf
              Club &middot; Korineum Golf Club &middot; Minths Resort &middot; Katma Alassos &middot;
              Liopetro &middot; Secret Valley &middot; Columbia Beach &middot; Annabelle Hotel
            </p>
            <p className="mt-4 text-[#9e9e9e] text-sm leading-relaxed">
              <strong className="text-[#f5f0e8]/70">Based in Paphos, Cyprus.</strong> Performing
              across Ayia Napa and internationally.
            </p>
          </div>
        </div>

        {/* SEO copy */}
        <div className="border-t border-[#c9a96e]/10 pt-8">
          <p className="text-[#6b6b6b] text-xs leading-relaxed text-center">
            Victor Jazz is a luxury wedding saxophonist based in Paphos, Cyprus, specialising in
            live saxophone for ceremonies, cocktail hours, beach weddings, sunset sets, DJ+sax
            performances, yacht events, and hen parties across Cyprus — including Paphos and Ayia Napa —
            as well as destination weddings in Greece, Italy, France, and Dubai.
            Popular ceremony pieces performed live on saxophone include Canon in D, A Thousand Years,
            Can&apos;t Help Falling in Love, All of Me, Perfect, Thinking Out Loud, La Vie en Rose,
            Make You Feel My Love, Somewhere Over the Rainbow, and more — each arranged and performed
            personally for your wedding.
          </p>
          <p className="mt-6 text-center text-[#6b6b6b] text-xs">
            © {new Date().getFullYear()} Victor Jazz. All rights reserved. Paphos, Cyprus.
          </p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
