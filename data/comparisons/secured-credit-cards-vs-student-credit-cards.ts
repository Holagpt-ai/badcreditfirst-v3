/**
 * Comparison data: Secured Credit Cards vs Student Credit Cards
 * Locked comparison data model for category-vs-category pages.
 */

import type { ComparisonPage } from './opensky-vs-credit-one';

const securedCreditCardsVsStudentCreditCards: ComparisonPage = {
  slug: 'secured-credit-cards-vs-student-credit-cards',
  intent: 'choosing a first credit card as a student',
  entityA: {
    name: 'Secured Credit Cards',
    type: 'card',
    slug: 'secured-cards',
  },
  entityB: {
    name: 'Student Credit Cards',
    type: 'card',
    slug: 'bad-credit',
  },
  snapshotA: {
    approvalType: 'Varies; some no credit check',
    deposit: 'Required',
    fees: 'Annual fees common',
    reporting: 'All three bureaus (typical)',
  },
  snapshotB: {
    approvalType: 'Credit check (student status may help)',
    deposit: 'Not required',
    fees: 'Often no annual fee',
    reporting: 'All three bureaus (typical)',
  },
  decisionLogic: {
    bestForA: 'Best for secured cards when you have no credit or poor credit and can pay a deposit. Predictable approval for many options.',
    bestForB: 'Best for student cards when you are a student with some income and may qualify for unsecured cards. No deposit required.',
    neither: 'Neither may fit if you are not a student and cannot pay a deposit. Compare credit builder accounts or other options.',
  },
  keyDifferences: {
    approvalPredictability: 'Secured cards often approve based on deposit; some require no credit check. Student cards use credit check but may accept thin files with student status.',
    deposit: 'Secured cards require a refundable deposit. Student cards are typically unsecured and do not require a deposit.',
    costStructure: 'Secured cards often have annual fees. Student cards frequently have no annual fee. Compare total cost and benefits.',
  },
  editorialContext: 'Secured cards work for students with no credit; student cards target enrolled students who may qualify for unsecured options. Both report to the bureaus. We compare them to help you choose based on your credit status and whether you can pay a deposit.',
  summaryTakeaway: 'Choose secured cards if you have no credit and can pay a deposit. Choose student cards if you are a student and may qualify for unsecured. Both can help build your credit file.',
  ctaMap: {
    entityA: { href: '/credit-cards/category/secured-cards', label: 'Compare secured cards' },
    entityB: { href: '/credit-cards/category/bad-credit', label: 'Compare cards for bad credit' },
  },
};

export default securedCreditCardsVsStudentCreditCards;
