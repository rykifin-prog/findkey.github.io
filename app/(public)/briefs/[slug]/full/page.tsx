export default function FullBriefPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Full brief: {params.slug}</h1>
      <p>Subscriber-only complete analysis.</p>
      <h2>Stakeholder Map</h2>
      <p>Who is affected and why their stakes differ.</p>
      <h2>Structural Truth</h2>
      <p>How the system works in plain language.</p>
      <h2>Empirical Truth</h2>
      <p>Evidence snapshots with confidence labels.</p>
      <h2>Incentive Truth</h2>
      <p>Why actors choose the options they choose.</p>
      <h2>Emotional Truth</h2>
      <p>What people feel and the roots of those feelings.</p>
      <h2>Downstream Consequences</h2>
      <p>Second-order effects if each option scales.</p>
      <h2>Core Tradeoffs</h2>
      <p>What cannot be optimized at the same time.</p>
      <h2>Uncertainty</h2>
      <p>Where current evidence remains thin or contested.</p>
    </main>
  );
}
