-- issuer_performance: Tier A/B per issuer for dynamic re-ranking.
-- Populated by issuer-promotion cron. Does not track pages—issuers only.
-- Run: psql $POSTGRES_URL -f migrations/003_issuer_performance.sql

CREATE TABLE IF NOT EXISTS issuer_performance (
  issuer_id TEXT PRIMARY KEY,
  avg_epc NUMERIC(10,4),
  avg_approval_rate NUMERIC(6,4),
  total_clicks INTEGER,
  tier TEXT CHECK (tier IN ('A', 'B')) NOT NULL DEFAULT 'B',
  last_evaluated DATE
);
