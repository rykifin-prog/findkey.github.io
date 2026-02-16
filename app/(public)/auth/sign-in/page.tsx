import Link from 'next/link';
import { signInAction } from '../actions';

export default function SignInPage({
  searchParams
}: {
  searchParams?: { error?: string; message?: string; next?: string };
}) {
  const next = searchParams?.next?.startsWith('/') ? searchParams.next : '/studio';

  return (
    <main style={{ width: 'min(460px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Sign in</h1>
      <p>Access your paid briefs and the Findkey Studio.</p>
      {searchParams?.message ? <p style={{ color: 'green' }}>{searchParams.message}</p> : null}
      {searchParams?.error ? <p style={{ color: 'crimson' }}>{searchParams.error}</p> : null}
      <form action={signInAction} style={{ display: 'grid', gap: '0.75rem' }}>
        <input type="hidden" name="next" value={next} />
        <label htmlFor="sign-in-email">Email</label>
        <input id="sign-in-email" type="email" name="email" required />
        <label htmlFor="sign-in-password">Password</label>
        <input id="sign-in-password" type="password" name="password" minLength={8} required />
        <button type="submit">Sign in</button>
      </form>
      <p>
        New here? <Link href={`/auth/sign-up?next=${encodeURIComponent(next)}`}>Create your account.</Link>
      </p>
    </main>
  );
}
