import { getStripeEnv } from '@/lib/stripe/env';

export type BillingPlan = 'monthly' | 'annual';

export const PLAN_DETAILS: Record<
  BillingPlan,
  {
    name: string;
    intervalLabel: string;
    amountLabel: string;
    description: string;
  }
> = {
  monthly: {
    name: 'Monthly',
    intervalLabel: 'per month',
    amountLabel: '$10',
    description: 'Flexible monthly billing for full brief access.'
  },
  annual: {
    name: 'Annual',
    intervalLabel: 'per year',
    amountLabel: '$96',
    description: 'Save 20% with annual billing for full brief access.'
  }
};

export function resolveStripePriceId(plan: string) {
  const { annualPriceId, monthlyPriceId } = getStripeEnv();

  if (plan === 'monthly') {
    return monthlyPriceId;
  }

  if (plan === 'annual') {
    return annualPriceId;
  }

  return null;
}
