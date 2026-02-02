/**
 * Comparison data: OpenSky vs First Progress
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsFirstProgress: ComparisonPage = {
  slug: 'opensky-vs-first-progress',
  intent: 'rebuilding credit with a secured card',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'First Progress Platinum Prestige Mastercard®',
    type: 'card',
    slug: 'first-progress-platinum',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Poor/No Credit (500+)',
    deposit: 'Required',
    fees: '$49 annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you want no credit check and a lower annual fee. Predictable approval based on deposit.',
    bestForB: 'Best for First Progress when you have thin or damaged credit and can afford the higher fee. Reports to all bureaus.',
    neither: 'Neither may fit if you cannot pay a deposit, need rewards, or qualify for a no-annual-fee secured card elsewhere.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not run a credit check; approval is based on deposit and application. First Progress may check credit and accepts poor or no credit.',
    deposit: 'Both require a refundable deposit. OpenSky minimum is $200; First Progress deposit amounts vary by applicant.',
    costStructure: 'OpenSky has a fixed $35 annual fee. First Progress charges $49 annually. Both fees are non-refundable.',
  },
  editorialContext: 'Both are secured cards that report to all three bureaus and target consumers rebuilding credit. We compare them to help you choose based on fee tolerance and whether you prefer no credit check (OpenSky) or acceptance of damaged credit (First Progress).',
  summaryTakeaway: 'Choose OpenSky if you want no credit check and lower fees. Choose First Progress if you have poor credit and can afford the higher annual fee. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/review/first-progress-platinum', label: 'View First Progress review' },
  },
};

export default openskyVsFirstProgress;
