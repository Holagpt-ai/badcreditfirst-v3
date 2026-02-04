/**
 * Programmatic Page Blueprint — Locked config for 500k–1M page scaling.
 * Centralized config defining allowed sections, uniqueness tokens, and build-time validation.
 * Page build MUST fail if any token set duplicates an existing page.
 *
 * Integration:
 * - lib/programmatic-ai-guardrails.ts: AI slots (intro, whoThisIsFor, faq)
 * - lib/content-fingerprint.ts: Duplication detection
 * - lib/index-controls.ts: Canonical, noindex
 * - lib/programmatic-validation.ts: Build-time validation (npm run validate:programmatic)
 *
 * DO NOT: Change routing, add UI, add experimental AI, touch monetization/CTAs.
 */

/** Allowed section IDs for programmatic pages. Order is fixed. */
export const PROGRAMMATIC_SECTIONS = [
  'intro',
  'who_this_is_for',
  'snapshot',
  'decision_logic',
  'key_differences',
  'editorial_context',
  'summary_takeaway',
  'full_reviews',
  'ctas',
  'related',
  'faq',
] as const;

export type ProgrammaticSectionId = (typeof PROGRAMMATIC_SECTIONS)[number];

/** Required uniqueness tokens. Token set MUST be unique across all programmatic pages. */
export interface UniquenessTokens {
  /** User intent (e.g. "rebuilding credit", "no credit history"). */
  intentKey: string;
  /** Audience segment (e.g. "bad-credit", "secured-cards"). */
  audienceKey: string;
  /** Deterministic hash of entity pair (for comparisons) or page identifier. */
  comparisonHash: string;
  /** Variation seed for A/B or locale variants. Default "default". */
  variationSeed: string;
}

/** Canonical token set key. Used for duplicate detection. */
export function buildTokenSetKey(tokens: UniquenessTokens): string {
  return `${tokens.intentKey}|${tokens.audienceKey}|${tokens.comparisonHash}|${tokens.variationSeed}`;
}

/** Build uniqueness tokens from comparison page data. */
export function buildTokensFromComparison(slug: string, intent: string, entityA: string, entityB: string): UniquenessTokens {
  const sortedEntities = [entityA, entityB].sort();
  let hash = 0;
  for (const s of sortedEntities) {
    for (let i = 0; i < s.length; i++) {
      hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
    }
  }
  const comparisonHash = Math.abs(hash).toString(36);
  const audienceKey = inferAudienceFromSlug(slug);
  return {
    intentKey: normalizeIntentKey(intent),
    audienceKey,
    comparisonHash,
    variationSeed: 'default',
  };
}

function normalizeIntentKey(intent: string): string {
  return intent.toLowerCase().replace(/[^\w\s]/g, '').trim().slice(0, 64);
}

function inferAudienceFromSlug(slug: string): string {
  if (slug.includes('secured') || slug.includes('credit-builder')) return 'secured-cards';
  if (slug.includes('no-deposit') || slug.includes('unsecured')) return 'bad-credit';
  return 'bad-credit';
}

/** Registry of existing token set keys. Populated from known pages. */
export type TokenSetRegistry = Set<string>;

/** Create registry from existing comparison slugs + intents. */
export function buildTokenSetRegistry(
  pages: Array<{ slug: string; intent: string; entityA: string; entityB: string }>
): TokenSetRegistry {
  const registry = new Set<string>();
  for (const p of pages) {
    const tokens = buildTokensFromComparison(p.slug, p.intent, p.entityA, p.entityB);
    registry.add(buildTokenSetKey(tokens));
  }
  return registry;
}

/** Validate that token set does not duplicate existing page. FAILS BUILD if duplicate. */
export function validateTokenSetUniqueness(
  tokens: UniquenessTokens,
  registry: TokenSetRegistry
): { valid: boolean; error?: string } {
  const key = buildTokenSetKey(tokens);
  if (registry.has(key)) {
    return {
      valid: false,
      error: `Duplicate token set: ${key}. Page build must fail — token set duplicates existing page.`,
    };
  }
  return { valid: true };
}

/** Section metadata: required, locked (no AI), max length. */
export interface SectionConfig {
  id: ProgrammaticSectionId;
  required: boolean;
  /** If true, content is deterministic/template-only. No AI. */
  locked: boolean;
  maxWords?: number;
  maxChars?: number;
}

export const SECTION_CONFIG: Record<ProgrammaticSectionId, SectionConfig> = {
  intro: { id: 'intro', required: true, locked: false, maxWords: 120, maxChars: 720 },
  who_this_is_for: { id: 'who_this_is_for', required: true, locked: false },
  snapshot: { id: 'snapshot', required: true, locked: true },
  decision_logic: { id: 'decision_logic', required: true, locked: true },
  key_differences: { id: 'key_differences', required: true, locked: true },
  editorial_context: { id: 'editorial_context', required: true, locked: false, maxChars: 300 },
  summary_takeaway: { id: 'summary_takeaway', required: true, locked: false, maxChars: 250 },
  full_reviews: { id: 'full_reviews', required: true, locked: true },
  ctas: { id: 'ctas', required: true, locked: true },
  related: { id: 'related', required: false, locked: true },
  faq: { id: 'faq', required: false, locked: false, maxWords: 150 },
};

/** Intro paragraph: 90–120 words. AI-allowed. */
export const INTRO_WORD_RANGE = { min: 90, max: 120 } as const;

/** FAQ expansion: max 3 items. AI-allowed. */
export const FAQ_MAX_ITEMS = 3;
