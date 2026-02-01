import type { Metadata } from 'next';
import DetailedCardRow from '../../../../components/DetailedCardRow';
import { cardData } from '../../../../lib/card-data';
import { categories, categoryContent } from '../../../../lib/categories';

const LAST_UPDATED_DISPLAY = 'February 2026';

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

  const faqSchema = content?.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
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
        {/* Intro (above card list) */}
        <article className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {category.title}
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            By Sofia Acosta | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          {content ? (
            <>
              <p className="text-slate-600 leading-relaxed mb-6">
                We focus on a curated selection of credit-building products that meet minimum standards for transparency, reporting practices, and accessibility for consumers with poor or limited credit.
              </p>
              <p className="text-slate-600 leading-relaxed">
                {content.intro}
              </p>
            </>
          ) : (
            <p className="text-slate-600 leading-relaxed">
              We focus on a curated selection of credit-building products that meet minimum standards for transparency, reporting practices, and accessibility for consumers with poor or limited credit.
            </p>
          )}
        </article>

        {/* Product list (middle) */}
        <section className="mb-12" aria-label="Product comparison">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Compare Options</h2>
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

        {/* How to Choose, Warning, FAQs (below card list) */}
        {content && (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">How to Choose</h2>
              <p className="text-slate-600 leading-relaxed">
                {content.howToChoose}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Who Should NOT Apply</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
                <p className="text-sm font-semibold mb-2">⚠ Warning</p>
                <p className="text-slate-700 leading-relaxed">
                  {content.whoShouldNotApply}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <dl className="space-y-4">
                {content.faq.map((item, i) => (
                  <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                    <dt className="font-semibold text-slate-900 mb-1">{item.q}</dt>
                    <dd className="text-slate-600 leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
