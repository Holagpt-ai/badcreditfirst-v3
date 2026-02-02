/**
 * Comparison data: Credit Cards With Deposit vs Annual Fee
 * Locked comparison data model for product-attribute comparison pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const creditCardsWithDepositVsAnnualFee: ComparisonPage = {
  slug: 'credit-cards-with-deposit-vs-annual-fee',
  intent: 'understanding deposit and fee trade-offs',
  entityA: {
    name: 'Cards With Deposit',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Cards With Annual Fee (No Deposit)',
    type: 'card',
    slug: 'bad-credit',
  },
  snapshotA: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Required',
    fees: 'Annual fees vary',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Credit check required',
    deposit: 'Not required',
    fees: 'Annual or variable fees',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for deposit-based cards when you can tie up funds and want predictable approval. Deposit is refundable when you close in good standing.',
    bestForB: 'Best for annual-fee cards without deposit when you have some credit history and prefer not to tie up a deposit. Fees are non-refundable.',
    neither: 'Neither may fit if you cannot pay a deposit and cannot afford annual fees. Compare credit builder accounts.',
  },
  keyDifferences: {
    approvalPredictability: 'Deposit-based cards often approve based on deposit; some require no credit check. Annual-fee no-deposit cards require a credit check; approval varies.',
    deposit: 'Deposit-based cards require a refundable security deposit. Annual-fee cards do not require a deposit; you pay fees instead.',
    costStructure: 'Deposit-based cards: refundable deposit plus possible annual fee. Annual-fee cards: non-refundable fees, no deposit. Compare total first-year cost.',
  },
  editorialContext: 'Deposit-based cards tie up funds but may be easier to get. Annual-fee no-deposit cards cost in fees instead. Both report to the bureaus. We compare them to help you choose based on cash flow and approval needs.',
  summaryTakeaway: 'Choose deposit-based cards if you can tie up funds and want easier approval. Choose annual-fee cards if you prefer no deposit and can afford the fees. Compare total cost over 12 months.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare cards for bad credit' },
  },
};

export default creditCardsWithDepositVsAnnualFee;
