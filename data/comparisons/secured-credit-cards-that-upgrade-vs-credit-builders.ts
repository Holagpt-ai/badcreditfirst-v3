/**
 * Comparison data: Secured Credit Cards That Upgrade vs Credit Builders
 * Locked comparison data model for graduation-path comparison pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsThatUpgradeVsCreditBuilders: ComparisonPage = {
  slug: 'secured-credit-cards-that-upgrade-vs-credit-builders',
  intent: 'choosing a product with a path to better credit',
  entityA: {
    name: 'Secured Cards That Upgrade',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Credit Builder Accounts',
    type: 'card',
    slug: 'credit-builder',
  },
  snapshotA: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Often no credit check',
    deposit: 'Not required',
    fees: 'Monthly or term-based',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for secured cards that upgrade when you want a card and a path to unsecured. Some issuers graduate you and return your deposit after 6–12 months.',
    bestForB: 'Best for credit builders when you prefer not to use a card or have been denied for secured. Builds installment history; you can add a card later.',
    neither: 'Neither may fit if you need immediate unsecured credit. Compare your timeline and goals.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards vary; some require no credit check. Credit builders typically do not require a credit check. Both can help you qualify for better products later.',
    deposit: 'Secured cards require a deposit; you may get it back at graduation. Credit builders use monthly payments; you receive funds at the end of the term.',
    costStructure: 'Secured cards have annual fees and deposit. Credit builders have monthly or term-based fees. Compare total cost and graduation timeline.',
  },
  editorialContext: 'Both help build credit with a path forward. Secured cards may graduate to unsecured; credit builders establish an installment tradeline before you add a card. We compare them to help you choose based on product preference and timeline.',
  summaryTakeaway: 'Choose secured cards if you want a card and potential graduation. Choose credit builders if you prefer no card or have been denied. Both can help you qualify for better options in 12–24 months.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/credit-builder', label: 'Compare credit builder accounts' },
  },
};

export default securedCreditCardsThatUpgradeVsCreditBuilders;
