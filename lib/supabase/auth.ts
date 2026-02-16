import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabasePublicEnv, getSupabaseServiceRoleKey } from './env';

export const ACCESS_TOKEN_COOKIE = 'findkey-access-token';
export const REFRESH_TOKEN_COOKIE = 'findkey-refresh-token';

type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type SupabaseUser = {
  id: string;
  email?: string;
};

const paidStatuses = new Set(['active', 'trialing']);

function jsonHeaders(apiKey: string, bearer?: string) {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${bearer ?? apiKey}`,
    'Content-Type': 'application/json'
  };
}

type SignUpOptions = {
  redirectTo?: string;
};

export async function signUpWithPassword(email: string, password: string, options?: SignUpOptions) {
  const { supabaseAnonKey, supabaseUrl } = getSupabasePublicEnv();

  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers: jsonHeaders(supabaseAnonKey),
    body: JSON.stringify({
      email,
      password,
      options: options?.redirectTo ? { emailRedirectTo: options.redirectTo } : undefined
    })
  });

  return response;
}

export async function signInWithPassword(email: string, password: string) {
  const { supabaseAnonKey, supabaseUrl } = getSupabasePublicEnv();

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: jsonHeaders(supabaseAnonKey),
    body: JSON.stringify({ email, password })
  });

  return response;
}

export async function signOutWithToken(accessToken: string) {
  const { supabaseAnonKey, supabaseUrl } = getSupabasePublicEnv();

  return fetch(`${supabaseUrl}/auth/v1/logout`, {
    method: 'POST',
    headers: jsonHeaders(supabaseAnonKey, accessToken)
  });
}

export async function refreshSession(refreshToken: string) {
  const { supabaseAnonKey, supabaseUrl } = getSupabasePublicEnv();

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: jsonHeaders(supabaseAnonKey),
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  return response;
}

export async function getUserFromAccessToken(accessToken: string) {
  const { supabaseAnonKey, supabaseUrl } = getSupabasePublicEnv();

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: jsonHeaders(supabaseAnonKey, accessToken),
    cache: 'no-store'
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as SupabaseUser;
}

export async function isPaidSubscriber(userId: string) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const response = await fetch(
    `${supabaseUrl}/rest/v1/profiles?select=subscription_status&id=eq.${userId}&limit=1`,
    {
      headers: jsonHeaders(serviceRoleKey),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    return false;
  }

  const rows = (await response.json()) as Array<{ subscription_status: string | null }>;
  return Boolean(rows[0]?.subscription_status && paidStatuses.has(rows[0].subscription_status));
}

export function applySessionCookiesToResponse(response: NextResponse, session: SupabaseSession) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, session.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: session.expires_in
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, session.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });
}

export function clearSessionCookiesFromResponse(response: NextResponse) {
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
}

export function setSessionCookies(session: SupabaseSession) {
  const cookieStore = cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, session.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: session.expires_in
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE, session.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });
}

export function clearSessionCookies() {
  const cookieStore = cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export function readSessionTokens(request: NextRequest) {
  return {
    accessToken: request.cookies.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
  };
}
