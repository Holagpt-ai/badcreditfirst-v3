/**
 * Comparison data: OpenSky vs No Deposit Alternatives
 * Locked comparison data model for card-vs-category pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsNoDepositAlternatives: ComparisonPage = {
  slug: 'opensky-vs-no-deposit-alternatives',
  intent: 'choosing between a deposit-based card and no-deposit options',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'No Deposit Alternatives',
    type: 'card',
    slug: 'bad-credit',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check required',
    deposit: 'Not required',
    fees: 'Varies by product',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you cannot qualify for unsecured cards and can pay a deposit. No credit check; predictable approval.',
    bestForB: 'Best for no-deposit alternatives when you have some credit history and prefer not to tie up a deposit. Includes unsecured cards and credit builders.',
    neither: 'Neither may fit if you have no credit and cannot pay a deposit. Compare credit builder accounts that use monthly payments.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit. No-deposit alternatives require a credit check or use a different structure (e.g., credit builder).',
    deposit: 'OpenSky requires a $200 minimum deposit. No-deposit alternatives do not require a security deposit.',
    costStructure: 'OpenSky has a fixed $35 annual fee. No-deposit options vary; unsecured cards may have higher or variable fees. Compare total cost.',
  },
  editorialContext: 'OpenSky requires a deposit but no credit check. No-deposit options include unsecured cards and credit builders. We compare them to help you choose based on deposit ability and credit profile.',
  summaryTakeaway: 'Choose OpenSky if you can pay a deposit and want no credit check. Choose no-deposit alternatives if you prefer not to tie up funds and have some options. Both can help build credit.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare no-deposit options' },
  },
};

export default openskyVsNoDepositAlternatives;
