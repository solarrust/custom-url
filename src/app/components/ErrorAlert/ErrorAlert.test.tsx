import { render, screen } from "@testing-library/react";
import ErrorAlert from "./ErrorAlert";
import { describe, it, expect } from "vitest";

describe("ErrorAlert Component", () => {
  it("renders the error message correctly", () => {
    const error = new Error("Test error message");
    render(<ErrorAlert error={error} />);
    expect(screen.getByText("Test error message 😭")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render without an error", () => {
    render(<ErrorAlert error={undefined as unknown as Error} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
