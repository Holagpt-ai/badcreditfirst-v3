import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers, cookies } from 'next/headers';
import { getComparisonBySlug, getRelatedComparisons, getReviewLinksForComparison, getHubForComparison, getHubBySlug } from '@/data/comparisons';
import { getCardBySlug, getAffiliateLink } from '@/lib/card-data';
import { getPrimaryOffer, buildOfferFromHref } from '@/lib/offer-rotation';
import { getVariantFromHeaders, VARIANT_HEADER } from '@/lib/ab-guardrails';
import { isBot } from '@/lib/is-bot';
import { getAllowAffiliateFromHeaders, AFFILIATE_HEADER } from '@/lib/hybrid-seo-rules';
import { shouldSuppressIssuer } from '@/lib/affiliate-throttling';
import { getOutboundRedirectUrl } from '@/lib/outbound-tracking';
import { filterPromotedComparisonLinks, filterPromotedReviewLinks, getRobotsForProgrammaticPageAsync, shouldLinkTo } from '@/lib/programmatic-rollout';
import { getDemotedPageSlugs } from '@/lib/page-health';
import { getIssuerTiersAndEpc, sortByTierAndEpc } from '@/lib/issuer-promotion';
import { getWebPageSchema } from '@/lib/schema';
import ComparisonHero from '@/components/compare/ComparisonHero';
import SnapshotTable from '@/components/compare/SnapshotTable';
import DecisionLogicSection from '@/components/compare/DecisionLogicSection';
import KeyDifferences from '@/components/compare/KeyDifferences';
import EditorialContext from '@/components/compare/EditorialContext';
import SummaryTakeaway from '@/components/compare/SummaryTakeaway';
import ComparisonCTAs from '@/components/compare/ComparisonCTAs';
import MethodologyFooter from '@/components/compare/MethodologyFooter';
import CreditReportErrorsChecklist from '@/components/CreditReportErrorsChecklist';
import CreditRebuildTimeline from '@/components/CreditRebuildTimeline';
import TrustBadges from '@/components/TrustBadges';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) return { title: 'Comparison Not Found' };
  const path = `/compare/${params.slug}`;
  return {
    title: `${comparison.entityA.name} vs ${comparison.entityB.name} | BadCreditFirst`,
    description: `Compare ${comparison.entityA.name} and ${comparison.entityB.name} for ${comparison.intent}. Independent comparison.`,
    robots: await getRobotsForProgrammaticPageAsync(path),
    alternates: {
      canonical: `https://badcreditfirst.com${path}`,
    },
  };
}

const SITE_URL = 'https://badcreditfirst.com';

export default async function ComparePage({ params }: Props) {
  const { slug } = params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const [demotedSlugs, tiers] = await Promise.all([getDemotedPageSlugs(), getIssuerTiersAndEpc()]);

  const cardA = getCardBySlug(comparison.entityA.slug);
  const cardB = getCardBySlug(comparison.entityB.slug);
  const candidates = [cardA, cardB].filter((c): c is NonNullable<typeof c> => c != null && c.status === 'active');
  const sorted = sortByTierAndEpc(candidates, tiers);
  const activeCard = sorted[0];

  let affiliateHref: string | undefined;
  let abVariant: 'A' | 'B' = 'A';
  if (activeCard) {
    const headersList = await headers();
    const cookieStore = await cookies();
    const userAgent = headersList.get('user-agent');
    const sessionId = cookieStore.get('bcf_session')?.value ?? 'static';
    const bot = isBot(userAgent);
    const allowAffiliate = getAllowAffiliateFromHeaders(headersList.get(AFFILIATE_HEADER));
    const suppressed = allowAffiliate && (await shouldSuppressIssuer(activeCard.slug));
    const offers = [
      buildOfferFromHref(activeCard.slug, getAffiliateLink(activeCard.slug), 'active'),
    ];
    const offer = getPrimaryOffer({
      pageId: `compare:${slug}`,
      sessionId,
      isBot: bot,
      offers,
    });
    const rawHref = allowAffiliate && !suppressed ? offer?.href : undefined;
    affiliateHref = rawHref && activeCard
      ? getOutboundRedirectUrl(activeCard.slug, rawHref)
      : undefined;
    abVariant = getVariantFromHeaders(headersList.get(VARIANT_HEADER));
  }

  const webPageSchema = getWebPageSchema({
    name: `${comparison.entityA.name} vs ${comparison.entityB.name}`,
    url: `${SITE_URL}/compare/${slug}`,
    description: `Compare ${comparison.entityA.name} and ${comparison.entityB.name} for ${comparison.intent}. Independent comparison.`,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <ComparisonHero data={comparison} />
          <TrustBadges />
          <SnapshotTable data={comparison} />
          <DecisionLogicSection data={comparison} />
          <KeyDifferences data={comparison} />
          <EditorialContext data={comparison} />
          <SummaryTakeaway data={comparison} />
          <CreditReportErrorsChecklist />
          <CreditRebuildTimeline />
          {(() => {
            const reviewLinks = filterPromotedReviewLinks(getReviewLinksForComparison(comparison), demotedSlugs);
            if (reviewLinks.length === 0) return null;
            return (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Full reviews</h2>
                <p className="text-slate-600 text-sm mb-3">
                  Read our independent reviews to decide which card fits you best.
                </p>
                <ul className="flex flex-wrap gap-3 text-sm">
                  {reviewLinks.map(({ name, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-blue-600 hover:underline font-medium">
                        {name} review
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })()}
          <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 leading-relaxed">
            <p className="mb-2">BadCreditFirst.com is an independent, advertising-supported website. We may receive compensation from credit card issuers and financial partners when users click on links or apply for offers on our site.</p>
            <p className="mb-2">Compensation may influence how and where offers appear, but it does not affect our editorial opinions, reviews, or evaluations. All content is created independently to help consumers make informed decisions.</p>
            <p>BadCreditFirst.com is not a lender and does not guarantee approval for any credit card or financial product. All applications are subject to the issuer&apos;s terms, conditions, and approval criteria.</p>
          </div>
          <ComparisonCTAs data={comparison} affiliateHref={affiliateHref} abVariant={abVariant} demotedSlugs={demotedSlugs} activeCardSlug={activeCard?.slug} />
          <MethodologyFooter />

          {(() => {
            const hubSlug = getHubForComparison(slug);
            const hub = hubSlug ? getHubBySlug(hubSlug) : null;
            if (!hub || !shouldLinkTo(`/compare/${hubSlug}`, demotedSlugs)) return null;
            return (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Part of our{' '}
                  <Link href={`/compare/${hubSlug}`} className="text-blue-600 hover:underline font-medium">
                    {hub.title}
                  </Link>
                  {' '}hub. Browse more comparisons there.
                </p>
              </div>
            );
          })()}

          {(() => {
            const relatedLinks = filterPromotedComparisonLinks(getRelatedComparisons(slug, 3), demotedSlugs);
            if (relatedLinks.length === 0) return null;
            return (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Related comparisons</h2>
                <ul className="flex flex-wrap gap-3 text-sm">
                  {relatedLinks.map(({ slug: compSlug, anchorText }) => (
                    <li key={compSlug}>
                      <Link href={`/compare/${compSlug}`} className="text-blue-600 hover:underline font-medium">
                        {anchorText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
