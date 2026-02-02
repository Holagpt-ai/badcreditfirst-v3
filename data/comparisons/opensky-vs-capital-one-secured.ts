/**
 * Comparison data: OpenSky vs Capital One Secured
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsCapitalOneSecured: ComparisonPage = {
  slug: 'opensky-vs-capital-one-secured',
  intent: 'choosing a secured card for rebuilding credit',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Capital One Secured',
    type: 'card',
    slug: 'secured-cards',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check (Fair/Poor)',
    deposit: 'Required (may be less than deposit)',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you have no credit or recent denials and want predictable approval without a credit check. Fixed fees.',
    bestForB: 'Best for Capital One Secured when you have some credit history, prefer no annual fee, and can qualify with a credit check.',
    neither: 'Neither may fit if you cannot pay a deposit or need rewards. Compare other secured options in the category.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit. Capital One Secured uses a credit check and may offer a lower deposit than your limit.',
    deposit: 'OpenSky deposit typically equals your limit. Capital One may require a deposit less than your credit limit depending on your profile.',
    costStructure: 'OpenSky has a $35 annual fee. Capital One Secured has no annual fee. OpenSky fees are fixed; Capital One structure varies by offer.',
  },
  editorialContext: 'Both are secured cards that report to all three bureaus. OpenSky offers no credit check; Capital One Secured often has no annual fee. We compare them to help you choose based on whether you prefer avoiding a hard pull or avoiding an annual fee.',
  summaryTakeaway: 'Choose OpenSky if you want no credit check and can accept the annual fee. Choose Capital One Secured if you have fair credit and prefer no annual fee. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default openskyVsCapitalOneSecured;
