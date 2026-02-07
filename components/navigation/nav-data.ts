/**
 * Navigation data. All links map to existing routes.
 * Top-level: Build Credit | Learn | About
 * Mobile drawer: Build Credit + category links, Learn, Company.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavSection {
  title: string;
  href?: string;
  links: NavLink[];
}

/** Build Credit: direct link to /credit-cards. */
export const BUILD_CREDIT_HREF = '/credit-cards';

/** Build Credit categories (mobile drawer). */
export const BUILD_CREDIT_LINKS: NavLink[] = [
  { href: '/credit-cards/category/secured-cards', label: 'Secured Credit Cards' },
  { href: '/credit-cards/category/bad-credit', label: 'Credit Cards for Bad Credit' },
  { href: '/credit-cards/category/credit-builder', label: 'Credit Builder Accounts' },
];

/** Learn: education links for dropdowns/drawer. */
export const LEARN_LINKS: NavLink[] = [
  { href: '/education', label: 'Education Center' },
  { href: '/education/how-credit-scores-work', label: 'How Credit Scores Work' },
  { href: '/how-we-rank-cards', label: 'How We Rank Cards' },
];

/** About: compact desktop dropdown. */
export const ABOUT_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/advertiser-disclosure', label: 'Advertiser Disclosure' },
  { href: '/editorial-disclaimer', label: 'Editorial Disclaimer' },
];

/** Company: full compliance list for mobile drawer. */
export const COMPANY_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/advertiser-disclosure', label: 'Advertiser Disclosure' },
  { href: '/editorial-disclaimer', label: 'Editorial Disclaimer' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/accessibility-statement', label: 'Accessibility Statement' },
  { href: '/state-privacy-law-notice', label: 'State Privacy Law Notice' },
  { href: '/your-privacy-choices', label: 'Your Privacy Choices' },
];

export const MOBILE_NAV_SECTIONS: NavSection[] = [
  {
    title: 'Build Credit',
    href: BUILD_CREDIT_HREF,
    links: BUILD_CREDIT_LINKS,
  },
  {
    title: 'Learn',
    links: LEARN_LINKS,
  },
  {
    title: 'Company',
    links: COMPANY_LINKS,
  },
];
