/**
 * Programmatic Comparison Page Blueprint
 * Locked schema template for scaling to 10k–100k comparison pages.
 * Structure only — variable facts + controlled language slots.
 *
 * AI Freshness (LOW % only): AI allowed only in editorialContext and summaryTakeaway.
 * All other slots = human/template only. See lib/ai-freshness.ts.
 */

/** Fixed section IDs. Every comparison page renders these in order. */
export const COMPARISON_SECTIONS = [
  'hero',
  'snapshot',
  'decision_logic',
  'key_differences',
  'editorial_context',
  'summary_takeaway',
  'full_reviews',
  'ctas',
  'related_comparisons',
] as const;

export type ComparisonSectionId = (typeof COMPARISON_SECTIONS)[number];

/** Variable fact slots — data that varies per comparison. Typed for programmatic fill. */
export interface VariableFacts {
  /** Entity A (first in slug order). */
  entityA: EntityFacts;
  /** Entity B (second in slug order). */
  entityB: EntityFacts;
  /** Snapshot metrics (4 rows: Approval, Deposit, Fees, Reporting). */
  snapshotA: SnapshotRowFacts;
  snapshotB: SnapshotRowFacts;
  /** Decision logic (3 slots: bestForA, bestForB, neither). */
  decisionLogic: DecisionLogicFacts;
  /** Key differences (3 slots: approvalPredictability, deposit, costStructure). */
  keyDifferences: KeyDifferencesFacts;
  /** Intent phrase (e.g. "rebuilding credit or applying after a denial"). */
  intent: string;
  /** Editorial context (1–2 sentences). AI-allowed slot. */
  editorialContext: string;
  /** Summary takeaway (1–2 sentences). AI-allowed slot. */
  summaryTakeaway: string;
}

export interface EntityFacts {
  name: string;
  type: 'card';
  slug: string;
}

export interface SnapshotRowFacts {
  approvalType: string;
  deposit: string;
  fees: string;
  reporting: string;
}

export interface DecisionLogicFacts {
  bestForA: string;
  bestForB: string;
  neither: string;
}

export interface KeyDifferencesFacts {
  approvalPredictability: string;
  deposit: string;
  costStructure: string;
}

/** Controlled language slots — allowed values or patterns for programmatic generation. */
export const CONTROLLED_SLOTS = {
  /** Intent phrases (user goal). Pick one or compose from parts. */
  intent: {
    patterns: [
      'rebuilding credit',
      'applying after a denial',
      'no credit history',
      'bad credit',
      'choosing a first card',
      'deposit vs no deposit',
      'upgrading from secured',
    ],
    format: 'lowercase, no trailing period',
  },

  /** Snapshot approval types. */
  approvalType: {
    allowed: [
      'No credit check',
      'Credit check (Fair/Poor 580+)',
      'Credit check (Poor/No Credit 500+)',
      'Credit check required',
      'Varies by applicant',
    ],
  },

  /** Snapshot deposit. */
  deposit: {
    allowed: [
      'Required ($200 minimum)',
      'Required ($200–$500)',
      'Not required',
      'Refundable deposit',
      'N/A (credit builder)',
    ],
  },

  /** Snapshot fees. */
  fees: {
    pattern: 'Dollar amount or "Varies by applicant"',
    examples: ['$35 annual fee', '$49 annual fee', 'No annual fee', 'Varies by applicant'],
  },

  /** Snapshot reporting. */
  reporting: {
    allowed: ['All three bureaus', 'Equifax and Experian', 'One bureau', 'Varies'],
  },

  /** Decision logic slot structure. */
  decisionLogic: {
    bestFor: 'Best for [Entity] when [condition]. [Reason].',
    neither: 'Neither may fit if [condition].',
    maxLength: { bestFor: 200, neither: 150 },
  },

  /** Key differences slot structure. */
  keyDifferences: {
    approvalPredictability: '[EntityA] [fact]. [EntityB] [fact].',
    deposit: '[EntityA] [fact]. [EntityB] [fact].',
    costStructure: '[EntityA] [fact]. [EntityB] [fact].',
    maxLength: 250,
  },

  /** CTA label template. */
  ctaLabel: {
    pattern: 'View [EntityName] review',
    example: 'View OpenSky review',
  },
} as const;

/** Slug format for comparison pages. */
export const SLUG_FORMAT = {
  pattern: /^[a-z0-9]+-vs-[a-z0-9]+(-[a-z0-9]+)*$/,
  examples: ['opensky-vs-credit-one', 'secured-credit-cards-vs-no-deposit-cards'],
} as const;

/** Section metadata for programmatic rendering. */
export interface SectionMeta {
  id: ComparisonSectionId;
  heading?: string;
  required: boolean;
  /** Max character count for variable content in this section. */
  maxContentLength?: number;
}

export const SECTION_META: Record<ComparisonSectionId, SectionMeta> = {
  hero: { id: 'hero', required: true },
  snapshot: { id: 'snapshot', heading: 'At a glance', required: true },
  decision_logic: { id: 'decision_logic', heading: 'When to Choose Each', required: true, maxContentLength: 600 },
  key_differences: { id: 'key_differences', heading: 'Key Differences', required: true, maxContentLength: 750 },
  editorial_context: { id: 'editorial_context', required: true, maxContentLength: 300 },
  summary_takeaway: { id: 'summary_takeaway', required: true, maxContentLength: 250 },
  full_reviews: { id: 'full_reviews', heading: 'Full reviews', required: true },
  ctas: { id: 'ctas', heading: 'Read full reviews to decide', required: true },
  related_comparisons: { id: 'related_comparisons', heading: 'Related comparisons', required: false },
};
