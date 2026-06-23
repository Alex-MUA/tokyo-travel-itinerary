"use client";

import { ItineraryResult, TripPurpose } from "@/types";
import { CATEGORY_ICONS } from "@/lib/mockApi";

interface ItineraryTimelineProps {
  result: ItineraryResult;
  onReset: () => void;
}

const PURPOSE_LABELS: Record<TripPurpose, string> = {
  sightseeing: "Sightseeing",
  food: "Food & Dining",
  shopping: "Shopping",
  culture: "Art & Culture",
  nature: "Parks & Nature",
  nightlife: "Nightlife",
  anime: "Anime & Manga",
  history: "History & Temples",
};

const CATEGORY_COLORS: Record<TripPurpose, string> = {
  sightseeing: "bg-blue-100 text-blue-700 border-blue-200",
  food: "bg-orange-100 text-orange-700 border-orange-200",
  shopping: "bg-purple-100 text-purple-700 border-purple-200",
  culture: "bg-yellow-100 text-yellow-700 border-yellow-200",
  nature: "bg-green-100 text-green-700 border-green-200",
  nightlife: "bg-indigo-100 text-indigo-700 border-indigo-200",
  anime: "bg-pink-100 text-pink-700 border-pink-200",
  history: "bg-amber-100 text-amber-700 border-amber-200",
};

const TIMELINE_DOTS: Record<TripPurpose, string> = {
  sightseeing: "bg-blue-400",
  food: "bg-orange-400",
  shopping: "bg-purple-400",
  culture: "bg-yellow-400",
  nature: "bg-green-400",
  nightlife: "bg-indigo-400",
  anime: "bg-pink-400",
  history: "bg-amber-400",
};

export default function ItineraryTimeline({
  result,
  onReset,
}: ItineraryTimelineProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header summary */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white shadow-lg">
        <h2 className="text-xl font-bold mb-1">
          Your {result.duration}-Day Tokyo Itinerary
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {result.purposes.map((p) => (
            <span
              key={p}
              className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium"
            >
              {CATEGORY_ICONS[p]} {PURPOSE_LABELS[p]}
            </span>
          ))}
        </div>
      </div>

      {/* Day cards */}
      {result.days.map((day) => (
        <section
          key={day.day}
          aria-label={`Day ${day.day}`}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Day header */}
          <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              {day.day}
            </span>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Day {day.day}
              </p>
              <p className="text-sm font-semibold text-gray-800">{day.date}</p>
            </div>
          </div>

          {/* Timeline activities */}
          <ol className="px-5 py-4 flex flex-col gap-0">
            {day.activities.map((activity, idx) => (
              <li key={idx} className="flex gap-4 relative">
                {/* Vertical line */}
                {idx < day.activities.length - 1 && (
                  <span
                    className="absolute left-[7px] top-5 w-0.5 h-full bg-gray-100"
                    aria-hidden="true"
                  />
                )}

                {/* Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0 border-2 border-white shadow-sm ${
                    TIMELINE_DOTS[activity.category]
                  }`}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="pb-6 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <time className="text-xs font-bold text-gray-400 tracking-wider">
                        {activity.time}
                      </time>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug">
                        {activity.place}
                      </h3>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${
                        CATEGORY_COLORS[activity.category]
                      }`}
                    >
                      {CATEGORY_ICONS[activity.category]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full py-4 border-2 border-pink-300 text-pink-600 font-bold rounded-2xl hover:bg-pink-50 hover:border-pink-400 transition-all focus:outline-none focus:ring-4 focus:ring-pink-200 text-base"
      >
        ← Plan Another Trip
      </button>
    </div>
  );
}
