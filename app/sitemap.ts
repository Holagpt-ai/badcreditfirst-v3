import { MetadataRoute } from 'next';
import { cardData } from '@/lib/card-data';
import { categories } from '@/lib/categories';
import { ALL_COMPARISON_SLUGS, COMPARISON_HUB_SLUGS } from '@/data/comparisons';

const BASE_URL = 'https://badcreditfirst.com';

/** Education article slugs (must match app/education/[slug]/page.tsx). */
const EDUCATION_SLUGS = [
  'what-is-a-good-credit-score',
  'how-credit-scores-work',
  'what-is-a-bad-credit-score',
  'how-is-my-score-calculated',
  'fico-vs-vantagescore',
  'how-long-do-items-stay',
  'removing-collections',
  'hard-inquiries-explained',
  'bankruptcy-and-rebuilding',
  'reading-your-credit-report',
  'how-to-dispute-errors',
  'fair-credit-reporting-act',
  'freezing-your-credit',
  'authorized-user-strategy',
  'secured-vs-unsecured',
  'credit-builder-loans',
  'the-30-percent-utilization-rule',
] as const;

/** Static pages (about, terms, etc.). */
const STATIC_PAGES: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/author/carlos-acosta', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/credit-cards`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/education`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Comparison hub pages
  for (const hubSlug of COMPARISON_HUB_SLUGS) {
    entries.push({
      url: `${BASE_URL}/compare/${hubSlug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // Category pages from lib/categories
  const categorySlugs = Object.keys(categories);
  for (const slug of categorySlugs) {
    entries.push({
      url: `${BASE_URL}/credit-cards/category/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Review pages from cardData
  for (const card of cardData) {
    entries.push({
      url: `${BASE_URL}${card.reviewUrl}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Comparison pages from data/comparisons
  for (const slug of ALL_COMPARISON_SLUGS) {
    entries.push({
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  // Education articles
  for (const slug of EDUCATION_SLUGS) {
    entries.push({
      url: `${BASE_URL}/education/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Static pages
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
