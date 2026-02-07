# Migrations

## affiliate_metrics_daily

Required for Impact webhook + outbound click tracking. Run before deploying.

**Vercel Postgres:**
```bash
psql $POSTGRES_URL -f migrations/001_affiliate_metrics_daily.sql
```

**Supabase:** Use the SQL Editor in the dashboard and paste the contents of `001_affiliate_metrics_daily.sql`.

**Environment:** Ensure `POSTGRES_URL` is set (Vercel adds this automatically when you attach a Postgres database).

## affiliate_page_health

Required for auto demotion + noindex on EPC collapse. Run after 001.

```bash
psql $POSTGRES_URL -f migrations/002_affiliate_page_health.sql
```

## issuer_performance

Required for issuer promotion engine (Tier A/B). Run after 002.

```bash
psql $POSTGRES_URL -f migrations/003_issuer_performance.sql
```
