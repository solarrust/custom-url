import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedManagement from "./ProtectedManagement";

// Mock useAuth0 hook
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn(),
}));

// Mock PublicLanding component
vi.mock("../PublicLanding/PublicLanding", () => ({
  default: () => <div data-testid="public-landing">Public Landing</div>,
}));

describe("ProtectedManagement", () => {
  const mockLogout = vi.fn();
  const allowedEmail = "test@example.com";

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock environment variable
    process.env.NEXT_PUBLIC_ALLOWED_EMAIL = allowedEmail;
  });

  it("shows loading state when auth is loading", () => {
    (useAuth0 as any).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      logout: mockLogout,
    });

    render(
      <ProtectedManagement>
        <div>Protected Content</div>
      </ProtectedManagement>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Loading...").closest("div")).toHaveClass("text-center");
  });

  it("shows public landing when not authenticated", () => {
    (useAuth0 as any).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      logout: mockLogout,
    });

    render(
      <ProtectedManagement>
        <div>Protected Content</div>
      </ProtectedManagement>
    );

    expect(screen.getByTestId("public-landing")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("shows access denied for unauthorized user", () => {
    (useAuth0 as any).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email: "unauthorized@example.com" },
      logout: mockLogout,
    });

    render(
      <ProtectedManagement>
        <div>Protected Content</div>
      </ProtectedManagement>
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.getByText("Logged in as: unauthorized@example.com")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("shows protected content for authorized user", () => {
    (useAuth0 as any).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email: allowedEmail },
      logout: mockLogout,
    });

    render(
      <ProtectedManagement>
        <div>Protected Content</div>
      </ProtectedManagement>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
    expect(screen.queryByText("Access Denied")).not.toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    (useAuth0 as any).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { email: "unauthorized@example.com" },
      logout: mockLogout,
    });

    render(
      <ProtectedManagement>
        <div>Protected Content</div>
      </ProtectedManagement>
    );

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });
});
