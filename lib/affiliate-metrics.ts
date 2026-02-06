/**
 * Affiliate Metrics Provider
 * Fetches daily aggregates from affiliate_metrics_daily (Impact webhook + outbound clicks).
 */

import { sql } from '@vercel/postgres';

export type AffiliateMetrics = {
  epc: number;
  approvalRate: number;
  clicks: number;
};

export type DailyClicksSummary = {
  total: number;
  byIssuer: Record<string, number>;
};

/** Fetch metrics for an issuer on a given date. Returns null if no data or clicks = 0. */
export async function getAffiliateMetrics(
  issuerId: string,
  date: Date = new Date()
): Promise<AffiliateMetrics | null> {
  try {
    const dateStr = date.toISOString().slice(0, 10);

    const { rows } = await sql`
      SELECT epc, approval_rate, clicks
      FROM affiliate_metrics_daily
      WHERE issuer_id = ${issuerId}
        AND date = ${dateStr}
      LIMIT 1
    `;

    if (!rows.length || !rows[0] || Number(rows[0].clicks) === 0) return null;

    const row = rows[0];
    return {
      epc: Number(row.epc),
      approvalRate: Number(row.approval_rate),
      clicks: Number(row.clicks),
    };
  } catch (err) {
    console.error('[affiliate-metrics] getAffiliateMetrics failed:', err);
    return null; // fallback: suppress issuer (never guess)
  }
}

/** Fetch daily click summary for cap checks. Returns { total, byIssuer }. */
export async function getDailyClicksSummary(
  date: Date = new Date()
): Promise<DailyClicksSummary> {
  try {
    const dateStr = date.toISOString().slice(0, 10);

    const { rows } = await sql`
      SELECT issuer_id, clicks
      FROM affiliate_metrics_daily
      WHERE date = ${dateStr}
    `;

    let total = 0;
    const byIssuer: Record<string, number> = {};

    for (const row of rows) {
      const issuerId = String(row.issuer_id);
      const clicks = Number(row.clicks);
      byIssuer[issuerId] = clicks;
      total += clicks;
    }

    return { total, byIssuer };
  } catch (err) {
    console.error('[affiliate-metrics] getDailyClicksSummary failed:', err);
    return { total: 0, byIssuer: {} }; // fallback: no caps applied
  }
}
