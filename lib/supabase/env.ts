const requiredPublicEnv = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
] as const;

export function assertSupabasePublicEnv() {
  for (const key of requiredPublicEnv) {
    if (!process.env[key]) {
      throw new Error(`Missing Supabase environment variable: ${key}`);
    }
  }
}

export function getSupabasePublicEnv() {
  assertSupabasePublicEnv();

  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  };
}

export function getSupabaseServiceRoleKey() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error('Missing Supabase environment variable: SUPABASE_SERVICE_ROLE_KEY');
  }

  return serviceRoleKey;
}
