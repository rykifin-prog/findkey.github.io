import { getStripeEnv } from '@/lib/stripe/env';

function stripeHeaders() {
  const { secretKey } = getStripeEnv();

  return {
    Authorization: `Bearer ${secretKey}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };
}

function toFormBody(data: Record<string, string | undefined>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      params.set(key, value);
    }
  }

  return params;
}

export async function createStripeCheckoutSession(input: {
  priceId: string;
  customerEmail?: string;
  stripeCustomerId?: string | null;
  successUrl: string;
  cancelUrl: string;
  userId: string;
}) {
  const params = toFormBody({
    mode: 'subscription',
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    'line_items[0][price]': input.priceId,
    'line_items[0][quantity]': '1',
    'metadata[user_id]': input.userId,
    'subscription_data[metadata][user_id]': input.userId,
    client_reference_id: input.userId,
    customer: input.stripeCustomerId ?? undefined,
    customer_email: input.stripeCustomerId ? undefined : input.customerEmail
  });

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: stripeHeaders(),
    body: params
  });

  if (!response.ok) {
    throw new Error(`Stripe checkout session failed: ${await response.text()}`);
  }

  return (await response.json()) as {
    id: string;
    url: string;
    customer: string | null;
    subscription: string | null;
  };
}

export async function createStripePortalSession(input: {
  customerId: string;
  returnUrl: string;
}) {
  const params = toFormBody({
    customer: input.customerId,
    return_url: input.returnUrl
  });

  const response = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
    method: 'POST',
    headers: stripeHeaders(),
    body: params
  });

  if (!response.ok) {
    throw new Error(`Stripe customer portal failed: ${await response.text()}`);
  }

  return (await response.json()) as { url: string };
}

export async function retrieveStripeSubscription(subscriptionId: string) {
  const response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
    headers: {
      Authorization: stripeHeaders().Authorization
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Stripe subscription lookup failed: ${await response.text()}`);
  }

  return (await response.json()) as {
    id: string;
    status: string;
    customer: string;
    metadata?: Record<string, string>;
  };
}
