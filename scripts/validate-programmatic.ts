#!/usr/bin/env node
/**
 * Build-time validation for programmatic pages and A/B guardrails.
 * Run before build: npm run validate:programmatic
 * Exits with 1 if validation fails.
 */

import { validateProgrammaticPages } from '../lib/programmatic-validation';
import { validateABGuardrails } from '../lib/ab-guardrails';

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

console.log('[programmatic-validation] OK');
console.log('[ab-guardrails] OK');
process.exit(0);
