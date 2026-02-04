/**
 * Content Guards for Programmatic Expansion
 * Validates comparison content against CJ compliance and quality constraints.
 * Anti-duplication: deterministic phrasing pools, section-level variation, semantic distance.
 * No AI writing — guards only. Use before publishing programmatic pages.
 */

import type { VariableFacts, SnapshotRowFacts, DecisionLogicFacts, KeyDifferencesFacts } from './comparison-template';

/** Guard result. */
export interface GuardResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/** Minimum semantic distance (0–1). 1 = no overlap. Below this = too similar. */
export const MIN_SEMANTIC_DISTANCE = 0.3;

/**
 * Deterministic phrasing pools for section-level variation.
 * Pick one per section per page. No paragraph spinning — section-level only.
 * Use slug hash for deterministic selection: pickPoolIndex(pool, slug) => index.
 */
export const PHRASING_POOLS = {
  /** Decision logic section heading variants. */
  decisionLogicHeading: [
    'When to Choose Each',
    'Which Fits You?',
    'Choose Based On',
  ] as const,

  /** Key differences section heading variants. */
  keyDifferencesHeading: [
    'Key Differences',
    'How They Differ',
    'Main Differences',
  ] as const,

  /** Full reviews section intro variants. */
  fullReviewsIntro: [
    'Read our independent reviews to decide which card fits you best.',
    'Compare fees, approval odds, and credit-building value before applying.',
    'See our full reviews for detailed fees and approval odds.',
  ] as const,

  /** Editorial context opener variants (first clause). */
  editorialContextOpener: [
    'Both options target',
    'We compare',
    'This comparison covers',
  ] as const,

  /** Summary takeaway opener variants. */
  summaryTakeawayOpener: [
    'Choose',
    'Pick',
    'Consider',
  ] as const,

  /** "Neither may fit" heading variants. */
  neitherHeading: [
    'Neither may fit',
    'Skip both if',
    'Consider alternatives if',
  ] as const,
} as const;

/** Pick deterministic index from pool using slug. */
export function pickPoolIndex<T extends readonly string[]>(pool: T, slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % pool.length;
}

/** Get phrase from pool for slug. Deterministic. */
export function getPhraseFromPool<T extends readonly string[]>(pool: T, slug: string): T[number] {
  return pool[pickPoolIndex(pool, slug)];
}

/**
 * Jaccard distance between two texts (word-level).
 * 0 = identical, 1 = no overlap. Distance = 1 - similarity.
 */
