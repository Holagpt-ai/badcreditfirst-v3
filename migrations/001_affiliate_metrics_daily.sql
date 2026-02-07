-- affiliate_metrics_daily: daily aggregates for EPC, approval rate, and issuer caps.
-- Run against Vercel Postgres (or Supabase). Impact webhook + outbound click handler populate this.
-- Usage: psql $POSTGRES_URL -f migrations/001_affiliate_metrics_daily.sql

CREATE TABLE IF NOT EXISTS affiliate_metrics_daily (
  issuer_id TEXT NOT NULL,
  date DATE NOT NULL,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue NUMERIC(10,2) DEFAULT 0,
  epc NUMERIC(10,4) GENERATED ALWAYS AS (
    CASE
      WHEN clicks > 0 THEN revenue / clicks
      ELSE 0
    END
  ) STORED,
  approval_rate NUMERIC(6,4) GENERATED ALWAYS AS (
    CASE
      WHEN clicks > 0 THEN conversions::decimal / clicks
      ELSE 0
    END
  ) STORED,
  PRIMARY KEY (issuer_id, date)
);
