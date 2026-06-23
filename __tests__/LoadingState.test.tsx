import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingState from "@/components/LoadingState";

describe("LoadingState", () => {
  it("renders with a status role for accessibility", () => {
    render(<LoadingState />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has an accessible label", () => {
    render(<LoadingState />);
    expect(
      screen.getByRole("status", { name: /generating your itinerary/i })
    ).toBeInTheDocument();
  });

  it("renders a loading message", () => {
    render(<LoadingState />);
    expect(screen.getByText(/crafting your perfect tokyo trip/i)).toBeInTheDocument();
  });
});
