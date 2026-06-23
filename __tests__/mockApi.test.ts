import { generateItinerary } from "@/lib/mockApi";
import { TripFormData } from "@/types";

describe("generateItinerary", () => {
  it("returns an itinerary with the correct number of days", async () => {
    const formData: TripFormData = { duration: 3, purposes: ["food", "sightseeing"] };
    const result = await generateItinerary(formData);
    expect(result.duration).toBe(3);
    expect(result.days).toHaveLength(3);
  });

  it("each day has the correct day number", async () => {
    const formData: TripFormData = { duration: 2, purposes: ["culture"] };
    const result = await generateItinerary(formData);
    expect(result.days[0].day).toBe(1);
    expect(result.days[1].day).toBe(2);
  });

  it("each day contains at least one activity", async () => {
    const formData: TripFormData = { duration: 5, purposes: ["nature", "history"] };
    const result = await generateItinerary(formData);
    result.days.forEach((day) => {
      expect(day.activities.length).toBeGreaterThan(0);
    });
  });

  it("activities have required fields", async () => {
    const formData: TripFormData = { duration: 1, purposes: ["anime"] };
    const result = await generateItinerary(formData);
    const activity = result.days[0].activities[0];
    expect(activity).toHaveProperty("time");
    expect(activity).toHaveProperty("place");
    expect(activity).toHaveProperty("description");
    expect(activity).toHaveProperty("category");
  });

  it("reflects selected purposes in the result", async () => {
    const purposes = ["food", "shopping"] as const;
    const formData: TripFormData = { duration: 1, purposes: [...purposes] };
    const result = await generateItinerary(formData);
    expect(result.purposes).toEqual(purposes);
  });

  it("works for a 7-day trip with all purposes", async () => {
    const formData: TripFormData = {
      duration: 7,
      purposes: [
        "sightseeing",
        "food",
        "shopping",
        "culture",
        "nature",
        "nightlife",
        "anime",
        "history",
      ],
    };
    const result = await generateItinerary(formData);
    expect(result.days).toHaveLength(7);
  });

  it("activities are sorted by time within each day", async () => {
    const formData: TripFormData = {
      duration: 1,
      purposes: ["sightseeing", "food", "culture"],
    };
    const result = await generateItinerary(formData);
    const times = result.days[0].activities.map((a) => a.time);
    const sorted = [...times].sort();
    expect(times).toEqual(sorted);
  });
});
