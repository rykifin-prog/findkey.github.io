import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserFromAccessToken, ACCESS_TOKEN_COOKIE } from '@/lib/supabase/auth';
import { resolveStripePriceId } from '@/lib/billing/plans';
import { createStripeCheckoutSession } from '@/lib/stripe/api';
import { getProfileForBilling } from '@/lib/billing/subscriptions';

export async function POST(request: Request) {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  const user = accessToken ? await getUserFromAccessToken(accessToken) : null;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const requestedPlan = formData.get('plan');
  const plan = typeof requestedPlan === 'string' ? requestedPlan : '';
  const priceId = resolveStripePriceId(plan);

  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const profile = await getProfileForBilling(user.id);

  const checkoutSession = await createStripeCheckoutSession({
    priceId,
    stripeCustomerId: profile?.stripe_customer_id ?? null,
    customerEmail: user.email,
    successUrl: `${origin}/pricing?success=1`,
    cancelUrl: `${origin}/pricing?canceled=1`,
    userId: user.id
  });

  return NextResponse.redirect(checkoutSession.url, { status: 303 });
}
