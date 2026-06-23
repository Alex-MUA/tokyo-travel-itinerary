export type TripPurpose =
  | "sightseeing"
  | "food"
  | "shopping"
  | "culture"
  | "nature"
  | "nightlife"
  | "anime"
  | "history";

export interface TripFormData {
  duration: number; // 1–7
  purposes: TripPurpose[];
}

export interface ItineraryActivity {
  time: string;
  place: string;
  description: string;
  category: TripPurpose;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: ItineraryActivity[];
}

export interface ItineraryResult {
  duration: number;
  purposes: TripPurpose[];
  days: DayItinerary[];
}

export type AppStep = "input" | "loading" | "result";
