-- affiliate_page_health: EPC baseline + demotion status for auto noindex on collapse.
-- Used by page-health evaluator + cron. Does not affect clicks—only indexing + tier.
-- Run: psql $POSTGRES_URL -f migrations/002_affiliate_page_health.sql

CREATE TABLE IF NOT EXISTS affiliate_page_health (
  page_slug TEXT PRIMARY KEY,
  issuer_id TEXT NOT NULL,
  baseline_epc NUMERIC(10,4),
  last_epc NUMERIC(10,4),
  last_checked DATE,
  status TEXT CHECK (status IN ('healthy', 'demoted')) NOT NULL DEFAULT 'healthy',
  recovery_days INTEGER DEFAULT 0
);
