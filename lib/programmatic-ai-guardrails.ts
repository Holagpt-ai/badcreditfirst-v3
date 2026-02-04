/**
 * AI Guardrails for Programmatic Expansion
 * AI copy allowed ONLY in: intro (90–120 words), whoThisIsFor bullets, optional FAQ (max 3).
 * All headings, schemas, conclusions are LOCKED and deterministic.
 *
 * DO NOT: Add experimental AI logic. This file defines constraints only.
 */

import { INTRO_WORD_RANGE, FAQ_MAX_ITEMS, SECTION_CONFIG } from './programmatic-blueprint';
import type { ProgrammaticSectionId } from './programmatic-blueprint';

/** Slots where AI generation is permitted. All other content = human/template only. */
export const AI_ALLOWED_SLOTS = ['intro', 'whoThisIsFor', 'faqExpansion'] as const;

export type AiAllowedSlot = (typeof AI_ALLOWED_SLOTS)[number];

/** Locked sections — headings, schemas, conclusions. Deterministic only. */
export const LOCKED_HEADINGS = [
  'At a glance',
  'When to Choose Each',
  'Key Differences',
  'Full reviews',
  'Read full reviews to decide',
  'Related comparisons',
  'Who This Is For',
  'Risks & Downsides',
  'What to Apply For Next',
  'Frequently Asked Questions',
] as const;

/** Check if a section allows AI content. */
export function isAiAllowedSection(sectionId: ProgrammaticSectionId): boolean {
  return sectionId === 'intro' || sectionId === 'who_this_is_for' || sectionId === 'faq';
}

/** Check if a slot string is in AI_ALLOWED_SLOTS. */
export function isAiAllowedSlot(slot: string): slot is AiAllowedSlot {
  return AI_ALLOWED_SLOTS.includes(slot as AiAllowedSlot);
}

/** Count words in text (whitespace-split). */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Validate intro paragraph: 90–120 words. */
export function guardIntroWordCount(intro: string): { valid: boolean; error?: string } {
  const words = countWords(intro);
  if (words < INTRO_WORD_RANGE.min) {
    return { valid: false, error: `Intro: ${words} words (min ${INTRO_WORD_RANGE.min})` };
  }
  if (words > INTRO_WORD_RANGE.max) {
    return { valid: false, error: `Intro: ${words} words (max ${INTRO_WORD_RANGE.max})` };
  }
  return { valid: true };
}

/** Validate whoThisIsFor bullets: non-empty, reasonable count. */
export function guardWhoThisIsFor(bullets: string[]): { valid: boolean; error?: string } {
  if (bullets.length === 0) {
    return { valid: false, error: 'whoThisIsFor: at least 1 bullet required' };
  }
  if (bullets.length > 8) {
    return { valid: false, error: `whoThisIsFor: max 8 bullets (got ${bullets.length})` };
  }
  const tooLong = bullets.filter((b) => b.length > 120);
  if (tooLong.length > 0) {
    return { valid: false, error: `whoThisIsFor: bullet exceeds 120 chars` };
  }
  return { valid: true };
}

/** Validate FAQ expansion: max 3 items. */
export function guardFaqExpansion(faq: Array<{ q: string; a: string }>): { valid: boolean; error?: string } {
  if (faq.length > FAQ_MAX_ITEMS) {
    return { valid: false, error: `FAQ expansion: max ${FAQ_MAX_ITEMS} items (got ${faq.length})` };
  }
  return { valid: true };
}

/** Validate that a heading is in the locked pool (for programmatic generation). */
export function isLockedHeading(heading: string): boolean {
  const normalized = heading.trim();
  return LOCKED_HEADINGS.some((h) => h === normalized);
}
