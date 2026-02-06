/**
 * Affiliate Metrics Provider
 * Fetches daily aggregates from affiliate_metrics_daily (Impact API exports / webhook → DB).
 * Replace fetchFromDB with actual DB query.
 */

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
  const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
  const row = await fetchFromDB(issuerId, dateStr);

  if (!row || row.clicks === 0) return null;

  return {
    epc: row.epc,
    approvalRate: row.approval_rate,
    clicks: row.clicks,
  };
}

/** Fetch daily click summary for cap checks. Returns { total, byIssuer }. */
export async function getDailyClicksSummary(
  date: Date = new Date()
): Promise<DailyClicksSummary> {
  const dateStr = date.toISOString().slice(0, 10);
  const rows = await fetchDailyAggregatesFromDB(dateStr);

  let total = 0;
  const byIssuer: Record<string, number> = {};
  for (const row of rows) {
    byIssuer[row.issuer_id] = row.clicks;
    total += row.clicks;
  }

  return { total, byIssuer };
}

/** Stub: replace with actual DB query. */
async function fetchFromDB(
  issuerId: string,
  dateStr: string
): Promise<{ epc: number; approval_rate: number; clicks: number } | null> {
  // TODO: SELECT epc, approval_rate, clicks FROM affiliate_metrics_daily
  //       WHERE issuer_id = ? AND date = ?
  return null;
}

/** Stub: replace with actual DB query. */
async function fetchDailyAggregatesFromDB(
  dateStr: string
): Promise<Array<{ issuer_id: string; clicks: number }>> {
  // TODO: SELECT issuer_id, clicks FROM affiliate_metrics_daily WHERE date = ?
  return [];
}
