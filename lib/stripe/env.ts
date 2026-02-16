const requiredStripeEnv = ['STRIPE_SECRET_KEY', 'STRIPE_PRICE_MONTHLY', 'STRIPE_PRICE_ANNUAL'] as const;

export function assertStripeEnv() {
  for (const key of requiredStripeEnv) {
    if (!process.env[key]) {
      throw new Error(`Missing Stripe environment variable: ${key}`);
    }
  }
}

export function getStripeEnv() {
  assertStripeEnv();

  return {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
    monthlyPriceId: process.env.STRIPE_PRICE_MONTHLY as string,
    annualPriceId: process.env.STRIPE_PRICE_ANNUAL as string
  };
}

export function getStripeWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Missing Stripe environment variable: STRIPE_WEBHOOK_SECRET');
  }

  return webhookSecret;
}