export function semanticDistance(textA: string, textB: string): number {
  const wordsA = new Set(textA.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  const wordsB = new Set(textB.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  if (wordsA.size === 0 && wordsB.size === 0) return 1;
  const intersection = Array.from(wordsA).filter((w) => wordsB.has(w)).length;
  const union = new Set(Array.from(wordsA).concat(Array.from(wordsB))).size;
  const similarity = union === 0 ? 0 : intersection / union;
  return 1 - similarity;
}

/** Banned phrases (CJ compliance). */
const BANNED_PHRASES = [
  'guaranteed approval',
  'guarantee approval',
  'guaranteed to approve',
  '100% approval',
  'pre-approved',
  'preapproved',
  'instant approval',
  'no credit check required', // Use "No credit check" only in approval context
  'best card',
  'best credit card',
  '#1',
  'number one',
  'top rated',
  'award winning',
  'free money',
  'risk-free',
  'no risk',
];

/** Promotional language to flag. */
const PROMOTIONAL_PHRASES = [
  'amazing',
  'incredible',
  'unbelievable',
  'revolutionary',
  'game changer',
  'must have',
  'don\'t miss',
  'limited time',
  'act now',
  'hurry',
];

/** Max lengths by slot. */
const MAX_LENGTHS = {
  intent: 80,
  editorialContext: 300,
  summaryTakeaway: 250,
  bestFor: 200,
  neither: 150,
  approvalPredictability: 250,
  deposit: 250,
  costStructure: 250,
  approvalType: 60,
  fees: 40,
  reporting: 40,
} as const;

function checkBanned(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_PHRASES.filter((phrase) => lower.includes(phrase));
}

function checkPromotional(text: string): string[] {
  const lower = text.toLowerCase();
  return PROMOTIONAL_PHRASES.filter((phrase) => lower.includes(phrase));
}

function checkLength(label: string, text: string, max: number): string | null {
  if (text.length > max) {
    return `${label}: ${text.length} chars (max ${max})`;
  }
  return null;
}

/** Validate snapshot row facts. */
export function guardSnapshotFacts(snapshot: SnapshotRowFacts, prefix: string): GuardResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const phrase of checkBanned([snapshot.approvalType, snapshot.deposit, snapshot.fees, snapshot.reporting].join(' '))) {
    errors.push(`${prefix}: banned phrase "${phrase}"`);
  }
  for (const phrase of checkPromotional([snapshot.approvalType, snapshot.fees].join(' '))) {
    warnings.push(`${prefix}: promotional phrase "${phrase}"`);
  }

  const lenApproval = checkLength(`${prefix}.approvalType`, snapshot.approvalType, MAX_LENGTHS.approvalType);
  const lenFees = checkLength(`${prefix}.fees`, snapshot.fees, MAX_LENGTHS.fees);
  const lenReporting = checkLength(`${prefix}.reporting`, snapshot.reporting, MAX_LENGTHS.reporting);
  if (lenApproval) errors.push(lenApproval);
  if (lenFees) errors.push(lenFees);
  if (lenReporting) errors.push(lenReporting);

  return { valid: errors.length === 0, errors, warnings };
}

/** Validate decision logic facts. */
export function guardDecisionLogic(facts: DecisionLogicFacts): GuardResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [key, text] of Object.entries(facts)) {
    for (const phrase of checkBanned(text)) {
      errors.push(`decisionLogic.${key}: banned phrase "${phrase}"`);
    }
    for (const phrase of checkPromotional(text)) {
      warnings.push(`decisionLogic.${key}: promotional phrase "${phrase}"`);
    }
  }

  const lenBestForA = checkLength('decisionLogic.bestForA', facts.bestForA, MAX_LENGTHS.bestFor);
  const lenBestForB = checkLength('decisionLogic.bestForB', facts.bestForB, MAX_LENGTHS.bestFor);
  const lenNeither = checkLength('decisionLogic.neither', facts.neither, MAX_LENGTHS.neither);
  if (lenBestForA) errors.push(lenBestForA);
  if (lenBestForB) errors.push(lenBestForB);
  if (lenNeither) errors.push(lenNeither);

  return { valid: errors.length === 0, errors, warnings };
}

/** Validate key differences facts. */
export function guardKeyDifferences(facts: KeyDifferencesFacts): GuardResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [key, text] of Object.entries(facts)) {
    for (const phrase of checkBanned(text)) {
      errors.push(`keyDifferences.${key}: banned phrase "${phrase}"`);
    }
    for (const phrase of checkPromotional(text)) {
      warnings.push(`keyDifferences.${key}: promotional phrase "${phrase}"`);
    }
    const len = checkLength(`keyDifferences.${key}`, text, MAX_LENGTHS.approvalPredictability);
    if (len) errors.push(len);
  }

  return { valid: errors.length === 0, errors, warnings };
}

