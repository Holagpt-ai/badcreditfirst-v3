import { MetadataRoute } from 'next';
import { getPromotedPagesForSitemapAsync } from '@/lib/programmatic-rollout';
import { getPageHealth } from '@/lib/page-health';
import { SITEMAP_CONTROL } from '@/lib/hybrid-seo-rules';

const BASE_URL = 'https://badcreditfirst.com';

/** Static pages (always included, not programmatic). */
const STATIC_PAGES: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/author/carlos-acosta', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

/**
 * Sitemap: static pages + promoted programmatic pages.
 * Health-aware: excludes demoted, prioritizes tier A.
 * Uses SITEMAP_CONTROL for priority and changefreq.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/credit-cards`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/education`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const promoted = await getPromotedPagesForSitemapAsync();

  for (const { path } of promoted) {
    const health = await getPageHealth(path);

    if (SITEMAP_CONTROL.excludeStatus.includes(health.status)) {
      continue; // prune demoted
    }

    const tierKey = health.status === 'demoted' ? 'demoted' : health.tier === 'A' ? 'tier_a' : 'tier_b';
    const priority = SITEMAP_CONTROL.priorityMap[tierKey];
    const changeFrequency = SITEMAP_CONTROL.changefreqMap[tierKey] as 'daily' | 'weekly' | 'monthly';

    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    });
  }

  for (const { path, changeFrequency, priority } of STATIC_PAGES) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    });
  }

  return entries;
}
