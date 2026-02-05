# Programmatic Rollout Control

Single control layer for index throttling, sitemap gating, and internal link gating. Configuration lives in `lib/rollout-config.ts`; logic in `lib/programmatic-rollout.ts`.

## Rules

1. **Index throttling**: Default all programmatic pages to `index: false`. Promotion flag switches to `index: true`.
2. **Sitemap**: Only include programmatic pages marked `promoted: true`. Staged limits: 50 / 500 / 5000. Hard cap: 1,000 indexable pages.
3. **Internal links**: Do not link to non-promoted programmatic pages.
4. **Global kill switch**: Single config flag disables indexing + sitemap inclusion instantly.

## Programmatic Page Types

- `comparison` — `/compare/[slug]` (e.g. opensky-vs-credit-one)
- `hub` — `/compare/secured-credit-cards`, etc.
- `category` — `/credit-cards/category/[slug]`
- `review` — `/credit-cards/review/[slug]`
- `results` — `/credit-cards/results/[segment]` (always noindex)
- `education` — `/education/[slug]`

## Configuration

Edit `lib/rollout-config.ts` and promotion registries in `lib/programmatic-rollout.ts`:

| Config | Purpose |
|--------|---------|
| `ROLLOUT_CONFIG.killSwitch` | `true` = all programmatic noindex, excluded from sitemap |
| `ROLLOUT_CONFIG.sitemapLimitTier` | `50` \| `500` \| `5000` — phase-based sitemap limit |
| `HARD_CAP` | Absolute max 1,000 indexable programmatic pages (build fails if exceeded) |
| `PROMOTED_COMPARISONS` | Set of comparison slugs to promote |
| `PROMOTED_HUBS` | Set of hub slugs |
| `PROMOTED_CATEGORIES` | Set of category slugs |
| `PROMOTED_REVIEWS` | Set of card slugs |
| `PROMOTED_EDUCATION` | Set of education article slugs |

## Throttling

- **Full rollout**: All PROMOTED_* sets contain full slug lists (current default).
- **Throttle**: Remove slugs from sets. Those pages become noindex, excluded from sitemap, and unlinkable.
- **Staged rollout**: Set `sitemapLimitTier` to 50, 500, or 5000. Sitemap includes only first N promoted pages.

## Integration Points

- **Metadata (robots)**: `getRobotsForProgrammaticPage(path)` — used in `generateMetadata` for comparison, hub, category, review, education pages.
- **Sitemap**: `getPromotedPagesForSitemap()` — used in `app/sitemap.ts`.
- **Internal links**: `shouldLinkTo(path)`, `filterPromotedComparisonLinks()`, `filterPromotedReviewLinks()`, `filterByPromotedPath()` — used at link render sites.

## No Per-Page Hacks

All control flows through `lib/programmatic-rollout.ts`. Pages do not contain inline index logic or promotion checks beyond calling the exported helpers.
