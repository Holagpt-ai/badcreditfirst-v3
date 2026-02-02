/**
 * Comparison data: Secured Credit Cards vs Self Credit Builder
 * Locked comparison data model for category-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsVsSelfCreditBuilder: ComparisonPage = {
  slug: 'secured-credit-cards-vs-self-credit-builder',
  intent: 'choosing between a secured card and a credit builder',
  entityA: {
    name: 'Secured Credit Cards',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Self - Credit Builder Account',
    type: 'card',
    slug: 'self-credit-builder',
  },
  snapshotA: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Usually required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'No credit check',
    deposit: 'Not required',
    fees: '$25/mo and up',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for secured cards when you want a card to use, can pay a deposit, and prefer revolving credit. Good for building utilization history.',
    bestForB: 'Best for Self when you prefer not to use a credit card, have been denied for cards, or want a no-hard-pull option. Builds installment tradeline.',
    neither: 'Neither may fit if you need immediate access to credit or cash. Compare your budget and goals.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards vary; OpenSky and First Progress accept no or poor credit. Self does not require a credit check.',
    deposit: 'Secured cards require a refundable deposit. Self uses monthly payments; you receive funds at the end of the term.',
    costStructure: 'Secured cards have annual fees and deposit. Self has monthly plans starting at $25. Compare total cost over the term.',
  },
  editorialContext: 'Secured cards give you a card; Self is an installment credit builder. Both report to all three bureaus. We compare them to help you choose based on whether you want revolving credit or a structured savings-style plan.',
  summaryTakeaway: 'Choose secured cards if you want a card and can pay a deposit. Choose Self if you prefer no card, no hard pull, or a structured plan. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/review/self-credit-builder', label: 'View Self review' },
  },
};

export default securedCreditCardsVsSelfCreditBuilder;
