import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import { ItineraryResult } from "@/types";

const mockResult: ItineraryResult = {
  duration: 2,
  purposes: ["sightseeing", "food"],
  days: [
    {
      day: 1,
      date: "Monday, January 1",
      activities: [
        {
          time: "09:00",
          place: "Senso-ji Temple",
          description: "Visit Tokyo's oldest temple.",
          category: "sightseeing",
        },
        {
          time: "12:30",
          place: "Ichiran Ramen",
          description: "Savor a bowl of tonkotsu ramen.",
          category: "food",
        },
      ],
    },
    {
      day: 2,
      date: "Tuesday, January 2",
      activities: [
        {
          time: "10:00",
          place: "Tokyo Skytree",
          description: "Panoramic views over the city.",
          category: "sightseeing",
        },
      ],
    },
  ],
};

describe("ItineraryTimeline", () => {
  it("renders the correct number of day sections", () => {
    render(<ItineraryTimeline result={mockResult} onReset={jest.fn()} />);
    expect(screen.getByRole("region", { name: "Day 1" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Day 2" })).toBeInTheDocument();
  });

  it("renders activity places and times", () => {
    render(<ItineraryTimeline result={mockResult} onReset={jest.fn()} />);
    expect(screen.getByText("Senso-ji Temple")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Ichiran Ramen")).toBeInTheDocument();
    expect(screen.getByText("12:30")).toBeInTheDocument();
    expect(screen.getByText("Tokyo Skytree")).toBeInTheDocument();
  });

  it("renders activity descriptions", () => {
    render(<ItineraryTimeline result={mockResult} onReset={jest.fn()} />);
    expect(screen.getByText("Visit Tokyo's oldest temple.")).toBeInTheDocument();
  });

  it("shows the trip duration in the summary", () => {
    render(<ItineraryTimeline result={mockResult} onReset={jest.fn()} />);
    expect(screen.getByText(/2-Day Tokyo Itinerary/i)).toBeInTheDocument();
  });

  it("calls onReset when the reset button is clicked", () => {
    const onReset = jest.fn();
    render(<ItineraryTimeline result={mockResult} onReset={onReset} />);
    fireEvent.click(screen.getByRole("button", { name: /plan another trip/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
