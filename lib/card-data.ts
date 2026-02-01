/**
 * Centralized credit card data. Import this anywhere you need the card list.
 * Each card has reviewUrl, applyLink, and required review fields for scalability.
 */
export interface CardItem {
  title: string;
  label: string;
  highlights: string[];
  fees: string;
  creditScore: string;
  slug: string;
  /** Path to the single-card review page, e.g. /credit-cards/review/opensky-secured-visa */
  reviewUrl: string;
  /** Issuer application URL (external). */
  issuerUrl: string;
  /** Affiliate/tracking apply link. Use getAffiliateLink(slug) for future network switching. */
  applyLink: string;
  /** Approval odds, e.g. "Fair/Poor (580+)". */
  approvalOdds: string;
  /** Real-world use case, e.g. "Best for renting". */
  realWorldUseCase: string;
  /** Fee risk note, e.g. "Annual fee charged immediately". */
  feeRisk: string;
  /** Upgrade path, e.g. "Unsecured Platinum after 6 months". */
  upgradePath: string;
  /** Who this product is bad for, e.g. "People who can't deposit $200". */
  badFor: string;
  /** Parent category slug for internal linking, e.g. secured-cards, credit-builder, bad-credit. */
  categorySlug: string;
  /** One-line risk summary (optional). */
  riskSummary?: string;
  /** Who this product is a bad fit for (optional; use badFor for canonical). */
  whoThisIsBadFor?: string;
}

export const cardData: CardItem[] = [
  {
    title: 'OpenSky® Secured Visa® Credit Card',
    label: 'Best for No Credit Check',
    highlights: ['No credit check to apply', 'Refundable deposit starts at $200', 'Reports to all 3 credit bureaus'],
    fees: '$35 Annual Fee',
    creditScore: 'No Credit Check',
    slug: 'opensky-secured-visa',
    reviewUrl: '/credit-cards/review/opensky-secured-visa',
    issuerUrl: 'https://openskycc.com',
    applyLink: 'https://openskycc.com',
    approvalOdds: 'Fair/Poor (580+)',
    realWorldUseCase: 'Best for renting and building payment history.',
    feeRisk: 'Annual fee charged immediately.',
    upgradePath: 'Unsecured Platinum after 6 months.',
    badFor: "People who can't deposit $200 or need rewards.",
    categorySlug: 'secured-cards',
    riskSummary: 'Annual fee is charged upfront; missing a payment can hurt your new credit file.',
    whoThisIsBadFor: 'Not for people who need a high credit limit or rewards.',
  },
  {
    title: 'First Progress Platinum Prestige Mastercard®',
    label: 'Best for Credit Rebuilding',
    highlights: ['Reports to all 3 bureaus', 'No credit history required', '24/7 Online Account Access'],
    fees: '$49 Annual Fee',
    creditScore: 'Poor to Fair',
    slug: 'first-progress-platinum',
    reviewUrl: '/credit-cards/review/first-progress-platinum',
    issuerUrl: 'https://firstprogress.com',
    applyLink: 'https://firstprogress.com',
    approvalOdds: 'Poor/No Credit (500+)',
    realWorldUseCase: 'Best for thin or damaged credit with budget for fee and deposit.',
    feeRisk: 'Annual fee charged in first year; factor into budget.',
    upgradePath: 'Unsecured cards after 12 months of on-time payments.',
    badFor: 'People who can qualify for a no-annual-fee secured card elsewhere.',
    categorySlug: 'secured-cards',
    riskSummary: 'High fee risk in year one; the $49 annual fee is non-refundable.',
    whoThisIsBadFor: 'Not for people who can qualify for a no-annual-fee secured card elsewhere.',
  },
  {
    title: 'Self - Credit Builder Account',
    label: 'Best Alternative to a Credit Card',
    highlights: ['No hard pull on your credit', 'Build credit while you save', 'Plans start at $25/mo'],
    fees: '$25/mo',
    creditScore: 'Building',
    slug: 'self-credit-builder',
    reviewUrl: '/credit-cards/review/self-credit-builder',
    issuerUrl: 'https://www.self.inc',
    applyLink: 'https://www.self.inc',
    approvalOdds: 'High (no credit check)',
    realWorldUseCase: 'Best for building a tradeline without a credit card.',
    feeRisk: 'Monthly plans start at $25; confirm total cost before committing.',
    upgradePath: 'Secured card after completing the term.',
    badFor: 'People who need cash now or already have several positive tradelines.',
    categorySlug: 'credit-builder',
    riskSummary: 'You do not get the money until the term ends; not suitable if you need cash now.',
    whoThisIsBadFor: 'Not for people who already have several positive tradelines and want revolving credit.',
  },
  {
    title: 'Mission Lane Visa® Credit Card',
    label: 'Coming Soon',
    highlights: ['Unsecured option', 'No security deposit', 'Clear fee structure'],
    fees: '-',
    creditScore: '-',
    slug: 'mission-lane',
    reviewUrl: '/credit-cards/review/mission-lane',
    issuerUrl: 'https://www.missionlane.com',
    applyLink: 'https://www.missionlane.com',
    approvalOdds: 'Fair (600+)',
    realWorldUseCase: 'Best for fair credit wanting unsecured option without deposit.',
    feeRisk: 'Check current fee schedule on issuer site before applying.',
    upgradePath: 'Compare other unsecured options after improving score.',
    badFor: 'People with no credit history or very low scores.',
    categorySlug: 'bad-credit',
    riskSummary: 'Unsecured cards for fair credit can have variable rates and fees; check the offer.',
    whoThisIsBadFor: 'Not for people with no credit history or very low scores.',
  },
  {
    title: 'Credit One Bank® Platinum Visa®',
    label: 'Coming Soon',
    highlights: ['Cash back rewards', 'Regular account reviews', 'Free credit score access'],
    fees: '-',
    creditScore: '-',
    slug: 'credit-one-platinum',
    reviewUrl: '/credit-cards/review/credit-one-platinum',
    issuerUrl: 'https://www.creditonebank.com',
    applyLink: 'https://www.creditonebank.com',
    approvalOdds: 'Fair/Poor (580+)',
    realWorldUseCase: 'Best for limited credit wanting rewards and account reviews.',
    feeRisk: 'Fees vary by applicant; review your offer carefully before accepting.',
    upgradePath: 'Cards with clearer fee structures after building history.',
    badFor: 'People who want a single, transparent annual fee.',
    categorySlug: 'bad-credit',
    riskSummary: 'Fees vary by applicant; your offer may differ from marketing.',
    whoThisIsBadFor: 'Not for people who want a single, transparent annual fee.',
  },
];

/** Get a card by slug, or undefined. */
export function getCardBySlug(slug: string): CardItem | undefined {
  return cardData.find((c) => c.slug === slug);
}

/**
 * Returns the affiliate/apply link for a card by slug.
 * Use this instead of reading applyLink directly so we can switch networks later.
 */
export function getAffiliateLink(cardSlug: string): string {
  const card = getCardBySlug(cardSlug);
  return card?.applyLink ?? '#';
}
