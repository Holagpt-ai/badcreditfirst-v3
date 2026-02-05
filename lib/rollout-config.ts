/**
 * Central Rollout Configuration — Single source of truth for phased crawl/index control.
 *
 * Controls:
 * - killSwitch: Emergency toggle — when true, all programmatic pages noindex and excluded from sitemap.
 * - sitemapLimitTier: Phase-based limit (50 | 500 | 5000) for staged rollout.
 * - HARD_CAP: Absolute maximum indexable programmatic pages (1,000). Always enforced.
 *
 * Effective sitemap limit = min(sitemapLimitTier, HARD_CAP).
 */

export type SitemapLimitTier = 50 | 500 | 5000;

/** Staged sitemap limits for phased rollout. */
export const SITEMAP_LIMIT_TIERS = [50, 500, 5000] as const;

/** Absolute maximum indexable programmatic pages. Build fails if exceeded. */
export const HARD_CAP = 1000;

/** Central rollout configuration. Edit here to control indexing and sitemap. */
export const ROLLOUT_CONFIG = {
  /** Emergency kill switch. When true: all programmatic noindex, excluded from sitemap. */
  killSwitch: false,
  /** Phase-based sitemap limit. Effective limit = min(sitemapLimitTier, HARD_CAP). */
  sitemapLimitTier: 5000 as SitemapLimitTier,
} as const;
