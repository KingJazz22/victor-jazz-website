export const SITE_CONFIG = {
  name: 'Victor Jazz',
  fullName: 'Victor Jazz | Wedding Saxophonist Cyprus',
  tagline: 'Live Saxophone for Your Dream Cyprus Wedding',
  description:
    'Award-winning wedding saxophonist based in Cyprus. Live saxophone for ceremonies, cocktail hours & beach parties across Paphos and Ayia Napa.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://victorjazz.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '353838980169',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp}?text=Hi%20Victor!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20saxophone%20for%20my%20wedding%20in%20Cyprus.`
  },
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'victorjazzsaxophone',
  get instagramUrl() {
    return `https://instagram.com/${this.instagram}`
  },
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@victorjazz.com',
  location: 'Paphos, Cyprus',
  priceRange: '€€€',
}

export const STATS = [
  { value: 350, suffix: '+', label: 'Weddings in Cyprus, UK, Ireland, Italy & Greece' },
  { value: 40, suffix: '+', label: 'Luxury Venues' },
  { value: 5, suffix: '★', label: 'Star Rating' },
]

export const SERVICES = [
  {
    id: 'ceremony',
    title: 'Wedding Ceremony',
    description:
      'Elegant live saxophone as you walk down the aisle. An unforgettable soundtrack to your most important moment.',
    video: '/videos/ceremony.mp4',
    poster: '/images/posters/ceremony.jpg',
    icon: 'ceremony',
  },
  {
    id: 'cocktail',
    title: 'Cocktail Hour',
    description:
      'Sophisticated background music that sets the perfect ambiance for your drinks reception and first moments as newlyweds.',
    video: '/videos/cocktail.mp4',
    poster: '/images/posters/cocktail.jpg',
    icon: 'cocktail',
  },
  {
    id: 'sunset',
    title: 'Sunset Performance',
    description:
      'As the Mediterranean sun dips below the horizon, let the sax carry your guests into the golden hour with pure emotion.',
    video: '/videos/sunset.mp4',
    poster: '/images/posters/sunset.jpg',
    icon: 'sunset',
  },
  {
    id: 'beach',
    title: 'Beach Weddings',
    description:
      'From the shores of Ayia Napa to the cliffs of Paphos — live saxophone with the sound of the sea creates pure magic.',
    video: '/videos/beach.mp4',
    poster: '/images/posters/beach.jpg',
    icon: 'beach',
  },
  {
    id: 'djsax',
    title: 'DJ + Sax Sets',
    description:
      'The ultimate combination. Victor performs live over DJ sets, blending contemporary tracks with soulful saxophone energy.',
    video: '/videos/djsax.mp4',
    poster: '/images/posters/djsax.jpg',
    icon: 'dj',
  },
  {
    id: 'yacht',
    title: 'Yacht & Marina Events',
    description:
      'Exclusive performances on superyachts and private marinas across Cyprus. The definition of luxury entertainment.',
    video: '/videos/yacht.mp4',
    poster: '/images/posters/yacht.jpg',
    icon: 'yacht',
  },
  {
    id: 'hen',
    title: 'Hen Parties',
    description:
      'Make your hen party in Ayia Napa or Paphos unforgettable. Victor performs at pool parties, villas, and beach clubs.',
    video: '/videos/hen.mp4',
    poster: '/images/posters/hen.jpg',
    icon: 'hen',
  },
  {
    id: 'private',
    title: 'Private Events',
    description:
      'Anniversaries, milestone birthdays, corporate events, and intimate gatherings — any occasion elevated by live saxophone.',
    video: '/videos/private.mp4',
    poster: '/images/posters/private.jpg',
    icon: 'private',
  },
]

