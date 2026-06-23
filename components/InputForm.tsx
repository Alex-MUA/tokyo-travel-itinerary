"use client";

import { useState } from "react";
import { TripFormData, TripPurpose } from "@/types";

interface InputFormProps {
  onSubmit: (data: TripFormData) => void;
}

const PURPOSE_OPTIONS: { value: TripPurpose; label: string; icon: string }[] =
  [
    { value: "sightseeing", label: "Sightseeing", icon: "🗼" },
    { value: "food", label: "Food & Dining", icon: "🍜" },
    { value: "shopping", label: "Shopping", icon: "🛍️" },
    { value: "culture", label: "Art & Culture", icon: "🎨" },
    { value: "nature", label: "Parks & Nature", icon: "🌿" },
    { value: "nightlife", label: "Nightlife", icon: "🌙" },
    { value: "anime", label: "Anime & Manga", icon: "🎌" },
    { value: "history", label: "History & Temples", icon: "🏯" },
  ];

export default function InputForm({ onSubmit }: InputFormProps) {
  const [duration, setDuration] = useState<number>(3);
  const [purposes, setPurposes] = useState<TripPurpose[]>([
    "sightseeing",
    "food",
  ]);
  const [error, setError] = useState<string>("");

  function togglePurpose(purpose: TripPurpose) {
    setPurposes((prev) =>
      prev.includes(purpose)
        ? prev.filter((p) => p !== purpose)
        : [...prev, purpose]
    );
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (purposes.length === 0) {
      setError("Please select at least one trip purpose.");
      return;
    }
    onSubmit({ duration, purposes });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto flex flex-col gap-8"
    >
      {/* Duration */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Trip Duration
        </label>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`w-11 h-11 rounded-full text-sm font-bold border-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                duration === d
                  ? "bg-pink-500 border-pink-500 text-white shadow-md scale-110"
                  : "border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500 bg-white"
              }`}
              aria-pressed={duration === d}
              aria-label={`${d} day${d > 1 ? "s" : ""}`}
            >
              {d}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {duration} day{duration > 1 ? "s" : ""} selected
        </p>
      </div>

      {/* Purpose */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Trip Purpose
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PURPOSE_OPTIONS.map(({ value, label, icon }) => {
            const checked = purposes.includes(value);
            return (
              <label
                key={value}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
                  checked
                    ? "border-pink-400 bg-pink-50 text-pink-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-pink-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => togglePurpose(value)}
                  aria-label={label}
                />
                <span className="text-xl" aria-hidden="true">
                  {icon}
                </span>
                <span className="text-sm font-medium">{label}</span>
                {checked && (
                  <span className="ml-auto text-pink-500" aria-hidden="true">
                    ✓
                  </span>
                )}
              </label>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-pink-300 text-base"
      >
        ✈️ Generate My Itinerary
      </button>
    </form>
  );
}
