/**
 * Comparison data: OpenSky vs Capital One Upgrade Path
 * Locked comparison data model for graduation-path comparison pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsCapitalOneUpgradePath: ComparisonPage = {
  slug: 'opensky-vs-capital-one-upgrade-path',
  intent: 'choosing a secured card with an upgrade path',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Capital One Secured (Upgrade Path)',
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
    deposit: 'Required (may be less than limit)',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you want no credit check and can accept the annual fee. Upgrade path to unsecured varies; check issuer terms.',
    bestForB: 'Best for Capital One Secured when you have fair credit and want no annual fee. Capital One often offers graduation to unsecured after responsible use.',
    neither: 'Neither may fit if you cannot pay a deposit. Compare other options in the secured category.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit. Capital One uses a credit check; approval and terms vary.',
    deposit: 'OpenSky deposit typically equals your limit. Capital One may require a deposit less than your credit limit. Both deposits are refundable at graduation or closure.',
    costStructure: 'OpenSky has a $35 annual fee. Capital One Secured has no annual fee. Factor fees and graduation timeline into your decision.',
  },
  editorialContext: 'Both are secured cards that report to all three bureaus. OpenSky offers no credit check; Capital One often has no annual fee and a clear graduation path. We compare them to help you choose based on approval needs and fee tolerance.',
  summaryTakeaway: 'Choose OpenSky if you want no credit check and can accept the fee. Choose Capital One Secured if you have fair credit and want no annual fee with a graduation path. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default openskyVsCapitalOneUpgradePath;
