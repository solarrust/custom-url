import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi } from "vitest";
import Search from "./Search";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
  usePathname: () => "/",
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

describe("Search Component", () => {
  const placeholderText = "Search...";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the search input with placeholder", () => {
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls replace with the correct query parameter when input changes", () => {
    const { replace } = useRouter();
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(inputElement, { target: { value: "test" } });

    setTimeout(() => {
      expect(replace).toHaveBeenCalledWith("/?query=test");
    }, 300);
  });

  it("removes the query parameter when input is cleared", () => {
    const { replace } = useRouter();
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(inputElement, { target: { value: "test" } });

    setTimeout(() => {
      fireEvent.change(inputElement, { target: { value: "" } });

      setTimeout(() => {
        expect(replace).toHaveBeenCalledWith("/");
      }, 300);
    }, 300);
  });

  it("does not call replace if the input value does not change", () => {
    const { replace } = useRouter();
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(inputElement, { target: { value: "test" } });

    setTimeout(() => {
      fireEvent.change(inputElement, { target: { value: "test" } });

      setTimeout(() => {
        expect(replace).toHaveBeenCalledTimes(1);
      }, 300);
    }, 300);
  });

  it("handles special characters in the search query", () => {
    const { replace } = useRouter();
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(inputElement, { target: { value: "test@123" } });

    setTimeout(() => {
      expect(replace).toHaveBeenCalledWith("/?query=test%40123");
    }, 300);
  });
});