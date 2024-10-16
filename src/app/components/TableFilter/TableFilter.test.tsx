import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import TableFilter from "./TableFilter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("TableFilter", () => {
  const mockReplace = vi.fn();
  const mockUseRouter = useRouter as unknown as Mock;
  const mockUsePathname = usePathname as unknown as Mock;
  const mockUseSearchParams = useSearchParams as unknown as Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue("/test-path");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should set filter to ascending when no filter is set", () => {
    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const button = getByText("Test");

    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/test-path?filter=test-asc");
  });

  it("should set filter to descending when ascending filter is set", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("filter=test-asc"));
    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const button = getByText("Test");

    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/test-path?filter=test-desc");
  });

  it("should remove filter when descending filter is set", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("filter=test-desc")
    );
    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const button = getByText("Test");

    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/test-path?");
  });

  it("should not change filter if sortParam is different", () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("filter=other-asc")
    );
    const { getByText } = render(<TableFilter name="Test" sortParam="test" />);
    const button = getByText("Test");

    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/test-path?filter=test-asc");
  });
});
