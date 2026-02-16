import Link from 'next/link';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE, getUserFromAccessToken } from '@/lib/supabase/auth';
import { PLAN_DETAILS } from '@/lib/billing/plans';
import { getProfileForBilling, isSubscriptionPaid } from '@/lib/billing/subscriptions';

export default async function PricingPage({
  searchParams
}: {
  searchParams?: { paywall?: string; success?: string; canceled?: string; billing?: string };
}) {
  const paywallTarget = searchParams?.paywall;
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  const user = accessToken ? await getUserFromAccessToken(accessToken) : null;
  const profile = user ? await getProfileForBilling(user.id) : null;

  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Pricing</h1>
      <p>Pick monthly or annual access to unlock the full briefs archive and every new weekly brief.</p>
      {paywallTarget ? (
        <p style={{ color: 'crimson' }}>Your account needs an active subscription to open {paywallTarget}.</p>
      ) : null}
      {searchParams?.success ? (
        <p style={{ color: 'green' }}>Checkout complete. Your subscription should unlock within a few seconds.</p>
      ) : null}
      {searchParams?.canceled ? <p style={{ color: '#b45309' }}>Checkout canceled. No charge was made.</p> : null}
      {searchParams?.billing === 'missing_customer' ? (
        <p style={{ color: '#b45309' }}>No Stripe billing profile found yet. Start checkout first.</p>
      ) : null}

      <section
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}
      >
        {(Object.entries(PLAN_DETAILS) as Array<[keyof typeof PLAN_DETAILS, (typeof PLAN_DETAILS)['monthly']]>).map(
          ([planKey, plan]) => (
            <article
              key={planKey}
              style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1rem' }}
            >
              <h2>{plan.name}</h2>
              <p>
                <strong>{plan.amountLabel}</strong> {plan.intervalLabel}
              </p>
              <p>{plan.description}</p>
              {user ? (
                <form method="POST" action="/api/stripe/checkout">
                  <input type="hidden" name="plan" value={planKey} />
                  <button type="submit">Start {plan.name} checkout</button>
                </form>
              ) : (
                <p>
                  <Link href={`/auth/sign-in?next=/pricing`}>Sign in</Link> to start checkout.
                </p>
              )}
            </article>
          )
        )}
      </section>

      {user ? (
        <section style={{ marginTop: '2rem' }}>
          <h2>Manage billing</h2>
          <p>
            Current status: <strong>{profile?.subscription_status ?? 'free'}</strong>
            {isSubscriptionPaid(profile?.subscription_status) ? ' (active access)' : ' (no paid access)'}
          </p>
          <form method="POST" action="/api/stripe/customer-portal">
            <button type="submit">Manage billing in Stripe portal</button>
          </form>
        </section>
      ) : (
        <p style={{ marginTop: '2rem' }}>
          Need billing controls? <Link href="/auth/sign-in?next=/pricing">Sign in</Link> first.
        </p>
      )}
    </main>
  );
}