export const DESTINATIONS = [
  {
    id: 'paphos',
    name: 'Paphos',
    subtitle: 'Cyprus',
    description: 'Clifftop venues & UNESCO heritage',
    image: '/images/venues/paphos.jpg',
    alt: 'Wedding saxophonist performing in Paphos Cyprus at a clifftop venue',
  },
  {
    id: 'ayia-napa',
    name: 'Ayia Napa',
    subtitle: 'Cyprus',
    description: 'Beach clubs & glamorous resorts',
    image: '/images/venues/ayia-napa.jpg',
    alt: 'Saxophone player at a luxury beach wedding in Ayia Napa Cyprus',
  },
{
    id: 'santorini',
    name: 'Santorini',
    subtitle: 'Greece',
    description: 'Caldera views & candlelit terraces',
    image: '/images/venues/santorini.jpg',
    alt: 'Destination wedding saxophonist in Santorini Greece',
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    subtitle: 'Italy',
    description: 'Clifftop terraces & Italian glamour',
    image: '/images/venues/amalfi.jpg',
    alt: 'Luxury wedding saxophone on the Amalfi Coast Italy',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    subtitle: 'UAE',
    description: 'Ultra-luxury venues & desert magic',
    image: '/images/venues/dubai.jpg',
    alt: 'Luxury wedding saxophonist performing in Dubai',
  },
  {
    id: 'paris',
    name: 'Paris',
    subtitle: 'France',
    description: 'Château weddings & Parisian elegance',
    image: '/images/venues/paris.jpg',
    alt: 'Destination wedding saxophonist in Paris France',
  },
{
    id: 'mykonos',
    name: 'Mykonos',
    subtitle: 'Greece',
    description: 'Whitewashed villas & sunset terraces',
    image: '/images/venues/mykonos.jpg',
    alt: 'Saxophone at a destination wedding in Mykonos Greece',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah & James',
    venue: 'Liopetro, Paphos',
    origin: 'London, UK',
    quote:
      "Victor started playing as I walked down the aisle at Liopetro and there wasn't a dry eye in the venue. The most beautiful moment of our wedding day.",
    stars: 5,
  },
  {
    id: 2,
    name: 'Emma & Tom',
    venue: 'Coral Residences, Paphos',
    origin: 'Dublin, Ireland',
    quote:
      "Victor's cocktail hour set at Coral Residences was the highlight of our Cyprus wedding. Six months on, our guests still bring it up.",
    stars: 5,
  },
  {
    id: 3,
    name: 'Charlotte & Alex',
    venue: 'Elea Golf Club, Paphos',
    origin: 'Manchester, UK',
    quote:
      "We planned our destination wedding in Paphos from Manchester — booking Victor was the best decision we made. His sunset set at Elea was breathtaking.",
    stars: 5,
  },
  {
    id: 4,
    name: 'Isabelle & Marc',
    venue: 'Nissi Beach Resort, Ayia Napa',
    origin: 'Paris, France',
    quote:
      "A beach wedding in Ayia Napa with Victor on saxophone — every single person cried. Nothing compares to live saxophone by the sea at sunset.",
    stars: 5,
  },
  {
    id: 5,
    name: 'Olivia & Ryan',
    venue: 'Katma Alassos, Paphos',
    origin: 'Edinburgh, Scotland',
    quote:
      "Victor played the ceremony then switched to DJ + Sax for the evening. Two completely different moods — both utterly unforgettable. Our guests went wild.",
    stars: 5,
  },
  {
    id: 6,
    name: 'Natasha & Luca',
    venue: 'Aphrodite Hills, Paphos',
    origin: 'Milan, Italy',
    quote:
      "Aphrodite Hills was already stunning. Victor's saxophone during our drinks reception made it genuinely magical — our guests were completely speechless.",
    stars: 5,
  },
]

