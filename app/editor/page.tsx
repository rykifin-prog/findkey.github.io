import Link from 'next/link';

import { restSelect } from '@/lib/editor/db';

export default async function EditorDashboardPage() {
  const briefs = await restSelect<Array<{ id: string; title: string; status: string; needs_review: boolean }>>(
    'briefs?select=id,title,status,needs_review&order=updated_at.desc'
  );

  const total = briefs.length;
  const drafts = briefs.filter((brief) => brief.status === 'draft').length;
  const published = briefs.filter((brief) => brief.status === 'published').length;
  const needsReview = briefs.filter((brief) => brief.needs_review).length;

  return (
    <main style={{ width: 'min(1000px, 100%)', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Editor</h1>
      <p>Total briefs: {total}</p>
      <p>Drafts: {drafts}</p>
      <p>Published: {published}</p>
      <p>Needs review: {needsReview}</p>

      <p>
        <Link href="/editor/new">Create new brief</Link> · <Link href="/editor/briefs">Manage briefs</Link>
      </p>

      <h2>Continue editing</h2>
      <ul>
        {briefs.slice(0, 5).map((brief) => (
          <li key={brief.id}>
            <Link href={`/editor/briefs/${brief.id}/edit`}>{brief.title}</Link> ({brief.status})
          </li>
        ))}
      </ul>
    </main>
  );
}
