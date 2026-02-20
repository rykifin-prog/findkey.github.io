import { createHash } from 'crypto';

import type { Citation, ExtractedSource } from './types';

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleFromHtml(html: string, fallback: string) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return titleMatch?.[1]?.trim() || fallback;
}

export async function extractSources(seedLinks: string[]): Promise<{ sources: ExtractedSource[]; citations: Citation[] }> {
  const sources: ExtractedSource[] = [];
  const citations: Citation[] = [];

  for (const [index, url] of seedLinks.entries()) {
    const sourceId = `S${index + 1}`;

    try {
      const response = await fetch(url, { cache: 'no-store' });
      const html = await response.text();
      const contentText = stripHtml(html);
      const title = titleFromHtml(html, url);
      const hostname = new URL(url).hostname.replace('www.', '');
      const dateMatch = html.match(/\b(20\d{2}-\d{2}-\d{2})\b/);

      sources.push({
        url,
        title,
        fetched_at: new Date().toISOString(),
        extractor: 'html-strip-v1',
        content_text: contentText.slice(0, 12000),
        content_hash: createHash('sha256').update(contentText).digest('hex')
      });

      citations.push({
        id: sourceId,
        url,
        title,
        publisher: hostname,
        date: dateMatch?.[1] ?? null,
        claim_scope: 'broad',
        confidence: contentText.length > 1000 ? 'high' : contentText.length > 500 ? 'med' : 'low'
      });
    } catch {
      sources.push({
        url,
        title: url,
        fetched_at: new Date().toISOString(),
        extractor: 'html-strip-v1',
        content_text: '',
        content_hash: ''
      });

      citations.push({
        id: sourceId,
        url,
        title: url,
        publisher: null,
        date: null,
        claim_scope: 'unknown',
        confidence: 'low'
      });
    }
  }

  return { sources, citations };
}
