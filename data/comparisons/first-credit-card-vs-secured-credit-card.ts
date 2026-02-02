/**
 * Comparison data: First Credit Card vs Secured Credit Card
 * Locked comparison data model for conceptual comparison pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const firstCreditCardVsSecuredCreditCard: ComparisonPage = {
  slug: 'first-credit-card-vs-secured-credit-card',
  intent: 'understanding your first credit card options',
  entityA: {
    name: 'First Credit Card (Unsecured)',
    type: 'card',
    slug: 'bad-credit',
  },
  entityB: {
    name: 'Secured Credit Card',
    type: 'card',
    slug: 'secured-cards',
  },
  snapshotA: {
    approvalType: 'Credit check required',
    deposit: 'Not required',
    fees: 'Varies by card',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for an unsecured first card when you have some credit history or student status and may qualify without a deposit.',
    bestForB: 'Best for a secured card when you have no credit or poor credit and can pay a deposit. Often easier to get approved.',
    neither: 'Neither may fit if you have been denied for both. Consider credit builder accounts as an alternative.',
  },
  keyDifferences: {
    approvalPredictability: 'Unsecured first cards require a credit check; approval depends on your file. Secured cards often approve based on deposit; some require no credit check.',
    deposit: 'Unsecured cards do not require a deposit. Secured cards require a refundable deposit that typically sets your limit.',
    costStructure: 'Unsecured cards may have no annual fee or variable fees. Secured cards often have annual fees. Compare total cost.',
  },
  editorialContext: 'Your first card may be unsecured (if you qualify) or secured (if you need to build from no or poor credit). We compare them to help you understand which path fits your situation.',
  summaryTakeaway: 'Choose an unsecured first card if you may qualify. Choose a secured card if you have no or poor credit and can pay a deposit. Both report to the bureaus and help build history.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/bad-credit', label: 'Compare cards for bad credit' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default firstCreditCardVsSecuredCreditCard;
