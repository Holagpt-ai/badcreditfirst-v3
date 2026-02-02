/**
 * Comparison data loader. Resolves comparison by slug.
 * Source of truth for all comparison slugs.
 */
import type { ComparisonPage } from './opensky-vs-credit-one';

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
