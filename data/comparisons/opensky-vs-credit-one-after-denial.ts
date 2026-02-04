/**
 * Comparison data: OpenSky vs Credit One After Denial
 * Locked comparison data model for post-denial comparison pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsCreditOneAfterDenial: ComparisonPage = {
  slug: 'opensky-vs-credit-one-after-denial',
  intent: 'applying after a recent denial',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Credit One Bank® Platinum Visa®',
    type: 'card',
    slug: 'credit-one-platinum',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check (Fair/Poor 580+)',
    deposit: 'Not required',
    fees: 'Varies by applicant',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you have been denied elsewhere and want to avoid another hard pull. No credit check; approval based on deposit.',
    bestForB: 'Best for Credit One when you have some credit history after a denial and prefer no deposit. Fees and terms vary by applicant.',
    neither: 'Neither may fit if you cannot pay a deposit and have no credit history. Consider credit builder accounts.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check, so a recent denial does not affect your application. Credit One uses a credit check; approval varies.',
    deposit: 'OpenSky requires a refundable deposit. Credit One is unsecured and does not require a deposit.',
    costStructure: 'OpenSky has a fixed $35 annual fee. Credit One fees vary by applicant. Compare your specific offer before deciding.',
  },
  editorialContext: 'Both target consumers rebuilding or applying after a denial. OpenSky avoids a hard pull; Credit One offers no deposit. We compare them to help you choose based on whether you can pay a deposit and want to avoid another inquiry.',
  summaryTakeaway: 'Choose OpenSky if you want to avoid another credit check and can pay a deposit. Choose Credit One if you have some history and prefer no deposit. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/review/credit-one-platinum', label: 'View Credit One review' },
  },
};

export default openskyVsCreditOneAfterDenial;
