/**
 * Content Fingerprint & Duplication Detection
 * Generate fingerprint per page, compare against stored fingerprints.
 * Block build if similarity exceeds safe threshold.
 */

import { semanticDistance } from './content-guards';

/** Content fingerprint: normalized hash of key content for similarity comparison. */
export type ContentFingerprint = string;

/** Similarity threshold. Above this = too similar = block build. */
export const DUPLICATION_THRESHOLD = 0.85;

/** Minimum distance required. Below = duplicate. distance = 1 - similarity. */
export const MIN_SAFE_DISTANCE = 1 - DUPLICATION_THRESHOLD;

/**
 * Generate content fingerprint from key page content.
 * Uses normalized, deduplicated word set for comparison.
 */
export function generateContentFingerprint(content: {
  intro?: string;
  editorialContext?: string;
  summaryTakeaway?: string;
  whoThisIsFor?: string[];
}): ContentFingerprint {
  const parts: string[] = [];
  if (content.intro) parts.push(content.intro);
  if (content.editorialContext) parts.push(content.editorialContext);
  if (content.summaryTakeaway) parts.push(content.summaryTakeaway);
  if (content.whoThisIsFor?.length) parts.push(content.whoThisIsFor.join(' '));
  const normalized = parts
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const unique = Array.from(new Set(normalized)).sort().join(' ');
  let hash = 0;
  for (let i = 0; i < unique.length; i++) {
    hash = ((hash << 5) - hash + unique.charCodeAt(i)) | 0;
  }
  return `fp:${Math.abs(hash).toString(36)}:${unique.length}`;
}

/**
 * Compute similarity between two content blobs (0–1).
 * 1 = identical, 0 = no overlap.
 */
export function computeContentSimilarity(
  contentA: { intro?: string; editorialContext?: string; summaryTakeaway?: string },
  contentB: { intro?: string; editorialContext?: string; summaryTakeaway?: string }
): number {
  const textA = [contentA.intro, contentA.editorialContext, contentA.summaryTakeaway]
    .filter(Boolean)
    .join(' ');
  const textB = [contentB.intro, contentB.editorialContext, contentB.summaryTakeaway]
    .filter(Boolean)
    .join(' ');
  const distance = semanticDistance(textA, textB);
  return 1 - distance;
}

/**
 * Check if new content is too similar to any existing content.
 * Returns error if similarity exceeds threshold (block build).
 */
export function checkDuplicationRisk(
  newContent: { intro?: string; editorialContext?: string; summaryTakeaway?: string },
  existing: Array<{ intro?: string; editorialContext?: string; summaryTakeaway?: string }>
): { safe: boolean; error?: string } {
  for (let i = 0; i < existing.length; i++) {
    const similarity = computeContentSimilarity(newContent, existing[i]);
    if (similarity >= DUPLICATION_THRESHOLD) {
      return {
        safe: false,
        error: `Content too similar to existing page ${i + 1} (similarity ${(similarity * 100).toFixed(1)}%, max ${(DUPLICATION_THRESHOLD * 100).toFixed(0)}%). Build blocked.`,
      };
    }
  }
  return { safe: true };
}
