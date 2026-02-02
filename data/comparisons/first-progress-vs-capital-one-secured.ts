/**
 * Comparison data: First Progress vs Capital One Secured
 * Locked comparison data model for card-vs-card pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const firstProgressVsCapitalOneSecured: ComparisonPage = {
  slug: 'first-progress-vs-capital-one-secured',
  intent: 'choosing a secured card for damaged credit',
  entityA: {
    name: 'First Progress Platinum Prestige Mastercard®',
    type: 'card',
    slug: 'first-progress-platinum',
  },
  entityB: {
    name: 'Capital One Secured',
    type: 'card',
    slug: 'secured-cards',
  },
  snapshotA: {
    approvalType: 'Poor/No Credit (500+)',
    deposit: 'Required',
    fees: '$49 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check (Fair/Poor)',
    deposit: 'Required (may be less than limit)',
    fees: 'No annual fee',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for First Progress when you have poor or no credit and can afford the annual fee. Accepts thin or damaged files.',
    bestForB: 'Best for Capital One Secured when you have fair credit and prefer no annual fee. Deposit structure may be more flexible.',
    neither: 'Neither may fit if you cannot pay a deposit or need a no-fee option with poor credit. Compare other secured cards.',
  },
  keyDifferences: {
    approvalPredictability: 'First Progress accepts poor or no credit (500+). Capital One Secured typically requires fair credit. Both use a deposit to reduce risk.',
    deposit: 'Both require a refundable deposit. First Progress deposit amounts vary. Capital One may offer a deposit less than your credit limit.',
    costStructure: 'First Progress has a $49 annual fee. Capital One Secured has no annual fee. Factor total cost over the first year.',
  },
  editorialContext: 'Both are secured cards that report to all three bureaus. First Progress accepts lower scores; Capital One Secured often has no annual fee. We compare them to help you choose based on your score and fee tolerance.',
  summaryTakeaway: 'Choose First Progress if you have poor credit and can afford the fee. Choose Capital One Secured if you have fair credit and prefer no annual fee. Both report to all bureaus.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/first-progress-platinum', label: 'View First Progress review' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default firstProgressVsCapitalOneSecured;
