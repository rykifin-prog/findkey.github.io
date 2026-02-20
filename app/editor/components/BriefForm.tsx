'use client';

import { useMemo, useState } from 'react';

import type { BriefContent, Citation } from '@/lib/editor/types';

type Props = {
  initial?: Record<string, unknown>;
  mode: 'new' | 'edit';
};

const emptyContent: BriefContent = {
  core_question: '',
  stakeholder_map: [{ stakeholder: '', impact: '' }],
  structural_truth: '',
  empirical_truth: '',
  empirical_citation_ids: [],
  incentive_truth: '',
  emotional_truth: '',
  tradeoffs: [''],
  downstream_consequences: [''],
  areas_of_uncertainty: [''],
  how_to_say_it_out_loud: '',
  key_facts_and_sources: [{ fact: '', citation_ids: [] }],
  traps_to_avoid: ['']
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function readabilityLooksSimple(value: string) {
  const words = value.split(/\s+/).filter(Boolean);
  const longWords = words.filter((word) => word.length > 16).length;
  return words.length === 0 || longWords / words.length < 0.07;
}

export default function BriefForm({ initial, mode }: Props) {
  const [title, setTitle] = useState((initial?.title as string) ?? '');
  const [slug, setSlug] = useState((initial?.slug as string) ?? '');
  const [summary, setSummary] = useState((initial?.summary as string) ?? '');
  const [publishDate, setPublishDate] = useState((initial?.publish_date as string) ?? '');
  const [status, setStatus] = useState(((initial?.status as string) ?? 'draft') as 'draft' | 'published');
  const [reviewed, setReviewed] = useState(false);
  const [content, setContent] = useState((initial?.content as BriefContent) ?? emptyContent);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [topic, setTopic] = useState('');
  const [seedLinks, setSeedLinks] = useState('');
  const [notes, setNotes] = useState('');
  const [suggested, setSuggested] = useState<BriefContent | null>(null);

  const empiricalCited = useMemo(() => Boolean(content.empirical_citation_ids?.length), [content.empirical_citation_ids]);
  const keyFactsCited = useMemo(
    () => content.key_facts_and_sources.every((fact) => fact.citation_ids.length > 0),
    [content.key_facts_and_sources]
  );

  const qualityChecklist = useMemo(() => {
    return {
      hasAllTruthSections:
        Boolean(content.structural_truth.trim()) &&
        Boolean(content.empirical_truth.trim()) &&
        Boolean(content.incentive_truth.trim()) &&
        Boolean(content.emotional_truth.trim()),
      stakeholderMapPresent: content.stakeholder_map.some(
        (entry) => entry.stakeholder.trim().length > 0 && entry.impact.trim().length > 0
      ),
      uncertaintyPresent: content.areas_of_uncertainty.some((entry) => entry.trim().length > 0),
      readabilityTarget:
        readabilityLooksSimple(content.structural_truth) &&
        readabilityLooksSimple(content.empirical_truth) &&
        readabilityLooksSimple(content.incentive_truth) &&
        readabilityLooksSimple(content.emotional_truth)
    };
  }, [content]);

  const canPublish = reviewed && Object.values(qualityChecklist).every(Boolean);

  async function generateDraft() {
    const response = await fetch('/api/editor/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        seed_links: seedLinks
          .split('\n')
          .map((entry) => entry.trim())
          .filter(Boolean),
        notes
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Generation failed');
      return;
    }

    setCitations(data.citations);

    if (mode === 'new') {
      setContent(data.output as BriefContent);
    } else {
      setSuggested(data.output as BriefContent);
    }
  }

  async function saveBrief() {
    const endpoint = '/api/editor/briefs';
    const method = mode === 'new' ? 'POST' : 'PATCH';

    const payload: Record<string, unknown> = {
      ...(mode === 'edit' ? { id: initial?.id } : {}),
      title,
      slug,
      summary,
      publish_date: publishDate || null,
      status,
      content,
      reviewed
    };

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Save failed');
      return;
    }

    window.location.href = '/editor/briefs';
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <h1>{mode === 'new' ? 'Create Brief' : 'Edit Brief'}</h1>
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          if (mode === 'new') setSlug(slugify(event.target.value));
        }}
        placeholder="Title"
      />
      <input value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="Slug" />
      <textarea value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Summary" />
      <input type="date" value={publishDate} onChange={(event) => setPublishDate(event.target.value)} />
      <select value={status} onChange={(event) => setStatus(event.target.value as 'draft' | 'published')}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <h2>Generate Draft</h2>
      <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Topic" />
      <textarea value={seedLinks} onChange={(event) => setSeedLinks(event.target.value)} placeholder="Seed links (one per line)" />
      <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Notes" />
      <button type="button" onClick={generateDraft}>
        {mode === 'new' ? 'Generate Draft' : 'Regenerate Draft (preserve my edits)'}
      </button>

      <h2>Content</h2>
      <textarea value={content.core_question} onChange={(event) => setContent((prev) => ({ ...prev, core_question: event.target.value }))} placeholder="Core question" />
      <textarea value={content.structural_truth} onChange={(event) => setContent((prev) => ({ ...prev, structural_truth: event.target.value }))} placeholder="Structural truth" />
      <textarea value={content.empirical_truth} onChange={(event) => setContent((prev) => ({ ...prev, empirical_truth: event.target.value }))} placeholder="Empirical truth" />
      <input
        value={(content.empirical_citation_ids ?? []).join(',')}
        onChange={(event) =>
          setContent((prev) => ({
            ...prev,
            empirical_citation_ids: event.target.value
              .split(',')
              .map((entry) => entry.trim())
              .filter(Boolean)
          }))
        }
        placeholder="Empirical citation ids (comma separated)"
      />
      <textarea value={content.incentive_truth} onChange={(event) => setContent((prev) => ({ ...prev, incentive_truth: event.target.value }))} placeholder="Incentive truth" />
      <textarea value={content.emotional_truth} onChange={(event) => setContent((prev) => ({ ...prev, emotional_truth: event.target.value }))} placeholder="Emotional truth" />

      <p>Empirical Truth cited: {empiricalCited ? 'yes' : 'no'}</p>
      <p>Key Facts cited: {keyFactsCited ? 'yes' : 'no'}</p>

      {suggested ? (
        <div style={{ border: '1px solid #ddd', padding: '1rem' }}>
          <h3>Suggested draft (diff view)</h3>
          <p>
            <strong>Current Structural Truth:</strong> {content.structural_truth}
          </p>
          <p>
            <strong>Suggested Structural Truth:</strong> {suggested.structural_truth}
          </p>
          <button type="button" onClick={() => setContent((prev) => ({ ...prev, structural_truth: suggested.structural_truth }))}>
            Accept structural truth suggestion
          </button>
          <p>
            <strong>Current Empirical Truth:</strong> {content.empirical_truth}
          </p>
          <p>
            <strong>Suggested Empirical Truth:</strong> {suggested.empirical_truth}
          </p>
          <button
            type="button"
            onClick={() => setContent((prev) => ({ ...prev, empirical_truth: suggested.empirical_truth, empirical_citation_ids: suggested.empirical_citation_ids ?? [] }))}
          >
            Accept empirical truth suggestion
          </button>
        </div>
      ) : null}

      <div style={{ border: '1px solid #ddd', padding: '1rem' }}>
        <h3>Citations</h3>
        {citations.map((citation) => (
          <p key={citation.id}>
            {citation.id}: {citation.title}
          </p>
        ))}
      </div>

      <div style={{ border: '1px solid #ddd', padding: '1rem' }}>
        <h3>Quality checklist (publish blocker)</h3>
        <p>Truth categories present: {qualityChecklist.hasAllTruthSections ? 'yes' : 'no'}</p>
        <p>Stakeholder map present: {qualityChecklist.stakeholderMapPresent ? 'yes' : 'no'}</p>
        <p>Uncertainty included: {qualityChecklist.uncertaintyPresent ? 'yes' : 'no'}</p>
        <p>Readability target (6th–8th grade proxy): {qualityChecklist.readabilityTarget ? 'yes' : 'no'}</p>
      </div>

      <label>
        <input type="checkbox" checked={reviewed} onChange={(event) => setReviewed(event.target.checked)} /> Mark as Reviewed
      </label>

      <button type="button" disabled={status === 'published' && !canPublish} onClick={saveBrief}>
        {status === 'published' ? 'Approve & Publish' : 'Save Draft'}
      </button>
    </div>
  );
}
