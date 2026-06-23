"use client";

const LOADING_MESSAGES = [
  "Consulting the cherry blossom oracle…",
  "Mapping ramen routes in Shinjuku…",
  "Checking train schedules on the Yamanote Line…",
  "Reserving a table at the best sushi bar…",
  "Polishing your Tokyo adventure…",
];

export default function LoadingState() {
  return (
    <div
      role="status"
      aria-label="Generating your itinerary"
      className="flex flex-col items-center justify-center gap-8 py-16 w-full"
    >
      {/* Animated torii gate */}
      <div className="relative flex items-center justify-center">
        <span className="text-7xl animate-bounce" aria-hidden="true">
          ⛩️
        </span>
        <span
          className="absolute -bottom-2 w-20 h-2 bg-pink-200 rounded-full blur-sm animate-pulse"
          aria-hidden="true"
        />
      </div>

      {/* Spinner ring */}
      <div
        className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"
        aria-hidden="true"
      />

      {/* Cycling messages */}
      <div className="text-center space-y-2 px-4">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Crafting your perfect Tokyo trip…
        </p>
        <p className="text-sm text-gray-400">
          {LOADING_MESSAGES[Math.floor(Date.now() / 1000) % LOADING_MESSAGES.length]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
