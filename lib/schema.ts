import { SITE_CONFIG, SERVICES, FAQS } from './constants'

export function generateSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateLocalBusinessSchema(),
      generateMusicGroupSchema(),
      generateFAQSchema(),
    ],
  }
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
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    logo: `${SITE_CONFIG.url}/images/logo.svg`,
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
      { '@type': 'City', name: 'Ayia Napa' },
      { '@type': 'Country', name: 'Cyprus' },
      { '@type': 'Country', name: 'Greece' },
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'United Arab Emirates' },
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
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    genre: ['Jazz', 'Pop', 'Soul', 'Classical'],
    foundingLocation: {
      '@type': 'Place',
      name: 'Cyprus',
    },
    member: {
      '@type': 'Person',
      name: 'Victor Jazz',
      jobTitle: 'Professional Wedding Saxophonist',
      worksFor: { '@id': `${SITE_CONFIG.url}/#business` },
    },
    sameAs: [SITE_CONFIG.instagramUrl],
  }
}

function generateFAQSchema() {
  return {
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
