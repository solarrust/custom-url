import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableFilter from "./TableFilter";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(() => new URLSearchParams("")),
  usePathname: vi.fn(() => "/test-path"),
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
  })),
}));

describe("TableFilter", () => {
  const mockReplace = useRouter();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the button with the correct name", () => {
    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should set filter to ascending when no filter is applied", () => {
    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const spy = vi.spyOn(mockReplace, "replace");
    const button = getByText("Test");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith("/test-path?filter=test-asc");
  });

  it("should set filter to descending when ascending filter is applied", () => {
    vi.mock("next/navigation", () => ({
      useSearchParams: vi.fn(() => new URLSearchParams("filter=test-asc")),
      usePathname: vi.fn(() => "/test-path"),
      useRouter: vi.fn(() => ({
        replace: vi.fn(),
      })),
    }));
    const spy = vi.spyOn(mockReplace, "replace");

    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const button = getByText("Test");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith("/test-path?filter=test-desc");
  });

  it("should remove filter when descending filter is applied", () => {
    vi.mock("next/navigation", () => ({
      useSearchParams: vi.fn(() => new URLSearchParams("filter=test-desc")),
      usePathname: vi.fn(() => "/test-path"),
      useRouter: vi.fn(() => ({
        replace: vi.fn(),
      })),
    }));

    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const spy = vi.spyOn(mockReplace, "replace");
    const button = getByText("Test");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith("/test-path?");
  });

  it("should handle invalid filter state gracefully", () => {
    vi.mock("next/navigation", () => ({
      useSearchParams: vi.fn(() => new URLSearchParams("filter=invalid")),
      usePathname: vi.fn(() => "/test-path"),
      useRouter: vi.fn(() => ({
        replace: vi.fn(),
      })),
    }));

    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const spy = vi.spyOn(mockReplace, "replace");
    const button = getByText("Test");
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith("/test-path?filter=test-asc");
  });
});
