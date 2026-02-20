import { NextResponse } from 'next/server';

import { EDITOR_MODEL, EDITOR_PROMPT_VERSION, EDITOR_PROVIDER } from '@/lib/editor/constants';
import { assertAdminFromCookie, restInsert, restUpdate } from '@/lib/editor/db';
import { extractSources } from '@/lib/editor/extractor';
import { briefProvider } from '@/lib/editor/provider';
import { validateBriefContent, validateCitationCoverage } from '@/lib/editor/schema';
import type { Citation, ExtractedSource } from '@/lib/editor/types';

type GenerationRow = { id: string };

export async function POST(request: Request) {
  try {
    await assertAdminFromCookie();

    const body = (await request.json()) as {
      topic?: string;
      seed_links?: string[];
      notes?: string;
      recency_window_days?: number;
    };

    if (!body.topic?.trim()) {
      return NextResponse.json({ error: 'topic is required' }, { status: 400 });
    }

    const seedLinks = (body.seed_links ?? []).slice(0, 8).filter(Boolean);
    const recencyWindow = body.recency_window_days ?? 14;

    const [created] = await restInsert<GenerationRow[]>('ai_generations', {
      topic: body.topic,
      seed_links: seedLinks,
      notes: body.notes ?? null,
      recency_window_days: recencyWindow,
      prompt_version: EDITOR_PROMPT_VERSION,
      provider: EDITOR_PROVIDER,
      model: EDITOR_MODEL,
      status: 'queued'
    });

    const generationId = created.id;

    await restUpdate(`ai_generations?id=eq.${generationId}`, { status: 'running' });

    let extractedSources: ExtractedSource[] = [];
    let citations: Citation[] = [];

    if (seedLinks.length > 0) {
      const extracted = await extractSources(seedLinks);
      extractedSources = extracted.sources;
      citations = extracted.citations;
    }

    const totalExtractedChars = extractedSources.reduce((sum, source) => sum + source.content_text.length, 0);

    if (seedLinks.length > 0 && totalExtractedChars < 500) {
      await restUpdate(`ai_generations?id=eq.${generationId}`, {
        extracted_sources: extractedSources,
        citations,
        status: 'failed',
        error: 'Low confidence extraction (<500 chars total). Please provide higher quality sources.'
      });

      return NextResponse.json(
        {
          error: 'Low confidence extraction (<500 chars total). Please provide higher quality sources.',
          generation_id: generationId
        },
        { status: 422 }
      );
    }

    if (seedLinks.length > 0 && citations.length === 0) {
      await restUpdate(`ai_generations?id=eq.${generationId}`, {
        extracted_sources: extractedSources,
        status: 'failed',
        error: 'Citations missing after source extraction.'
      });

      return NextResponse.json({ error: 'Citations missing after source extraction.', generation_id: generationId }, { status: 422 });
    }

    let generated = await briefProvider.generateBriefDraft({
      topic: body.topic,
      notes: body.notes,
      extracted_sources: extractedSources,
      citations,
      prompt_version: EDITOR_PROMPT_VERSION
    });

    let parsed = validateBriefContent(generated.output_json);
    let coverageErrors = parsed.valid ? validateCitationCoverage(parsed.data, citations) : [];

    if (!parsed.valid || coverageErrors.length > 0) {
      generated = await briefProvider.generateBriefDraft({
        topic: body.topic,
        notes: body.notes,
        extracted_sources: extractedSources,
        citations,
        prompt_version: `${EDITOR_PROMPT_VERSION}-repair`,
        repair: true
      });

      parsed = validateBriefContent(generated.output_json);
      coverageErrors = parsed.valid ? validateCitationCoverage(parsed.data, citations) : [];

      if (!parsed.valid || coverageErrors.length > 0) {
        await restUpdate(`ai_generations?id=eq.${generationId}`, {
          extracted_sources: extractedSources,
          citations,
          output: generated.output_json,
          status: 'failed',
          error: `Invalid model JSON. Schema errors: ${(parsed.valid ? [] : parsed.errors).join('; ')} Coverage errors: ${coverageErrors.join('; ')}`,
          tokens_in: generated.usage.tokens_in,
          tokens_out: generated.usage.tokens_out
        });

        return NextResponse.json({ error: 'Model output failed validation', generation_id: generationId }, { status: 422 });
      }
    }

    await restUpdate(`ai_generations?id=eq.${generationId}`, {
      extracted_sources: extractedSources,
      citations,
      output: parsed.data,
      status: 'succeeded',
      tokens_in: generated.usage.tokens_in,
      tokens_out: generated.usage.tokens_out
    });

    return NextResponse.json({ generation_id: generationId, output: parsed.data, citations });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
