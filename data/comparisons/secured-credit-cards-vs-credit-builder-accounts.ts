/**
 * Comparison data: Secured Credit Cards vs Credit Builder Accounts
 * Locked comparison data model for category-vs-category pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsVsCreditBuilderAccounts: ComparisonPage = {
  slug: 'secured-credit-cards-vs-credit-builder-accounts',
  intent: 'choosing how to build or rebuild credit',
  entityA: {
    name: 'Secured Credit Cards',
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
    deposit: 'Usually required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Often no credit check',
    deposit: 'Not required (structured payments)',
    fees: 'Monthly or term-based',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for secured cards when you want a revolving line of credit, can pay a deposit, and prefer using a card for small purchases.',
    bestForB: 'Best for credit builder accounts when you prefer not to use a credit card, have been denied for cards, or want a structured payment plan.',
    neither: 'Neither may fit if you need immediate access to credit or cash. Compare your situation and budget before deciding.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards often approve based on deposit; some run no credit check. Credit builders typically do not require a credit check and use fixed payment plans.',
    deposit: 'Secured cards require a refundable deposit that sets your limit. Credit builders use monthly payments; you typically receive funds at the end of the term.',
    costStructure: 'Secured cards have annual fees and a one-time deposit. Credit builders have monthly or term-based fees. Compare total cost over 12–24 months.',
  },
  editorialContext: 'Both help build or rebuild credit by reporting to the bureaus. Secured cards give you a card to use; credit builders use installment-style payments. We compare them to help you choose based on whether you prefer revolving credit or a structured plan.',
  summaryTakeaway: 'Choose secured cards if you want a card and can pay a deposit. Choose credit builder accounts if you prefer no card or have been denied for secured cards. Both can help your score when used responsibly.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/credit-builder', label: 'Compare credit builder accounts' },
  },
};

export default securedCreditCardsVsCreditBuilderAccounts;
