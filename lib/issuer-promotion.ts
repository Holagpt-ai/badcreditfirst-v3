/**
 * Issuer Promotion Engine — Tier A/B based on EPC and approval quality.
 * Powers dynamic comparison re-ranking. Cron updates issuer_performance daily.
 */

import { sql } from '@vercel/postgres';
import { hasPostgres } from './db-safe';
import type { AffiliateMetrics } from './affiliate-metrics';
import { ISSUER_PROMOTION } from './hybrid-seo-rules';

export type IssuerTier = 'A' | 'B';

/** Does this issuer qualify for Tier A? */
export function qualifiesForTierA(metrics: AffiliateMetrics, baselineEpc: number): boolean {
  if (metrics.clicks < ISSUER_PROMOTION.minClicks) return false;
  if (metrics.approvalRate < ISSUER_PROMOTION.minApprovalRate) return false;
  return metrics.epc >= baselineEpc * ISSUER_PROMOTION.promotionEpcMultiplier;
}

/** Get tier for a single issuer. Returns 'B' if no data. */
export async function getIssuerTier(issuerId: string): Promise<IssuerTier> {
  if (!hasPostgres()) return 'B';
  try {
    const { rows } = await sql`
      SELECT tier FROM issuer_performance WHERE issuer_id = ${issuerId} LIMIT 1
    `;
    const tier = rows[0]?.tier as string | undefined;
    return tier === 'A' ? 'A' : 'B';
  } catch (err) {
    console.error('[issuer-promotion] getIssuerTier failed:', err);
    return 'B';
  }
}

/** Get tier + EPC for all issuers. Use for batch sort. */
export async function getIssuerTiersAndEpc(): Promise<Map<string, { tier: IssuerTier; epc: number }>> {
  if (!hasPostgres()) return new Map();
  try {
    const { rows } = await sql`
      SELECT issuer_id, tier, avg_epc FROM issuer_performance
    `;
    const map = new Map<string, { tier: IssuerTier; epc: number }>();
    for (const row of rows) {
      const id = String(row.issuer_id);
      const tier = row.tier === 'A' ? 'A' : 'B';
      const epc = Number(row.avg_epc ?? 0);
      map.set(id, { tier, epc });
    }
    return map;
  } catch (err) {
    console.error('[issuer-promotion] getIssuerTiersAndEpc failed:', err);
    return new Map();
  }
}

/**
 * Sort cards by Tier A first, then EPC desc, then editorialScore as fallback.
 * Never removes—only reorders.
 */
export function sortByTierAndEpc<T extends { slug: string; editorialScore?: number }>(
  cards: T[],
  tiers: Map<string, { tier: IssuerTier; epc: number }>
): T[] {
  return [...cards].sort((a, b) => {
    const aData = tiers.get(a.slug) ?? { tier: 'B' as IssuerTier, epc: 0 };
    const bData = tiers.get(b.slug) ?? { tier: 'B' as IssuerTier, epc: 0 };
    if (aData.tier !== bData.tier) {
      return aData.tier === 'A' ? -1 : 1;
    }
    if (aData.epc !== bData.epc) {
      return bData.epc - aData.epc;
    }
    return (b.editorialScore ?? 0) - (a.editorialScore ?? 0);
  });
}

/** Sort items with slug only (e.g. top reviews). Tier A first, then EPC desc. */
export function sortByTierAndEpcSlugOnly<T extends { slug: string }>(
  items: T[],
  tiers: Map<string, { tier: IssuerTier; epc: number }>
): T[] {
  return [...items].sort((a, b) => {
    const aData = tiers.get(a.slug) ?? { tier: 'B' as IssuerTier, epc: 0 };
    const bData = tiers.get(b.slug) ?? { tier: 'B' as IssuerTier, epc: 0 };
    if (aData.tier !== bData.tier) {
      return aData.tier === 'A' ? -1 : 1;
    }
    return bData.epc - aData.epc;
  });
}
