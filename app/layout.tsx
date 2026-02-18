import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import './globals.css';
import { ACCESS_TOKEN_COOKIE, getUserFromAccessToken } from '@/lib/supabase/auth';
import { signOutAction } from './(public)/auth/actions';

export const metadata: Metadata = {
  metadataBase: new URL('https://findkey.io'),
  title: {
    default: 'Findkey — Clarity before the conversation',
    template: '%s | Findkey'
  },
  description:
    'Findkey delivers weekly analytical briefs that map stakeholder, structural, empirical, incentive, and emotional truths in clear language.',
  openGraph: {
    title: 'Findkey',
    description:
      'Calm, evidence-labeled weekly briefs for intellectually curious independents.',
    type: 'website',
    url: 'https://findkey.io'
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
  const user = accessToken ? await getUserFromAccessToken(accessToken) : null;

  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div
            style={{
              width: 'min(1200px, 100%)',
              margin: '0 auto',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center'
            }}
          >
            <nav
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                alignItems: 'center'
              }}
              aria-label="Primary"
            >
              <Link href="/">Home</Link>
              <Link href="/method">Method</Link>
              <Link href="/briefs">Briefs</Link>
              <Link href="/philosophy">Philosophy</Link>
              <Link href="/archive">Archive</Link>
            </nav>
            <div style={{ marginLeft: 'auto' }}>
              {user ? (
                <form action={signOutAction}>
                  <button type="submit">Sign out</button>
                </form>
              ) : null}
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
