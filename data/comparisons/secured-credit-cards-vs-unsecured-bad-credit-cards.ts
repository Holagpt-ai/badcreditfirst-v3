/**
 * Comparison data: Secured Credit Cards vs Unsecured Bad Credit Cards
 * Locked comparison data model for category-vs-category pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsVsUnsecuredBadCreditCards: ComparisonPage = {
  slug: 'secured-credit-cards-vs-unsecured-bad-credit-cards',
  intent: 'choosing between secured and unsecured options for bad credit',
  entityA: {
    name: 'Secured Credit Cards',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Unsecured Bad Credit Cards',
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
    bestForA: 'Best for secured cards when you have no or poor credit and can pay a deposit. Often easier to get approved; predictable structure.',
    bestForB: 'Best for unsecured bad-credit cards when you have some credit history and prefer no deposit. Fees and terms vary by applicant.',
    neither: 'Neither may fit if you cannot pay a deposit and have no credit. Consider credit builder accounts.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards often approve based on deposit; some require no credit check. Unsecured bad-credit cards require a credit check; approval and terms vary.',
    deposit: 'Secured cards require a refundable deposit. Unsecured cards do not require a deposit.',
    costStructure: 'Secured cards typically have fixed annual fees. Unsecured bad-credit cards often have variable or higher fees. Compare your specific offer.',
  },
  editorialContext: 'Secured cards use a deposit to reduce risk; unsecured bad-credit cards do not. Both report to the bureaus. We compare them to help you choose based on whether you can pay a deposit and prefer fixed or variable costs.',
  summaryTakeaway: 'Choose secured cards if you can pay a deposit and want predictable approval. Choose unsecured if you prefer no deposit and have some credit history. Both can help rebuild credit.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare cards for bad credit' },
  },
};

export default securedCreditCardsVsUnsecuredBadCreditCards;
