import {
  TripFormData,
  ItineraryResult,
  DayItinerary,
  ItineraryActivity,
  TripPurpose,
} from "@/types";

// Activity pools keyed by purpose
const ACTIVITY_POOL: Record<TripPurpose, ItineraryActivity[]> = {
  sightseeing: [
    {
      time: "09:00",
      place: "Senso-ji Temple",
      description:
        "Visit Tokyo's oldest temple in Asakusa. Walk through Nakamise-dori shopping street.",
      category: "sightseeing",
    },
    {
      time: "10:30",
      place: "Tokyo Skytree",
      description:
        "Ascend the 634 m tower for panoramic views over the entire city.",
      category: "sightseeing",
    },
    {
      time: "14:00",
      place: "Meiji Shrine",
      description:
        "Stroll through the forested path leading to this serene Shinto shrine in Harajuku.",
      category: "sightseeing",
    },
    {
      time: "16:00",
      place: "Rainbow Bridge",
      description:
        "Walk or cycle across this iconic suspension bridge with views of Tokyo Bay.",
      category: "sightseeing",
    },
    {
      time: "11:00",
      place: "Odaiba",
      description:
        "Explore the futuristic artificial island with shopping, museums, and waterfront views.",
      category: "sightseeing",
    },
  ],
  food: [
    {
      time: "08:00",
      place: "Tsukiji Outer Market",
      description:
        "Enjoy fresh sushi breakfast and explore seafood stalls at the famous market.",
      category: "food",
    },
    {
      time: "12:30",
      place: "Ichiran Ramen – Shibuya",
      description:
        "Savor a bowl of rich tonkotsu ramen in individual booths for the ultimate focus.",
      category: "food",
    },
    {
      time: "19:00",
      place: "Omoide Yokocho (Memory Lane)",
      description:
        "Dine on yakitori skewers in the tiny alleyways of this atmospheric Shinjuku spot.",
      category: "food",
    },
    {
      time: "15:00",
      place: "Harajuku Takeshita Street",
      description:
        "Try crepes, cotton candy and quirky sweets from the colourful street-food stalls.",
      category: "food",
    },
    {
      time: "20:00",
      place: "Ginza Sushi Restaurant",
      description:
        "Experience an omakase dinner at a renowned Ginza sushi counter.",
      category: "food",
    },
  ],
  shopping: [
    {
      time: "11:00",
      place: "Shibuya 109",
      description:
        "Browse the latest Japanese fashion trends across ten floors of boutiques.",
      category: "shopping",
    },
    {
      time: "13:00",
      place: "Akihabara Electric Town",
      description:
        "Hunt for electronics, games, and collectibles in Tokyo's famous tech district.",
      category: "shopping",
    },
    {
      time: "15:00",
      place: "Omotesando Hills",
      description:
        "Shop high-end international and Japanese designer brands in this stunning complex.",
      category: "shopping",
    },
    {
      time: "10:00",
      place: "Nakameguro Vintage Shops",
      description:
        "Discover curated vintage clothing stores along the scenic canal.",
      category: "shopping",
    },
    {
      time: "16:30",
      place: "Don Quijote – Shinjuku",
      description:
        "Experience Japan's favourite discount variety store, open 24 hours.",
      category: "shopping",
    },
  ],
  culture: [
    {
      time: "09:30",
      place: "Tokyo National Museum",
      description:
        "Explore the world's largest collection of Japanese art and antiquities in Ueno.",
      category: "culture",
    },
    {
      time: "13:00",
      place: "teamLab Borderless",
      description:
        "Immerse yourself in a world of interactive digital art installations.",
      category: "culture",
    },
    {
      time: "15:30",
      place: "Nezu Museum",
      description:
        "Admire pre-modern Asian art in a tranquil Omotesando museum with a Japanese garden.",
      category: "culture",
    },
    {
      time: "10:00",
      place: "Mori Art Museum",
      description:
        "Contemporary art at the top of Roppongi Hills with spectacular city views.",
      category: "culture",
    },
    {
      time: "14:00",
      place: "Kabukiza Theatre",
      description:
        "Catch a single-act kabuki performance at Japan's premier kabuki venue in Ginza.",
      category: "culture",
    },
  ],
  nature: [
    {
      time: "07:00",
      place: "Shinjuku Gyoen",
      description:
        "Morning walk through this beautiful national garden blending French, English, and Japanese styles.",
      category: "nature",
    },
    {
      time: "09:00",
      place: "Yanaka Cemetery & Garden",
      description:
        "Peaceful stroll through old Tokyo's serene cemetery lined with cherry trees.",
      category: "nature",
    },
    {
      time: "14:00",
      place: "Hamarikyu Gardens",
      description:
        "Tidal garden with a traditional teahouse set against skyscraper backdrops.",
      category: "nature",
    },
    {
      time: "11:00",
      place: "Inokashira Park",
      description:
        "Rent a rowboat and enjoy the tranquil lake surrounded by trees in Kichijoji.",
      category: "nature",
    },
    {
      time: "16:00",
      place: "Mount Takao Day Trip",
      description:
        "Hike or take the cable car up Mt Takao for forest trails and city views.",
      category: "nature",
    },
  ],
  nightlife: [
    {
      time: "20:00",
      place: "Roppongi Hills Club",
      description:
        "Start the evening at one of Roppongi's upscale rooftop bars with Tokyo views.",
      category: "nightlife",
    },
    {
      time: "22:00",
      place: "Womb – Shibuya",
      description:
        "Dance to electronic music at one of Japan's most iconic clubs.",
      category: "nightlife",
    },
    {
      time: "19:30",
      place: "Shinjuku Golden Gai",
      description:
        "Bar-hop through six narrow alleyways packed with tiny, characterful drinking spots.",
      category: "nightlife",
    },
    {
      time: "21:00",
      place: "Karaoke – Shinjuku",
      description:
        "Belt out your favourite songs in a private karaoke room with friends.",
      category: "nightlife",
    },
    {
      time: "23:00",
      place: "Nonbei Yokocho – Shibuya",
      description:
        "Late-night drinks in this atmospheric alley nicknamed 'Drunkard's Alley'.",
      category: "nightlife",
    },
  ],
  anime: [
    {
      time: "10:00",
      place: "Akihabara Anime District",
      description:
        "Explore multi-floor anime and manga stores, arcades, and maid cafés.",
      category: "anime",
    },
    {
      time: "12:00",
      place: "Nakano Broadway",
      description:
        "Treasure trove of vintage figures, doujinshi, and rare collectibles.",
      category: "anime",
    },
    {
      time: "14:00",
      place: "Ghibli Museum – Mitaka",
      description:
        "Journey through the whimsical world of Studio Ghibli films (book in advance!).",
      category: "anime",
    },
    {
      time: "16:30",
      place: "Ikebukuro – Sunshine City",
      description:
        "Visit J-World Tokyo and the Pokémon Center in this otaku-friendly district.",
      category: "anime",
    },
    {
      time: "19:00",
      place: "Maid Café – Akihabara",
      description:
        "Experience the unique maid café culture unique to Akihabara.",
      category: "anime",
    },
  ],
  history: [
    {
      time: "09:00",
      place: "Imperial Palace East Gardens",
      description:
        "Walk the grounds of the former Edo Castle and admire the stone walls.",
      category: "history",
    },
    {
      time: "11:00",
      place: "Edo-Tokyo Museum",
      description:
        "Trace Tokyo's history from feudal Edo to modern metropolis with life-size reconstructions.",
      category: "history",
    },
    {
      time: "13:30",
      place: "Yanaka Old Town",
      description:
        "Wander one of Tokyo's best-preserved pre-war neighbourhoods with temples and craft shops.",
      category: "history",
    },
    {
      time: "15:00",
      place: "Zojo-ji Temple",
      description:
        "Ancient Buddhist temple with a dramatic backdrop of Tokyo Tower.",
      category: "history",
    },
    {
      time: "16:30",
      place: "Ueno Park & Tosho-gu Shrine",
      description:
        "Visit the ornate gold-lacquered shrine dedicated to Tokugawa Ieyasu.",
      category: "history",
    },
  ],
};

