import BriefForm from '@/app/editor/components/BriefForm';
import { restSelect } from '@/lib/editor/db';

export default async function EditBriefPage({ params }: { params: { id: string } }) {
  const rows = await restSelect<Array<Record<string, unknown>>>(`briefs?select=*&id=eq.${params.id}&limit=1`);
  const brief = rows[0];

  return (
    <main style={{ width: 'min(1000px, 100%)', margin: '0 auto', padding: '2rem 1rem' }}>
      <BriefForm mode="edit" initial={brief} />
    </main>
  );
}
