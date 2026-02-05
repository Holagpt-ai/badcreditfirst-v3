/**
 * Programmatic Rollout Control — Single control layer for index, sitemap, and linking.
 *
 * RULES:
 * 1. Index throttling: Default all programmatic pages to index: false.
 *    Promotion flag (PROMOTED_* sets) switches to index: true.
 * 2. Sitemap: Only include promoted programmatic pages. Staged limits (50/500/5000).
 * 3. Internal links: Do not link to non-promoted programmatic pages.
 * 4. Global kill switch: ROLLOUT_CONFIG.killSwitch disables indexing + sitemap for all programmatic.
 *
 * Programmatic page types: comparison, hub, category, review, results, education
 * Static pages (home, about, terms, etc.) are NOT controlled here.
 *
 * CONFIG (edit below):
 * - ROLLOUT_CONFIG.killSwitch: true = all programmatic noindex, excluded from sitemap
 * - ROLLOUT_CONFIG.sitemapLimitTier: 50 | 500 | 5000 — max promoted pages in sitemap
 * - PROMOTED_*: Add/remove slugs to throttle. Empty = all noindex.
 *
 * No per-page hacks. All control flows through this module.
 */

import { ALL_COMPARISON_SLUGS, COMPARISON_HUB_SLUGS } from '@/data/comparisons';
import { cardData } from '@/lib/card-data';
import { categories } from '@/lib/categories';
import type { ComparisonLink } from '@/data/comparisons';

export type ProgrammaticPageType =
  | 'comparison'
  | 'hub'
  | 'category'
  | 'review'
  | 'results'
  | 'education';

export type SitemapLimitTier = 50 | 500 | 5000;

/** Staged sitemap limits. Only this many promoted programmatic pages in sitemap. */
export const SITEMAP_LIMIT_TIERS = [50, 500, 5000] as const;

/** Global kill switch. When true: no indexing, no sitemap inclusion for programmatic. */
export const ROLLOUT_CONFIG = {
  killSwitch: false,
  sitemapLimitTier: 5000 as SitemapLimitTier,
} as const;

/**
 * Promotion registry. Default = empty (all programmatic noindex).
 * Add slugs to promote. Remove to throttle. Set to full list for full rollout.
 */
const PROMOTED_COMPARISONS = new Set<string>(ALL_COMPARISON_SLUGS);
const PROMOTED_HUBS = new Set<string>(COMPARISON_HUB_SLUGS);
const PROMOTED_CATEGORIES = new Set<string>(Object.keys(categories));
const PROMOTED_REVIEWS = new Set<string>(cardData.map((c) => c.slug));
const PROMOTED_EDUCATION = new Set<string>([
  'what-is-a-good-credit-score',
  'how-credit-scores-work',
  'what-is-a-bad-credit-score',
  'how-is-my-score-calculated',
  'fico-vs-vantagescore',
  'how-long-do-items-stay',
  'removing-collections',
  'hard-inquiries-explained',
  'bankruptcy-and-rebuilding',
  'reading-your-credit-report',
  'how-to-dispute-errors',
  'fair-credit-reporting-act',
  'freezing-your-credit',
  'authorized-user-strategy',
  'secured-vs-unsecured',
  'credit-builder-loans',
  'the-30-percent-utilization-rule',
]);

/** Results pages: never promoted (thin variants). */
const PROMOTED_RESULTS = new Set<string>();

function normalizePath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p.replace(/\/$/, '') || '/';
}

function getPageType(path: string): ProgrammaticPageType | null {
  const p = normalizePath(path);
  if (p.startsWith('/compare/')) {
    const slug = p.replace('/compare/', '');
    return COMPARISON_HUB_SLUGS.includes(slug) ? 'hub' : 'comparison';
  }
  if (p.startsWith('/credit-cards/category/')) {
    return 'category';
  }
  if (p.startsWith('/credit-cards/review/')) {
    return 'review';
  }
  if (p.startsWith('/credit-cards/results/')) {
    return 'results';
  }
  if (p.startsWith('/education/')) {
    return 'education';
  }
  return null;
}

function getSlugFromPath(path: string, pageType: ProgrammaticPageType): string | null {
  const p = normalizePath(path);
  switch (pageType) {
    case 'comparison':
    case 'hub':
      return p.replace('/compare/', '') || null;
    case 'category':
      return p.replace('/credit-cards/category/', '') || null;
    case 'review':
      return p.replace('/credit-cards/review/', '') || null;
    case 'results':
      return p.replace('/credit-cards/results/', '') || null;
    case 'education':
      return p.replace('/education/', '') || null;
    default:
      return null;
  }
}

