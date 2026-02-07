/**
 * Outbound redirect: increments affiliate_metrics_daily.clicks, then redirects to destination.
 * Used for Apply CTAs so we track clicks for EPC and issuer caps.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasPostgres } from '@/lib/db-safe';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const issuerId = searchParams.get('issuer');
  const to = searchParams.get('to');

  if (!issuerId || !to) {
    return NextResponse.json({ error: 'missing issuer or to' }, { status: 400 });
  }

  const destination = decodeURIComponent(to);
  if (!destination.startsWith('http://') && !destination.startsWith('https://')) {
    return NextResponse.json({ error: 'invalid destination' }, { status: 400 });
  }

  if (hasPostgres()) {
    try {
      await sql`
      INSERT INTO affiliate_metrics_daily (issuer_id, date, clicks)
      VALUES (${issuerId}, CURRENT_DATE, 1)
      ON CONFLICT (issuer_id, date)
      DO UPDATE SET
        clicks = affiliate_metrics_daily.clicks + 1
    `;
    } catch (err) {
      console.error('[outbound] click increment failed:', err);
      // Still redirect - don't block user
    }
  }

  return NextResponse.redirect(destination, 302);
}
