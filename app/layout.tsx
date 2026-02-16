import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              gap: 'var(--space-6)'
            }}
            aria-label="Primary"
          >
            <Link href="/">Public</Link>
            <Link href="/studio">Studio</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
