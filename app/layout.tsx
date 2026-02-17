import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { ACCESS_TOKEN_COOKIE, getUserFromAccessToken } from '@/lib/supabase/auth';
import PrimaryNav from '@/components/primary-nav';

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
          <PrimaryNav isAuthenticated={Boolean(user)} />
        </header>
        {children}
      </body>
    </html>
  );
}
