/**
 * Navigation data. All links map to existing routes.
 * Final structure: Build Credit | Learn | About
 */

export interface NavLink {
  href: string;
  label: string;
}

/** Build Credit: direct link to /credit-cards only. No dropdown, no comparisons. */
export const BUILD_CREDIT_HREF = '/credit-cards';

/** Learn: education links for dropdown. */
export const LEARN_LINKS: NavLink[] = [
  { href: '/education', label: 'Education Center' },
  { href: '/education/how-credit-scores-work', label: 'How Credit Scores Work' },
  { href: '/faq', label: 'FAQs' },
];

/** About: editorial, disclosures, contact. */
export const ABOUT_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/how-we-rank-cards', label: 'Editorial standards' },
  { href: '/advertiser-disclosure', label: 'Disclosures' },
  { href: '/contact', label: 'Contact' },
];
