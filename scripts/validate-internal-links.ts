#!/usr/bin/env node
/**
 * Build-time internal linking audit.
 * Collects indexable routes, parses Link href usages, identifies orphans and weak pages.
 * Exit 1 if any orphan pages exist.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  getIndexableProgrammaticPaths,
  isPromoted,
} from '../lib/programmatic-rollout';
import { ALL_COMPARISON_SLUGS, COMPARISON_HUB_SLUGS, CATEGORY_TO_HUB, HUB_TO_CATEGORY, getComparisonsForHub, getComparisonsForCategory, getComparisonsForCard, getRelatedComparisons, getReviewLinksForComparison, getHubForComparison, getComparisonBySlug } from '../data/comparisons';
import { cardData, getTopReviewsForCategory } from '../lib/card-data';
import { categories } from '../lib/categories';

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
];

const STATIC_INDEXABLE = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/faq',
  '/advertiser-disclosure',
  '/editorial-disclaimer',
  '/how-we-rank-cards',
  '/education',
  '/credit-cards',
  '/compare',
  '/site-map',
  '/author/carlos-acosta',
  '/accessibility-statement',
  '/state-privacy-law-notice',
  '/your-privacy-choices',
];

function normalizePath(p: string): string {
  const s = p.startsWith('/') ? p : `/${p}`;
  return s.replace(/\/$/, '') || '/';
}

function getIndexablePaths(): Set<string> {
  const set = new Set<string>(STATIC_INDEXABLE);
  for (const p of getIndexableProgrammaticPaths()) {
    if (isPromoted(p)) set.add(normalizePath(p));
  }
  return set;
}

function extractStaticHrefs(content: string): string[] {
  const paths: string[] = [];
  const re = /href=["'](\/[^"']*)["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const p = m[1];
    if (p.startsWith('/') && !p.startsWith('//') && !p.startsWith('/http')) {
      paths.push(normalizePath(p));
    }
  }
  return paths;
}

function walkDir(dir: string, ext: string, files: string[] = []): string[] {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules') {
      walkDir(full, ext, files);
    } else if (e.isFile() && e.name.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}

type SourceType = 'layout' | 'sitemap' | 'content';

function getSourceType(filePath: string): SourceType {
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  if (rel === 'app/layout.tsx') return 'layout';
  if (rel === 'app/site-map/page.tsx') return 'sitemap';
  return 'content';
}

function getContentSourcePage(filePath: string): string | null {
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  const match = rel.match(/^app\/(.+)\/page\.tsx$/);
  if (match) return '/' + match[1].replace(/\/page\.tsx$/, '').replace(/\[[^\]]+\]/g, '*');
  if (rel.startsWith('app/') && rel.includes('/page.tsx')) {
    const route = rel.replace(/^app\//, '').replace(/\/page\.tsx$/, '').replace(/\[[^\]]+\]/g, '*');
    return '/' + route;
  }
  if (rel.startsWith('components/')) return '[component]';
  return '[other]';
}

interface Inbound {
  layout: boolean;
  sitemap: boolean;
  contentSources: Set<string>;
}

function buildKnownDynamicLinks(): Map<string, Inbound> {
  const inbound = new Map<string, Inbound>();

  function add(target: string, source: SourceType, contentPage?: string) {
    const p = normalizePath(target);
    if (!inbound.has(p)) inbound.set(p, { layout: false, sitemap: false, contentSources: new Set() });
    const i = inbound.get(p)!;
    if (source === 'layout') i.layout = true;
    else if (source === 'sitemap') i.sitemap = true;
    else if (contentPage) i.contentSources.add(contentPage);
  }

  for (const hubSlug of COMPARISON_HUB_SLUGS) {
    add(`/compare/${hubSlug}`, 'content', '/compare');
    for (const link of getComparisonsForHub(hubSlug)) {
      add(`/compare/${link.slug}`, 'content', `/compare/${hubSlug}`);
    }
    const catSlug = HUB_TO_CATEGORY[hubSlug];
    if (catSlug) {
      add(`/credit-cards/category/${catSlug}`, 'content', `/compare/${hubSlug}`);
      for (const r of getTopReviewsForCategory(catSlug, 5)) {
        add(r.reviewUrl, 'content', `/compare/${hubSlug}`);
      }
    }
  }

  for (const compSlug of ALL_COMPARISON_SLUGS) {
    const hubSlug = getHubForComparison(compSlug);
    if (hubSlug) add(`/compare/${hubSlug}`, 'content', `/compare/${compSlug}`);
    for (const r of getRelatedComparisons(compSlug, 5)) {
      add(`/compare/${r.slug}`, 'content', `/compare/${compSlug}`);
    }
    const comp = getComparisonBySlug(compSlug);
    if (comp) {
      for (const r of getReviewLinksForComparison(comp)) {
        add(r.href, 'content', `/compare/${compSlug}`);
      }
    }
  }

  for (const slug of Object.keys(categories)) {
    const hubSlug = CATEGORY_TO_HUB[slug];
    if (hubSlug) add(`/compare/${hubSlug}`, 'content', `/credit-cards/category/${slug}`);
    for (const link of getComparisonsForCategory(slug, 5)) {
      add(`/compare/${link.slug}`, 'content', `/credit-cards/category/${slug}`);
    }
    for (const r of getTopReviewsForCategory(slug, 5)) {
      add(r.reviewUrl, 'content', `/credit-cards/category/${slug}`);
    }
  }

  for (const card of cardData) {
    const hubSlug = CATEGORY_TO_HUB[card.categorySlug];
    if (hubSlug) add(`/compare/${hubSlug}`, 'content', card.reviewUrl);
    add(`/credit-cards/category/${card.categorySlug}`, 'content', card.reviewUrl);
    for (const link of getComparisonsForCard(card.slug, 5)) {
      add(`/compare/${link.slug}`, 'content', card.reviewUrl);
    }
  }

  for (const slug of EDUCATION_SLUGS) {
    add(`/education/${slug}`, 'content', '/education');
    add(`/education/${slug}`, 'content', '/author/carlos-acosta');
  }

  return inbound;
}

function run(): { orphans: string[]; weak: string[] } {
  const indexable = getIndexablePaths();
  const inbound = buildKnownDynamicLinks();

  const tsxFiles = [
    ...walkDir(path.join(process.cwd(), 'app'), '.tsx'),
    ...walkDir(path.join(process.cwd(), 'components'), '.tsx'),
  ];

  for (const f of tsxFiles) {
    const content = fs.readFileSync(f, 'utf8');
    const hrefs = extractStaticHrefs(content);
    const sourceType = getSourceType(f);
    const contentPage = getContentSourcePage(f);

    for (const href of hrefs) {
      const p = normalizePath(href);
      if (!inbound.has(p)) inbound.set(p, { layout: false, sitemap: false, contentSources: new Set() });
      const i = inbound.get(p)!;
      if (sourceType === 'layout') i.layout = true;
      else if (sourceType === 'sitemap') i.sitemap = true;
      else if (contentPage) i.contentSources.add(contentPage);
    }
  }

  const orphans: string[] = [];
  const weak: string[] = [];

  for (const p of Array.from(indexable)) {
    const i = inbound.get(p) ?? { layout: false, sitemap: false, contentSources: new Set() };
    const hasLayout = i.layout;
    const hasSitemap = i.sitemap;
    const hasContent = i.contentSources.size > 0;

    if (!hasLayout && !hasSitemap && !hasContent) {
      orphans.push(p);
    } else if (!hasContent && (hasLayout || hasSitemap)) {
      weak.push(p);
    }
  }

  return { orphans, weak };
}

const { orphans, weak } = run();

if (orphans.length > 0) {
  console.error('[internal-link-check] ORPHANS FOUND:', orphans.length);
  orphans.forEach((p) => console.error('  ✗', p));
}

if (weak.length > 0) {
  console.log('[internal-link-check] WEAK LINKS:', weak.length);
  weak.forEach((p) => console.log('  ⚠', p));
}

if (orphans.length === 0) {
  console.log('[internal-link-check] OK');
}

process.exit(orphans.length > 0 ? 1 : 0);
