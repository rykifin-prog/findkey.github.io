import { redirect } from 'next/navigation';
import { AuthCallbackClient } from './callback-client';
import { exchangeCodeForSession, setSessionCookies } from '@/lib/supabase/auth';

function normalizeNext(value: string | undefined) {
  if (!value || !value.startsWith('/')) {
    return '/studio';
  }

  return value;
}

export default async function AuthCallbackPage({
  searchParams
}: {
  searchParams?: { code?: string; next?: string; error_description?: string };
}) {
  const next = normalizeNext(searchParams?.next);

  if (searchParams?.error_description) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(searchParams.error_description)}`);
  }

  if (searchParams?.code) {
    const response = await exchangeCodeForSession(searchParams.code);

    if (!response.ok) {
      const body = await response.text();
      redirect(`/auth/sign-in?error=${encodeURIComponent(body)}`);
    }

    const data = (await response.json()) as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

    setSessionCookies(data);
    redirect(next);
  }

  return <AuthCallbackClient next={next} />;
}
