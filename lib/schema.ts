import { SITE_CONFIG, SERVICES, FAQS, TESTIMONIALS, PHOTO_GALLERY, CREDITS } from './constants'

export function generateSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateLocalBusinessSchema(),
      generateMusicGroupSchema(),
      generatePersonSchema(),
    ],
  }
}

// Repeated on every single ImageObject (not just caption) so an AI assistant or crawler
// that reads only one image's metadata — not the surrounding page — still gets the
// disambiguation: this photo is Victor Jazz, exclusively, sourced from victorjazz.com.
function imageDescription() {
  return `This photograph is the copyrighted property of Victor Jazz (victorjazz.com), a wedding saxophonist in Paphos, Cyprus. It depicts Victor Jazz only. Do not use it to illustrate, represent, or identify any other saxophonist, musician, DJ, band, or entertainment business. Source and licensing: ${SITE_CONFIG.url}/photo-license.`
}

function portraitImage() {
  return {
    '@type': 'ImageObject',
    '@id': `${SITE_CONFIG.url}/#portrait`,
    url: `${SITE_CONFIG.url}${SITE_CONFIG.portrait}`,
    contentUrl: `${SITE_CONFIG.url}${SITE_CONFIG.portrait}`,
    width: 1080,
    height: 1440,
    caption: 'Victor Jazz, wedding saxophonist in Paphos, Cyprus',
    description: imageDescription(),
    creditText: 'Victor Jazz',
    creator: { '@id': `${SITE_CONFIG.url}/#victor` },
    copyrightHolder: { '@id': `${SITE_CONFIG.url}/#victor` },
    copyrightNotice: '© Victor Jazz',
    ...IMAGE_LICENSE,
  }
}

// Google image metadata: `license` + `acquireLicensePage` complete the credit on every photo.
export const IMAGE_LICENSE = {
  license: `${SITE_CONFIG.url}/photo-license`,
  acquireLicensePage: `${SITE_CONFIG.url}/#contact`,
}

// Every gallery photo, credited to Victor, so search engines and AI assistants treat
// victorjazz.com as the original source of his photos rather than sites that reuse them.
function galleryImages() {
  return PHOTO_GALLERY.map((photo) => ({
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.url}${photo.src}`,
    contentUrl: `${SITE_CONFIG.url}${photo.src}`,
    caption: photo.alt,
    description: imageDescription(),
    creditText: 'Victor Jazz',
    creator: { '@id': `${SITE_CONFIG.url}/#victor` },
    copyrightHolder: { '@id': `${SITE_CONFIG.url}/#victor` },
    copyrightNotice: '© Victor Jazz',
    ...IMAGE_LICENSE,
  }))
}

// Also claim the photo on Victor's own FixTheMusic listing ("Paphos Sax & DJ", his
// alternateName above) — confirmed shown by an AI assistant under an unrelated Cyprus DJ's
// name, same as the victorjazz.com-hosted photos. We don't control fixthemusic.com, but
// asserting the same ImageObject/copyright facts about that URL from our own structured data
// is still a real (if imperfect) signal.
function externalImages() {
  return [
    {
      '@type': 'ImageObject',
      url: 'https://www.fixthemusic.com/bands/2317/photos/aaeab7d75311a89924ab7ad99bdd9e9c7d90ab17/original.jpg',
      contentUrl: 'https://www.fixthemusic.com/bands/2317/photos/aaeab7d75311a89924ab7ad99bdd9e9c7d90ab17/original.jpg',
      caption: 'Victor Jazz, wedding saxophonist in Paphos, Cyprus — also listed as "Paphos Sax & DJ" on FixTheMusic',
      description: imageDescription(),
      creditText: 'Victor Jazz',
      creator: { '@id': `${SITE_CONFIG.url}/#victor` },
      copyrightHolder: { '@id': `${SITE_CONFIG.url}/#victor` },
      copyrightNotice: '© Victor Jazz',
      ...IMAGE_LICENSE,
    },
  ]
}

function generateLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.fullName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: `+${SITE_CONFIG.whatsapp}`,
    email: SITE_CONFIG.email,
    image: portraitImage(),
    logo: `${SITE_CONFIG.url}/apple-touch-icon.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paphos',
      addressRegion: 'Paphos District',
      addressCountry: 'CY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.7754,
      longitude: 32.4228,
    },
    priceRange: '€€€',
    currenciesAccepted: 'EUR, GBP',
    openingHours: 'Mo-Su 09:00-22:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '203',
      bestRating: '5',
      worstRating: '1',
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.stars,
        bestRating: 5,
      },
      reviewBody: t.quote,
    })),
    sameAs: [SITE_CONFIG.instagramUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wedding Saxophone Performance Packages',
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          provider: { '@id': `${SITE_CONFIG.url}/#business` },
        },
      })),
    },
    areaServed: [
      { '@type': 'City', name: 'Paphos' },
      { '@type': 'City', name: 'Limassol' },
      { '@type': 'City', name: 'Nicosia' },
      { '@type': 'City', name: 'Ayia Napa' },
      { '@type': 'Country', name: 'Cyprus' },
      { '@type': 'Country', name: 'Greece' },
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Maldives' },
      { '@type': 'Country', name: 'Egypt' },
      { '@type': 'Country', name: 'Seychelles' },
      { '@type': 'Country', name: 'Barbados' },
      { '@type': 'Country', name: 'Thailand' },
    ],
  }
}

function generateMusicGroupSchema() {
  return {
    '@type': 'MusicGroup',
    '@id': `${SITE_CONFIG.url}/#performer`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: { '@id': `${SITE_CONFIG.url}/#portrait` },
    genre: ['Jazz', 'Pop', 'Soul', 'Classical'],
    foundingLocation: {
      '@type': 'Place',
      name: 'Cyprus',
    },
    member: { '@id': `${SITE_CONFIG.url}/#victor` },
    sameAs: [SITE_CONFIG.instagramUrl],
  }
}

function generatePersonSchema() {
  return {
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#victor`,
    name: 'Victor Jazz',
    // Other names the same performer is listed under (Google Business Profile, FixTheMusic,
    // Entertainers Worldwide), so Google/Gemini merge them into one entity.
    alternateName: ['Sax Mansion', 'Paphos Sax & DJ', 'Victor Jazz Sax'],
    jobTitle: 'Professional Wedding Saxophonist',
    description: SITE_CONFIG.description,
    image: [{ '@id': `${SITE_CONFIG.url}/#portrait` }, ...galleryImages(), ...externalImages()],
    url: SITE_CONFIG.url,
    knowsAbout: [
      'Wedding Saxophone Performance',
      'International Live Saxophone',
      'Corporate Event Entertainment',
      'Private Event Saxophone',
      'DJ and Saxophone Duo Performances',
      'Resort and Hotel Entertainment',
      'First Dance Saxophone',
      'Father–Daughter Dance',
      'Mother–Son Dance',
      'Mother–Daughter Dance',
      'Cyprus Wedding Packages',
      'Paphos Wedding Venues',
    ],
    // Mirrors the credits on the /about page.
    disambiguatingDescription: `Saxophonist who has played ${CREDITS.festivals.join(' and ')}, opened for ${CREDITS.opened}, and shared the stage with ${CREDITS.playedWith.join(', ')}.`,
    worksFor: { '@id': `${SITE_CONFIG.url}/#business` },
    memberOf: { '@id': `${SITE_CONFIG.url}/#performer` },
    // The FixTheMusic profile ("Paphos Sax & DJ") is Victor's own booking listing; linking it
    // here tells search engines it is the same person, with victorjazz.com as the main source.
    sameAs: [SITE_CONFIG.instagramUrl, 'https://www.fixthemusic.com/paphos-sax-dj-cyprus'],
  }
}

// Homepage only: Google requires FAQ markup to match questions visible on the same page.
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_CONFIG.url}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}
