/**
 * Comparison data: Credit Builder vs First Credit Card
 * Locked comparison data model for product-type comparison pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const creditBuilderVsFirstCreditCard: ComparisonPage = {
  slug: 'credit-builder-vs-first-credit-card',
  intent: 'choosing how to establish credit',
  entityA: {
    name: 'Credit Builder Account',
    type: 'card',
    slug: 'credit-builder',
  },
  entityB: {
    name: 'First Credit Card',
    type: 'card',
    slug: 'secured-cards',
  },
  snapshotA: {
    approvalType: 'Often no credit check',
    deposit: 'Not required',
    fees: 'Monthly or term-based',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Varies; secured often no check',
    deposit: 'Required for secured',
    fees: 'Annual fees common for secured',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for credit builder when you prefer not to use a credit card, have been denied for cards, or want a structured payment plan without a deposit.',
    bestForB: 'Best for a first credit card when you want revolving credit, can pay a deposit for secured, or may qualify for unsecured.',
    neither: 'Neither may fit if you need immediate access to credit. Compare your goals and budget.',
  },
  keyDifferences: {
    approvalPredictability: 'Credit builders typically do not require a credit check. First cards vary; secured cards often approve based on deposit; unsecured require a credit check.',
    deposit: 'Credit builders use monthly payments; no upfront deposit. Secured first cards require a deposit. Unsecured first cards require no deposit.',
    costStructure: 'Credit builders have monthly or term-based fees. First cards may have annual fees (secured) or no fee (some unsecured). Compare total cost.',
  },
  editorialContext: 'Credit builders establish an installment tradeline; first cards establish revolving credit. Both report to the bureaus. We compare them to help you choose based on whether you prefer a structured plan or a card.',
  summaryTakeaway: 'Choose a credit builder if you prefer no card or have been denied. Choose a first card if you want revolving credit and can pay a deposit (secured) or may qualify (unsecured). Both help build your file.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/credit-builder', label: 'Compare credit builder accounts' },
    entityB: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
  },
};

export default creditBuilderVsFirstCreditCard;
