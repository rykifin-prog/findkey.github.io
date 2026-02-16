'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type CallbackClientProps = {
  next: string;
};

function normalizeNext(value: string | null | undefined) {
  if (!value || !value.startsWith('/')) {
    return '/studio';
  }

  return value;
}

export function AuthCallbackClient({ next }: CallbackClientProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const finalize = async () => {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const query = new URLSearchParams(window.location.search);

      const authError = hash.get('error_description') ?? query.get('error_description');

      if (authError) {
        setError(authError);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }

      const accessToken = hash.get('access_token') ?? query.get('access_token');
      const refreshToken = hash.get('refresh_token') ?? query.get('refresh_token');
      const expiresInRaw = hash.get('expires_in') ?? query.get('expires_in');
      const expiresIn = expiresInRaw ? Number(expiresInRaw) : NaN;

      if (!accessToken || !refreshToken || Number.isNaN(expiresIn)) {
        router.replace('/auth/sign-in?error=Authentication%20callback%20did%20not%20include%20a%20valid%20session.');
        return;
      }

      window.history.replaceState(null, '', window.location.pathname + window.location.search);

      const response = await fetch('/auth/callback/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn
        })
      });

      if (!response.ok) {
        router.replace('/auth/sign-in?error=Unable%20to%20persist%20session.');
        return;
      }

      router.replace(normalizeNext(next));
    };

    void finalize();
  }, [next, router]);

  return (
    <main style={{ width: 'min(460px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Completing sign in…</h1>
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : <p>Please wait while we redirect you.</p>}
    </main>
  );
}
