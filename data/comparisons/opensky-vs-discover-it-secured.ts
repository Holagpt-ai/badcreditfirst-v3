/**
 * Comparison data: OpenSky vs Discover it Secured
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsDiscoverItSecured: ComparisonPage = {
  slug: 'opensky-vs-discover-it-secured',
  intent: 'choosing a secured card for rebuilding credit',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Discover it® Secured',
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
    deposit: 'Required',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you have no credit or recent denials and want no credit check. Predictable approval and fixed fees.',
    bestForB: 'Best for Discover it Secured when you have fair credit, want no annual fee, and prefer cash back rewards.',
    neither: 'Neither may fit if you cannot pay a deposit or need a high limit. Compare other secured options.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit. Discover it Secured uses a credit check and typically requires fair credit.',
    deposit: 'Both require a refundable deposit. OpenSky minimum is $200. Discover deposit amounts vary by applicant.',
    costStructure: 'OpenSky has a $35 annual fee. Discover it Secured has no annual fee and offers cash back. Factor fees and rewards into your decision.',
  },
  editorialContext: 'OpenSky offers no credit check; Discover it Secured offers no annual fee and rewards. Both report to all three bureaus. We compare them to help you choose based on whether you need to avoid a hard pull or prefer lower cost and rewards.',
  summaryTakeaway: 'Choose OpenSky if you want no credit check and can accept the annual fee. Choose Discover it Secured if you have fair credit and want no annual fee with rewards. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default openskyVsDiscoverItSecured;
