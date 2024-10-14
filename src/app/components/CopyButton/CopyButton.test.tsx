import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import CopyButton from "./CopyButton";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("CopyButton", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should copy the URL to the clipboard and show success icon", async () => {
    render(<CopyButton url="https://example.com" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "https://example.com"
      );
      expect(screen.getByTestId("DoneSharpIcon")).toBeInTheDocument();
    });
  });

  it("should handle copy failure gracefully", async () => {
    navigator.clipboard.writeText = vi
      .fn()
      .mockRejectedValue(new Error("Failed to copy"));
    render(<CopyButton url="https://example.com" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "https://example.com"
      );
      expect(screen.queryByTestId("DoneSharpIcon")).not.toBeInTheDocument();
    });
  });
});
