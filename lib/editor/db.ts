import { cookies } from 'next/headers';

import { ACCESS_TOKEN_COOKIE, getUserFromAccessToken } from '@/lib/supabase/auth';
import { getSupabasePublicEnv, getSupabaseServiceRoleKey } from '@/lib/supabase/env';

function restHeaders() {
  const key = getSupabaseServiceRoleKey();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json'
  };
}

export async function restSelect<T>(path: string) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: restHeaders(),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Supabase select failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function restInsert<T>(path: string, payload: Record<string, unknown>) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: 'POST',
    headers: { ...restHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function restUpdate<T>(path: string, payload: Record<string, unknown>) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: 'PATCH',
    headers: { ...restHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Supabase update failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function assertAdminFromCookie() {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    throw new Error('Unauthorized');
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user) {
    throw new Error('Unauthorized');
  }

  const rows = await restSelect<Array<{ role: string }>>(`profiles?select=role&id=eq.${user.id}&limit=1`);

  if (rows[0]?.role !== 'admin') {
    throw new Error('Forbidden');
  }

  return user;
}
