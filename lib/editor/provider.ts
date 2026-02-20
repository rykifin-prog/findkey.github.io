import type { BriefContent, Citation, ExtractedSource } from './types';

type GenerateArgs = {
  topic: string;
  notes?: string;
  extracted_sources: ExtractedSource[];
  citations: Citation[];
  prompt_version: string;
  repair?: boolean;
};

type GenerateResult = {
  output_json: unknown;
  usage: {
    tokens_in: number | null;
    tokens_out: number | null;
  };
};

export interface BriefProvider {
  generateBriefDraft(args: GenerateArgs): Promise<GenerateResult>;
}

const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';

function buildPrompt(args: GenerateArgs) {
  const citationText = args.citations.map((citation) => `${citation.id}: ${citation.title} (${citation.url})`).join('\n');
  const sourceContext = args.extracted_sources
    .map((source, index) => `SOURCE ${index + 1} (${source.url})\n${source.content_text.slice(0, 2200)}`)
    .join('\n\n');

  return `You are drafting a Findkey brief. Return JSON only (no markdown).\nPrompt version: ${args.prompt_version}.\nTopic: ${args.topic}\nNotes: ${args.notes ?? 'none'}\nCitations:\n${citationText || 'none'}\n\nRules:\n- Output keys: core_question, stakeholder_map, structural_truth, empirical_truth, empirical_citation_ids, incentive_truth, emotional_truth, tradeoffs, downstream_consequences, areas_of_uncertainty, how_to_say_it_out_loud, key_facts_and_sources, traps_to_avoid.\n- Include all categories and keep language calm and educational.\n- If citations exist, empirical_truth and each key fact must cite only provided citation IDs.\n- empirical_truth must end with: Evidence base: S1, S2 format.\n- Add at least one uncertainty item.\n${args.repair ? '- STRICT: must be valid parseable JSON object only.' : ''}\n\nContext:\n${sourceContext || 'No external sources provided.'}`;
}

class OpenAIProvider implements BriefProvider {
  async generateBriefDraft(args: GenerateArgs): Promise<GenerateResult> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You produce strict JSON only.' },
          { role: 'user', content: buildPrompt(args) }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Provider request failed (${response.status})`);
    }

    const body = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };

    const rawContent = body.choices[0]?.message?.content;

    if (!rawContent) {
      throw new Error('Provider returned empty response');
    }

    let output_json: BriefContent;

    try {
      output_json = JSON.parse(rawContent) as BriefContent;
    } catch {
      throw new Error('Provider returned invalid JSON');
    }

    return {
      output_json,
      usage: {
        tokens_in: body.usage?.prompt_tokens ?? null,
        tokens_out: body.usage?.completion_tokens ?? null
      }
    };
  }
}

export const briefProvider: BriefProvider = new OpenAIProvider();