const CATEGORY_ICONS: Record<TripPurpose, string> = {
  sightseeing: "🗼",
  food: "🍜",
  shopping: "🛍️",
  culture: "🎨",
  nature: "🌿",
  nightlife: "🌙",
  anime: "🎌",
  history: "🏯",
};

function pickActivitiesForDay(
  purposes: TripPurpose[],
  dayIndex: number
): ItineraryActivity[] {
  const activitiesPerDay = 3;
  const selected: ItineraryActivity[] = [];
  const usedTimes = new Set<string>();

  // Rotate through purposes across days so each day feels different
  const rotatedPurposes = [
    ...purposes.slice(dayIndex % purposes.length),
    ...purposes.slice(0, dayIndex % purposes.length),
  ];

  for (const purpose of rotatedPurposes) {
    if (selected.length >= activitiesPerDay) break;
    const pool = ACTIVITY_POOL[purpose];
    // Pick a different activity per day using offset
    const activity = pool[dayIndex % pool.length];
    if (!usedTimes.has(activity.time)) {
      selected.push(activity);
      usedTimes.add(activity.time);
    }
  }

  // If we still need more, fill from sightseeing
  if (selected.length < activitiesPerDay) {
    for (const activity of ACTIVITY_POOL.sightseeing) {
      if (selected.length >= activitiesPerDay) break;
      if (!usedTimes.has(activity.time)) {
        selected.push(activity);
        usedTimes.add(activity.time);
      }
    }
  }

  // Sort by time
  return selected.sort((a, b) => a.time.localeCompare(b.time));
}

function getDayLabel(dayIndex: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayIndex);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/**
 * Mock API function — replace with real API call when the backend is ready.
 * Simulates network latency with a 1.5 s delay.
 */
export async function generateItinerary(
  formData: TripFormData
): Promise<ItineraryResult> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const days: DayItinerary[] = Array.from(
    { length: formData.duration },
    (_, i) => ({
      day: i + 1,
      date: getDayLabel(i),
      activities: pickActivitiesForDay(formData.purposes, i),
    })
  );

  return {
    duration: formData.duration,
    purposes: formData.purposes,
    days,
  };
}

export { CATEGORY_ICONS };
