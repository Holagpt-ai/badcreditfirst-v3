/**
 * Navigation config — single source of truth for desktop + mobile.
 * All links map to existing pages. Action-first, brand-second.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

/** Compare hubs (existing routes only). */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Compare',
    href: '/compare',
    children: [
      { href: '/compare/bad-credit-cards', label: 'Bad Credit Cards' },
      { href: '/compare/no-deposit-alternatives', label: 'No Deposit Alternatives' },
      { href: '/compare/secured-credit-cards', label: 'Secured Cards' },
      { href: '/compare/credit-builder-cards', label: 'Credit Builder' },
    ],
  },
  {
    label: 'Build Credit',
    href: '/education',
    children: [
      { href: '/education/how-credit-scores-work', label: 'How Credit Scores Work' },
      { href: '/education/what-is-a-good-credit-score', label: 'Credit Score Basics' },
      { href: '/education/credit-builder-loans', label: 'Credit Builder Loans' },
      { href: '/education/how-is-my-score-calculated', label: 'Score Calculator' },
    ],
  },
  {
    label: 'Learn',
    href: '/education',
    children: [
      { href: '/education', label: 'Education Center' },
      { href: '/faq', label: 'FAQ' },
      { href: '/credit-cards', label: 'Card Reviews' },
      { href: '/how-we-rank-cards', label: 'How We Rank' },
    ],
  },
  {
    label: 'Tools',
    href: '/credit-cards',
    children: [
      { href: '/education/how-is-my-score-calculated', label: 'Free Credit Score Info' },
      { href: '/credit-cards', label: 'Compare Cards' },
      { href: '/site-map', label: 'Site Map' },
    ],
  },
];

export const NAV_ABOUT: NavLink = { href: '/about', label: 'About' };

export const TRUST_TOOLTIP_LINES = [
  'No impact to credit score',
  'Pre-qualified offers',
  'Secure application',
] as const;
