/**
 * Comparison data: OpenSky vs Credit One
 * Locked comparison data model for card-vs-card pages.
 */

export type EntityType = 'card';

export interface ComparisonEntity {
  name: string;
  type: EntityType;
  slug: string;
}

export interface SnapshotMetrics {
  approvalType: string;
  deposit: string;
  fees: string;
  reporting: string;
}

export interface DecisionLogic {
  bestForA: string;
  bestForB: string;
  neither: string;
}

export interface KeyDifferences {
  approvalPredictability: string;
  deposit: string;
  costStructure: string;
}

export interface CtaMap {
  entityA: { href: string; label: string };
  entityB: { href: string; label: string };
}

export interface ComparisonPage {
  slug: string;
  intent: string;
  entityA: ComparisonEntity;
  entityB: ComparisonEntity;
  snapshotA: SnapshotMetrics;
  snapshotB: SnapshotMetrics;
  decisionLogic: DecisionLogic;
  keyDifferences: KeyDifferences;
  editorialContext: string;
  summaryTakeaway: string;
  ctaMap: CtaMap;
}

const openskyVsCreditOne: ComparisonPage = {
  slug: 'opensky-vs-credit-one',
  intent: 'rebuilding credit or applying after a denial',
  entityA: {
    name: 'OpenSky® Secured Visa®',
    type: 'card',
    slug: 'opensky-secured-visa',
  },
  entityB: {
    name: 'Credit One Bank® Platinum Visa®',
    type: 'card',
    slug: 'credit-one-platinum',
  },
  snapshotA: {
    approvalType: 'No credit check',
    deposit: 'Required ($200 minimum)',
    fees: '$35 annual fee',
    reporting: 'All three bureaus',
  },
  snapshotB: {
    approvalType: 'Credit check (Fair/Poor 580+)',
    deposit: 'Not required',
    fees: 'Varies by applicant',
    reporting: 'All three bureaus',
  },
  decisionLogic: {
    bestForA: 'Best for OpenSky when you have no credit history or recent denials and can afford a refundable deposit. Predictable approval and fixed fees.',
    bestForB: 'Best for Credit One when you have some credit history, want rewards, and prefer no deposit. Fees and terms vary by applicant.',
    neither: 'Neither may fit if you need cash back immediately, cannot pay a deposit, or want a single transparent fee structure.',
  },
  keyDifferences: {
    approvalPredictability: 'OpenSky does not require a credit check; approval is based on deposit and application. Credit One uses a credit check and approval varies by applicant.',
    deposit: 'OpenSky requires a refundable security deposit that typically sets your credit limit. Credit One is unsecured and does not require a deposit.',
    costStructure: 'OpenSky has a fixed $35 annual fee. Credit One fees vary by applicant and can include annual fees, monthly fees, or other charges depending on your offer.',
  },
  editorialContext: 'Both cards target consumers rebuilding credit or applying after a denial. OpenSky is a secured option with predictable approval; Credit One is unsecured with rewards but variable fees. We compare them to help you choose based on whether you can pay a deposit and prefer fixed or variable costs.',
  summaryTakeaway: 'Choose OpenSky if you want predictable approval and fixed fees and can pay a deposit. Choose Credit One if you have some credit history, want rewards, and prefer no deposit—but expect fees to vary.',
  ctaMap: {
    entityA: { href: '/credit-cards/review/opensky-secured-visa', label: 'View OpenSky review' },
    entityB: { href: '/credit-cards/review/credit-one-platinum', label: 'View Credit One review' },
  },
};

export default openskyVsCreditOne;
