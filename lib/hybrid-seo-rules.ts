/**
 * Hybrid SEO V4 + Affiliate Throttling Engine
 * Machine-enforced rules from config/rules.config.json
 */

import rulesConfig from '@/config/rules.config.json';

export type PageTypeAllowed =
  | 'bad_credit'
  | 'no_credit'
  | 'secured'
  | 'guaranteed_approval'
  | 'credit_score'
  | 'state'
  | 'situation';

export const HYBRID_SEO = {
  intentScoreFormula: rulesConfig.hybrid_seo_v4.intent_score_formula,
  indexThreshold: rulesConfig.hybrid_seo_v4.index_threshold,
  noindexBelow: rulesConfig.hybrid_seo_v4.noindex_below,
  archiveDaysNoClicks: rulesConfig.hybrid_seo_v4.archive_days_no_clicks,
} as const;

export const PAGE_TIERS = rulesConfig.page_tiers;

export const AFFILIATE_THROTTLING = {
  epcFloor: rulesConfig.affiliate_throttling.epc_floor,
  issuerCapPercentPerDay: rulesConfig.affiliate_throttling.issuer_cap_percent_per_day,
  spikeDetection: rulesConfig.affiliate_throttling.spike_detection,
} as const;

const autoDemotion = (rulesConfig as Record<string, unknown>).auto_demotion as Record<string, number> | undefined;
const issuerPromotion = (rulesConfig as Record<string, unknown>).issuer_promotion as Record<string, number> | undefined;
const sitemapControl = (rulesConfig as Record<string, unknown>).sitemap_control as Record<string, unknown> | undefined;
export const AUTO_DEMOTION = {
  epcDropPercent: autoDemotion?.epc_drop_percent ?? 30,
  approvalRateFloor: autoDemotion?.approval_rate_floor ?? 0.25,
  evaluationWindowDays: autoDemotion?.evaluation_window_days ?? 3,
  recoveryWindowDays: autoDemotion?.recovery_window_days ?? 5,
} as const;

export const ISSUER_PROMOTION = {
  promotionEpcMultiplier: issuerPromotion?.promotion_epc_multiplier ?? 1.25,
  minClicks: issuerPromotion?.min_clicks ?? 50,
  minApprovalRate: issuerPromotion?.min_approval_rate ?? 0.35,
  evaluationDays: issuerPromotion?.evaluation_days ?? 3,
  maxTierAIssuers: issuerPromotion?.max_tier_a_issuers ?? 3,
} as const;

const priorityMap = (sitemapControl?.priority_map ?? { tier_a: 1, tier_b: 0.6, demoted: 0.1 }) as Record<string, number>;
const changefreqMap = (sitemapControl?.changefreq_map ?? { tier_a: 'daily', tier_b: 'weekly', demoted: 'monthly' }) as Record<string, string>;
export const SITEMAP_CONTROL = {
  excludeStatus: ((sitemapControl?.exclude_status as string[]) ?? ['demoted']) as string[],
  priorityMap: { tier_a: priorityMap.tier_a ?? 1, tier_b: priorityMap.tier_b ?? 0.6, demoted: priorityMap.demoted ?? 0.1 },
  changefreqMap: { tier_a: (changefreqMap.tier_a ?? 'daily') as 'daily' | 'weekly' | 'monthly', tier_b: (changefreqMap.tier_b ?? 'weekly') as 'weekly' | 'monthly', demoted: (changefreqMap.demoted ?? 'monthly') as 'monthly' },
} as const;

export const CTA_RULES = rulesConfig.cta_rules;

export const GEO_FILTERING = {
  allowAffiliateCountry: rulesConfig.geo_filtering.allow_affiliate_country as string[],
  nonUsBehavior: rulesConfig.geo_filtering.non_us_behavior,
} as const;

export const PAGE_TYPES_ALLOWED = rulesConfig.page_types_allowed as PageTypeAllowed[];

/** Is this country allowed to see affiliate links? */
export function isAffiliateAllowedCountry(countryCode: string | null): boolean {
  if (!countryCode) return false;
  return GEO_FILTERING.allowAffiliateCountry.includes(countryCode.toUpperCase());
}

/** Should we show affiliate CTAs for this request? Non-US: no. */
export function shouldShowAffiliateLinks(countryCode: string | null): boolean {
  return isAffiliateAllowedCountry(countryCode);
}

/** Header set by middleware. Pages read this to decide whether to show affiliate CTAs. */
export const AFFILIATE_HEADER = 'x-bcf-allow-affiliate';

/** Parse allow-affiliate from request headers (set by middleware). */
export function getAllowAffiliateFromHeaders(headerValue: string | null): boolean {
  return headerValue === '1';
}
