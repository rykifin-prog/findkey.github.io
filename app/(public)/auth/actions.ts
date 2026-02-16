'use server';

import { redirect } from 'next/navigation';
import {
  clearSessionCookies,
  setSessionCookies,
  signInWithPassword,
  signOutWithToken,
  signUpWithPassword,
  ACCESS_TOKEN_COOKIE
} from '@/lib/supabase/auth';
import { cookies } from 'next/headers';

function getInput(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Missing required field: ${key}`);
  }

  return value.trim();
}

export async function signUpAction(formData: FormData) {
  const email = getInput(formData, 'email');
  const password = getInput(formData, 'password');
  const next = typeof formData.get('next') === 'string' ? String(formData.get('next')) : '/';

  const response = await signUpWithPassword(email, password);

  if (!response.ok) {
    const body = await response.text();
    redirect(`/auth/sign-up?error=${encodeURIComponent(body)}`);
  }

  const data = (await response.json()) as {
    session: null | { access_token: string; refresh_token: string; expires_in: number };
  };

  if (data.session) {
    setSessionCookies(data.session);
    redirect(next);
  }

  redirect('/auth/sign-in?message=Check your email to confirm your account.');
}

export async function signInAction(formData: FormData) {
  const email = getInput(formData, 'email');
  const password = getInput(formData, 'password');
  const next = typeof formData.get('next') === 'string' ? String(formData.get('next')) : '/';

  const response = await signInWithPassword(email, password);

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

export async function signOutAction() {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    await signOutWithToken(accessToken);
  }

  clearSessionCookies();
  redirect('/');
}
