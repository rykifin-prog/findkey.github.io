import { notFound } from 'next/navigation';

import { fetchPublishedBriefBySlug } from '@/lib/briefs/public';
import type { BriefContent } from '@/lib/editor/types';

export default async function BriefPage({ params }: { params: { slug: string } }) {
  const brief = await fetchPublishedBriefBySlug(params.slug);

  if (!brief) {
    notFound();
  }

  const content = brief.content as BriefContent;

  return (
    <main style={{ width: 'min(900px, 100%)', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>{brief.title as string}</h1>
      <p>{brief.summary as string}</p>

      <h2>Core Question</h2>
      <p>{content.core_question}</p>

      <h2>Stakeholder Map</h2>
      <ul>
        {content.stakeholder_map.map((entry) => (
          <li key={entry.stakeholder}>
            <strong>{entry.stakeholder}:</strong> {entry.impact}
          </li>
        ))}
      </ul>

      <h2>Structural Truth</h2>
      <p>{content.structural_truth}</p>

      <h2>Empirical Truth</h2>
      <p>{content.empirical_truth}</p>

      <h2>Incentive Truth</h2>
      <p>{content.incentive_truth}</p>

      <h2>Emotional Truth</h2>
      <p>{content.emotional_truth}</p>

      <h2>Core Tradeoffs</h2>
      <ul>{content.tradeoffs.map((entry) => <li key={entry}>{entry}</li>)}</ul>

      <h2>Downstream Consequences</h2>
      <ul>{content.downstream_consequences.map((entry) => <li key={entry}>{entry}</li>)}</ul>

      <h2>Uncertainty</h2>
      <ul>{content.areas_of_uncertainty.map((entry) => <li key={entry}>{entry}</li>)}</ul>


      <h2>Key Facts and Sources</h2>
      <ul>
        {content.key_facts_and_sources.map((entry) => (
          <li key={entry.fact}>
            {entry.fact} ({entry.citation_ids.join(', ')})
          </li>
        ))}
      </ul>

      <h2>Traps to Avoid</h2>
      <ul>{content.traps_to_avoid.map((entry) => <li key={entry}>{entry}</li>)}</ul>

      <h2>How to Say It Out Loud</h2>
      <p>{content.how_to_say_it_out_loud}</p>
    </main>
  );
}
