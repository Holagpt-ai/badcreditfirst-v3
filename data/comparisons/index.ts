/**
 * Comparison data loader. Resolves comparison by slug.
 * Source of truth for all comparison slugs.
 */
import type { ComparisonPage } from './opensky-vs-credit-one';
import { getCardBySlug } from '@/lib/card-data';

import openskyVsCreditOne from './opensky-vs-credit-one';
import openskyVsCapitalOneSecured from './opensky-vs-capital-one-secured';
import openskyVsCreditOneAfterDenial from './opensky-vs-credit-one-after-denial';
import openskyVsDiscoverItSecured from './opensky-vs-discover-it-secured';
import openskyVsFirstProgress from './opensky-vs-first-progress';
import openskyVsCapitalOneForNoCredit from './opensky-vs-capital-one-for-no-credit';
import openskyVsCreditBuilderAccounts from './opensky-vs-credit-builder-accounts';
import openskyVsIndigoForBadCredit from './opensky-vs-indigo-for-bad-credit';
import openskyVsNoDepositAlternatives from './opensky-vs-no-deposit-alternatives';
import openskyVsCapitalOneUpgradePath from './opensky-vs-capital-one-upgrade-path';
import creditOneVsCapitalOneSecured from './credit-one-vs-capital-one-secured';
import firstProgressVsCapitalOneSecured from './first-progress-vs-capital-one-secured';
import discoverItSecuredVsCapitalOneSecured from './discover-it-secured-vs-capital-one-secured';
import firstCreditCardVsSecuredCreditCard from './first-credit-card-vs-secured-credit-card';
import creditBuilderVsFirstCreditCard from './credit-builder-vs-first-credit-card';
import securedCreditCardsVsStudentCreditCards from './secured-credit-cards-vs-student-credit-cards';
import securedCreditCardsVsCreditBuilderAccounts from './secured-credit-cards-vs-credit-builder-accounts';
import securedCreditCardsVsSelfCreditBuilder from './secured-credit-cards-vs-self-credit-builder';
import securedCreditCardsVsChimeCreditBuilder from './secured-credit-cards-vs-chime-credit-builder';
import securedCreditCardsVsUnsecuredBadCreditCards from './secured-credit-cards-vs-unsecured-bad-credit-cards';
import securedCreditCardsVsNoDepositCards from './secured-credit-cards-vs-no-deposit-cards';
import creditCardsWithDepositVsAnnualFee from './credit-cards-with-deposit-vs-annual-fee';
import securedCreditCardsThatUpgradeVsCreditBuilders from './secured-credit-cards-that-upgrade-vs-credit-builders';
import bestCardsAfterRecentDenial from './best-cards-after-recent-denial';
import bestCardsToGraduateFromSecuredCredit from './best-cards-to-graduate-from-secured-credit';

const comparisons: Record<string, ComparisonPage> = {
  'opensky-vs-credit-one': openskyVsCreditOne,
  'opensky-vs-capital-one-secured': openskyVsCapitalOneSecured,
  'opensky-vs-credit-one-after-denial': openskyVsCreditOneAfterDenial,
  'opensky-vs-discover-it-secured': openskyVsDiscoverItSecured,
  'opensky-vs-first-progress': openskyVsFirstProgress,
  'opensky-vs-capital-one-for-no-credit': openskyVsCapitalOneForNoCredit,
  'opensky-vs-credit-builder-accounts': openskyVsCreditBuilderAccounts,
  'opensky-vs-indigo-for-bad-credit': openskyVsIndigoForBadCredit,
  'opensky-vs-no-deposit-alternatives': openskyVsNoDepositAlternatives,
  'opensky-vs-capital-one-upgrade-path': openskyVsCapitalOneUpgradePath,
  'credit-one-vs-capital-one-secured': creditOneVsCapitalOneSecured,
  'first-progress-vs-capital-one-secured': firstProgressVsCapitalOneSecured,
  'discover-it-secured-vs-capital-one-secured': discoverItSecuredVsCapitalOneSecured,
  'first-credit-card-vs-secured-credit-card': firstCreditCardVsSecuredCreditCard,
  'credit-builder-vs-first-credit-card': creditBuilderVsFirstCreditCard,
  'secured-credit-cards-vs-student-credit-cards': securedCreditCardsVsStudentCreditCards,
  'secured-credit-cards-vs-credit-builder-accounts': securedCreditCardsVsCreditBuilderAccounts,
  'secured-credit-cards-vs-self-credit-builder': securedCreditCardsVsSelfCreditBuilder,
  'secured-credit-cards-vs-chime-credit-builder': securedCreditCardsVsChimeCreditBuilder,
  'secured-credit-cards-vs-unsecured-bad-credit-cards': securedCreditCardsVsUnsecuredBadCreditCards,
  'secured-credit-cards-vs-no-deposit-cards': securedCreditCardsVsNoDepositCards,
  'credit-cards-with-deposit-vs-annual-fee': creditCardsWithDepositVsAnnualFee,
  'secured-credit-cards-that-upgrade-vs-credit-builders': securedCreditCardsThatUpgradeVsCreditBuilders,
  'best-cards-after-recent-denial': bestCardsAfterRecentDenial,
  'best-cards-to-graduate-from-secured-credit': bestCardsToGraduateFromSecuredCredit,
};

