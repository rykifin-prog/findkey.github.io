import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { ACCESS_TOKEN_COOKIE, getUserFromAccessToken } from '@/lib/supabase/auth';
import { MainNav } from '@/components/navigation/MainNav';
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
  const role = user?.app_metadata?.role ?? user?.user_metadata?.role;
  const isAuthenticated = Boolean(user);
  const isAdmin = role === 'admin';

  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: '1px solid var(--color-border)' }}>
          <nav
            style={{
              width: 'min(1200px, 100%)',
              margin: '0 auto',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              gap: 'var(--space-6)',
              alignItems: 'center'
            }}
            aria-label="Primary"
          >
            <MainNav isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
            <div style={{ marginLeft: 'auto' }}>
              {user ? (
                <form action={signOutAction}>
                  <button type="submit">Sign out</button>
                </form>
              ) : null}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
