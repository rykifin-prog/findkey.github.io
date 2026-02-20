import type { BriefContent, Citation } from './types';

const REQUIRED_STRING_FIELDS: Array<keyof BriefContent> = [
  'core_question',
  'structural_truth',
  'empirical_truth',
  'incentive_truth',
  'emotional_truth',
  'how_to_say_it_out_loud'
];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string' && entry.trim().length > 0);
}

export function validateBriefContent(value: unknown): { valid: true; data: BriefContent } | { valid: false; errors: string[] } {
  const errors: string[] = [];

  if (!value || typeof value !== 'object') {
    return { valid: false, errors: ['content must be an object'] };
  }

  const content = value as Record<string, unknown>;

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof content[field] !== 'string' || !(content[field] as string).trim()) {
      errors.push(`${field} must be a non-empty string`);
    }
  }

  if (!Array.isArray(content.stakeholder_map)) {
    errors.push('stakeholder_map must be an array');
  } else if (
    !content.stakeholder_map.every(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        typeof (entry as { stakeholder?: unknown }).stakeholder === 'string' &&
        typeof (entry as { impact?: unknown }).impact === 'string'
    )
  ) {
    errors.push('stakeholder_map entries must include stakeholder and impact strings');
  }

  for (const listField of ['tradeoffs', 'downstream_consequences', 'areas_of_uncertainty', 'traps_to_avoid'] as const) {
    if (!isStringArray(content[listField])) {
      errors.push(`${listField} must be a non-empty string array`);
    }
  }

  if (!Array.isArray(content.key_facts_and_sources)) {
    errors.push('key_facts_and_sources must be an array');
  } else {
    for (const [index, entry] of content.key_facts_and_sources.entries()) {
      if (
        !entry ||
        typeof entry !== 'object' ||
        typeof (entry as { fact?: unknown }).fact !== 'string' ||
        !isStringArray((entry as { citation_ids?: unknown }).citation_ids)
      ) {
        errors.push(`key_facts_and_sources[${index}] must include fact and citation_ids[]`);
      }
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: content as unknown as BriefContent };
}

export function validateCitationCoverage(content: BriefContent, citations: Citation[]): string[] {
  const errors: string[] = [];
  const citationIds = new Set(citations.map((citation) => citation.id));

  if (!content.areas_of_uncertainty.length) {
    errors.push('areas_of_uncertainty must include at least one item');
  }

  if (citations.length > 0) {
    const empiricalIds = content.empirical_citation_ids ?? [];

    if (empiricalIds.length === 0) {
      errors.push('empirical_truth must include empirical_citation_ids when citations are provided');
    }

    for (const id of empiricalIds) {
      if (!citationIds.has(id)) {
        errors.push(`empirical_citation_ids contains unknown citation id: ${id}`);
      }
    }

    for (const [index, fact] of content.key_facts_and_sources.entries()) {
      if (!fact.citation_ids.length) {
        errors.push(`key_facts_and_sources[${index}] is missing citation ids`);
      }

      for (const id of fact.citation_ids) {
        if (!citationIds.has(id)) {
          errors.push(`key_facts_and_sources[${index}] has unknown citation id: ${id}`);
        }
      }
    }

    if (!/Evidence base:\s*S\d+(,\s*S\d+)*/i.test(content.empirical_truth)) {
      errors.push('empirical_truth must end with "Evidence base: S1, S2" style line');
    }
  }

  return errors;
}
