import Link from 'next/link';

export default function PricingPage({ searchParams }: { searchParams?: { paywall?: string } }) {
  const paywallTarget = searchParams?.paywall;

  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Pricing</h1>
      <p>Choose a plan to unlock full weekly briefs and archive access.</p>
      {paywallTarget ? (
        <p style={{ color: 'crimson' }}>Your account needs an active subscription to open {paywallTarget}.</p>
      ) : null}
      <ul>
        <li>
          <strong>Monthly:</strong> $10 / month
        </li>
        <li>
          <strong>Annual:</strong> $96 / year (20% off)
        </li>
      </ul>
      <p>
        <Link href="/auth/sign-up?next=/pricing">Create an account</Link> to continue to checkout.
      </p>
    </main>
  );
}
