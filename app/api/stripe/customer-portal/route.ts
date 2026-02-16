import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserFromAccessToken, ACCESS_TOKEN_COOKIE } from '@/lib/supabase/auth';
import { getProfileForBilling } from '@/lib/billing/subscriptions';
import { createStripePortalSession } from '@/lib/stripe/api';

export async function POST(request: Request) {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  const user = accessToken ? await getUserFromAccessToken(accessToken) : null;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await getProfileForBilling(user.id);

  if (!profile?.stripe_customer_id) {
    return NextResponse.redirect(new URL('/pricing?billing=missing_customer', request.url), 303);
  }

  const returnUrl = `${new URL(request.url).origin}/pricing`;
  const portalSession = await createStripePortalSession({
    customerId: profile.stripe_customer_id,
    returnUrl
  });

  return NextResponse.redirect(portalSession.url, 303);
}
