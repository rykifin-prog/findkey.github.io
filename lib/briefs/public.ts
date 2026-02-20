import { getSupabasePublicEnv } from '@/lib/supabase/env';

export async function fetchPublishedBriefBySlug(slug: string) {
  const { supabaseAnonKey, supabaseUrl } = getSupabasePublicEnv();
  const response = await fetch(
    `${supabaseUrl}/rest/v1/briefs?select=title,summary,publish_date,content,slug,status,archived&slug=eq.${slug}&status=eq.published&archived=eq.false&limit=1`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`
      },
      next: { revalidate: 60 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load brief');
  }

  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows[0] ?? null;
}
