/**
 * Card-based nav structure. All links map to existing routes.
 * Used by MegaMenu and MobileNav. Does not touch lib/.
 */

export interface NavCard {
  href: string;
  label: string;
}

export const COMPARE_CARDS: NavCard[] = [
  { href: '/compare/bad-credit-cards', label: 'Bad Credit Cards' },
  { href: '/compare/secured-credit-cards', label: 'Secured Cards' },
  { href: '/compare/credit-builder-cards', label: 'Credit Builder' },
  { href: '/compare/no-deposit-alternatives', label: 'No Deposit' },
];

export const BUILD_CREDIT_CARDS: NavCard[] = [
  { href: '/credit-cards/results/denied-deposit', label: 'Recently Denied' },
  { href: '/compare/no-deposit-alternatives', label: 'No Credit History' },
  { href: '/compare/bad-credit-cards', label: 'Rebuilding Credit' },
  { href: '/credit-cards/results/bad-credit-deposit', label: 'Score Under 600' },
];

export const LEARN_LINKS: NavCard[] = [
  { href: '/education', label: 'Education Center' },
  { href: '/education/how-credit-scores-work', label: 'How Credit Scores Work' },
  { href: '/faq', label: 'FAQs' },
];

export const CARDS_LINKS: NavCard[] = [
  { href: '/credit-cards', label: 'Card Navigator' },
  { href: '/education/how-is-my-score-calculated', label: 'Credit Tools' },
  { href: '/site-map', label: 'Site Map' },
];
