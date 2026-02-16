import Link from 'next/link';

export default function BriefTeaserPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Weekly brief: {params.slug}</h1>
      <p>This is the public teaser view.</p>
      <p>
        Read the complete analysis with all truth categories in the full brief:
        <Link href={`/briefs/${params.slug}/full`}> Open full brief</Link>
      </p>
    </main>
  );
}
