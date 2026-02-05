/**
 * Re-exports from lib/programmatic-rollout.ts for backward compatibility.
 * New code should import from @/lib/programmatic-rollout directly.
 */

export {
  ROLLOUT_CONFIG,
  HARD_CAP,
  SITEMAP_LIMIT_TIERS,
  isProgrammaticPath,
  isPromoted,
  shouldIndex,
  shouldIncludeInSitemap,
  shouldLinkTo,
  getRobotsForProgrammaticPage,
  filterPromotedComparisonLinks,
  filterPromotedReviewLinks,
  filterByPromotedPath,
  filterPromotedCategoryLinks,
  getPromotedPagesForSitemap,
  getIndexableProgrammaticPageCount,
} from './programmatic-rollout';

export type { ProgrammaticPageType, SitemapLimitTier } from './programmatic-rollout';
