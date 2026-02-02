/**
 * Comparison data: Secured Credit Cards vs Chime Credit Builder
 * Locked comparison data model for category-vs-product pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsVsChimeCreditBuilder: ComparisonPage = {
  slug: 'secured-credit-cards-vs-chime-credit-builder',
  intent: 'choosing a credit-building product',
  entityA: {
    name: 'Secured Credit Cards',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Chime Credit Builder',
    type: 'card',
    slug: 'credit-builder',
  },
  snapshotA: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Usually required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'No credit check (Chime account required)',
    deposit: 'Not required',
    fees: 'No monthly fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for secured cards when you want a card from a card issuer, can pay a deposit, and prefer a traditional secured structure.',
    bestForB: 'Best for Chime Credit Builder when you have a Chime account, prefer no deposit and no fee, and want a secured-card-style product that reports.',
    neither: 'Neither may fit if you need unsecured credit or rewards. Compare your situation and existing accounts.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards vary by issuer; some require no credit check. Chime Credit Builder requires a Chime spending account and does not use a credit check.',
    deposit: 'Secured cards require a refundable deposit. Chime Credit Builder uses your Chime account balance as security; no separate deposit.',
    costStructure: 'Secured cards often have annual fees. Chime Credit Builder has no monthly fee but requires a Chime account. Compare total cost and account requirements.',
  },
  editorialContext: 'Secured cards are traditional deposit-based products. Chime Credit Builder is a secured-card-style product tied to a Chime account. Both report to the bureaus. We compare them to help you choose based on account preferences and fee tolerance.',
  summaryTakeaway: 'Choose secured cards if you want a card from a card issuer and can pay a deposit. Choose Chime Credit Builder if you have or want a Chime account and prefer no deposit or fee. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/credit-builder', label: 'Compare credit builder accounts' },
  },
};

export default securedCreditCardsVsChimeCreditBuilder;
