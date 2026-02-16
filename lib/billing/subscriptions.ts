import { getSupabasePublicEnv, getSupabaseServiceRoleKey } from '@/lib/supabase/env';

const paidStatuses = new Set(['active', 'trialing']);

type SubscriptionStatus = 'free' | 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid';

function jsonHeaders(apiKey: string, bearer?: string) {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${bearer ?? apiKey}`,
    'Content-Type': 'application/json'
  };
}

export function normalizeSubscriptionStatus(status: string | null | undefined): SubscriptionStatus {
  if (!status) {
    return 'free';
  }

  if (
    status === 'active' ||
    status === 'trialing' ||
    status === 'past_due' ||
    status === 'canceled' ||
    status === 'unpaid'
  ) {
    return status;
  }

  return 'free';
}

export function isSubscriptionPaid(status: string | null | undefined) {
  return Boolean(status && paidStatuses.has(status));
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
  return isSubscriptionPaid(rows[0]?.subscription_status);
}

export async function updateProfileSubscription(params: {
  userId: string;
  subscriptionStatus: string | null | undefined;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}) {
  const { userId, subscriptionStatus, stripeCustomerId, stripeSubscriptionId } = params;
  const { supabaseUrl } = getSupabasePublicEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      ...jsonHeaders(serviceRoleKey),
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      subscription_status: normalizeSubscriptionStatus(subscriptionStatus),
      stripe_customer_id: stripeCustomerId ?? null,
      stripe_subscription_id: stripeSubscriptionId ?? null,
      updated_at: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to persist subscription status: ${message}`);
  }

  return response;
}

export async function getProfileForBilling(userId: string) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const response = await fetch(
    `${supabaseUrl}/rest/v1/profiles?select=id,stripe_customer_id,subscription_status&id=eq.${userId}&limit=1`,
    {
      headers: jsonHeaders(serviceRoleKey),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to load billing profile: ${message}`);
  }

  const rows = (await response.json()) as Array<{
    id: string;
    stripe_customer_id: string | null;
    subscription_status: string | null;
  }>;

  return rows[0] ?? null;
}


export async function getProfileByStripeCustomerId(customerId: string) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const response = await fetch(
    `${supabaseUrl}/rest/v1/profiles?select=id,stripe_customer_id,stripe_subscription_id&stripe_customer_id=eq.${customerId}&limit=1`,
    {
      headers: jsonHeaders(serviceRoleKey),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to load profile by customer id: ${message}`);
  }

  const rows = (await response.json()) as Array<{ id: string; stripe_customer_id: string | null; stripe_subscription_id: string | null }>;
  return rows[0] ?? null;
}

export async function getProfileByStripeSubscriptionId(subscriptionId: string) {
  const { supabaseUrl } = getSupabasePublicEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const response = await fetch(
    `${supabaseUrl}/rest/v1/profiles?select=id,stripe_customer_id,stripe_subscription_id&stripe_subscription_id=eq.${subscriptionId}&limit=1`,
    {
      headers: jsonHeaders(serviceRoleKey),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to load profile by subscription id: ${message}`);
  }

  const rows = (await response.json()) as Array<{ id: string; stripe_customer_id: string | null; stripe_subscription_id: string | null }>;
  return rows[0] ?? null;
}