function isPromotedSlug(pageType: ProgrammaticPageType, slug: string): boolean {
  switch (pageType) {
    case 'comparison':
      return PROMOTED_COMPARISONS.has(slug);
    case 'hub':
      return PROMOTED_HUBS.has(slug);
    case 'category':
      return PROMOTED_CATEGORIES.has(slug);
    case 'review':
      return PROMOTED_REVIEWS.has(slug);
    case 'results':
      return PROMOTED_RESULTS.has(slug);
    case 'education':
      return PROMOTED_EDUCATION.has(slug);
    default:
      return false;
  }
}

/**
 * Is this path a programmatic page?
 */
export function isProgrammaticPath(path: string): boolean {
  return getPageType(path) !== null;
}

/**
 * Is this programmatic page promoted? (index + sitemap + linkable)
 * Non-programmatic paths return true (e.g. /about is always "promoted").
 */
export function isPromoted(path: string): boolean {
  if (ROLLOUT_CONFIG.killSwitch) return false;
  const pageType = getPageType(path);
  if (!pageType) return true;
  const slug = getSlugFromPath(path, pageType);
  return slug !== null && isPromotedSlug(pageType, slug);
}

/**
 * Should this page be indexed? Default programmatic = false. Promoted = true.
 * Kill switch overrides: all programmatic = false.
 */
export function shouldIndex(path: string): boolean {
  const pageType = getPageType(path);
  if (!pageType) return true;
  return isPromoted(path);
}

/**
 * Should this page be in the sitemap? Only promoted programmatic pages.
 * Kill switch: exclude all programmatic.
 */
export function shouldIncludeInSitemap(path: string): boolean {
  const pageType = getPageType(path);
  if (!pageType) return true;
  return isPromoted(path);
}

/**
 * Should we link to this path from internal links? Do not link to non-promoted programmatic.
 */
export function shouldLinkTo(path: string): boolean {
  const pageType = getPageType(path);
  if (!pageType) return true;
  return isPromoted(path);
}

/**
 * Get robots meta for a programmatic page.
 */
export function getRobotsForProgrammaticPage(path: string): { index: boolean; follow: boolean } {
  if (shouldIndex(path)) {
    return { index: true, follow: true };
  }
  return { index: false, follow: true };
}

/**
 * Filter comparison links to only promoted pages.
 */
export function filterPromotedComparisonLinks<T extends { slug: string }>(links: T[]): T[] {
  return links.filter((l) => shouldLinkTo(`/compare/${l.slug}`));
}

/**
 * Filter review links to only promoted pages.
 */
export function filterPromotedReviewLinks<T extends { href: string }>(links: T[]): T[] {
  return links.filter((l) => shouldLinkTo(l.href));
}

/**
 * Filter items by path. Use when items have a path/slug that maps to a URL.
 */
export function filterByPromotedPath<T>(items: T[], getPath: (item: T) => string): T[] {
  return items.filter((item) => shouldLinkTo(getPath(item)));
}

/**
 * Filter category links to only promoted pages.
 */
export function filterPromotedCategoryLinks<T extends { slug: string }>(links: T[]): T[] {
  return links.filter((l) => shouldLinkTo(`/credit-cards/category/${l.slug}`));
}

/**
 * Get promoted programmatic pages for sitemap, respecting the limit tier.
 */
export function getPromotedPagesForSitemap(): Array<{ path: string; pageType: ProgrammaticPageType }> {
  const limit = ROLLOUT_CONFIG.sitemapLimitTier;
  const out: Array<{ path: string; pageType: ProgrammaticPageType }> = [];

  const add = (path: string, pageType: ProgrammaticPageType) => {
    if (shouldIncludeInSitemap(path) && out.length < limit) {
      out.push({ path, pageType });
    }
  };

  for (const slug of COMPARISON_HUB_SLUGS) {
    add(`/compare/${slug}`, 'hub');
  }
  for (const slug of ALL_COMPARISON_SLUGS) {
    add(`/compare/${slug}`, 'comparison');
  }
  for (const slug of Object.keys(categories)) {
    add(`/credit-cards/category/${slug}`, 'category');
  }
  for (const card of cardData) {
    add(card.reviewUrl, 'review');
  }
  for (const slug of Array.from(PROMOTED_EDUCATION)) {
    add(`/education/${slug}`, 'education');
  }

  return out.slice(0, limit);
}
