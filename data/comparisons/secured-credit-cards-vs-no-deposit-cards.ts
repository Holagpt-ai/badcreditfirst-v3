/**
 * Comparison data: Secured Credit Cards vs No Deposit Cards
 * Locked comparison data model for category-vs-category pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsVsNoDepositCards: ComparisonPage = {
  slug: 'secured-credit-cards-vs-no-deposit-cards',
  intent: 'choosing between deposit and no-deposit options',
  entityA: {
    name: 'Secured Credit Cards',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'No Deposit Cards',
    type: 'card',
    slug: 'bad-credit',
  },
  snapshotA: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Credit check required',
    deposit: 'Not required',
    fees: 'Varies; often higher',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for secured cards when you can pay a deposit and want predictable approval. Often easier to qualify with no or poor credit.',
    bestForB: 'Best for no-deposit cards when you have some credit history and prefer not to tie up funds. Unsecured options available.',
    neither: 'Neither may fit if you cannot pay a deposit and have no credit. Consider credit builder accounts.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards often approve based on deposit; some require no credit check. No-deposit cards require a credit check; approval varies by applicant.',
    deposit: 'Secured cards require a refundable deposit that sets your limit. No-deposit cards are unsecured and do not require a deposit.',
    costStructure: 'Secured cards typically have fixed annual fees. No-deposit cards often have variable or higher fees. Compare total cost.',
  },
  editorialContext: 'Secured cards use a deposit to reduce risk; no-deposit cards are unsecured. Both report to the bureaus. We compare them to help you choose based on whether you can pay a deposit and your credit profile.',
  summaryTakeaway: 'Choose secured cards if you can pay a deposit and want easier approval. Choose no-deposit cards if you prefer not to tie up funds and have some credit history. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare no-deposit options' },
  },
};

export default securedCreditCardsVsNoDepositCards;
