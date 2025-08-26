'use client';

import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="btn btn-active btn-primary"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="btn btn-active btn-primary"
    >
      Log in
    </button>
  );
}