export const GALLERY_VIDEOS = [
  { src: '/videos/djsax-liopetro.mp4',    poster: '/images/posters/djsax-liopetro.jpg',    title: 'DJ + Sax — Liopetro' },
  { src: '/videos/alassos-entrance.mp4',   poster: '/images/posters/alassos-entrance.jpg',   title: 'Wedding Entrance' },
  { src: '/videos/cocktail.mp4',                    poster: '/images/posters/cocktail.jpg',                    title: 'Cocktail Hour' },
  { src: '/videos/beach.mp4',                       poster: '/images/posters/beach.jpg',                       title: 'Beach Wedding' },
  { src: '/videos/private.mp4',                     poster: '/images/posters/private.jpg',                     title: 'Private Event' },
  { src: '/videos/CghlqPnlueG.mp4',  poster: '/images/posters/CghlqPnlueG.jpg',  title: 'Granny on the Dance Floor' },
  { src: '/videos/DRgrIaKDOwl.mp4',  poster: '/images/posters/DRgrIaKDOwl.jpg',  title: 'Sunset Yacht Set' },
  { src: '/videos/DOahQ_MiOLT.mp4',  poster: '/images/posters/DOahQ_MiOLT.jpg',  title: 'Coral Residences Party with Percussion' },
  { src: '/videos/DNyrSa4WIWr.mp4',  poster: '/images/posters/DNyrSa4WIWr.jpg',  title: 'Nightclub Set' },
  { src: '/videos/DLzF654s5XZ.mp4',  poster: '/images/posters/DLzF654s5XZ.jpg',  title: "L'Chateau Drink Reception" },
  { src: '/videos/DBCRKDrN6O2.mp4',  poster: '/images/posters/DBCRKDrN6O2.jpg',  title: 'Cocktails in Coral Residence' },
  { src: '/videos/boat-party.mp4',   poster: '/images/posters/boat-party.jpg',   title: 'Boat Party' },
  { src: '/videos/C_QJ4uSogul.mp4',  poster: '/images/posters/C_QJ4uSogul.jpg',  title: "L'Chateau Venue" },
  { src: '/videos/C_KilRXNf8O.mp4',  poster: '/images/posters/C_KilRXNf8O.jpg',  title: 'Garden Dinner' },
  { src: '/videos/C4fS6vstiOi.mp4',  poster: '/images/posters/C4fS6vstiOi.jpg',  title: 'Partying with Bridesmaids' },
  { src: '/videos/C27ZwL-PGpD.mp4',  poster: '/images/posters/C27ZwL-PGpD.jpg',  title: 'One Kiss' },
  { src: '/videos/C2xUXantt0x.mp4',  poster: '/images/posters/C2xUXantt0x.jpg',  title: 'Freed from Desire' },
  { src: '/videos/C2AgEifI33f.mp4',  poster: '/images/posters/C2AgEifI33f.jpg',  title: 'Sunset Cocktails Reception' },
  { src: '/videos/C1xQ_inNsnr.mp4',  poster: '/images/posters/C1xQ_inNsnr.jpg',  title: "Isn't She Lovely in Katma Alassos" },
  { src: '/videos/C0jw8o4tefC.mp4',  poster: '/images/posters/C0jw8o4tefC.jpg',  title: 'High Energy Entrance Liopetro' },
  { src: '/videos/Cylf_LSNxGk.mp4',  poster: '/images/posters/Cylf_LSNxGk.jpg',  title: 'Just Watch Me Dance' },
  { src: '/videos/yacht-dubai.mp4',  poster: '/images/posters/yacht-dubai.jpg',   title: 'Yacht Party' },
  { src: '/videos/dubai-burj.mp4',   poster: '/images/posters/dubai-burj.jpg',    title: 'Dubai Performance' },
  { src: '/videos/reviews/review-cap-st-georges.mp4', poster: '/images/posters/reviews/review-cap-st-georges.jpg', title: 'Club Show' },
]

