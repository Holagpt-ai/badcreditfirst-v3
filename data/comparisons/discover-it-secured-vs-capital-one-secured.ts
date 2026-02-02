/**
 * Comparison data: Discover it Secured vs Capital One Secured
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const discoverItSecuredVsCapitalOneSecured: ComparisonPage = {
  slug: 'discover-it-secured-vs-capital-one-secured',
  intent: 'choosing a secured card with rewards potential',
  entityA: {
    name: 'Discover it® Secured',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Capital One Secured',
    type: 'card',
    slug: 'secured-cards',
  },
  snapshotA: {
    approvalType: 'Credit check (Fair/Poor)',
    deposit: 'Required',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check (Fair/Poor)',
    deposit: 'Required (may be less than limit)',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for Discover it Secured when you want cash back rewards and no annual fee. May graduate to unsecured.',
    bestForB: 'Best for Capital One Secured when you want no annual fee and a flexible deposit structure. May offer lower deposit than limit.',
    neither: 'Neither may fit if you have no credit history or need a no-credit-check option. Compare other secured cards.',
  },
  keyDifferences: {
    approvalPredictability: 'Both use a credit check. Discover may require fair credit. Capital One often accepts lower scores. Approval varies by applicant.',
    deposit: 'Both require a refundable deposit. Discover deposit typically equals your limit. Capital One may require less than your limit.',
    costStructure: 'Both have no annual fee. Discover offers cash back rewards. Capital One has no rewards. Compare benefits and deposit requirements.',
  },
  editorialContext: 'Both are no-annual-fee secured cards from major issuers that report to all three bureaus. Discover offers rewards; Capital One may have more flexible deposit terms. We compare them to help you choose based on rewards preference and qualification.',
  summaryTakeaway: 'Choose Discover it Secured if you want rewards and no annual fee. Choose Capital One Secured if you prefer flexible deposit terms. Both report to all bureaus and may graduate to unsecured.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default discoverItSecuredVsCapitalOneSecured;
