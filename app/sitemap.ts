import { MetadataRoute } from 'next';
import { getPromotedPagesForSitemap } from '@/lib/rollout-control';

const BASE_URL = 'https://badcreditfirst.com';

/** Static pages (always included, not programmatic). */
const STATIC_PAGES: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/author/carlos-acosta', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

function priorityForType(pageType: string): number {
  switch (pageType) {
    case 'hub':
      return 0.85;
    case 'comparison':
      return 0.75;
    case 'category':
    case 'review':
    case 'education':
      return 0.7;
    default:
      return 0.7;
  }
}

function changeFreqForType(pageType: string): 'weekly' | 'monthly' {
  return pageType === 'hub' || pageType === 'comparison' ? 'weekly' : 'monthly';
}

/**
 * Sitemap: static pages + promoted programmatic pages only.
 * Gated by lib/rollout-control (promotion + staged limits 50/500/5000).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/credit-cards`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/education`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const promoted = getPromotedPagesForSitemap();
  for (const { path, pageType } of promoted) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: changeFreqForType(pageType),
      priority: priorityForType(pageType),
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
