/**
 * Programmatic Page Build-Time Validation
 * Runs before/during build. FAILS BUILD if:
 * - Any token set duplicates an existing page
 * - Content similarity exceeds safe threshold
 *
 * Reusable for 500k–1M page scaling.
 */

import { ALL_COMPARISON_SLUGS, getComparisonBySlug } from '../data/comparisons';
import {
  buildTokensFromComparison,
  buildTokenSetKey,
  validateTokenSetUniqueness,
  type UniquenessTokens,
} from './programmatic-blueprint';
import { checkDuplicationRisk } from './content-fingerprint';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/** Run full programmatic validation. Call before build. */
export function validateProgrammaticPages(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const pages = ALL_COMPARISON_SLUGS.map((slug) => {
    const comp = getComparisonBySlug(slug);
    if (!comp) return null;
    return {
      slug,
      intent: comp.intent,
      entityA: comp.entityA.name,
      entityB: comp.entityB.name,
      editorialContext: comp.editorialContext,
      summaryTakeaway: comp.summaryTakeaway,
    };
  }).filter(Boolean) as Array<{
    slug: string;
    intent: string;
    entityA: string;
    entityB: string;
    editorialContext: string;
    summaryTakeaway: string;
  }>;

  // 1. Token set uniqueness: no duplicate token sets (build must fail if duplicate)
  const tokenKeys: string[] = [];
  for (const p of pages) {
    const tokens = buildTokensFromComparison(p.slug, p.intent, p.entityA, p.entityB);
    tokenKeys.push(buildTokenSetKey(tokens));
  }
  const uniqueKeys = new Set(tokenKeys);
  if (uniqueKeys.size !== tokenKeys.length) {
    const duplicates = tokenKeys.filter((k, i) => tokenKeys.indexOf(k) !== i);
    errors.push(`Duplicate token sets detected. Page build must fail. Duplicates: ${Array.from(new Set(duplicates)).join(', ')}`);
  }

  // 2. Content duplication: no two pages too similar
  for (let i = 0; i < pages.length; i++) {
    const existing = pages.filter((_, j) => j !== i).map((p) => ({
      editorialContext: p.editorialContext,
      summaryTakeaway: p.summaryTakeaway,
    }));
    const risk = checkDuplicationRisk(
      {
        editorialContext: pages[i].editorialContext,
        summaryTakeaway: pages[i].summaryTakeaway,
      },
      existing
    );
    if (!risk.safe && risk.error) {
      errors.push(`[${pages[i].slug}] ${risk.error}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/** Validate a NEW page before adding. Use when scaling to 500k–1M pages. */
export function validateNewProgrammaticPage(
  tokens: UniquenessTokens,
  content: { intro?: string; editorialContext?: string; summaryTakeaway?: string },
  existingRegistry: Set<string>,
  existingContent: Array<{ intro?: string; editorialContext?: string; summaryTakeaway?: string }>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const tokenResult = validateTokenSetUniqueness(tokens, existingRegistry);
  if (!tokenResult.valid && tokenResult.error) {
    errors.push(tokenResult.error);
  }

  const dupResult = checkDuplicationRisk(content, existingContent);
  if (!dupResult.safe && dupResult.error) {
    errors.push(dupResult.error);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
