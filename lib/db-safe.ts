/**
 * Build-safe Postgres guard.
 * When POSTGRES_URL is missing (e.g. during build), the app fails open with safe defaults.
 */

export const hasPostgres = () => !!process.env.POSTGRES_URL;
