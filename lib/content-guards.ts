/**
 * Content Guards for Programmatic Expansion
 * Validates comparison content against CJ compliance and quality constraints.
 * No AI writing — guards only. Use before publishing programmatic pages.
 */

import type { VariableFacts, SnapshotRowFacts, DecisionLogicFacts, KeyDifferencesFacts } from './comparison-template';

/** Guard result. */
export interface GuardResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
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
