/**
 * Page Health Evaluator — Auto demotion + noindex on EPC collapse.
 * Uses affiliate_page_health table. Cron updates status daily.
 */

import { sql } from '@vercel/postgres';
import { hasPostgres } from './db-safe';
import { getAffiliateMetricsRolling } from './affiliate-metrics';
import { AUTO_DEMOTION } from './hybrid-seo-rules';

export type PageHealthStatus = 'healthy' | 'demoted';

export interface PageHealthRow {
  page_slug: string;
  issuer_id: string;
  baseline_epc: number | null;
  last_epc: number | null;
  last_checked: string | null;
  status: PageHealthStatus;
  recovery_days: number;
}

/** Evaluate current metrics vs rules. Returns 'demoted' if EPC drop ≥ threshold or approval < floor. */
export async function evaluatePageHealth(
  pageSlug: string,
  issuerId: string,
  baselineEpc: number | null
): Promise<PageHealthStatus> {
  if (!hasPostgres()) return 'demoted';
  const windowDays = AUTO_DEMOTION.evaluationWindowDays;
  const metrics = await getAffiliateMetricsRolling(issuerId, windowDays);

  if (!metrics || metrics.clicks === 0) {
    return 'demoted'; // no data → suppress (never guess)
  }

  if (metrics.approvalRate < AUTO_DEMOTION.approvalRateFloor) {
    return 'demoted';
  }

  if (baselineEpc != null && baselineEpc > 0) {
    const epcDrop = (baselineEpc - metrics.epc) / baselineEpc;
    if (epcDrop >= AUTO_DEMOTION.epcDropPercent / 100) {
      return 'demoted';
    }
  }

  return 'healthy';
}

/** Is this page currently demoted? Reads from affiliate_page_health. */
export async function isPageDemoted(path: string): Promise<boolean> {
  if (!hasPostgres()) return false;
  try {
    const slug = getPageSlugFromPath(path);
    if (!slug) return false;

    const { rows } = await sql`
      SELECT status
      FROM affiliate_page_health
      WHERE page_slug = ${slug}
      LIMIT 1
    `;

    if (!rows.length) return false;
    return (rows[0].status as string) === 'demoted';
  } catch (err) {
    console.error('[page-health] isPageDemoted failed:', err);
    return false; // fallback: don't demote on error
  }
}

/** Extract page slug from path for affiliate_page_health lookup. */
function getPageSlugFromPath(path: string): string | null {
  const p = path.startsWith('/') ? path : `/${path}`;
  const normalized = p.replace(/\/$/, '') || '/';

  if (normalized.startsWith('/credit-cards/review/')) {
    return normalized.replace('/credit-cards/review/', '') || null;
  }
  if (normalized.startsWith('/compare/')) {
    return normalized.replace('/compare/', '') || null;
  }

  return null;
}

/** Update or insert page health row. Called by cron. */
export async function upsertPageHealth(
  pageSlug: string,
  issuerId: string,
  newStatus: PageHealthStatus,
  lastEpc: number | null
): Promise<void> {
  if (!hasPostgres()) return;
  const today = new Date().toISOString().slice(0, 10);

  const { rows: existing } = await sql`
    SELECT status, baseline_epc, recovery_days
    FROM affiliate_page_health
    WHERE page_slug = ${pageSlug}
    LIMIT 1
  `;

  const current = existing[0];
  let status: PageHealthStatus = newStatus;
  let recoveryDays = 0;
  let baselineEpc: number | null = current?.baseline_epc != null ? Number(current.baseline_epc) : lastEpc;

  if (newStatus === 'demoted') {
    recoveryDays = 0;
  } else {
    // newStatus is healthy
    if (current?.status === 'demoted') {
      const prevRecovery = Number(current.recovery_days ?? 0);
      recoveryDays = prevRecovery + 1;
      if (recoveryDays >= AUTO_DEMOTION.recoveryWindowDays) {
        status = 'healthy';
        recoveryDays = 0;
        if (lastEpc != null) baselineEpc = lastEpc;
      } else {
        status = 'demoted'; // still in recovery
      }
    } else {
      if (lastEpc != null && baselineEpc == null) baselineEpc = lastEpc;
    }
  }

  await sql`
    INSERT INTO affiliate_page_health (page_slug, issuer_id, baseline_epc, last_epc, last_checked, status, recovery_days)
    VALUES (${pageSlug}, ${issuerId}, ${baselineEpc}, ${lastEpc}, ${today}, ${status}, ${recoveryDays})
    ON CONFLICT (page_slug)
    DO UPDATE SET
      issuer_id = EXCLUDED.issuer_id,
      baseline_epc = COALESCE(EXCLUDED.baseline_epc, affiliate_page_health.baseline_epc),
      last_epc = EXCLUDED.last_epc,
      last_checked = EXCLUDED.last_checked,
      status = EXCLUDED.status,
      recovery_days = EXCLUDED.recovery_days
  `;
}

/** Page health for sitemap: status (healthy/demoted) + tier (A/B). Uses affiliate_page_health + issuer_performance. */
export interface PageHealthForSitemap {
  status: PageHealthStatus;
  tier: 'A' | 'B';
}

/** Get health for a page path. Hub/category/education default to healthy + tier B. */
export async function getPageHealth(path: string): Promise<PageHealthForSitemap> {
  const slug = getPageSlugFromPath(path);
  if (!slug) return { status: 'healthy', tier: 'B' };
  if (!hasPostgres()) return { status: 'healthy', tier: 'B' };

  try {
    const { rows: healthRows } = await sql`
      SELECT status, issuer_id FROM affiliate_page_health WHERE page_slug = ${slug} LIMIT 1
    `;
    const status = (healthRows[0]?.status as PageHealthStatus) ?? 'healthy';
    const issuerId = healthRows[0]?.issuer_id as string | undefined;

    let tier: 'A' | 'B' = 'B';
    if (issuerId) {
      const { rows: perfRows } = await sql`
        SELECT tier FROM issuer_performance WHERE issuer_id = ${issuerId} LIMIT 1
      `;
      tier = perfRows[0]?.tier === 'A' ? 'A' : 'B';
    }

    return { status, tier };
  } catch (err) {
    console.error('[page-health] getPageHealth failed:', err);
    return { status: 'healthy', tier: 'B' };
  }
}

/** All demoted page slugs. Use for internal link filtering and sitemap. */
export async function getDemotedPageSlugs(): Promise<Set<string>> {
  if (!hasPostgres()) return new Set();
  try {
    const { rows } = await sql`
      SELECT page_slug FROM affiliate_page_health WHERE status = 'demoted'
    `;
    return new Set(rows.map((r) => String(r.page_slug)));
  } catch (err) {
    console.error('[page-health] getDemotedPageSlugs failed:', err);
    return new Set();
  }
}