export type { ComparisonPage };

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisons[slug];
}

/** All comparison slugs for sitemap and other explicit listing. */
export const ALL_COMPARISON_SLUGS = Object.keys(comparisons) as string[];

export interface ComparisonLink {
  slug: string;
  anchorText: string;
}

export interface ReviewLink {
  name: string;
  href: string;
}

/** Sorted comparisons for deterministic internal linking. */
function getSortedComparisons(): ComparisonPage[] {
  return Object.values(comparisons).sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Returns 2–3 comparison links where the given card slug appears. Deterministic by slug. */
export function getComparisonsForCard(cardSlug: string, max = 3): ComparisonLink[] {
  const links: ComparisonLink[] = [];
  for (const comp of getSortedComparisons()) {
    if (links.length >= max) break;
    if (comp.entityA.slug === cardSlug || comp.entityB.slug === cardSlug) {
      links.push({ slug: comp.slug, anchorText: `${comp.entityA.name} vs ${comp.entityB.name}` });
    }
  }
  return links;
}

function entitySlugMatchesCategory(entitySlug: string, categorySlug: string): boolean {
  if (entitySlug === categorySlug) return true;
  const card = getCardBySlug(entitySlug);
  return card?.categorySlug === categorySlug;
}

/** Returns 3–5 comparison links relevant to the given category slug. Deterministic by slug. */
export function getComparisonsForCategory(categorySlug: string, max = 5): ComparisonLink[] {
  const links: ComparisonLink[] = [];
  for (const comp of getSortedComparisons()) {
    if (links.length >= max) break;
    const aMatches = entitySlugMatchesCategory(comp.entityA.slug, categorySlug);
    const bMatches = entitySlugMatchesCategory(comp.entityB.slug, categorySlug);
    if (aMatches || bMatches) {
      links.push({ slug: comp.slug, anchorText: `${comp.entityA.name} vs ${comp.entityB.name}` });
    }
  }
  return links;
}

/** Returns 3 other comparison links, excluding the current slug. Deterministic by slug. */
export function getRelatedComparisons(currentSlug: string, max = 3): ComparisonLink[] {
  const links: ComparisonLink[] = [];
  for (const comp of getSortedComparisons()) {
    if (links.length >= max) break;
    if (comp.slug === currentSlug) continue;
    links.push({ slug: comp.slug, anchorText: `${comp.entityA.name} vs ${comp.entityB.name}` });
  }
  return links;
}

/** Returns review links for the two entities in a comparison. For Comparison → Reviews internal linking. */
export function getReviewLinksForComparison(comparison: ComparisonPage): ReviewLink[] {
  return [
    { name: comparison.entityA.name, href: comparison.ctaMap.entityA.href },
    { name: comparison.entityB.name, href: comparison.ctaMap.entityB.href },
  ];
}
