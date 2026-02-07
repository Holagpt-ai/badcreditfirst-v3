/**
 * Daily issuer promotion cron.
 * Evaluates issuers, updates issuer_performance (Tier A/B).
 * Tier A cap enforced. Fallback to B if none qualify.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasPostgres } from '@/lib/db-safe';
import { qualifiesForTierA } from '@/lib/issuer-promotion';
import { getAffiliateMetricsRolling } from '@/lib/affiliate-metrics';
import { cardData } from '@/lib/card-data';
import { ISSUER_PROMOTION } from '@/lib/hybrid-seo-rules';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!hasPostgres()) {
    return NextResponse.json({ ok: true, skipped: true, message: 'No database configured' });
  }

  try {
    const today = new Date();
    const windowDays = ISSUER_PROMOTION.evaluationDays;

    const issuersWithMetrics: Array<{
      id: string;
      metrics: { epc: number; approvalRate: number; clicks: number };
    }> = [];

    for (const card of cardData) {
      const metrics = await getAffiliateMetricsRolling(card.slug, windowDays, today);
      if (!metrics || metrics.clicks === 0) continue;
      issuersWithMetrics.push({ id: card.slug, metrics });
    }

    if (issuersWithMetrics.length === 0) {
      return NextResponse.json({ ok: true, evaluated: 0, message: 'No issuer metrics' });
    }

    const baselineEpc =
      issuersWithMetrics.reduce((sum, i) => sum + i.metrics.epc, 0) / issuersWithMetrics.length;
    if (baselineEpc <= 0) {
      return NextResponse.json({ ok: true, evaluated: 0, message: 'No baseline EPC' });
    }

    const qualifying = issuersWithMetrics
      .filter((i) => qualifiesForTierA(i.metrics, baselineEpc))
      .sort((a, b) => b.metrics.epc - a.metrics.epc);
    const tierACount = Math.min(qualifying.length, ISSUER_PROMOTION.maxTierAIssuers);
    const tierASet = new Set(qualifying.slice(0, tierACount).map((i) => i.id));

    let tierChanges = 0;
    for (const issuer of issuersWithMetrics) {
      const promote = tierASet.has(issuer.id);
      const newTier = promote ? 'A' : 'B';

      const { rows } = await sql`
        SELECT tier FROM issuer_performance WHERE issuer_id = ${issuer.id} LIMIT 1
      `;
      const oldTier = rows[0]?.tier as string | undefined;
      if (oldTier !== newTier) tierChanges++;

      await sql`
        INSERT INTO issuer_performance (issuer_id, avg_epc, avg_approval_rate, total_clicks, tier, last_evaluated)
        VALUES (${issuer.id}, ${issuer.metrics.epc}, ${issuer.metrics.approvalRate}, ${issuer.metrics.clicks}, ${newTier}, ${today.toISOString().slice(0, 10)})
        ON CONFLICT (issuer_id)
        DO UPDATE SET
          avg_epc = EXCLUDED.avg_epc,
          avg_approval_rate = EXCLUDED.avg_approval_rate,
          total_clicks = EXCLUDED.total_clicks,
          tier = EXCLUDED.tier,
          last_evaluated = EXCLUDED.last_evaluated
      `;
    }

    if (tierChanges > 0) {
      console.log(`[issuer-promotion] ${tierChanges} tier changes, baselineEpc=${baselineEpc.toFixed(4)}`);
    }

    return NextResponse.json({
      ok: true,
      evaluated: issuersWithMetrics.length,
      tierA: tierACount,
      tierChanges,
    });
  } catch (err) {
    console.error('[cron/issuer-promotion]', err);
    return NextResponse.json({ error: 'Promotion failed' }, { status: 500 });
  }
}
