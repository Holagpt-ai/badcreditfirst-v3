/**
 * Segmentation funnel: segment slug → display name and card sort order.
 * Used by /credit-cards/results/[segment].
 */

import type { CardItem } from './card-data';

const SEGMENT_DISPLAY: Record<string, string> = {
  'no-credit-deposit': 'No Credit (Can Pay Deposit)',
  'no-credit-no-deposit': 'No Credit (No Deposit)',
  'bad-credit-deposit': 'Bad Credit (Can Pay Deposit)',
  'bad-credit-no-deposit': 'Bad Credit (No Deposit)',
  'denied-deposit': 'Recently Denied (Can Pay Deposit)',
  'denied-no-deposit': 'Recently Denied (No Deposit)',
  'rebuilding-deposit': 'Rebuilding (Can Pay Deposit)',
  'rebuilding-no-deposit': 'Rebuilding (No Deposit)',
};

/** Priority slug order per segment (no-credit prioritizes no-credit-check cards, etc.). */
const SEGMENT_ORDER: Record<string, string[]> = {
  'no-credit-deposit': ['opensky-secured-visa', 'first-progress-platinum', 'self-credit-builder', 'mission-lane', 'credit-one-platinum'],
  'no-credit-no-deposit': ['self-credit-builder', 'mission-lane', 'opensky-secured-visa', 'first-progress-platinum', 'credit-one-platinum'],
  'bad-credit-deposit': ['opensky-secured-visa', 'first-progress-platinum', 'self-credit-builder', 'mission-lane', 'credit-one-platinum'],
  'bad-credit-no-deposit': ['self-credit-builder', 'mission-lane', 'credit-one-platinum', 'opensky-secured-visa', 'first-progress-platinum'],
  'denied-deposit': ['opensky-secured-visa', 'first-progress-platinum', 'self-credit-builder', 'mission-lane', 'credit-one-platinum'],
  'denied-no-deposit': ['self-credit-builder', 'mission-lane', 'credit-one-platinum', 'opensky-secured-visa', 'first-progress-platinum'],
  'rebuilding-deposit': ['opensky-secured-visa', 'first-progress-platinum', 'self-credit-builder', 'mission-lane', 'credit-one-platinum'],
  'rebuilding-no-deposit': ['self-credit-builder', 'mission-lane', 'credit-one-platinum', 'opensky-secured-visa', 'first-progress-platinum'],
};

export function getSegmentDisplayName(segment: string): string {
  return SEGMENT_DISPLAY[segment] ?? segment;
}

export function isValidSegment(segment: string): boolean {
  return segment in SEGMENT_DISPLAY;
}

/**
 * Returns cardData re-ordered for the given segment (e.g. no-credit prioritizes no-credit-check cards).
 */
export function getCardsForSegment(cards: CardItem[], segment: string): CardItem[] {
  const order = SEGMENT_ORDER[segment];
  if (!order) return [...cards];
  const bySlug = new Map(cards.map((c) => [c.slug, c]));
  const result: CardItem[] = [];
  for (const slug of order) {
    const card = bySlug.get(slug);
    if (card) result.push(card);
  }
  for (const card of cards) {
    if (!order.includes(card.slug)) result.push(card);
  }
  return result;
}
