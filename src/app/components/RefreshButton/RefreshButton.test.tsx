import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach, MockedFunction } from "vitest";
import RefreshButton from "./RefreshButton";

// Mock server action
vi.mock("@/app/serverActions/RefreshUrlsAction", () => ({
  refreshUrlsData: vi.fn(),
}));

import { refreshUrlsData } from "@/app/serverActions/RefreshUrlsAction";

const mockRefreshUrlsData = refreshUrlsData as MockedFunction<typeof refreshUrlsData>;

describe("RefreshButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-sm");
  });

  it("calls refreshUrlsData when clicked", async () => {
    mockRefreshUrlsData.mockResolvedValue();

    render(<RefreshButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRefreshUrlsData).toHaveBeenCalledTimes(1);
    });
  });

  it("shows loading state when clicked", async () => {
    mockRefreshUrlsData.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<RefreshButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
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

  it("applies animate-spin class when loading", async () => {
    mockRefreshUrlsData.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<RefreshButton />);

    const button = screen.getByRole("button");
    const svg = button.querySelector("svg");

    fireEvent.click(button);

    expect(svg).toHaveClass("animate-spin");

    await waitFor(() => {
      expect(svg).not.toHaveClass("animate-spin");
    });
  });

  it("handles errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockRefreshUrlsData.mockRejectedValue(new Error("Network error"));

    render(<RefreshButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Failed to refresh data:", expect.any(Error));
      expect(button).not.toBeDisabled();
    });

    consoleSpy.mockRestore();
  });
});