/**
 * AI Freshness — LOW % only
 * AI allowed only in SummaryTakeaway and EditorialContext.
 * Hard-capped tokens. Cached output (no regen loops).
 *
 * Usage flow (no regen loops):
 * 1. key = buildAiCacheKey(slot, slug, inputContext)
 * 2. cached = await cache.get(key)
 * 3. if (cached) return cached.output  // NEVER call AI
 * 4. output = await callAi(slot, input, tokenCaps)
 * 5. guardAiOutputLength(slot, output)
 * 6. await cache.set(key, { slot, slug, output, cachedAt })
 * 7. return output
 */

/** Slots where AI generation is permitted. All other slots = human/template only. */
export const AI_ALLOWED_SLOTS = ['summaryTakeaway', 'editorialContext'] as const;

export type AiAllowedSlot = (typeof AI_ALLOWED_SLOTS)[number];

/** Hard token caps per AI slot. Input + output combined. */
export const AI_TOKEN_CAPS = {
  summaryTakeaway: {
    maxInputTokens: 300,
    maxOutputTokens: 80,
    maxTotalTokens: 400,
  },
  editorialContext: {
    maxInputTokens: 400,
    maxOutputTokens: 120,
    maxTotalTokens: 550,
  },
} as const;

/** Approximate chars per token (English). Use for pre-check. */
const CHARS_PER_TOKEN = 4;

/** Max output chars per slot (derived from token caps). */
export const AI_MAX_OUTPUT_CHARS = {
  summaryTakeaway: AI_TOKEN_CAPS.summaryTakeaway.maxOutputTokens * CHARS_PER_TOKEN,
  editorialContext: AI_TOKEN_CAPS.editorialContext.maxOutputTokens * CHARS_PER_TOKEN,
} as const;

/** Cache key format: slot + slug + input hash. */
export type AiCacheKey = string;

/** Cached AI output. Never regenerate if cache hit. */
export interface AiCachedOutput {
  slot: AiAllowedSlot;
  slug: string;
  output: string;
  cachedAt: string; // ISO timestamp
}

/**
 * Build cache key. Deterministic. Same inputs => same key.
 * Use to check cache before calling AI. No regen if key exists.
 */
export function buildAiCacheKey(
  slot: AiAllowedSlot,
  slug: string,
  inputContext: Record<string, string>
): AiCacheKey {
  const sorted = Object.keys(inputContext)
    .sort()
    .map((k) => `${k}:${inputContext[k]}`)
    .join('|');
  let hash = 0;
  for (let i = 0; i < sorted.length; i++) {
    hash = ((hash << 5) - hash + sorted.charCodeAt(i)) | 0;
  }
  return `ai:${slot}:${slug}:${Math.abs(hash).toString(36)}`;
}

/**
 * Guard: slot must be in AI_ALLOWED_SLOTS.
 * Reject AI for decisionLogic, keyDifferences, snapshot, etc.
 */
export function isAiAllowedSlot(slot: string): slot is AiAllowedSlot {
  return AI_ALLOWED_SLOTS.includes(slot as AiAllowedSlot);
}

/**
 * Guard: output length must not exceed token-derived char limit.
 * Fails before sending to AI or after receiving response.
 */
export function guardAiOutputLength(
  slot: AiAllowedSlot,
  output: string
): { valid: boolean; error?: string } {
  const maxChars = AI_MAX_OUTPUT_CHARS[slot];
  if (output.length > maxChars) {
    return {
      valid: false,
      error: `AI output for ${slot} exceeds ${maxChars} chars (${output.length}). Truncate or reject.`,
    };
  }
  return { valid: true };
}

/**
 * Cache contract. Implement with KV/store. In-memory for dev.
 * CRITICAL: Check cache BEFORE calling AI. Return cached if hit. No regen loops.
 */
export interface AiContentCache {
  get(key: AiCacheKey): Promise<AiCachedOutput | null>;
  set(key: AiCacheKey, value: AiCachedOutput): Promise<void>;
}

/** In-memory cache for dev. Production: use Redis, Vercel KV, or DB. */
export function createInMemoryAiCache(): AiContentCache {
  const store = new Map<AiCacheKey, AiCachedOutput>();
  return {
    async get(key) {
      return store.get(key) ?? null;
    },
    async set(key, value) {
      store.set(key, value);
    },
  };
}
