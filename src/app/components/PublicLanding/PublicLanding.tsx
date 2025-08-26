import LoginButton from "../LoginButton/LoginButton";

export default function PublicLanding() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-base-100 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold mb-4">Custom URL 😎</h1>
        <p className="mb-6 opacity-70">
          A personal service for creating custom short URLs
        </p>
        <p className="mb-6 text-sm opacity-50">
          Log in to manage URLs or use existing short links directly
        </p>
        <LoginButton />
      </div>
    </div>
  );
}
