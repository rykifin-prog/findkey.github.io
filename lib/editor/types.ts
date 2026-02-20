export type Citation = {
  id: string;
  url: string;
  title: string;
  publisher: string | null;
  date: string | null;
  claim_scope: string;
  confidence: 'high' | 'med' | 'low';
};

export type StakeholderEntry = {
  stakeholder: string;
  impact: string;
};

export type KeyFact = {
  fact: string;
  citation_ids: string[];
};

export type BriefContent = {
  core_question: string;
  stakeholder_map: StakeholderEntry[];
  structural_truth: string;
  empirical_truth: string;
  empirical_citation_ids?: string[];
  incentive_truth: string;
  emotional_truth: string;
  tradeoffs: string[];
  downstream_consequences: string[];
  areas_of_uncertainty: string[];
  how_to_say_it_out_loud: string;
  key_facts_and_sources: KeyFact[];
  traps_to_avoid: string[];
};

export type ExtractedSource = {
  url: string;
  title: string;
  fetched_at: string;
  extractor: string;
  content_text: string;
  content_hash: string;
};