export const PHOTO_GALLERY = [
  { src: '/images/photos/professional-portrait.jpg',               alt: 'Victor Jazz professional wedding saxophonist available for hire in Cyprus' },
  { src: '/images/photos/best-portrait.jpg',                       alt: 'Victor Jazz — wedding saxophonist Paphos Cyprus portrait' },
  { src: '/images/photos/portrait-classy.jpg',                     alt: 'Victor Jazz wedding saxophonist Cyprus — elegant portrait' },
  { src: '/images/photos/netherlands-full-body.jpg',               alt: 'Victor Jazz saxophone musician portrait — destination wedding specialist' },
  { src: '/images/photos/portrait-no-sax.jpg',                     alt: 'Victor Jazz luxury wedding musician Paphos Cyprus portrait' },
  { src: '/images/photos/tropical-portrait.jpg',                   alt: 'Victor Jazz beach wedding saxophonist Cyprus — tropical portrait' },
  { src: '/images/photos/portrait-sax-wall.jpg',                   alt: 'Victor Jazz saxophone musician outdoor portrait Cyprus' },
  { src: '/images/photos/night-portrait.jpg',                      alt: 'Victor Jazz saxophone artist night portrait Paphos Cyprus' },
  { src: '/images/photos/flute-portrait.jpg',                      alt: 'Victor Jazz flute musician portrait — wedding entertainment Cyprus' },
  { src: '/images/photos/sax-zoom.jpg',                            alt: 'Victor Jazz saxophone close-up — live wedding music Cyprus Paphos' },
  { src: '/images/photos/photo-with-dj-pizel.jpg',                 alt: 'Victor Jazz DJ and saxophone duo — wedding entertainment Cyprus' },
  { src: '/images/photos/full-body.jpg',                           alt: 'Victor Jazz wedding saxophonist full performance shot Cyprus' },
  { src: '/images/photos/minths-sax.jpg',                          alt: 'Victor Jazz playing saxophone at Minths Resort wedding venue Cyprus' },
  { src: '/images/photos/event-playing-sax.jpg',                   alt: 'Victor Jazz live saxophone performance at luxury wedding event Cyprus' },
  { src: '/images/photos/flute-sunset.jpg',                        alt: 'Victor Jazz playing flute at sunset — cocktail hour Cyprus wedding' },
  { src: '/images/photos/flute-photo.jpg',                         alt: 'Victor Jazz playing flute at Cyprus wedding — live music performance' },
  { src: '/images/photos/nice-sunset-portrait.jpg',                alt: 'Victor Jazz sunset portrait — cocktail hour saxophonist Paphos Cyprus' },
  { src: '/images/photos/panoramic-dark.jpg',                      alt: 'Victor Jazz panoramic stage saxophone performance at Cyprus wedding' },
  { src: '/images/photos/nightclub-portrait.jpg',                  alt: 'Victor Jazz nightclub saxophone performance Cyprus wedding entertainment' },
  { src: '/images/photos/club-zoom-portrait.jpg',                  alt: 'Victor Jazz saxophone performance portrait at Cyprus club wedding' },
  { src: '/images/photos/crowded-club-pic.jpg',                    alt: 'Victor Jazz playing live saxophone for a crowded wedding reception Cyprus' },
  { src: '/images/photos/nightclub-playing-for-the-crowd.jpg',     alt: 'Victor Jazz live saxophone for the crowd at Cyprus wedding party' },
  { src: '/images/photos/full-club.jpg',                           alt: 'Victor Jazz full stage saxophone set at Cyprus wedding venue' },
  { src: '/images/photos/granny-portrait-show.jpg',                alt: 'Victor Jazz entertaining wedding guests with live saxophone Cyprus' },
  { src: '/images/photos/nice-pic.jpg',                            alt: 'Victor Jazz wedding saxophonist Cyprus — live performance' },
]

export const VIDEO_REVIEWS = [
  { src: '/videos/reviews/review-liopetro-1.mp4',      poster: '/images/posters/reviews/review-liopetro-1.jpg',      venue: 'Liopetro, Paphos' },
  { src: '/videos/reviews/review-couple-2.mp4',        poster: '/images/posters/reviews/review-couple-2.jpg',        venue: 'Cyprus Wedding' },
  { src: '/videos/reviews/review-alassos.mp4',         poster: '/images/posters/reviews/review-alassos.jpg',         venue: 'Alassos, Paphos' },
  { src: '/videos/reviews/review-liopetro-2.mp4',      poster: '/images/posters/reviews/review-liopetro-2.jpg',      venue: 'Liopetro, Paphos' },
  { src: '/videos/reviews/review-coral.mp4',           poster: '/images/posters/reviews/review-coral.jpg',           venue: 'Coral Residences' },
  { src: '/videos/reviews/review-liopetro-3.mp4',      poster: '/images/posters/reviews/review-liopetro-3.jpg',      venue: 'Liopetro, Paphos' },
  { src: '/videos/reviews/review-elea-1.mp4',          poster: '/images/posters/reviews/review-elea-1.jpg',          venue: 'Elea Golf Club' },
  { src: '/videos/reviews/review-ayia-napa.mp4',       poster: '/images/posters/reviews/review-ayia-napa.jpg',       venue: 'Ayia Napa' },
  { src: '/videos/reviews/review-kefalos.mp4',         poster: '/images/posters/reviews/review-kefalos.jpg',         venue: 'Kefalos Beach' },
  { src: '/videos/reviews/review-liopetro-djpanos.mp4',poster: '/images/posters/reviews/review-liopetro-djpanos.jpg',venue: 'Liopetro — DJ Panos' },
  { src: '/videos/reviews/review-liopetro-outdoor.mp4',poster: '/images/posters/reviews/review-liopetro-outdoor.jpg',venue: 'Liopetro Outdoors' },
  { src: '/videos/reviews/review-alassos-outside.mp4', poster: '/images/posters/reviews/review-alassos-outside.jpg', venue: 'Katma Alassos' },
  { src: '/videos/reviews/review-coral-sunset.mp4',    poster: '/images/posters/reviews/review-coral-sunset.jpg',    venue: 'Coral Residences' },
  { src: '/videos/reviews/review-paralimni.mp4',       poster: '/images/posters/reviews/review-paralimni.jpg',       venue: 'Paralimni' },
  { src: '/videos/reviews/review-coral-amazing.mp4',   poster: '/images/posters/reviews/review-coral-amazing.jpg',   venue: 'Coral Residences' },
  { src: '/videos/reviews/review-elea-2.mp4',          poster: '/images/posters/reviews/review-elea-2.jpg',          venue: 'Elea Golf Club' },
  { src: '/videos/reviews/review-sense-bride.mp4',     poster: '/images/posters/reviews/review-sense-bride.jpg',     venue: 'Sense by the Beach' },
]

