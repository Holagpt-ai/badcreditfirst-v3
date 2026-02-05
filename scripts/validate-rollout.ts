#!/usr/bin/env node
/**
 * Build-time validation for programmatic rollout rules.
 * Run as part of validate:programmatic or before build.
 * Exits with 1 if rollout rules are violated.
 *
 * Validates:
 * - Indexable programmatic pages <= HARD_CAP (1,000)
 * - Sitemap programmatic entries <= HARD_CAP
 * - Sitemap programmatic entries <= sitemapLimitTier
 */

import {
  HARD_CAP,
  ROLLOUT_CONFIG,
  getIndexableProgrammaticPageCount,
  getPromotedPagesForSitemap,
} from '../lib/programmatic-rollout';

type ValidationResult = { valid: boolean; errors: string[] };

function validateRollout(): ValidationResult {
  const errors: string[] = [];

  const indexableCount = getIndexableProgrammaticPageCount();
  const sitemapPages = getPromotedPagesForSitemap();
  const sitemapCount = sitemapPages.length;

  if (indexableCount > HARD_CAP) {
    errors.push(
      `Indexable programmatic pages (${indexableCount}) exceeds HARD_CAP (${HARD_CAP}). Reduce promoted slugs or increase HARD_CAP.`
    );
  }

  if (sitemapCount > HARD_CAP) {
    errors.push(
      `Sitemap programmatic entries (${sitemapCount}) exceeds HARD_CAP (${HARD_CAP}).`
    );
  }

  if (sitemapCount > ROLLOUT_CONFIG.sitemapLimitTier) {
    errors.push(
      `Sitemap programmatic entries (${sitemapCount}) exceeds sitemapLimitTier (${ROLLOUT_CONFIG.sitemapLimitTier}).`
    );
  }

  return { valid: errors.length === 0, errors };
}

const result = validateRollout();
if (!result.valid) {
  console.error('[rollout-validation] FAILED. Build blocked.\n');
  result.errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}

console.log('[rollout-validation] OK');
process.exit(0);
