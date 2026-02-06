/**
 * Programmatic Rollout Control — Index throttling, sitemap gating, internal link gating.
 *
 * RULES:
 * 1. Index throttling: Default all programmatic pages to index: false.
 *    Promotion registry switches to index: true.
 * 2. Sitemap: Only include promoted programmatic pages. Staged limits (50/500/5000).
 *    Hard cap at HARD_CAP (1,000) always enforced.
 * 3. Internal links: Do not link to non-promoted programmatic pages.
 * 4. Kill switch: Disables indexing + sitemap for all programmatic.
 *
 * Programmatic page types: comparison, hub, category, review, results, education
 * Static pages are NOT controlled here.
 */

import { HARD_CAP, ROLLOUT_CONFIG } from './rollout-config';
import { ALL_COMPARISON_SLUGS, COMPARISON_HUB_SLUGS } from '@/data/comparisons';
import { cardData } from '@/lib/card-data';
import { categories } from '@/lib/categories';
import { getDemotedPageSlugs, isPageDemoted } from './page-health';

export type ProgrammaticPageType =
  | 'comparison'
  | 'hub'
  | 'category'
  | 'review'
  | 'results'
  | 'education';

export { ROLLOUT_CONFIG, HARD_CAP, SITEMAP_LIMIT_TIERS } from './rollout-config';
export type { SitemapLimitTier } from './rollout-config';

/**
 * Promotion registry. Add slugs to promote. Remove to throttle.
 * Default = full list (all promoted). Empty = all noindex.
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

/** Is this path a programmatic page? */
export function isProgrammaticPath(path: string): boolean {
  return getPageType(path) !== null;
}

/** Is this programmatic page promoted? Non-programmatic paths return true. */
export function isPromoted(path: string): boolean {
  if (ROLLOUT_CONFIG.killSwitch) return false;
  const pageType = getPageType(path);
  if (!pageType) return true;
  const slug = getSlugFromPath(path, pageType);
  return slug !== null && isPromotedSlug(pageType, slug);
}

/** Should this page be indexed? Default programmatic = false. Promoted = true. */
export function shouldIndex(path: string): boolean {
  const pageType = getPageType(path);
  if (!pageType) return true;
  return isPromoted(path);
}

/** Should this page be in the sitemap? Only promoted programmatic pages. */
export function shouldIncludeInSitemap(path: string): boolean {
  const pageType = getPageType(path);
  if (!pageType) return true;
  return isPromoted(path);
}

/** Should we link to this path from internal links? Excludes demoted when demotedSlugs provided. */
export function shouldLinkTo(path: string, demotedSlugs?: Set<string>): boolean {
  const pageType = getPageType(path);
  if (!pageType) return true;
  if (!isPromoted(path)) return false;
  if (demotedSlugs?.size) {
    const slug = getSlugFromPath(path, pageType);
    if (slug && demotedSlugs.has(slug)) return false;
  }
  return true;
}

/** Get robots meta for a programmatic page. */
export function getRobotsForProgrammaticPage(path: string): { index: boolean; follow: boolean } {
  if (shouldIndex(path)) {
    return { index: true, follow: true };
  }
  return { index: false, follow: true };
}

/** Get robots meta with auto-demotion check. Use for review/comparison pages. */
export async function getRobotsForProgrammaticPageAsync(path: string): Promise<{ index: boolean; follow: boolean }> {
  if (!shouldIndex(path)) return { index: false, follow: true };
  const demoted = await isPageDemoted(path);
  if (demoted) return { index: false, follow: true };
  return { index: true, follow: true };
}

/** Filter comparison links to only promoted (and non-demoted) pages. */
export function filterPromotedComparisonLinks<T extends { slug: string }>(links: T[], demotedSlugs?: Set<string>): T[] {
  return links.filter((l) => shouldLinkTo(`/compare/${l.slug}`, demotedSlugs));
}

/** Filter review links to only promoted (and non-demoted) pages. */
export function filterPromotedReviewLinks<T extends { href: string }>(links: T[], demotedSlugs?: Set<string>): T[] {
  return links.filter((l) => shouldLinkTo(l.href, demotedSlugs));
}

/** Filter items by path. Use when items have a path/slug that maps to a URL. */
export function filterByPromotedPath<T>(items: T[], getPath: (item: T) => string, demotedSlugs?: Set<string>): T[] {
  return items.filter((item) => shouldLinkTo(getPath(item), demotedSlugs));
}

