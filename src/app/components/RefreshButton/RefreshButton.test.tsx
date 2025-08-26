import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import RefreshButton from "./RefreshButton";

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();
const mockRefresh = vi.fn();

describe("RefreshButton", () => {
  beforeEach(() => {
    (useRouter as any).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-outline", "btn-sm");
  });

  it("calls router.refresh when clicked", () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when clicked", () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button).toBeDisabled();
  });

  it("has correct title attribute", () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("title", "Refresh data");
  });

  it("shows SVG icon", () => {
    render(<RefreshButton />);

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("h-4", "w-4");
  });

  it("applies animate-spin class when loading", () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button");
    const svg = button.querySelector("svg");

    fireEvent.click(button);

    expect(svg).toHaveClass("animate-spin");
  });
});
