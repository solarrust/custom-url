import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Form from "./Form";
import { describe, test, expect, vi, afterEach } from "vitest";

vi.mock("../../serverActions/ShortenUrlAction");
const mockShortenUrl = vi.fn();

describe("Form Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  test("renders form elements correctly", () => {
    render(<Form />);
    expect(
      screen.getByPlaceholderText("https://example.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("/Funny")).toBeInTheDocument();
    expect(screen.getByText("Whoosh!")).toBeInTheDocument();
  });

  test("displays loading indicator when form is submitted", async () => {
    mockShortenUrl.mockResolvedValueOnce({});
    render(<Form />);

    fireEvent.input(screen.getByPlaceholderText("https://example.com"), {
      target: { value: "https://example.com" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /whoosh!/i }));

    expect(screen.getByRole("button")).toHaveTextContent("");
    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("submit-loader")
    );
  });

  test("resets form and hides loading indicator after submission", async () => {
    mockShortenUrl.mockResolvedValueOnce({});
    render(<Form />);

    fireEvent.input(screen.getByPlaceholderText("https://example.com"), {
      target: { value: "https://example.com" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /whoosh!/i }));

    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.getByRole("button")).toHaveTextContent("Whoosh!");

        expect(screen.getByPlaceholderText("https://example.com")).toHaveValue(
          ""
        );
        expect(screen.getByPlaceholderText("/Funny")).toHaveValue("");
      }),
        2000;
    });
  });

  test("displays error alert when submission fails", async () => {
    const errorMessage = "Network Error";
    mockShortenUrl.mockRejectedValueOnce(new Error(errorMessage));
    render(<Form />);

    fireEvent.input(screen.getByPlaceholderText("https://example.com"), {
      target: { value: "https://example.com" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /whoosh!/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
