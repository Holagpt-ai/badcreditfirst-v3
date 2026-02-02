/**
 * Comparison data: OpenSky vs Indigo for Bad Credit
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsIndigoForBadCredit: ComparisonPage = {
  slug: 'opensky-vs-indigo-for-bad-credit',
  intent: 'choosing a card for bad credit',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Indigo® Platinum Mastercard®',
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
    approvalType: 'Credit check (Poor credit)',
    deposit: 'Not required',
    fees: 'Varies by applicant',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you have bad credit and want no credit check. Predictable approval based on deposit and fixed fees.',
    bestForB: 'Best for Indigo when you have poor credit and prefer no deposit. Unsecured; fees and terms vary by applicant.',
    neither: 'Neither may fit if you cannot pay a deposit and have no credit history. Compare credit builder accounts.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit. Indigo uses a credit check and accepts poor credit; approval varies.',
    deposit: 'OpenSky requires a refundable deposit. Indigo is unsecured and does not require a deposit.',
    costStructure: 'OpenSky has a fixed $35 annual fee. Indigo fees vary by applicant. Compare your specific offer before deciding.',
  },
  editorialContext: 'Both target consumers with bad credit. OpenSky is secured with no credit check; Indigo is unsecured with variable fees. We compare them to help you choose based on deposit ability and fee tolerance.',
  summaryTakeaway: 'Choose OpenSky if you want no credit check and can pay a deposit. Choose Indigo if you prefer no deposit and have poor credit. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare cards for bad credit' },
  },
};

export default openskyVsIndigoForBadCredit;
