import Link from 'next/link';

export default function PricingPage({ searchParams }: { searchParams?: { paywall?: string } }) {
  const paywallTarget = searchParams?.paywall;

  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Pricing</h1>
      <p>To become a member enter your email below.</p>
      {paywallTarget ? (
        <p style={{ color: 'crimson' }}>Your account needs an active subscription to open {paywallTarget}.</p>
      ) : null}
      <p>
        <Link href="/auth/sign-up?next=/pricing">Subscribe</Link> to continue.
      </p>
    </main>
  );
}
