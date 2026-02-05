#!/usr/bin/env node
/**
 * Build-time validation for programmatic pages, A/B guardrails, authority signals, and rollout rules.
 * Run before build: npm run validate:programmatic
 * Exits with 1 if validation fails.
 */

import fs from 'node:fs';
import path from 'node:path';
import { validateProgrammaticPages } from '../lib/programmatic-validation';
import { validateABGuardrails } from '../lib/ab-guardrails';
import { AUTHOR_SCHEMA, AUTHOR_ID, getAuthorRef } from '../lib/schema';
import {
  HARD_CAP,
  ROLLOUT_CONFIG,
  getIndexableProgrammaticPageCount,
  getPromotedPagesForSitemap,
} from '../lib/programmatic-rollout';

type ValidationResult = { valid: boolean; errors: string[] };

function validateAuthority(): ValidationResult {
  const errors: string[] = [];

  // Single Author entity and canonical @id.
  if (!AUTHOR_SCHEMA || AUTHOR_SCHEMA['@type'] !== 'Person') {
    errors.push('AUTHOR_SCHEMA must be a Person entity.');
  }
  if (AUTHOR_SCHEMA['@id'] !== AUTHOR_ID) {
    errors.push('AUTHOR_SCHEMA @id must match AUTHOR_ID.');
  }
  const ref = getAuthorRef() as { '@id'?: string };
  if (!ref || ref['@id'] !== AUTHOR_ID) {
    errors.push('getAuthorRef() must return the canonical AUTHOR_ID.');
  }

  // Hub pages must contain author attribution link.
  const hubFiles = [
    'app/compare/bad-credit-cards/page.tsx',
    'app/compare/secured-credit-cards/page.tsx',
    'app/compare/credit-builder-cards/page.tsx',
    'app/compare/no-deposit-alternatives/page.tsx',
  ];
  for (const rel of hubFiles) {
    const full = path.join(process.cwd(), rel);
    if (!fs.existsSync(full)) {
      errors.push(`Hub page not found for authority check: ${rel}`);
      continue;
    }
    const src = fs.readFileSync(full, 'utf8');
    if (!src.includes('/author/carlos-acosta')) {
      errors.push(`Hub page missing author attribution link: ${rel}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

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

const result = validateProgrammaticPages();

if (!result.valid) {
  console.error('[programmatic-validation] FAILED. Build blocked.\n');
  result.errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}

const abResult = validateABGuardrails();
if (!abResult.valid) {
  console.error('[ab-guardrails] FAILED. Build blocked.\n');
  abResult.errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}

const authorityResult = validateAuthority();
if (!authorityResult.valid) {
  console.error('[authority-check] FAILED. Build blocked.\n');
  authorityResult.errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}

const rolloutResult = validateRollout();
if (!rolloutResult.valid) {
  console.error('[rollout-validation] FAILED. Build blocked.\n');
  rolloutResult.errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}

console.log('[programmatic-validation] OK');
console.log('[ab-guardrails] OK');
console.log('[authority-check] OK');
console.log('[rollout-validation] OK');
process.exit(0);
