import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubBySlug, getComparisonsForHub, HUB_TO_CATEGORY } from '@/data/comparisons';
import { filterPromotedComparisonLinks, filterByPromotedPath, getRobotsForProgrammaticPage, shouldLinkTo } from '@/lib/programmatic-rollout';
import { getDemotedPageSlugs } from '@/lib/page-health';
import { getIssuerTiersAndEpc, sortByTierAndEpcSlugOnly } from '@/lib/issuer-promotion';
import { getTopReviewsForCategory } from '@/lib/card-data';
import { categories } from '@/lib/categories';
import ComparisonHubList from '@/components/compare/ComparisonHubList';
import { getWebPageSchema, getBreadcrumbSchema, getItemListSchema } from '@/lib/schema';

const HUB_SLUG = 'no-deposit-alternatives';
const SITE_URL = 'https://badcreditfirst.com';

const path = `/compare/${HUB_SLUG}`;

export const metadata: Metadata = {
  title: 'No-Deposit Card Alternatives | BadCreditFirst',
  description:
    'Compare secured cards with no-deposit options. Understand trade-offs between deposit requirements and approval odds.',
  robots: getRobotsForProgrammaticPage(path),
  alternates: {
    canonical: `${SITE_URL}${path}`,
  },
};

export default async function NoDepositAlternativesHubPage() {
  const hub = getHubBySlug(HUB_SLUG);
  const [demotedSlugs, tiers] = await Promise.all([getDemotedPageSlugs(), getIssuerTiersAndEpc()]);
  const comparisonLinks = filterPromotedComparisonLinks(getComparisonsForHub(HUB_SLUG), demotedSlugs);
  const categorySlug = HUB_TO_CATEGORY[HUB_SLUG];
  const topReviewsRaw = categorySlug ? getTopReviewsForCategory(categorySlug, 3) : [];
  const topReviewsFiltered = filterByPromotedPath(topReviewsRaw, (r) => r.reviewUrl, demotedSlugs);
  const topReviews = sortByTierAndEpcSlugOnly(topReviewsFiltered, tiers);
  const category = categorySlug ? categories[categorySlug] : null;

  if (!hub) return null;

  const hubUrl = `${SITE_URL}/compare/${HUB_SLUG}`;
  const webPageSchema = getWebPageSchema({
    name: hub.title,
    url: hubUrl,
    description: hub.description,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
    { name: hub.title, url: `/compare/${HUB_SLUG}` },
  ]);
  const itemListItems = [
    ...comparisonLinks.map((l) => ({ url: `/compare/${l.slug}`, name: l.anchorText })),
    ...topReviews.map((r) => ({ url: r.reviewUrl, name: r.title })),
  ];
  const itemListSchema = getItemListSchema(itemListItems);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
              {hub.title}
            </h1>
            <p className="text-slate-600 leading-relaxed">
              {hub.description}
            </p>
          </header>

          <section className="mb-8" aria-labelledby="how-we-evaluate-no-deposit">
            <h2 id="how-we-evaluate-no-deposit" className="text-lg font-bold text-slate-900 mb-2">
              How we evaluate these options
            </h2>
            <p className="text-slate-600 text-sm mb-3">
              No-deposit alternatives are often marketed to people in difficult credit situations. We focus on clarity of fees and how each option fits a realistic rebuilding plan.
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 mb-3">
              <li>Issuer disclosures, cardholder agreements, and publicly available fee tables</li>
              <li>How costs compare to secured cards and whether terms are clearly explained</li>
              <li>Reporting to major credit bureaus and how the product fits common bad-credit scenarios</li>
            </ul>
            <p className="text-slate-600 text-xs mb-2">
              This hub is reviewed regularly and when issuers update pricing or features. Information is for educational purposes and BadCreditFirst is not a lender or financial advisor.
            </p>
            <p className="text-slate-600 text-xs">
              Reviewed by{' '}
              <Link href="/author/carlos-acosta" className="text-blue-600 hover:underline font-medium">
                Carlos Acosta
              </Link>{' '}
              (credit education writer & founder, BadCreditFirst). Reviews are editorially independent and not ranked by compensation.
            </p>
          </section>

          <ComparisonHubList links={comparisonLinks} heading="Comparisons" />

          {topReviews.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Top reviews</h2>
              <p className="text-slate-600 text-sm mb-4">
                Read our full reviews to understand fees, approval odds, and who each product suits best.
              </p>
              <ul className="flex flex-wrap gap-3 text-sm">
                {topReviews.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={r.reviewUrl}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {r.title} review
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-4">
            <Link href="/compare" className="text-blue-600 hover:underline font-medium">
              ← All comparison hubs
            </Link>
            {category && shouldLinkTo(`/credit-cards/category/${categorySlug}`, demotedSlugs) && (
              <Link
                href={`/credit-cards/category/${categorySlug}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {category.title} category →
              </Link>
            )}
            {!category && (
              <Link href="/credit-cards" className="text-blue-600 hover:underline font-medium">
                Credit cards →
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
