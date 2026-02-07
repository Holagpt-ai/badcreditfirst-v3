/**
 * Schema.org JSON-LD helpers for technical SEO.
 * Use with <script type="application/ld+json"> dangerouslySetInnerHTML.
 *
 * Anti-duplication: deterministic description phrasing pools for programmatic pages.
 *
 * Exports: Organization, WebSite, AUTHOR_SCHEMA (layout); CollectionPage + FAQ (category);
 * Product + Review + Breadcrumb (review); Article (education); WebPage (compare).
 */

const SITE_URL = 'https://badcreditfirst.com';

/**
 * Deterministic phrasing pools for schema descriptions (anti-duplication).
 * Section-level variation — pick template by slug hash. No paragraph spinning.
 */
export const SCHEMA_DESCRIPTION_POOLS = {
  /** WebPage/Comparison description templates. Placeholders: {entityA}, {entityB}, {intent} */
  comparison: [
    'Compare {entityA} and {entityB} for {intent}. Independent comparison.',
    '{entityA} vs {entityB}: fees, approval odds, and credit-building value for {intent}.',
    'Side-by-side comparison of {entityA} and {entityB} for {intent}.',
  ] as const,

  /** Review description templates. Placeholders: {product}, {label} */
  review: [
    'Independent review of {product}. {label}. Compare fees, approval odds, and credit-building value.',
    '{product} review: {label}. Fees, approval odds, and bureau reporting.',
  ] as const,

  /** Article/Education description templates. Placeholders: {title} */
  article: [
    'Learn about {title} and credit-building strategies.',
    '{title}. Practical guide for rebuilding credit.',
  ] as const,
} as const;

/** Pick deterministic index from pool using identifier (e.g. slug). */
function schemaPoolIndex(poolLength: number, id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % poolLength;
}

/**
 * Get varied comparison schema description. Deterministic per slug.
 */
export function getComparisonSchemaDescription(
  entityA: string,
  entityB: string,
  intent: string,
  slug: string
): string {
  const pool = SCHEMA_DESCRIPTION_POOLS.comparison;
  const template = pool[schemaPoolIndex(pool.length, slug)];
  return template
    .replace('{entityA}', entityA)
    .replace('{entityB}', entityB)
    .replace('{intent}', intent);
}

/** Canonical @id for the site author. Use for author references in Article, Review, WebPage. */
export const AUTHOR_ID = `${SITE_URL}/#author-carlos-acosta`;

/** Single Author entity (Person) with @id. Output once (e.g. in layout); reference via getAuthorRef() elsewhere. */
export const AUTHOR_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: 'Carlos Acosta',
  url: `${SITE_URL}/author/carlos-acosta`,
  description:
    'Fintech Entrepreneur & Credit Researcher. Founder of BadCreditFirst. Focus on credit education and product comparison for consumers with bad or limited credit.',
   sameAs: [
     `${SITE_URL}/author/carlos-acosta`,
     SITE_URL,
   ],
   knowsAbout: [
     'Credit reports',
     'Secured credit cards',
     'Credit rebuilding',
     'Consumer finance',
   ],
  affiliation: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
  },
} as const;

/** Reference to the canonical author. Use in Article, Review, WebPage author fields. */
export function getAuthorRef() {
  return { '@id': AUTHOR_ID };
}

export type FAQItem = { q: string; a: string };
export type BreadcrumbItem = { name: string; url: string };

/** Organization with @id for publisher reference. */
export function getOrganizationSchema(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'BadCreditFirst',
    description:
      'Independent credit education and comparison platform helping individuals with poor or limited credit rebuild responsibly.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1631 Del Prado Blvd S #1124',
      addressLocality: 'Cape Coral',
      addressRegion: 'FL',
      postalCode: '33990',
      addressCountry: 'US',
    },
  };
}

