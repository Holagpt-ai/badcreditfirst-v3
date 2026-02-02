/**
 * Comparison data loader. Resolves comparison by slug.
 */
import type { ComparisonPage } from './opensky-vs-credit-one';
import openskyVsCreditOne from './opensky-vs-credit-one';

const comparisons: Record<string, ComparisonPage> = {
  'opensky-vs-credit-one': openskyVsCreditOne,
};

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisons[slug];
}
