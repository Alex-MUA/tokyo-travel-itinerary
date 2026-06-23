import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputForm from "@/components/InputForm";

describe("InputForm", () => {
  it("renders duration buttons 1–7", () => {
    render(<InputForm onSubmit={jest.fn()} />);
    for (let d = 1; d <= 7; d++) {
      expect(screen.getByRole("button", { name: `${d} day${d > 1 ? "s" : ""}` })).toBeInTheDocument();
    }
  });

  it("renders all purpose checkboxes", () => {
    render(<InputForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText("Sightseeing")).toBeInTheDocument();
    expect(screen.getByLabelText("Food & Dining")).toBeInTheDocument();
    expect(screen.getByLabelText("Shopping")).toBeInTheDocument();
    expect(screen.getByLabelText("Art & Culture")).toBeInTheDocument();
    expect(screen.getByLabelText("Parks & Nature")).toBeInTheDocument();
    expect(screen.getByLabelText("Nightlife")).toBeInTheDocument();
    expect(screen.getByLabelText("Anime & Manga")).toBeInTheDocument();
    expect(screen.getByLabelText("History & Temples")).toBeInTheDocument();
  });

  it("calls onSubmit with selected duration and purposes", () => {
    const onSubmit = jest.fn();
    render(<InputForm onSubmit={onSubmit} />);

    // Change duration to 5
    fireEvent.click(screen.getByRole("button", { name: "5 days" }));

    // Uncheck defaults and select 'shopping'
    fireEvent.click(screen.getByLabelText("Sightseeing")); // uncheck
    fireEvent.click(screen.getByLabelText("Shopping"));    // check

    fireEvent.click(screen.getByRole("button", { name: /generate/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      duration: 5,
      purposes: expect.arrayContaining(["food", "shopping"]),
    });
  });

  it("shows error when no purpose is selected and form is submitted", () => {
    render(<InputForm onSubmit={jest.fn()} />);

    // Uncheck all defaults
    fireEvent.click(screen.getByLabelText("Sightseeing"));
    fireEvent.click(screen.getByLabelText("Food & Dining"));

    fireEvent.click(screen.getByRole("button", { name: /generate/i }));

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent("Please select at least one trip purpose.");
  });

  it("does not call onSubmit when no purpose is selected", () => {
    const onSubmit = jest.fn();
    render(<InputForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByLabelText("Sightseeing"));
    fireEvent.click(screen.getByLabelText("Food & Dining"));
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