/** WebSite with publisher reference to Organization. */
export function getWebSiteSchema(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BadCreditFirst',
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

/** CollectionPage for category pages (list of products/cards). */
export function getCollectionPageSchema(options: {
  siteUrl?: string;
  name: string;
  url: string;
  description?: string;
  itemUrls?: string[];
}) {
  const siteUrl = options.siteUrl ?? SITE_URL;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    url: options.url.startsWith('http') ? options.url : `${siteUrl}${options.url}`,
    author: getAuthorRef(),
    publisher: { '@id': `${siteUrl}/#organization` },
  };
  if (options.description) schema.description = options.description;
  if (options.itemUrls?.length) {
    schema.mainEntity = {
      '@type': 'ItemList',
      itemListElement: options.itemUrls.map((url, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: url.startsWith('http') ? url : `${siteUrl}${url}`,
      })),
    };
  }
  return schema;
}

/** FAQPage for category or article FAQs. */
export function getFAQSchema(faq: FAQItem[], siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
    author: getAuthorRef(),
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

/** Product schema (for review pages). ratingValue as string (e.g. "4.5"); reviewCount omitted per Google guidance. */
export function getProductSchema(options: {
  siteUrl?: string;
  name: string;
  url: string;
  ratingValue: string | number;
  bestRating: number;
  price?: number;
  priceCurrency?: string;
  priceValidUntil?: string;
  description?: string;
}) {
  const siteUrl = options.siteUrl ?? SITE_URL;
  const ratingValue =
    typeof options.ratingValue === 'string' ? options.ratingValue : String(options.ratingValue);
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: options.name,
    url: options.url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: options.bestRating,
    },
  };
  if (options.price != null && options.price > 0) {
    schema.offers = {
      '@type': 'Offer',
      price: options.price,
      priceCurrency: options.priceCurrency ?? 'USD',
      ...(options.priceValidUntil && { priceValidUntil: options.priceValidUntil }),
      ...(options.description && { description: options.description }),
    };
  }
  return schema;
}

/** Review schema (wraps Product as itemReviewed). ratingValue as string; reviewCount omitted per Google guidance. */
export function getReviewSchema(options: {
  siteUrl?: string;
  productSchema: Record<string, unknown>;
  reviewUrl: string;
  ratingValue: string | number;
  bestRating: number;
}) {
  const siteUrl = options.siteUrl ?? SITE_URL;
  const ratingValue =
    typeof options.ratingValue === 'string' ? options.ratingValue : String(options.ratingValue);
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: options.productSchema,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: options.bestRating,
    },
    author: getAuthorRef(),
    reviewedBy: getAuthorRef(),
    publisher: { '@id': `${siteUrl}/#organization` },
    url: options.reviewUrl.startsWith('http') ? options.reviewUrl : `${siteUrl}${options.reviewUrl}`,
  };
}

/** BreadcrumbList for review/article pages. */
export function getBreadcrumbSchema(items: BreadcrumbItem[], siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

/** ItemList for hub pages (comparisons + reviews). */
export function getItemListSchema(
  items: { url: string; name: string }[],
  siteUrl: string = SITE_URL
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

/** Article schema for education/blog posts. Uses centralized author @id. */
export function getArticleSchema(options: {
  siteUrl?: string;
  title: string;
  url: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const siteUrl = options.siteUrl ?? SITE_URL;
  const articleUrl = options.url.startsWith('http') ? options.url : `${siteUrl}${options.url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    url: articleUrl,
    ...(options.description && { description: options.description }),
    author: getAuthorRef(),
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

/** WebPage schema for editorial/comparison pages. Uses centralized author @id. */
export function getWebPageSchema(options: {
  siteUrl?: string;
  name: string;
  url: string;
  description?: string;
}) {
  const siteUrl = options.siteUrl ?? SITE_URL;
  const pageUrl = options.url.startsWith('http') ? options.url : `${siteUrl}${options.url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    url: pageUrl,
    ...(options.description && { description: options.description }),
    author: getAuthorRef(),
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}