export const FAQS = [
  {
    q: 'How much does it cost to hire a wedding saxophonist in Cyprus?',
    a: 'Packages start from €350 for a ceremony-only performance, with full-day options from €900. Pricing varies by number of sets, duration, travel requirements, and whether you would like a DJ + Sax combination. Every enquiry receives a personalised quote within 24 hours — get in touch with your date and Victor will come back to you with tailored options.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'Cyprus is one of Europe\'s most popular wedding destinations, and peak dates (May through October) fill 12 to 18 months ahead. Victor recommends securing your date as early as possible. Last-minute availability does occasionally arise, so it is always worth asking even if your wedding is soon.',
  },
  {
    q: 'Can you perform at outdoor beach or clifftop ceremonies?',
    a: 'Absolutely — and outdoor settings are where the saxophone truly comes alive. Whether it\'s a clifftop terrace in Paphos, a sandy beach ceremony in Ayia Napa, or a garden at a private villa, the open air amplifies everything beautifully. Victor brings a professional wireless PA system and handles all sound setup.',
  },
  {
    q: 'Do you travel for destination weddings outside Cyprus?',
    a: 'Yes. Victor is based in Paphos and performs regularly at destination weddings across Europe and beyond — including Santorini, Mykonos, the Amalfi Coast, the Côte d\'Azur, Dubai, and more. All travel and accommodation is arranged transparently and included in the quote.',
  },
  {
    q: 'What genres and songs can you play?',
    a: 'Victor\'s repertoire spans pop, jazz, soul, R&B, classical, and contemporary hits — from Ed Sheeran and John Legend to jazz standards and classical ceremony pieces. Every setlist is custom-built for your day. You can request specific songs for the aisle walk, signing, or first dance, and Victor learns new pieces ahead of your wedding at no extra charge.',
  },
  {
    q: 'Can you perform with a DJ?',
    a: 'Yes — and the DJ + Sax combination is one of the most popular packages. Victor performs live saxophone over DJ sets, layering soulful improvisation over contemporary tracks to create an atmosphere that neither a pure DJ nor purely live music alone can match. Ideal for evening receptions, villa parties, and beach clubs.',
  },
  {
    q: 'What equipment do you bring?',
    a: 'Victor arrives with professional-grade wireless microphones, a full PA system sized for your venue (suitable for up to 300+ guests), and all necessary backline. You simply need a power socket and a performance area. Victor liaises directly with your venue coordinator ahead of the day to ensure a seamless setup.',
  },
  {
    q: 'Are you available for hen parties and private events?',
    a: 'Yes. Victor performs at hen parties, pool parties, villa events, yacht charters, corporate functions, and milestone celebrations across Cyprus — particularly in Ayia Napa and Paphos. Get in touch with your event details for a tailored quote.',
  },
]

