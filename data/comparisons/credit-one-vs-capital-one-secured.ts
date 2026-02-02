/**
 * Comparison data: Credit One vs Capital One Secured
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const creditOneVsCapitalOneSecured: ComparisonPage = {
  slug: 'credit-one-vs-capital-one-secured',
  intent: 'rebuilding credit with limited options',
  entityA: {
    name: 'Credit One Bank® Platinum Visa®',
    type: 'card',
    slug: 'credit-one-platinum',
  },
  entityB: {
    name: 'Capital One Secured',
    type: 'card',
    slug: 'secured-cards',
  },
  snapshotA: {
    approvalType: 'Credit check (Fair/Poor 580+)',
    deposit: 'Not required',
    fees: 'Varies by applicant',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check (Fair/Poor)',
    deposit: 'Required',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for Credit One when you prefer no deposit and have some credit history. Fees and terms vary by applicant.',
    bestForB: 'Best for Capital One Secured when you can pay a deposit and want no annual fee. Secured structure may be easier to qualify for.',
    neither: 'Neither may fit if you have no credit history or cannot pay a deposit. Compare other options in the bad-credit or secured categories.',
  },
  keyDifferences: {
    approvalPredictability: 'Credit One is unsecured; approval and terms vary by applicant. Capital One Secured uses a deposit to reduce risk and may be easier to qualify for.',
    deposit: 'Credit One does not require a deposit. Capital One Secured requires a refundable deposit that typically sets or supplements your limit.',
    costStructure: 'Credit One fees vary by applicant and can include annual or monthly fees. Capital One Secured has no annual fee. Compare your specific offer before deciding.',
  },
  editorialContext: 'Credit One is unsecured with variable fees; Capital One Secured is a deposit-based card with no annual fee. We compare them to help you choose based on whether you can pay a deposit and prefer fixed or variable costs.',
  summaryTakeaway: 'Choose Credit One if you prefer no deposit and have some credit history. Choose Capital One Secured if you can pay a deposit and want no annual fee. Fees and terms vary—compare your offers.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/credit-one-platinum', label: 'View Credit One review' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default creditOneVsCapitalOneSecured;
