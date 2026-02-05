#!/usr/bin/env node
/**
 * Build-time validation for programmatic pages.
 * Run before build: npm run validate:programmatic
 * Exits with 1 if validation fails (duplicate tokens or content).
 */

import { validateProgrammaticPages } from '../lib/programmatic-validation';

const result = validateProgrammaticPages();

if (!result.valid) {
  console.error('[programmatic-validation] FAILED. Build blocked.\n');
  result.errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}

console.log('[programmatic-validation] OK');
process.exit(0);
