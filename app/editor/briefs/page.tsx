import Link from 'next/link';

import { restSelect } from '@/lib/editor/db';

export default async function EditorBriefsPage() {
  const briefs = await restSelect<
    Array<{ id: string; title: string; status: string; publish_date: string | null; updated_at: string; needs_review: boolean }>
  >('briefs?select=id,title,status,publish_date,updated_at,needs_review&order=updated_at.desc');

  return (
    <main style={{ width: 'min(1100px, 100%)', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Briefs</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Title</th>
            <th align="left">Status</th>
            <th align="left">Publish date</th>
            <th align="left">Updated</th>
            <th align="left">Needs review</th>
            <th align="left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {briefs.map((brief) => (
            <tr key={brief.id}>
              <td>{brief.title}</td>
              <td>{brief.status}</td>
              <td>{brief.publish_date ?? '-'}</td>
              <td>{new Date(brief.updated_at).toLocaleString()}</td>
              <td>{brief.needs_review ? 'Yes' : 'No'}</td>
              <td>
                <Link href={`/editor/briefs/${brief.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
