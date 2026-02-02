/**
 * Comparison data: OpenSky vs Credit Builder Accounts
 * Locked comparison data model for card-vs-category pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsCreditBuilderAccounts: ComparisonPage = {
  slug: 'opensky-vs-credit-builder-accounts',
  intent: 'building credit with limited options',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Credit Builder Accounts',
    type: 'card',
    slug: 'credit-builder',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Often no credit check',
    deposit: 'Not required',
    fees: 'Monthly or term-based',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you want a credit card, can pay a deposit, and prefer no credit check. Revolving credit reports like a card.',
    bestForB: 'Best for credit builder accounts when you have been denied for cards, prefer not to use a card, or want a structured payment plan.',
    neither: 'Neither may fit if you need cash immediately or cannot commit to payments. Compare your situation and budget.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit. Credit builders typically have no credit check and use fixed payment plans.',
    deposit: 'OpenSky requires a refundable deposit. Credit builders use monthly payments; you receive funds at the end of the term, not upfront.',
    costStructure: 'OpenSky has a $35 annual fee plus deposit. Credit builders have monthly fees over a set term. Compare total cost.',
  },
  editorialContext: 'OpenSky is a secured card; credit builder accounts are installment-style products. Both report to the bureaus. We compare them to help you choose based on whether you want a card or prefer a structured plan without one.',
  summaryTakeaway: 'Choose OpenSky if you want a card and can pay a deposit. Choose a credit builder if you prefer no card or have been denied for secured cards. Both can help build your credit file.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/credit-builder', label: 'Compare credit builder accounts' },
  },
};

export default openskyVsCreditBuilderAccounts;
