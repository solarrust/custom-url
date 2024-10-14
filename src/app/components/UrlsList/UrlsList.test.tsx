import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import UrlsList from "./UrlsList";

vi.mock("../CopyButton/CopyButton", () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => <button>Copy {url}</button>,
}));

vi.mock("../DeleteButton/DeleteButton", () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => <button>Delete {id}</button>,
}));

vi.mock("../ErrorAlert/ErrorAlert", () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => <div>{error.message}</div>,
}));

vi.mock("../Search/Search", () => ({
  __esModule: true,
  default: ({ placeholder }: { placeholder: string }) => (
    <input placeholder={placeholder} />
  ),
}));

vi.mock("../TableFilter/TableFilter", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <button>{name}</button>,
}));

describe("UrlsList", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the list of URLs", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            urls: [
              {
                _id: "1",
                originalUrl: "http://example.com",
                shortUrl: "/short",
                visits: 10,
              },
            ],
          }),
      })
    ) as vi.Mock;

    render(<UrlsList query="" filter="" />);

    await waitFor(() => {
      expect(screen.getByText("http://example.com")).toBeInTheDocument();
      expect(
        screen.getByText("Copy http://localhost/short")
      ).toBeInTheDocument();
      expect(screen.getByText("Delete 1")).toBeInTheDocument();
    });
  });

  it("shows an error message when fetch fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as vi.Mock;

    render(<UrlsList query="" filter="" />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch urls")).toBeInTheDocument();
    });
  });

  it("filters URLs based on query", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            urls: [
              {
                _id: "1",
                originalUrl: "http://example.com",
                shortUrl: "/short",
                visits: 10,
              },
              {
                _id: "2",
                originalUrl: "http://test.com",
                shortUrl: "/test",
                visits: 5,
              },
            ],
          }),
      })
    ) as vi.Mock;

    render(<UrlsList query="test" filter="" />);

    await waitFor(() => {
      expect(screen.queryByText("http://example.com")).not.toBeInTheDocument();
      expect(screen.getByText("http://test.com")).toBeInTheDocument();
    });
  });

  it("sorts URLs based on visits", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            urls: [
              {
                _id: "1",
                originalUrl: "http://example.com",
                shortUrl: "/short",
                visits: 10,
              },
              {
                _id: "2",
                originalUrl: "http://test.com",
                shortUrl: "/test",
                visits: 5,
              },
            ],
          }),
      })
    ) as vi.Mock;

    render(<UrlsList query="" filter="visits-desc" />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("http://example.com");
      expect(rows[2]).toHaveTextContent("http://test.com");
    });
  });

  it("renders the search component", () => {
    render(<UrlsList query="" filter="" />);
    expect(screen.getByPlaceholderText("Search by URL")).toBeInTheDocument();
  });
});
