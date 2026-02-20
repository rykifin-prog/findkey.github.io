import BriefForm from '@/app/editor/components/BriefForm';

export default function NewBriefPage() {
  return (
    <main style={{ width: 'min(1000px, 100%)', margin: '0 auto', padding: '2rem 1rem' }}>
      <BriefForm mode="new" />
    </main>
  );
}
