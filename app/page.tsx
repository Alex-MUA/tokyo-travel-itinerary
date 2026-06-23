"use client";

import { useState } from "react";
import InputForm from "@/components/InputForm";
import LoadingState from "@/components/LoadingState";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import { AppStep, TripFormData, ItineraryResult } from "@/types";
import { generateItinerary } from "@/lib/mockApi";

export default function Home() {
  const [step, setStep] = useState<AppStep>("input");
  const [result, setResult] = useState<ItineraryResult | null>(null);

  async function handleFormSubmit(data: TripFormData) {
    setStep("loading");
    try {
      const itinerary = await generateItinerary(data);
      setResult(itinerary);
      setStep("result");
    } catch {
      // If the API fails, go back to input
      setStep("input");
    }
  }

  function handleReset() {
    setResult(null);
    setStep("input");
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:py-16">
      {/* Page header */}
      <header className="text-center mb-10">
        <div className="text-5xl mb-3" aria-hidden="true">
          🗾
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Tokyo Travel Planner
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-sm mx-auto">
          Tell us your trip length and interests — we&apos;ll craft your perfect
          Tokyo itinerary.
        </p>

        {/* Step indicator */}
        <div
          className="flex items-center justify-center gap-2 mt-6"
          aria-label="Progress steps"
        >
          {(["input", "loading", "result"] as AppStep[]).map((s, idx) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? "bg-pink-500 text-white scale-110 shadow-md"
                    : idx <
                        (["input", "loading", "result"] as AppStep[]).indexOf(
                          step
                        )
                      ? "bg-pink-200 text-pink-700"
                      : "bg-gray-100 text-gray-400"
                }`}
                aria-current={step === s ? "step" : undefined}
              >
                {idx + 1}
              </div>
              {idx < 2 && (
                <div
                  className={`h-0.5 w-8 rounded transition-all ${
                    idx <
                    (["input", "loading", "result"] as AppStep[]).indexOf(step)
                      ? "bg-pink-300"
                      : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 mt-1">
          {["Input", "Loading", "Result"].map((label, idx) => (
            <span
              key={label}
              className={`text-xs ${
                idx ===
                (["input", "loading", "result"] as AppStep[]).indexOf(step)
                  ? "text-pink-500 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* Step content */}
      <div className="w-full max-w-2xl mx-auto">
        {step === "input" && <InputForm onSubmit={handleFormSubmit} />}
        {step === "loading" && <LoadingState />}
        {step === "result" && result && (
          <ItineraryTimeline result={result} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
