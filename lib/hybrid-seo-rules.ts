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
export const AUTO_DEMOTION = {
  epcDropPercent: autoDemotion?.epc_drop_percent ?? 30,
  approvalRateFloor: autoDemotion?.approval_rate_floor ?? 0.25,
  evaluationWindowDays: autoDemotion?.evaluation_window_days ?? 3,
  recoveryWindowDays: autoDemotion?.recovery_window_days ?? 5,
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
