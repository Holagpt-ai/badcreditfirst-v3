/**
 * Affiliate Throttling Engine
 * EPC floor, approval rate, issuer caps. Powered by affiliate_metrics_daily.
 */

import { AFFILIATE_THROTTLING } from './hybrid-seo-rules';
import { getAffiliateMetrics, getDailyClicksSummary } from './affiliate-metrics';

const { epcFloor, issuerCapPercentPerDay } = AFFILIATE_THROTTLING;

/** Check if issuer EPC meets floor. Below floor → suppress. */
export function meetsEpcFloor(epc: number): boolean {
  return epc >= epcFloor;
}

/** Check if issuer is within daily cap (percent of total volume). */
export function isWithinIssuerCap(
  issuerClicksToday: number,
  totalClicksToday: number
): boolean {
  if (totalClicksToday === 0) return true;
  const cap = issuerCapPercentPerDay / 100;
  return issuerClicksToday / totalClicksToday <= cap;
}

/**
 * Should we suppress this issuer?
 * - No metrics → suppress (never guess, never rotate blindly)
 * - EPC below floor → suppress
 * - Approval rate < 0.25 → suppress
 * - Over daily cap → suppress
 */
export async function shouldSuppressIssuer(issuerId: string): Promise<boolean> {
  const metrics = await getAffiliateMetrics(issuerId);

  if (!metrics) return true;

  if (metrics.epc < epcFloor) return true;
  if (metrics.approvalRate < 0.25) return true;

  const { total, byIssuer } = await getDailyClicksSummary();
  const issuerClicks = byIssuer[issuerId] ?? 0;
  if (!isWithinIssuerCap(issuerClicks, total)) return true;

  return false;
}
