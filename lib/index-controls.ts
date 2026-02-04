/**
 * Index Controls for Programmatic Expansion
 * Canonical URLs always absolute and inherited.
 * Thin variants automatically set to noindex.
 * Hubs, comparisons, reviews remain indexable.
 */

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

/** Thin variants: noindex. Hubs, comparisons, reviews: indexable. */
export function shouldNoindex(pageType: PageType): boolean {
  return pageType === 'thin_variant' || pageType === 'results';
}

/** Hubs, comparisons, reviews remain indexable. */
export function isIndexable(pageType: PageType): boolean {
  return !shouldNoindex(pageType);
}

/** Get robots meta for page type. */
export function getRobotsForPageType(pageType: PageType): { index: boolean; follow: boolean } {
  if (shouldNoindex(pageType)) {
    return { index: false, follow: true };
  }
  return { index: true, follow: true };
}
