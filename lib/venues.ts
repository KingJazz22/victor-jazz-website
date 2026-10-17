// Wedding venues Victor performs at, for the /wedding-venues-cyprus hub.
// `alsoKnownAs` holds real alternative names people search for (shown on the page and
// in schema). Pure typos are left to Google's spelling correction.

export type Venue = {
  id: string
  name: string
  alsoKnownAs?: string[]
  area: 'Paphos' | 'Limassol' | 'Larnaca' | 'North Cyprus'
  locality: string
  setting: string
  victor: string
  video?: { src: string; poster: string; label: string }
  image?: { src: string; alt: string }
  quote?: { text: string; by: string }
}

export const VENUES: Venue[] = [
  {
    id: 'ktima-alassos',
    name: 'Ktima Alassos',
    alsoKnownAs: ['Alassos', 'Alassos Wedding Venue'],
    area: 'Paphos',
    locality: 'Coral Bay road, Lempa, Paphos',
    setting: 'An open-air, sea-view venue with a ceremony lawn and a reception garden between Paphos and Coral Bay.',
    victor: 'Ceremony on the lawn, then a DJ + Sax set for the evening is the classic Alassos day.',
    video: { src: '/videos/reviews/review-alassos.mp4', poster: '/images/posters/reviews/review-alassos.jpg', label: 'Couple review, Ktima Alassos' },
    quote: { text: 'Victor played the ceremony then switched to DJ + Sax for the evening. Two completely different moods — both utterly unforgettable.', by: 'Olivia & Ryan, Edinburgh' },
  },
  {
    id: 'liopetro',
    name: 'Liopetro',
    alsoKnownAs: ['Liopetro Venue'],
    area: 'Paphos',
    locality: 'Kouklia, Paphos',
    setting: 'A restored 16th-century stone farmstead about 15 minutes from Paphos, with several ceremony spots and one wedding per day.',
    victor: 'From the aisle walk to the dance floor: Victor has five couple video reviews from Liopetro.',
    video: { src: '/videos/reviews/review-liopetro-1.mp4', poster: '/images/posters/reviews/review-liopetro-1.jpg', label: 'Couple review, Liopetro' },
    quote: { text: "Victor started playing as I walked down the aisle at Liopetro and there wasn't a dry eye in the venue.", by: 'Sarah & James, London' },
  },
  {
    id: 'coral-residences',
    name: 'Coral Residences',
    area: 'Paphos',
    locality: 'Coral Bay, Peyia, Paphos',
    setting: 'Clifftop residences above Coral Bay, made for sunset ceremonies and cocktail hours.',
    victor: 'Sunset cocktail sets and parties with percussion. Three couple video reviews.',
    video: { src: '/videos/reviews/review-coral-sunset.mp4', poster: '/images/posters/reviews/review-coral-sunset.jpg', label: 'Couple review, Coral Residences' },
    quote: { text: "Victor's cocktail hour set at Coral Residences was the highlight of our Cyprus wedding.", by: 'Emma & Tom, Dublin' },
  },
  {
    id: 'paliomonastiro',
    name: 'Paliomonastiro',
    alsoKnownAs: ['Palaiomonastiro', 'Paliomonastirio'],
    area: 'Paphos',
    locality: 'Peyia, Paphos',
    setting: 'Botanical gardens with a waterfall ceremony area and an open-air reception deck with distant sea views.',
    victor: 'Live sax for the waterfall ceremony and sunset drinks on the deck.',
  },
  {
    id: 'aphrodite-hills',
    name: 'Aphrodite Hills',
    alsoKnownAs: ['Aphrodite Hills Resort', 'Aphrodite Hills Hotel'],
    area: 'Paphos',
    locality: 'Kouklia, Paphos',
    setting: 'A large hilltop golf resort overlooking the sea near the birthplace of Aphrodite.',
    victor: 'Ceremonies and drinks receptions with live saxophone.',
    quote: { text: "Victor's saxophone during our drinks reception made it genuinely magical — our guests were completely speechless.", by: 'Natasha & Luca, Wales' },
  },
  {
    id: 'elea',
    name: 'Elea Golf Club & Elea Estate',
    alsoKnownAs: ['Elea Golf Club', 'Elea Estate', 'Elea Hotel'],
    area: 'Paphos',
    locality: 'Geroskipou, Paphos',
    setting: 'Golf-course views and a clubhouse terrace, a favourite for sunset ceremonies.',
    victor: 'Sunset ceremony and cocktail sets. Two couple video reviews.',
    video: { src: '/videos/reviews/review-elea-1.mp4', poster: '/images/posters/reviews/review-elea-1.jpg', label: 'Couple review, Elea Golf Club' },
    quote: { text: 'His sunset set at Elea was breathtaking.', by: 'Charlotte & Alex, Manchester' },
  },
  {
    id: 'minthis',
    name: 'Minthis Resort',
    alsoKnownAs: ['Minthis Hotel', 'Minthis Hills'],
    area: 'Paphos',
    locality: 'Tsada, Paphos hills',
    setting: 'A hillside golf resort above Paphos with mountain and sea views.',
    victor: 'Live saxophone for ceremonies, drinks and evening sets.',
    image: { src: '/images/photos/minths-sax.jpg', alt: 'Victor Jazz playing saxophone at Minthis Resort, Paphos' },
  },
  {
    id: 'annabelle',
    name: 'Annabelle Hotel',
    alsoKnownAs: ['Annabelle Resort', 'Annabelle Paphos'],
    area: 'Paphos',
    locality: 'Kato Paphos seafront',
    setting: 'A seafront hotel in Kato Paphos with gardens and pools close to the harbour.',
    victor: 'Ceremonies, poolside cocktail hours and evening sets.',
  },
  {
    id: 'elysium',
    name: 'Elysium Resort',
    alsoKnownAs: ['Elysium Hotel', 'Elysium Paphos'],
    area: 'Paphos',
    locality: 'Kato Paphos seafront',
    setting: 'A five-star seafront resort in Kato Paphos with its own Byzantine-style chapel and gardens.',
    victor: 'Chapel ceremonies, garden cocktail hours and evening sets.',
  },
  {
    id: 'secret-valley',
    name: 'Secret Valley',
    alsoKnownAs: ['Secret Valley Golf Resort'],
    area: 'Paphos',
    locality: 'Near Kouklia, Paphos',
    setting: 'A golf resort set in a green valley close to the coast east of Paphos.',
    victor: 'Live saxophone for ceremonies and sunset drinks.',
  },
  {
    id: 'anassa',
    name: 'Anassa',
    alsoKnownAs: ['Anassa Hotel', 'Anassa Resort'],
    area: 'Paphos',
    locality: 'Latchi, near Polis (Akamas)',
    setting: 'A secluded luxury resort on the Akamas coast in the far west of the Paphos district.',
    victor: 'Elegant ceremony and cocktail-hour sets by the sea.',
  },
  {
    id: 'columbia-beach',
    name: 'Columbia Beach Resort',
    alsoKnownAs: ['Columbia Resort', 'Columbia Beach Hotel'],
    area: 'Limassol',
    locality: 'Pissouri Bay, Limassol',
    setting: 'A beachfront resort on Pissouri Bay, halfway between Paphos and Limassol.',
    victor: 'Beach ceremonies, sunset drinks and evening sets.',
  },
  {
    id: 'galu-seaside',
    name: 'Galu Seaside',
    area: 'Larnaca',
    locality: 'Oroklini Beach, Larnaca',
    setting: 'A beachfront venue with indoor and outdoor spaces about 20 minutes from Larnaca airport.',
    victor: 'Beach ceremonies and DJ + Sax parties by the sea.',
  },
  {
    id: 'korineum',
    name: 'Korineum Golf & Country Club',
    alsoKnownAs: ['Korineum', 'Korineum Golf Club'],
    area: 'North Cyprus',
    locality: 'Esentepe, Kyrenia',
    setting: 'A golf and country club on the north coast with views of the Kyrenia mountains and the sea.',
    victor: 'Live saxophone for weddings and events on the north coast.',
    video: { src: '/videos/korineum-venue.mp4', poster: '/images/posters/korineum-venue.jpg', label: 'Victor Jazz at Korineum' },
  },
]
