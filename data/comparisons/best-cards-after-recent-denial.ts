/**
 * Comparison data: Best Cards After Recent Denial
 * Locked comparison data model for post-denial guidance pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const bestCardsAfterRecentDenial: ComparisonPage = {
  slug: 'best-cards-after-recent-denial',
  intent: 'finding options after a recent credit card denial',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Self - Credit Builder Account',
    type: 'card',
    slug: 'self-credit-builder',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'No credit check',
    deposit: 'Not required',
    fees: '$25/mo and up',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you want a credit card and can pay a deposit. No credit check means your denial does not affect approval.',
    bestForB: 'Best for Self when you prefer not to add another credit card application or want a structured plan. No hard pull.',
    neither: 'Neither may fit if you need unsecured credit immediately. Consider spacing out applications and checking your report for errors.',
  },
  keyDifferences: {
    approvalPredictability: 'Both avoid a credit check. OpenSky approves based on deposit. Self approves based on ability to make monthly payments. No new hard inquiries.',
    deposit: 'OpenSky requires a refundable deposit. Self uses monthly payments; no deposit. Choose based on whether you can tie up a deposit.',
    costStructure: 'OpenSky has a $35 annual fee. Self has monthly fees. Compare total cost over 12 months.',
  },
  editorialContext: 'After a denial, avoiding another hard pull can help. OpenSky and Self both offer no-credit-check options that report to the bureaus. We compare them to help you choose based on deposit ability and product preference.',
  summaryTakeaway: 'Choose OpenSky if you want a card and can pay a deposit. Choose Self if you prefer no card or no deposit. Both avoid a hard pull and report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/review/self-credit-builder', label: 'View Self review' },
  },
};

export default bestCardsAfterRecentDenial;
