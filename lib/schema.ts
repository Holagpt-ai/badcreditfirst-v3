/**
 * Schema.org JSON-LD helpers for technical SEO.
 * Use with <script type="application/ld+json"> dangerouslySetInnerHTML.
 */

const SITE_URL = 'https://www.badcreditfirst.com';

export type FAQItem = { q: string; a: string };
export type BreadcrumbItem = { name: string; url: string };

/** Organization with @id for publisher reference. */
export function getOrganizationSchema(siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'BadCreditFirst',
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
  authorName?: string;
  authorUrl?: string;
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
    author: {
      '@type': 'Organization',
      name: options.authorName ?? 'BadCreditFirst',
      url: options.authorUrl ?? siteUrl,
    },
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

/** Person schema for author (used in Article author). */
export function getPersonSchema(options: {
  siteUrl?: string;
  name: string;
  url: string;
  description?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    url: options.url.startsWith('http') ? options.url : `${options.siteUrl ?? SITE_URL}${options.url}`,
  };
  if (options.description) schema.description = options.description;
  return schema;
}

/** Article schema for education/blog posts. */
export function getArticleSchema(options: {
  siteUrl?: string;
  title: string;
  url: string;
  description?: string;
  authorName: string;
  authorUrl: string;
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
    author: {
      '@type': 'Person',
      name: options.authorName,
      url: options.authorUrl.startsWith('http') ? options.authorUrl : `${siteUrl}${options.authorUrl}`,
    },
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}
