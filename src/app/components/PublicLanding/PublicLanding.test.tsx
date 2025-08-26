import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PublicLanding from "./PublicLanding";

// Mock LoginButton component
vi.mock("../LoginButton/LoginButton", () => ({
  default: () => <button>Login</button>,
}));

describe("PublicLanding", () => {
  it("renders correctly", () => {
    render(<PublicLanding />);

    expect(screen.getByText("Custom URL 😎")).toBeInTheDocument();
    expect(screen.getByText("A personal service for creating custom short URLs")).toBeInTheDocument();
    expect(screen.getByText("Log in to manage URLs or use existing short links directly")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("has correct structure", () => {
    render(<PublicLanding />);

    const container = screen.getByText("Custom URL 😎").closest("div");
    expect(container).toHaveClass("text-center", "p-8", "bg-base-100", "rounded-lg", "shadow-lg", "max-w-md");
  });

  it("displays login button", () => {
    render(<PublicLanding />);

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });
});