/** Filter category links to only promoted pages. */
export function filterPromotedCategoryLinks<T extends { slug: string }>(links: T[], demotedSlugs?: Set<string>): T[] {
  return links.filter((l) => shouldLinkTo(`/credit-cards/category/${l.slug}`, demotedSlugs));
}

/** Effective sitemap limit = min(sitemapLimitTier, HARD_CAP). */
function getEffectiveSitemapLimit(): number {
  return Math.min(ROLLOUT_CONFIG.sitemapLimitTier, HARD_CAP);
}

/**
 * Get promoted programmatic pages for sitemap.
 * Respects staged limit tier and hard cap at 1,000.
 */
export function getPromotedPagesForSitemap(): Array<{ path: string; pageType: ProgrammaticPageType }> {
  const limit = getEffectiveSitemapLimit();
  const out: Array<{ path: string; pageType: ProgrammaticPageType }> = [];

  const add = (path: string, pageType: ProgrammaticPageType, demotedSlugs?: Set<string>) => {
    if (!shouldIncludeInSitemap(path) || out.length >= limit) return;
    if (demotedSlugs?.size) {
      const slug = getSlugFromPath(path, pageType);
      if (slug && demotedSlugs.has(slug)) return;
    }
    out.push({ path, pageType });
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

/**
 * Get promoted programmatic pages for sitemap, excluding demoted.
 * Use for dynamic sitemap generation.
 */
export async function getPromotedPagesForSitemapAsync(): Promise<Array<{ path: string; pageType: ProgrammaticPageType }>> {
  const demotedSlugs = await getDemotedPageSlugs();
  const limit = getEffectiveSitemapLimit();
  const out: Array<{ path: string; pageType: ProgrammaticPageType }> = [];

  const add = (path: string, pageType: ProgrammaticPageType) => {
    if (!shouldIncludeInSitemap(path) || out.length >= limit) return;
    if (demotedSlugs.size) {
      const slug = getSlugFromPath(path, pageType);
      if (slug && demotedSlugs.has(slug)) return;
    }
    out.push({ path, pageType });
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

/**
 * All indexable programmatic paths (promoted, not results).
 * Used by internal link audit. Respects kill switch.
 */
export function getIndexableProgrammaticPaths(): string[] {
  if (ROLLOUT_CONFIG.killSwitch) return [];
  const paths: string[] = [];
  for (const slug of COMPARISON_HUB_SLUGS) {
    if (PROMOTED_HUBS.has(slug)) paths.push(`/compare/${slug}`);
  }
  for (const slug of ALL_COMPARISON_SLUGS) {
    if (PROMOTED_COMPARISONS.has(slug)) paths.push(`/compare/${slug}`);
  }
  for (const slug of Object.keys(categories)) {
    if (PROMOTED_CATEGORIES.has(slug)) paths.push(`/credit-cards/category/${slug}`);
  }
  for (const card of cardData) {
    const slug = card.reviewUrl.replace('/credit-cards/review/', '');
    if (PROMOTED_REVIEWS.has(slug)) paths.push(card.reviewUrl);
  }
  for (const slug of Array.from(PROMOTED_EDUCATION)) {
    paths.push(`/education/${slug}`);
  }
  return paths;
}

/**
 * Count of all indexable programmatic pages (promoted, not results).
 * Used by build-time validation to enforce HARD_CAP.
 */
export function getIndexableProgrammaticPageCount(): number {
  if (ROLLOUT_CONFIG.killSwitch) return 0;
  let count = 0;
  for (const slug of COMPARISON_HUB_SLUGS) {
    if (PROMOTED_HUBS.has(slug)) count++;
  }
  for (const slug of ALL_COMPARISON_SLUGS) {
    if (PROMOTED_COMPARISONS.has(slug)) count++;
  }
  for (const slug of Object.keys(categories)) {
    if (PROMOTED_CATEGORIES.has(slug)) count++;
  }
  for (const card of cardData) {
    const slug = card.reviewUrl.replace('/credit-cards/review/', '');
    if (PROMOTED_REVIEWS.has(slug)) count++;
  }
  for (const slug of Array.from(PROMOTED_EDUCATION)) {
    count++;
  }
  return count;
}
