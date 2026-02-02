/**
 * Comparison data: OpenSky vs Capital One for No Credit
 * Locked comparison data model for card-vs-product pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const openskyVsCapitalOneForNoCredit: ComparisonPage = {
  slug: 'opensky-vs-capital-one-for-no-credit',
  intent: 'getting a first credit card with no credit history',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Capital One for No Credit',
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
    approvalType: 'Credit check (may accept thin file)',
    deposit: 'May be required',
    fees: 'Varies; some no annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you have no credit history and want guaranteed consideration without a credit check. Predictable approval based on deposit.',
    bestForB: 'Best for Capital One when you have a thin file and may qualify for a lower deposit or no-annual-fee option. Credit check required.',
    neither: 'Neither may fit if you cannot pay a deposit. Consider credit builder accounts as an alternative.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit and application. Capital One uses a credit check and may accept thin or no file.',
    deposit: 'OpenSky requires a $200 minimum deposit. Capital One deposit requirements vary; some products may offer lower deposits.',
    costStructure: 'OpenSky has a fixed $35 annual fee. Capital One options vary; some have no annual fee. Compare total cost for your situation.',
  },
  editorialContext: 'Both target consumers with no or thin credit. OpenSky offers no credit check; Capital One may offer no annual fee. We compare them to help you choose based on whether you prefer avoiding a hard pull or avoiding an annual fee.',
  summaryTakeaway: 'Choose OpenSky if you want no credit check and predictable approval. Choose Capital One if you have a thin file and may qualify for no annual fee. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default openskyVsCapitalOneForNoCredit;
