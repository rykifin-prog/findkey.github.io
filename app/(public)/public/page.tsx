import Link from 'next/link';

export const metadata = {
  title: 'Briefs'
};

export default function BriefsIndexPage() {
  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3.5rem 1.5rem 4rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ marginBottom: '0.75rem' }}>Briefs</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '58ch', lineHeight: 1.6 }}>
          Weekly analytical briefs for intellectually curious independents. Each brief maps the
          key stakeholders, structural dynamics, measurable evidence, and core tradeoffs.
        </p>
      </header>

      <section aria-label="Latest brief entries">
        <ul style={{ display: 'grid', gap: '1rem', padding: 0, listStyle: 'none' }}>
          <li>
            <article
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '1rem 1.1rem',
                background: 'var(--color-surface)'
              }}
            >
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>
                <Link href="/pricing">Where the housing debate actually splits</Link>
              </h2>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                Stakeholder map, evidence strength, incentive design, and downstream consequences.
              </p>
            </article>
          </li>
        </ul>
      </section>
    </main>
  );
}