/** Validate full variable facts. */
export function guardVariableFacts(facts: VariableFacts): GuardResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  const snapshotA = guardSnapshotFacts(facts.snapshotA, 'snapshotA');
  const snapshotB = guardSnapshotFacts(facts.snapshotB, 'snapshotB');
  const decision = guardDecisionLogic(facts.decisionLogic);
  const keyDiff = guardKeyDifferences(facts.keyDifferences);

  allErrors.push(...snapshotA.errors, ...snapshotB.errors, ...decision.errors, ...keyDiff.errors);
  allWarnings.push(...snapshotA.warnings, ...snapshotB.warnings, ...decision.warnings, ...keyDiff.warnings);

  // Intent
  for (const phrase of checkBanned(facts.intent)) {
    allErrors.push(`intent: banned phrase "${phrase}"`);
  }
  const lenIntent = checkLength('intent', facts.intent, MAX_LENGTHS.intent);
  if (lenIntent) allErrors.push(lenIntent);

  // Editorial context & summary
  for (const phrase of checkBanned(facts.editorialContext)) {
    allErrors.push(`editorialContext: banned phrase "${phrase}"`);
  }
  for (const phrase of checkBanned(facts.summaryTakeaway)) {
    allErrors.push(`summaryTakeaway: banned phrase "${phrase}"`);
  }
  const lenContext = checkLength('editorialContext', facts.editorialContext, MAX_LENGTHS.editorialContext);
  const lenSummary = checkLength('summaryTakeaway', facts.summaryTakeaway, MAX_LENGTHS.summaryTakeaway);
  if (lenContext) allErrors.push(lenContext);
  if (lenSummary) allErrors.push(lenSummary);

  return { valid: allErrors.length === 0, errors: allErrors, warnings: allWarnings };
}

/** Validate comparison slug format. */
export function guardSlug(slug: string): GuardResult {
  const errors: string[] = [];
  const pattern = /^[a-z0-9]+-vs-[a-z0-9]+(-[a-z0-9]+)*$/;
  if (!pattern.test(slug)) {
    errors.push(`Slug "${slug}" does not match pattern: entity-a-vs-entity-b`);
  }
  if (slug.length > 80) {
    errors.push(`Slug too long: ${slug.length} chars`);
  }
  return { valid: errors.length === 0, errors, warnings: [] };
}

/**
 * Enforce minimum semantic distance between two sections (anti-duplication).
 * Fails if editorialContext and summaryTakeaway are too similar (e.g. copy-paste).
 */
export function guardWithinPageDistance(facts: VariableFacts): GuardResult {
  const errors: string[] = [];
  const dist = semanticDistance(facts.editorialContext, facts.summaryTakeaway);
  if (dist < MIN_SEMANTIC_DISTANCE) {
    errors.push(
      `editorialContext and summaryTakeaway too similar (distance ${dist.toFixed(2)}, min ${MIN_SEMANTIC_DISTANCE})`
    );
  }
  return { valid: errors.length === 0, errors, warnings: [] };
}

/**
 * Enforce minimum semantic distance across comparison pages.
 * Pass existing content; new content must differ from all.
 */
export function guardCrossPageDistance(
  newContent: { editorialContext: string; summaryTakeaway: string },
  existing: Array<{ editorialContext: string; summaryTakeaway: string }>
): GuardResult {
  const errors: string[] = [];
  for (let i = 0; i < existing.length; i++) {
    const distContext = semanticDistance(newContent.editorialContext, existing[i].editorialContext);
    const distSummary = semanticDistance(newContent.summaryTakeaway, existing[i].summaryTakeaway);
    if (distContext < MIN_SEMANTIC_DISTANCE) {
      errors.push(`editorialContext too similar to existing page ${i + 1} (distance ${distContext.toFixed(2)})`);
    }
    if (distSummary < MIN_SEMANTIC_DISTANCE) {
      errors.push(`summaryTakeaway too similar to existing page ${i + 1} (distance ${distSummary.toFixed(2)})`);
    }
  }
  return { valid: errors.length === 0, errors, warnings: [] };
}

/**
 * Guard that content uses allowed values from phrasing pools where applicable.
 * Section-level variation: headings should come from pools (when using programmatic generation).
 */
export function guardUsesPoolValues(
  sectionHeading: string,
  pool: readonly string[],
  sectionId: string
): GuardResult {
  const normalized = sectionHeading.trim();
  const inPool = pool.some((p) => p.trim() === normalized);
  if (!inPool) {
    return {
      valid: false,
      errors: [`${sectionId}: "${sectionHeading}" not in allowed pool. Use one of: ${pool.join(', ')}`],
      warnings: [],
    };
  }
  return { valid: true, errors: [], warnings: [] };
}
