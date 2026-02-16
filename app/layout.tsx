import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from './components/site-header';

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
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
