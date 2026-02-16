export const metadata = {
  title: 'Method'
};

const METHOD_BLOCKS = [
  'Stakeholder Map',
  'Structural Truth',
  'Empirical Truth',
  'Incentive Truth',
  'Emotional Truth',
  'Downstream Consequences',
  'Core Tradeoffs',
  'Uncertainty'
];

export default function MethodPage() {
  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3.5rem 1.5rem 4rem' }}>
      <header style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ marginBottom: '0.75rem' }}>Method</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '60ch', lineHeight: 1.6 }}>
          Findkey briefs follow a fixed structure so readers can compare claims, evidence strength,
          and tradeoffs without partisan framing.
        </p>
      </header>

      <section aria-label="Findkey methodology blocks">
        <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.55rem' }}>
          {METHOD_BLOCKS.map((block) => (
            <li key={block}>{block}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
