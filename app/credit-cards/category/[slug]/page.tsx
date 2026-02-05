import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DetailedCardRow from '../../../../components/DetailedCardRow';
import { cardData } from '../../../../lib/card-data';
import { categories, categoryContent } from '../../../../lib/categories';
import { getComparisonsForCategory, CATEGORY_TO_HUB } from '@/data/comparisons';
import { filterPromotedComparisonLinks, getRobotsForProgrammaticPage, shouldLinkTo } from '@/lib/rollout-control';
import { getCollectionPageSchema, getFAQSchema } from '../../../../lib/schema';

const TRUST_SIGNAL_DATE = 'Updated Feb 2026';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories[params.slug];
  const content = categoryContent[params.slug];
  if (!category || !content) return { title: 'Category Not Found' };
  const path = `/credit-cards/category/${params.slug}`;
  return {
    title: `${category.title} (2026) | BadCreditFirst`,
    description: `Compare ${category.title.toLowerCase()} for bad credit and no credit. Independent reviews, fees, and approval tips.`,
    robots: getRobotsForProgrammaticPage(path),
    alternates: {
      canonical: `https://badcreditfirst.com${path}`,
    },
  };
}

export default function CreditCardCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const category = categories[slug];
  const content = categoryContent[slug];

  if (!category || !content) {
    notFound();
  }

  const filteredCards = cardData.filter((c) => c.categorySlug === slug);
  const categoryUrl = `/credit-cards/category/${slug}`;
  const itemUrls = filteredCards.map((c) => c.reviewUrl);
  const relatedLinks = filterPromotedComparisonLinks(getComparisonsForCategory(slug, 5));

  const collectionSchema = getCollectionPageSchema({
    name: category.title,
    url: categoryUrl,
    description: content.quickAnswer,
    itemUrls,
  });
  const faqSchema = content.faq?.length ? getFAQSchema(content.faq) : null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <article aria-labelledby="category-title">
          <header className="mb-10">
            <h1 id="category-title" className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
              {category.title}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {TRUST_SIGNAL_DATE}
            </p>
          </header>

          <section id="quick-answer" className="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Quick Answer
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {content.quickAnswer}
            </p>
          </section>

          <section id="who-this-is-for" className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Who This Is For
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {content.whoThisIsFor.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Who This Is Not For
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {content.whoThisIsNotFor.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="methodology" className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              How We Chose These Cards
            </h2>
            <ul className="space-y-4">
              <li>
                <strong className="text-slate-800">Approval:</strong>{' '}
                <span className="text-slate-600">{content.methodologySummary.approval}</span>
              </li>
              <li>
                <strong className="text-slate-800">Fees:</strong>{' '}
                <span className="text-slate-600">{content.methodologySummary.fees}</span>
              </li>
              <li>
                <strong className="text-slate-800">Reporting:</strong>{' '}
                <span className="text-slate-600">{content.methodologySummary.reporting}</span>
              </li>
            </ul>
          </section>

          {CATEGORY_TO_HUB[slug] && shouldLinkTo(`/compare/${CATEGORY_TO_HUB[slug]}`) && (
            <section id="comparison-hub" className="mb-10 p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                Compare options side by side
              </h2>
              <p className="text-slate-600 text-sm mb-3">
                See how these products stack up in our comparison hub. Side-by-side fees, approval odds, and reporting.
              </p>
              <Link
                href={`/compare/${CATEGORY_TO_HUB[slug]}`}
                className="inline-block text-blue-600 hover:underline font-medium"
              >
                View {category.title} comparisons →
              </Link>
            </section>
          )}

          <section id="card-list" className="mb-12" aria-label="Product comparison">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Compare Options
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Browse cards below. Click &quot;View Full Review&quot; to learn more before applying.
            </p>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {filteredCards.map((c) => (
                <DetailedCardRow
                  key={c.slug}
                  title={c.title}
                  label={c.label}
                  highlights={c.highlights}
                  fees={c.fees}
                  creditScore={c.creditScore}
                  slug={c.slug}
                  reviewUrl={c.reviewUrl}
                  editorialScore={c.editorialScore}
                  status={c.status}
                  whyRecommended={c.whyRecommended}
                />
              ))}
            </div>
          </section>

          <section id="deep-education" className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              How This Category Helps Rebuild Credit
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              {content.deepEducation.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section id="risks-downsides" className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Risks & Downsides
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
              <p className="text-sm font-semibold mb-2">⚠ Warning</p>
              <p className="text-slate-700 leading-relaxed">
                {content.risksDownsides}
              </p>
            </div>
          </section>

          <section id="graduation-path" className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              What to Apply For Next
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {content.graduationPath}
            </p>
          </section>

          <section id="faq" className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {content.faq.map((item, i) => (
                <div
                  key={i}
                  className="border-b border-slate-100 pb-4 last:border-0"
                >
                  <dt className="font-semibold text-slate-900 mb-1">
                    {item.q}
                  </dt>
                  <dd className="text-slate-600 leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {relatedLinks.length > 0 && (
            <section id="related-comparisons" className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Related comparisons
              </h2>
              <ul className="flex flex-wrap gap-3 text-sm">
                {relatedLinks.map(({ slug: compSlug, anchorText }) => (
                  <li key={compSlug}>
                    <Link href={`/compare/${compSlug}`} className="text-blue-600 hover:underline font-medium">
                      {anchorText}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
