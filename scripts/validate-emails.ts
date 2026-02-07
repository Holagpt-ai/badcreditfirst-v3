#!/usr/bin/env node
/**
 * Build-time enforcement: only approved contact email allowed.
 * Run before build: npm run validate:emails
 * Exits with 1 if any unauthorized email is found.
 */

import fs from 'node:fs';
import path from 'node:path';

const APPROVED_EMAIL = 'carlos.acosta@badcreditfirst.com';
const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git']);
const EXCLUDE_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.eot', '.otf',
  '.mp4', '.mp3', '.wav', '.pdf', '.zip', '.tar', '.gz', '.map', '.wasm',
]);

function walkDir(dir: string, root: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(root, full);
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name)) continue;
      files.push(...walkDir(full, root));
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (!EXCLUDE_EXT.has(ext)) files.push(full);
    }
  }
  return files;
}

function validateEmails(): { valid: boolean; errors: Array<{ file: string; email: string; line: number }> } {
  const root = process.cwd();
  const files = walkDir(root, root);
  const errors: Array<{ file: string; email: string; line: number }> = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const matches = line.match(EMAIL_REGEX) ?? [];
      for (const email of matches) {
        if (email !== APPROVED_EMAIL) {
          const rel = path.relative(root, file);
          errors.push({ file: rel, email, line: i + 1 });
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

const result = validateEmails();
if (!result.valid) {
  console.error('[validate-emails] FAIL: Unauthorized email(s) found.\n');
  for (const { file, email, line } of result.errors) {
    console.error(`  ${file}:${line}  "${email}"`);
  }
  console.error('\nApproved email only: ' + APPROVED_EMAIL);
  process.exit(1);
}
console.log('[validate-emails] OK');
