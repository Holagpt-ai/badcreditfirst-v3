/**
 * Centralized credit card data. Import this anywhere you need the card list.
 * Each card has a reviewUrl for the dedicated review page.
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
  approvalOdds?: string;
  realWorldUseCase?: string;
  feeRisk?: string;
  upgradePath?: string;
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
    approvalOdds: 'Fair/Poor (580+)',
    realWorldUseCase: 'Best for someone renting who needs to show payment history.',
    feeRisk: 'Watch out for the $35 annual fee; it is charged immediately.',
    upgradePath: 'After 6 months, consider applying for Capital One Platinum.',
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
    approvalOdds: 'Poor/No Credit (500+)',
    realWorldUseCase: 'Best for someone with thin or damaged credit who can afford the annual fee and deposit.',
    feeRisk: 'The $49 annual fee is charged in the first year; factor it into your budget.',
    upgradePath: 'After 12 months of on-time payments, explore unsecured cards that report to all three bureaus.',
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
    approvalOdds: 'High (no credit check)',
    realWorldUseCase: 'Best for someone who does not want a credit card but needs a positive tradeline.',
    feeRisk: 'Monthly plans start at $25; confirm the total cost before committing.',
    upgradePath: 'After completing the term, consider a secured card to add revolving credit to your mix.',
  },
  {
    title: 'Mission Lane Visa® Credit Card',
    label: 'Coming Soon',
    highlights: ['Unsecured option', 'No security deposit', 'Clear fee structure'],
    fees: '—',
    creditScore: '—',
    slug: 'mission-lane',
    reviewUrl: '/credit-cards/review/mission-lane',
    issuerUrl: 'https://www.missionlane.com',
    approvalOdds: 'Fair (600+)',
    realWorldUseCase: 'Best for someone with fair credit who wants an unsecured option without a deposit.',
    feeRisk: 'Check the current fee schedule on the issuer site before applying.',
    upgradePath: 'Use on-time payments to improve your score, then compare other unsecured options.',
  },
  {
    title: 'Credit One Bank® Platinum Visa®',
    label: 'Coming Soon',
    highlights: ['Cash back rewards', 'Regular account reviews', 'Free credit score access'],
    fees: '—',
    creditScore: '—',
    slug: 'credit-one-platinum',
    reviewUrl: '/credit-cards/review/credit-one-platinum',
    issuerUrl: 'https://www.creditonebank.com',
    approvalOdds: 'Fair/Poor (580+)',
    realWorldUseCase: 'Best for someone with limited credit who wants a chance at rewards and account reviews.',
    feeRisk: 'Fees vary by applicant; review your offer carefully before accepting.',
    upgradePath: 'After building history, consider cards with clearer fee structures and higher rewards.',
  },
];

/** Get a card by slug, or undefined. */
export function getCardBySlug(slug: string): CardItem | undefined {
  return cardData.find((c) => c.slug === slug);
}
