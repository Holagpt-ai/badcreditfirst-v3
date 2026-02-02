/**
 * Comparison data: Best Cards to Graduate From Secured Credit
 * Locked comparison data model for post-graduation guidance pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const bestCardsToGraduateFromSecuredCredit: ComparisonPage = {
  slug: 'best-cards-to-graduate-from-secured-credit',
  intent: 'finding options after graduating from a secured card',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Unsecured Options for Fair Credit',
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
    approvalType: 'Credit check (Fair credit)',
    deposit: 'Not required',
    fees: 'Varies by card',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you are still building and need a secured card. Use it to establish history before graduating.',
    bestForB: 'Best for unsecured options when you have graduated or improved your score and no longer need a deposit. Compare cards for fair credit.',
    neither: 'Neither may fit if you are between secured and unsecured. Check your score and pre-qualification tools before applying.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky is for those still building; no credit check. Unsecured options require a credit check and typically fair credit (600+).',
    deposit: 'OpenSky requires a deposit. Unsecured options do not require a deposit. After graduation, you may get your deposit back.',
    costStructure: 'OpenSky has a $35 annual fee. Unsecured options vary; some have no annual fee. Compare total cost and benefits.',
  },
  editorialContext: 'OpenSky is a starting point for building credit. After 6–12 months of on-time payments, you may qualify for unsecured cards. We compare them to help you understand the path from secured to unsecured.',
  summaryTakeaway: 'Use OpenSky (or another secured card) to build history. After improving your score, compare unsecured options for fair credit. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare cards for fair credit' },
  },
};

export default bestCardsToGraduateFromSecuredCredit;
