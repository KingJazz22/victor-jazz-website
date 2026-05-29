export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'highlight'; text: string }

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  body: ContentBlock[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'wedding-ceremony-music-cyprus',
    title: 'What Music Should You Choose for Your Cyprus Wedding Ceremony?',
    description:
      'From classical processionals to contemporary ballads — a guide to choosing the perfect live saxophone music for your Cyprus wedding ceremony, written by Victor Jazz.',
    date: '2025-02-10',
    readTime: '5 min read',
    category: 'Planning',
    body: [
      {
        type: 'p',
        text: 'The ceremony is the emotional peak of your entire wedding day. It is the moment your guests fall silent, someone reaches for a tissue, and time seems to slow down. The right music does not simply fill the silence — it shapes the memory. And a live saxophone, played well, creates something that a playlist simply cannot: a feeling in the room that is entirely unique to your day.',
      },
      {
        type: 'h2',
        text: 'Why Live Saxophone Works for Any Ceremony Style',
      },
      {
        type: 'p',
        text: 'Whether you are getting married on a clifftop terrace in Paphos, a sandy beach in Ayia Napa, or inside one of Cyprus\'s grand venue ballrooms, the saxophone adapts beautifully. It carries across open air without losing intimacy. It can be whisper-soft for a signing moment, or soaring and powerful for a recessional. Most importantly, it is live — so it breathes with the moment, responding to the pace of the procession, the length of the signing, the energy in the room.',
      },
      {
        type: 'h2',
        text: 'The Best Ceremony Songs for Saxophone',
      },
      {
        type: 'p',
        text: 'These are the songs couples request most often, and they all translate exceptionally well to live saxophone:',
      },
      {
        type: 'ul',
        items: [
          'A Thousand Years — Christina Perri (the most requested aisle song of the last decade)',
          'Perfect — Ed Sheeran (works beautifully for both processional and first dance)',
          'Can\'t Help Falling in Love — Elvis Presley (timeless, emotional, universally loved)',
          'All of Me — John Legend (deeply personal and always moving)',
          'La Vie en Rose — Édith Piaf (perfect for couples going for a romantic, European feel)',
          'Canon in D — Pachelbel (the classical choice that never fails)',
          'Make You Feel My Love — Adele (understated and profoundly touching)',
          'Clair de Lune — Debussy (ideal for a slower, more contemplative processional)',
        ],
      },
      {
        type: 'p',
        text: 'If your song is not on this list, do not worry. Victor learns new pieces ahead of each wedding at no extra charge. The goal is always to give you the exact moment you have imagined.',
      },
      {
        type: 'h2',
        text: 'How to Structure the Music Across Your Ceremony',
      },
      {
        type: 'h3',
        text: 'The Processional',
      },
      {
        type: 'p',
        text: 'This is the walk down the aisle — your most important entrance. Choose a song that feels like you. It does not need to be slow; some brides choose uplifting, joyful pieces. The key is that it should make you feel something the moment it starts.',
      },
      {
        type: 'h3',
        text: 'The Signing',
      },
      {
        type: 'p',
        text: 'While the legal signing takes place, softer background music fills the moment beautifully. This is a wonderful opportunity for a second meaningful song — perhaps something that was playing on your first date, or a piece that holds private meaning between you.',
      },
      {
        type: 'h3',
        text: 'The Recessional',
      },
      {
        type: 'p',
        text: 'Walk back down the aisle as a married couple to something joyful and celebratory. This is not the moment for a slow ballad — your guests are smiling, cheering, and the mood should lift. Uptown Funk, Can\'t Stop the Feeling, or a soaring jazz standard all work brilliantly.',
      },
      {
        type: 'h2',
        text: 'Outdoor Ceremonies in Cyprus — Does the Venue Matter?',
      },
      {
        type: 'p',
        text: 'Outdoor ceremonies are the norm in Cyprus, and they present a unique acoustic challenge. The open air disperses sound quickly, which is why a professional wireless PA system matters as much as the performance itself. Victor brings high-quality outdoor sound equipment to every outdoor ceremony, ensuring the music reaches every guest clearly — whether you have 30 people or 200.',
      },
      {
        type: 'highlight',
        text: 'Tip for UK & Irish couples: If you are flying in from the UK or Ireland and have not heard Victor perform live, his Instagram and video gallery give a very accurate sense of tone, style, and the kind of atmosphere he creates. Many couples book based on videos alone — and are never disappointed.',
      },
      {
        type: 'h2',
        text: 'How to Book a Saxophonist for Your Cyprus Wedding Ceremony',
      },
      {
        type: 'p',
        text: 'The process is simple. Send Victor a message via the contact form or WhatsApp with your wedding date, venue, and the specific ceremony moments you want music for. He will respond within 24 hours with availability and a tailored package. Most couples from the UK and Ireland book 6 to 12 months in advance, so the earlier you enquire, the better.',
      },
    ],
  },
  {
    slug: 'destination-wedding-cyprus-guide',
    title: 'Planning Your Destination Wedding in Cyprus: A Complete Guide for UK & Irish Couples',
    description:
      'Everything UK and Irish couples need to know about planning a destination wedding in Cyprus — venues, timing, entertainment, and how to hire the best live music for your day.',
    date: '2025-03-05',
    readTime: '7 min read',
    category: 'Destination Weddings',
    body: [
      {
        type: 'p',
        text: 'Cyprus has quietly become Europe\'s most beloved destination wedding location for British and Irish couples. The combination of guaranteed sunshine, stunning venues, relatively short flight times from the UK and Ireland, and a thriving wedding industry makes it uniquely well-suited for couples who want a magical setting without the stress of a truly remote destination.',
      },
      {
        type: 'h2',
        text: 'Why Couples from the UK and Ireland Choose Cyprus',
      },
      {
        type: 'ul',
        items: [
          'Flight times of just 4–5 hours from London, Dublin, and Manchester',
          'Reliable sunshine from April through October, with average highs of 28–35°C in summer',
          'English is widely spoken across all major hotels, venues, and suppliers',
          'A mature wedding industry with experienced planners, caterers, and entertainers',
          'Dramatic settings — clifftop terraces, private beaches, vineyard estates, and five-star resorts',
          'Favourable value compared to equivalently beautiful locations in France or Italy',
        ],
      },
      {
        type: 'h2',
        text: 'When to Get Married in Cyprus',
      },
      {
        type: 'p',
        text: 'The peak wedding season runs from May to October. May and June offer warm weather without the intense midsummer heat, and many couples find these months ideal for outdoor ceremonies and evening receptions. July and August are the hottest months — beautiful but intense, especially for elderly guests or ceremonies at midday. September and October are arguably the most pleasant months of all: warm evenings, lower humidity, and a golden light that makes every photo look extraordinary.',
      },
      {
        type: 'h2',
        text: 'The Best Venues for UK and Irish Couples',
      },
      {
        type: 'p',
        text: 'The majority of UK and Irish couples base their wedding in the Paphos area, which offers the highest concentration of luxury venues alongside excellent transport links. Key venues include:',
      },
      {
        type: 'ul',
        items: [
          'Aphrodite Hills Resort — dramatic clifftop setting with views over the Mediterranean',
          'Elysium Hotel, Paphos — elegant beachfront property with a grand ballroom',
          'Coral Residences — boutique luxury with an intimate coastal atmosphere',
          'Liopetro Wedding Venue — rustic stone and olive groves, perennially popular',
          'Katma Alassos — dramatic outdoor terraces with sweeping valley views',
          'Elea Golf Club — refined estate surroundings with manicured grounds',
          'Cap St Georges — ultra-luxury resort with private beach access',
        ],
      },
      {
        type: 'p',
        text: 'The Ayia Napa area is increasingly popular for couples who want a more glamorous, beach-club atmosphere — particularly for hen parties and reception evenings that blend into the night.',
      },
      {
        type: 'h2',
        text: 'Building Your Entertainment Package',
      },
      {
        type: 'p',
        text: 'Entertainment at a Cyprus destination wedding typically follows a natural arc across the day: live music for the ceremony, relaxed background music during the cocktail hour and drinks reception, and then a DJ or DJ + live music combination for the evening reception.',
      },
      {
        type: 'p',
        text: 'Live saxophone is particularly well-suited to destination weddings for one practical reason: it travels easily. Victor is Cyprus-based and performs across the island without any logistics for you to manage. For couples from the UK, this means you are booking local expertise with no additional travel cost.',
      },
      {
        type: 'h2',
        text: 'When Should You Book Your Entertainment?',
      },
      {
        type: 'p',
        text: 'As a rule: book your venue first, then your photographer, then your entertainment. If you are marrying in peak season (June–September), Victor\'s dates for the following year start filling from January onwards. Couples from the UK and Ireland often enquire 12 to 18 months ahead, particularly for summer Saturdays.',
      },
      {
        type: 'highlight',
        text: 'A note for British and Irish couples: Victor has performed at hundreds of weddings for couples flying in from the UK and Ireland. He understands the musical tastes, the energy of British and Irish wedding guests, and the specific moments that matter to you. Many couples simply message him on WhatsApp with their date and venue — he takes it from there.',
      },
      {
        type: 'h2',
        text: 'Practical Tips for Planning from Abroad',
      },
      {
        type: 'ul',
        items: [
          'Use a Cyprus-based wedding planner — they have direct relationships with all venues and suppliers',
          'Book all entertainment at least 9–12 months in advance for peak season dates',
          'Request video samples from every supplier — this is standard practice and expected',
          'Consider a WhatsApp group with your key suppliers for easy communication across time zones',
          'Confirm all bookings with a written contract and a clear deposit structure',
        ],
      },
    ],
  },
  {
    slug: 'dj-vs-live-saxophone-cyprus-wedding',
    title: 'DJ vs Live Saxophone: Which Is Right for Your Cyprus Wedding Reception?',
    description:
      'Trying to decide between a DJ and live saxophone for your Cyprus wedding? This guide breaks down the differences, explains the DJ + Sax combination, and helps you choose what\'s right for your day.',
    date: '2025-04-12',
    readTime: '6 min read',
    category: 'Entertainment',
    body: [
      {
        type: 'p',
        text: 'One of the most common questions couples planning a Cyprus wedding ask is: should we have a DJ, a live musician, or both? It is a genuinely interesting question because the answer depends entirely on the kind of atmosphere you want to create — and at different points in your day, the answer might be different.',
      },
      {
        type: 'h2',
        text: 'What a DJ Brings to Your Reception',
      },
      {
        type: 'p',
        text: 'A great DJ offers near-limitless musical range, the ability to read the room and shift genres instantly, and a consistent energy that keeps a dancefloor moving. For couples with eclectic taste, or who want to take guests through a wide musical journey across the evening, a DJ is an excellent choice. The best Cyprus-based DJs are experienced working with international wedding guests, understand British and Irish musical sensibilities, and know how to pace an evening reception.',
      },
      {
        type: 'h2',
        text: 'What Live Saxophone Brings to Your Reception',
      },
      {
        type: 'p',
        text: 'Live saxophone adds something fundamentally different: presence. When Victor walks into a venue and plays, people stop what they are doing and look. A live instrument has a visceral, immediate quality that no recording can replicate — the breath, the improvisation, the interaction with the room. It creates talking points, photographs, and moments that guests remember for years.',
      },
      {
        type: 'p',
        text: 'For ceremonies and cocktail hours specifically, live saxophone is incomparable. It sets an emotional tone that a playlist cannot. The moment a bride begins walking down the aisle to a live saxophone — played at the right volume, with genuine feeling — the room transforms.',
      },
      {
        type: 'h2',
        text: 'Why the DJ + Saxophone Combination Wins',
      },
      {
        type: 'p',
        text: 'The most popular package by far is the DJ + Sax combination, and it is not difficult to understand why. Victor performs live over DJ sets — improvising saxophone over the backing track in real time, responding to the energy of the room, lifting choruses, building to drops. The result is the range and precision of a DJ with the electricity of a live performer.',
      },
      {
        type: 'ul',
        items: [
          'Guests get the best of both worlds — their favourite songs, played live',
          'The dancefloor stays full because the music never loses its energy or direction',
          'It looks spectacular — a live performer on stage elevates the visual atmosphere',
          'It creates genuine "wow" moments that guests will talk about at the next wedding',
          'It works seamlessly for contemporary tracks, Afrobeats, house, pop — any genre',
        ],
      },
      {
        type: 'h2',
        text: 'Matching the Music to Each Part of Your Day',
      },
      {
        type: 'h3',
        text: 'The Ceremony',
      },
      {
        type: 'p',
        text: 'Live saxophone only. This is the most emotionally significant moment of the day, and it deserves a live instrument. A DJ playing a ceremony song feels impersonal; a live performance feels transcendent.',
      },
      {
        type: 'h3',
        text: 'The Cocktail Hour',
      },
      {
        type: 'p',
        text: 'Live saxophone is ideal here — ambient, sophisticated, and social. Guests mingle, explore the venue, and enjoy drinks while the music adds to the atmosphere without dominating it. This is jazz standards, soul, and contemporary pop played with warmth and style.',
      },
      {
        type: 'h3',
        text: 'The Evening Reception',
      },
      {
        type: 'p',
        text: 'DJ + Sax is the answer for most couples. You get the full range of a DJ\'s music library, the energy of a live performance, and a dancefloor that does not empty. Victor performs for defined sets during the peak evening hours — typically two or three 30-minute sets — with the DJ continuing between sets.',
      },
      {
        type: 'highlight',
        text: 'Real talk from couples: "We had Victor for the ceremony and cocktail hour, then DJ + Sax for the evening. Our guests haven\'t stopped talking about it — especially the DJ set. It felt like a proper club show at a wedding, and I mean that in the best way." — Olivia & Ryan, Edinburgh.',
      },
      {
        type: 'h2',
        text: 'How to Decide',
      },
      {
        type: 'p',
        text: 'Ask yourself: do you want your guests to watch and feel something, or to dance and lose themselves? The answer is probably both — at different points. Start with live saxophone for the ceremony and cocktail hour. Then decide whether the evening should be pure DJ, DJ + Sax, or a full live evening set. Victor will help you build the right package for your day and your budget.',
      },
    ],
  },
  {
    slug: 'best-wedding-venues-cyprus-saxophone',
    title: 'The Best Wedding Venues in Cyprus for Live Saxophone Entertainment',
    description:
      'A guide to the finest wedding venues across Paphos and Ayia Napa, and why live saxophone makes each one extraordinary. Written by Victor Jazz, Cyprus-based wedding saxophonist.',
    date: '2025-05-01',
    readTime: '6 min read',
    category: 'Venues',
    body: [
      {
        type: 'p',
        text: 'Having performed at over 350 weddings across Cyprus, I have played in nearly every significant venue on the island. Each one has its own character, its own acoustics, and its own particular magic at different times of the day. This guide is my honest take on where live saxophone sounds most extraordinary — and what to expect at each venue.',
      },
      {
        type: 'h2',
        text: 'Paphos — the Heart of Cyprus Wedding Country',
      },
      {
        type: 'h3',
        text: 'Aphrodite Hills Resort',
      },
      {
        type: 'p',
        text: 'One of Cyprus\'s flagship wedding venues, Aphrodite Hills sits on a dramatic clifftop with views stretching to the Mediterranean horizon. The outdoor terrace is spectacular at sunset, and the saxophone carries beautifully across the open space. I have performed here for cocktail hours and evening receptions, and the combination of the setting and live music consistently creates something unforgettable.',
      },
      {
        type: 'h3',
        text: 'Liopetro Wedding Venue',
      },
      {
        type: 'p',
        text: 'Liopetro is probably the venue I perform at most frequently, and with good reason. Its stone architecture, olive groves, and outdoor ceremony spaces create a deeply romantic atmosphere that live music enhances perfectly. The natural acoustics here are excellent — the sax resonates warmly against the stone walls in a way that indoor PA systems alone cannot replicate.',
      },
      {
        type: 'h3',
        text: 'Katma Alassos',
      },
      {
        type: 'p',
        text: 'Alassos is a newer venue but has quickly become a favourite for couples wanting drama and scale. The outdoor terraces look out over a wide valley, and during golden hour, a saxophone performance here feels cinematic. Several viral-moment videos on my Instagram were filmed here.',
      },
      {
        type: 'h3',
        text: 'Coral Residences',
      },
      {
        type: 'p',
        text: 'Coral is a boutique luxury venue with an intimate coastal feel. It is particularly popular with smaller, more curated weddings. The courtyard setting is ideal for cocktail hour saxophone — close enough to feel personal, open enough to breathe.',
      },
      {
        type: 'h2',
        text: 'Ayia Napa — Glamour, Energy, and Beach',
      },
      {
        type: 'p',
        text: 'Ayia Napa has a completely different character to Paphos. Where Paphos is romantic and refined, Ayia Napa is glamorous and energetic. Beach weddings here are spectacular, and the DJ + Sax combination thrives in this environment. If you want a beach ceremony followed by a reception that feels more like a luxury beach club party, Ayia Napa is the answer.',
      },
      {
        type: 'ul',
        items: [
          'Nissi Beach Resort — iconic beach location, ideal for sunset ceremonies',
          'Kefalos Beach Tourist Village — beautiful beachfront setting with outstanding views',
          'Sense by the Beach — boutique, intimate, and perfect for smaller celebrations',
        ],
      },
      {
        type: 'h2',
        text: 'Tips for Live Saxophone at Any Cyprus Venue',
      },
      {
        type: 'ul',
        items: [
          'For outdoor venues: confirm a power source is available for the PA system at your ceremony location',
          'For large ballrooms: ask about the venue\'s own sound system — Victor can feed directly into it for the evening set',
          'For clifftop or sea-facing venues: account for wind — a windscreen on the microphone and a good PA ensures the music carries to every guest',
          'For intimate venues (under 50 guests): an acoustic or semi-acoustic performance can be even more personal and moving',
        ],
      },
      {
        type: 'highlight',
        text: 'Not sure which venue is right for you? Victor has played at all of them. Send him a message and he will share his honest thoughts on which settings work best for the kind of atmosphere you are imagining.',
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
