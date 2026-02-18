import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Archive | Findkey',
  description:
    'A growing library of structured briefs, organized by issue and theme. Full access is available to members.',
};

export default function ArchivePage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <header className={styles.hero}>
          <h1 className={styles.pageTitle}>Archive</h1>

          <h2 className={styles.headline}>The Archive</h2>
          <p className={styles.subheadline}>
            A growing library of structured briefs, organized by issue and theme.
          </p>

          <div className={styles.bodyCopy}>
            <p>Each week, Findkey publishes one structured brief.</p>
            <p>
              Over time, those briefs compound into something more valuable than a headline reaction
              — a reference library for thinking clearly about modern issues.
            </p>
            <p>Full access is available to members.</p>
          </div>
        </header>

        <div className={styles.divider} aria-hidden="true" />

        <section className={styles.lockedSection} aria-label="Member-only archive access">
          <div className={styles.lockIcon} aria-hidden="true">
            🔒
          </div>
          <h3 className={styles.lockedTitle}>Member Access Required</h3>

          <p className={styles.lockedIntro}>The full archive includes:</p>
          <ul className={styles.lockedList}>
            <li>All prior weekly briefs</li>
            <li>Stakeholder maps</li>
            <li>Four Truth breakdowns</li>
            <li>Tradeoff analysis</li>
            <li>Uncertainty tracking</li>
            <li>Downstream consequence mapping</li>
          </ul>

          <p className={styles.signInCopy}>To access the archive, please sign in.</p>

          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/auth/sign-in">
              Sign In
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
