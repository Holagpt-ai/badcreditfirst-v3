/**
 * Impact webhook endpoint.
 * Receives action.conversion events, increments affiliate_metrics_daily.
 * Security: Add Impact IP allowlist or validate signature header before linking.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasPostgres } from '@/lib/db-safe';

// TODO: Validate Impact signature or IP allowlist before going live
// if (!validateImpactSignature(req)) return NextResponse.json({ ok: false }, { status: 401 });

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const { event_type, occurred_at, data } = payload;
    const issuerId = data?.sub_id1 ?? data?.campaign_id;
    const payout = Number(data?.payout ?? 0);

    if (!issuerId || typeof issuerId !== 'string') {
      return NextResponse.json({ ok: false, error: 'missing issuer_id (sub_id1)' }, { status: 400 });
    }

    const date = new Date(occurred_at || Date.now()).toISOString().slice(0, 10);

    if (hasPostgres() && event_type === 'action.conversion' && data?.status === 'APPROVED') {
      await sql`
        INSERT INTO affiliate_metrics_daily (issuer_id, date, conversions, revenue)
        VALUES (${issuerId}, ${date}, 1, ${payout})
        ON CONFLICT (issuer_id, date)
        DO UPDATE SET
          conversions = affiliate_metrics_daily.conversions + 1,
          revenue = affiliate_metrics_daily.revenue + ${payout}
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[impact-webhook]', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
