/**
 * Navigation data. All links map to existing routes.
 * Top-level: Build Credit | Learn | About
 */

export interface NavLink {
  href: string;
  label: string;
}

/** Build Credit: direct link to /credit-cards. No dropdown. */
export const BUILD_CREDIT_HREF = '/credit-cards';

/** Learn: simple education links for dropdown. */
export const LEARN_LINKS: NavLink[] = [
  { href: '/education', label: 'Education Center' },
  { href: '/education/how-credit-scores-work', label: 'How Credit Scores Work' },
  { href: '/faq', label: 'FAQs' },
];

/** About: minimal sub-links. */
export const ABOUT_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/author/carlos-acosta', label: 'Author' },
  { href: '/how-we-rank-cards', label: 'Editorial' },
  { href: '/contact', label: 'Contact' },
];
