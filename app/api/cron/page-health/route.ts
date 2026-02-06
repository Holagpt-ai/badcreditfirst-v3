/**
 * Daily page health evaluation cron.
 * Re-evaluates review and comparison pages, updates affiliate_page_health.
 * Configure in vercel.json: "crons": [{ "path": "/api/cron/page-health", "schedule": "0 6 * * *" }]
 */

import { NextRequest, NextResponse } from 'next/server';
import { evaluatePageHealth, upsertPageHealth } from '@/lib/page-health';
import { getActiveCardSlugForComparison } from '@/data/comparisons';
import { getIssuerTiersAndEpc } from '@/lib/issuer-promotion';
import { sql } from '@vercel/postgres';
import { ALL_COMPARISON_SLUGS } from '@/data/comparisons';
import { cardData } from '@/lib/card-data';
import { getAffiliateMetricsRolling } from '@/lib/affiliate-metrics';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let evaluated = 0;
    const today = new Date();
    const tiers = await getIssuerTiersAndEpc();

    // Review pages
    for (const card of cardData) {
      const issuerId = card.slug;
      const pageSlug = card.slug;

      const { rows } = await sql`
        SELECT baseline_epc FROM affiliate_page_health WHERE page_slug = ${pageSlug} LIMIT 1
      `;
      const baselineEpc = rows[0]?.baseline_epc != null ? Number(rows[0].baseline_epc) : null;

      const status = await evaluatePageHealth(pageSlug, issuerId, baselineEpc);
      const metrics = await getAffiliateMetricsRolling(issuerId, 3, today);

      await upsertPageHealth(pageSlug, issuerId, status, metrics?.epc ?? null);
      evaluated++;
    }

    // Comparison pages
    for (const compSlug of ALL_COMPARISON_SLUGS) {
      const issuerId = getActiveCardSlugForComparison(compSlug, tiers);
      if (!issuerId) continue;

      const pageSlug = compSlug;

      const { rows } = await sql`
        SELECT baseline_epc FROM affiliate_page_health WHERE page_slug = ${pageSlug} LIMIT 1
      `;
      const baselineEpc = rows[0]?.baseline_epc != null ? Number(rows[0].baseline_epc) : null;

      const status = await evaluatePageHealth(pageSlug, issuerId, baselineEpc);
      const metrics = await getAffiliateMetricsRolling(issuerId, 3, today);

      await upsertPageHealth(pageSlug, issuerId, status, metrics?.epc ?? null);
      evaluated++;
    }

    return NextResponse.json({ ok: true, evaluated });
  } catch (err) {
    console.error('[cron/page-health]', err);
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
