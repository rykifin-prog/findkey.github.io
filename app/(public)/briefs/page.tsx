import Link from 'next/link';
import styles from '../section-page.module.css';

export const metadata = {
  title: 'Briefs'
};

const sampleBriefs = [
  {
    title: 'Housing Affordability: Speed vs. Stability',
    summary:
      'A map of zoning reform, financing pressure, and neighborhood concerns with clear tradeoffs.'
  },
  {
    title: 'AI in Schools: Access vs. Integrity',
    summary:
      'How school systems balance learning gains, cheating risk, and uneven technology access.'
  },
  {
    title: 'Grid Reliability: Cost vs. Resilience',
    summary:
      'What drives outages, why incentives conflict, and where evidence is strongest today.'
  }
];

export default function BriefsPage() {
  return (
    <main className={styles.page}>
      <span className={styles.eyebrow}>Weekly archive</span>
      <h1 className={styles.title}>Sample Briefs</h1>
      <p className={styles.lead}>
        Explore the style and structure of Findkey briefs. Members get full access to the complete
        archive and weekly releases.
      </p>

      <div className={styles.grid}>
        {sampleBriefs.map((brief) => (
          <article key={brief.title} className={styles.card}>
            <h2>{brief.title}</h2>
            <p>{brief.summary}</p>
          </article>
        ))}
      </div>

      <div className={styles.ctaRow}>
        <Link href="/pricing" className={`${styles.cta} ${styles.ctaPrimary}`}>
          Subscribe
        </Link>
        <Link href="/auth/sign-in" className={styles.cta}>
          Sign in for members
        </Link>
      </div>
    </main>
  );
}
