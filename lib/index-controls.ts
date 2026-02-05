/**
 * Index Controls for Programmatic Expansion
 * Canonical URLs always absolute and inherited.
 *
 * Index/robots decisions delegated to lib/programmatic-rollout.ts (single control layer).
 * Use getRobotsForProgrammaticPage(path) for programmatic pages.
 */

import { getRobotsForProgrammaticPage, shouldIndex } from './programmatic-rollout';

const DEFAULT_BASE_URL = 'https://badcreditfirst.com';

/** Page types for index decision. */
export type PageType = 'hub' | 'comparison' | 'review' | 'category' | 'education' | 'thin_variant' | 'results';

/** Get absolute canonical URL. Never relative. */
export function getCanonicalUrl(path: string, baseUrl: string = DEFAULT_BASE_URL): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = baseUrl.replace(/\/$/, '');
  return `${base}${normalized}`;
}

/** Inherit canonical from parent (e.g. thin variant → parent hub). */
export function inheritCanonical(parentPath: string, baseUrl: string = DEFAULT_BASE_URL): string {
  return getCanonicalUrl(parentPath, baseUrl);
}

/** Thin variants (results): always noindex. */
export function shouldNoindex(pageType: PageType): boolean {
  return pageType === 'thin_variant' || pageType === 'results';
}

/** Indexability: thin_variant/results always noindex. Others use rollout control. */
export function isIndexable(pageType: PageType, path?: string): boolean {
  if (shouldNoindex(pageType)) return false;
  if (path) return shouldIndex(path);
  return true;
}

/** Get robots meta. For programmatic pages, use path and rollout control. */
export function getRobotsForPageType(
  pageType: PageType,
  path?: string
): { index: boolean; follow: boolean } {
  if (shouldNoindex(pageType)) {
    return { index: false, follow: true };
  }
  if (path) {
    return getRobotsForProgrammaticPage(path);
  }
  return { index: true, follow: true };
}
