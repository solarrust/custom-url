'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import LoginButton from '../LoginButton/LoginButton';

interface ProtectedAppProps {
  children: ReactNode;
}

export default function ProtectedApp({ children }: ProtectedAppProps) {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_EMAIL;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-base-100 rounded-lg shadow-lg max-w-md">
          <h1 className="text-3xl font-bold mb-4">Custom URL 😎</h1>
          <p className="mb-6 opacity-70">
            Please log in to access the URL shortener service
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  if (isAuthenticated && user?.email !== allowedEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-base-100 rounded-lg shadow-lg max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-error">Access Denied</h1>
          <p className="mb-4 opacity-70">
            This application is restricted to authorized users only.
          </p>
          <p className="mb-6 text-sm opacity-50">
            Logged in as: {user?.email}
          </p>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="btn btn-active btn-error"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
