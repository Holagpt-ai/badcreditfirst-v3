import type { Metadata } from 'next';
import DetailedCardRow from '../../../../components/DetailedCardRow';
import { cardData } from '../../../../lib/card-data';
import { categories, categoryContent } from '../../../../lib/categories';

const TRUST_SIGNAL_DATE = 'Updated Feb 2026';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories[params.slug];
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.title} (2026) | BadCreditFirst`,
    description: `Compare ${category.title.toLowerCase()} for bad credit and no credit. Independent reviews, fees, and approval tips.`,
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

  if (!category) {
    return <div>Page Not Found</div>;
  }

  const filteredCards = cardData.filter((c) => category.filter(c.title));

  const faqSchema =
    content?.faq?.length ?
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faq.map((item) => ({
          '@type': 'Question' as const,
          name: item.q,
          acceptedAnswer: { '@type': 'Answer' as const, text: item.a },
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero: H1 + Trust Signals */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
            {category.title}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {TRUST_SIGNAL_DATE}
          </p>
        </header>

        {/* Quick Answer Box (Featured Snippet target) */}
        {content?.quickAnswer && (
          <section className="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-3 sr-only">
              Quick Answer
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {content.quickAnswer}
            </p>
          </section>
        )}

        {/* Who This Is For / Not For */}
        {content && (
          <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
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
        )}

        {/* Methodology Summary: How We Chose These Cards */}
        {content?.methodologySummary && (
          <section className="mb-10">
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
        )}

        {/* Card List */}
        <section className="mb-12" aria-label="Product comparison">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Compare Options
          </h2>
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
              />
            ))}
          </div>
        </section>

        {/* Deep Education: How This Category Helps Rebuild Credit */}
        {content?.deepEducation && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              How This Category Helps Rebuild Credit
            </h2>
            <div className="text-slate-600 leading-relaxed space-y-4">
              {content.deepEducation.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* Risks & Downsides */}
        {content?.risksDownsides && (
          <section className="mb-10">
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
        )}

        {/* Graduation Path: What to Apply For Next */}
        {content?.graduationPath && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              What to Apply For Next
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {content.graduationPath}
            </p>
          </section>
        )}

        {/* FAQs */}
        {content?.faq?.length ? (
          <section className="mb-12">
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
        ) : null}
      </main>
    </div>
  );
}