export const SETLIST = [
  {
    id: 'ceremony',
    label: 'Ceremony',
    description: 'Elegant, emotional pieces for your processional, signing & recessional',
    songs: [
      { title: 'Canon in D', artist: 'Pachelbel' },
      { title: 'A Thousand Years', artist: 'Christina Perri' },
      { title: "Can't Help Falling in Love", artist: 'Elvis Presley' },
      { title: 'All of Me', artist: 'John Legend' },
      { title: 'Perfect', artist: 'Ed Sheeran' },
      { title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
      { title: 'La Vie en Rose', artist: 'Édith Piaf' },
      { title: 'Make You Feel My Love', artist: 'Adele' },
      { title: 'Somewhere Over the Rainbow', artist: 'Judy Garland' },
      { title: 'The Way You Look Tonight', artist: 'Frank Sinatra' },
      { title: 'At Last', artist: 'Etta James' },
      { title: 'Clair de Lune', artist: 'Debussy' },
    ],
  },
  {
    id: 'cocktail',
    label: 'Cocktail Hour',
    description: 'Sophisticated background music for your drinks reception & first moments as newlyweds',
    songs: [
      { title: 'Fly Me to the Moon', artist: 'Frank Sinatra' },
      { title: "Isn't She Lovely", artist: 'Stevie Wonder' },
      { title: 'Just the Two of Us', artist: 'Bill Withers' },
      { title: 'Feeling Good', artist: 'Nina Simone' },
      { title: 'My Way', artist: 'Frank Sinatra' },
      { title: 'Georgia on My Mind', artist: 'Ray Charles' },
      { title: 'The Girl from Ipanema', artist: 'João Gilberto' },
      { title: 'Autumn Leaves', artist: 'Jazz Standard' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong' },
      { title: 'Unforgettable', artist: 'Nat King Cole' },
      { title: 'Beyond the Sea', artist: 'Bobby Darin' },
      { title: 'Come Away with Me', artist: 'Norah Jones' },
    ],
  },
  {
    id: 'party',
    label: 'Evening Party',
    description: 'High-energy floor-fillers for your reception, DJ set & dancefloor',
    songs: [
      { title: 'Uptown Funk', artist: 'Bruno Mars' },
      { title: 'Happy', artist: 'Pharrell Williams' },
      { title: 'September', artist: 'Earth, Wind & Fire' },
      { title: "Don't Stop Me Now", artist: 'Queen' },
      { title: 'Superstition', artist: 'Stevie Wonder' },
      { title: 'Valerie', artist: 'Amy Winehouse' },
      { title: 'Love On Top', artist: 'Beyoncé' },
      { title: 'Mr. Brightside', artist: 'The Killers' },
      { title: 'Dancing in the Moonlight', artist: 'Toploader' },
      { title: 'I Feel Good', artist: 'James Brown' },
      { title: "Can't Stop the Feeling", artist: 'Justin Timberlake' },
      { title: 'Freed from Desire', artist: 'Gala' },
    ],
  },
]

export const PACKAGES = [
  {
    id: 'ceremony',
    name: 'Ceremony',
    tagline: 'The perfect beginning',
    from: '350',
    currency: '€',
    duration: 'Up to 45 min',
    featured: false,
    includes: [
      'Processional, signing & recessional',
      '2 personalised song requests',
      'Pre-wedding consultation',
      'Professional wireless PA system',
      'On-site sound setup',
    ],
  },
  {
    id: 'celebration',
    name: 'Celebration',
    tagline: 'Ceremony & cocktail hour',
    from: '600',
    currency: '€',
    duration: 'Up to 2.5 hrs',
    featured: true,
    includes: [
      'Full ceremony performance',
      'Cocktail hour set (45–60 min)',
      'Unlimited personalised song requests',
      'Custom setlist consultation',
      'Professional PA system',
      'Bespoke performance plan',
    ],
  },
  {
    id: 'fullday',
    name: 'Full Experience',
    tagline: 'The complete day',
    from: '900',
    currency: '€',
    duration: 'All day',
    featured: false,
    includes: [
      'Ceremony + cocktail hour',
      'Evening reception set',
      'DJ + Sax option available',
      'Unlimited song requests',
      'Full day coordination',
      'Destination weddings welcome',
    ],
  },
]
