import Link from 'next/link';
import { signUpAction } from '../actions';

export default function SignUpPage({
  searchParams
}: {
  searchParams?: { error?: string; next?: string };
}) {
  const next = searchParams?.next ?? '/';

  return (
    <main style={{ width: 'min(460px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Create account</h1>
      <p>Start with a free account, then unlock full briefs with a paid subscription.</p>
      {searchParams?.error ? <p style={{ color: 'crimson' }}>{searchParams.error}</p> : null}
      <form action={signUpAction} style={{ display: 'grid', gap: '0.75rem' }}>
        <input type="hidden" name="next" value={next} />
        <label htmlFor="sign-up-email">Email</label>
        <input id="sign-up-email" type="email" name="email" required />
        <label htmlFor="sign-up-password">Password</label>
        <input id="sign-up-password" type="password" name="password" minLength={8} required />
        <button type="submit">Create account</button>
      </form>
      <p>
        Already have an account? <Link href={`/auth/sign-in?next=${encodeURIComponent(next)}`}>Sign in.</Link>
      </p>
    </main>
  );
}
