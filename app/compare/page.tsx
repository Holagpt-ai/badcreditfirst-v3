import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISON_HUBS, getComparisonsForHub } from '@/data/comparisons';
import ComparisonHubList from '@/components/compare/ComparisonHubList';
import { getWebPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Credit Card Comparisons | BadCreditFirst',
  description:
    'Side-by-side comparisons of secured cards, no-deposit alternatives, and credit-building products. Independent reviews for bad credit and no credit.',
  alternates: {
    canonical: 'https://badcreditfirst.com/compare',
  },
};

const SITE_URL = 'https://badcreditfirst.com';

export default function CompareHubPage() {
  const webPageSchema = getWebPageSchema({
    name: 'Credit Card Comparisons',
    url: `${SITE_URL}/compare`,
    description:
      'Side-by-side comparisons of secured cards, no-deposit alternatives, and credit-building products. Independent reviews for bad credit and no credit.',
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
              Credit Card Comparisons
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Compare credit cards and credit-building products side by side. We evaluate fees, approval odds, and bureau reporting to help you choose the right option for rebuilding credit.
            </p>
          </header>

          <div className="space-y-10">
            {COMPARISON_HUBS.map((hub) => {
              const links = getComparisonsForHub(hub.slug);
              if (links.length === 0) return null;
              return (
                <section key={hub.slug} className="border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    <Link href={`/compare/${hub.slug}`} className="text-blue-600 hover:underline">
                      {hub.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">{hub.description}</p>
                  <ComparisonHubList links={links} />
                  <Link
                    href={`/compare/${hub.slug}`}
                    className="inline-block mt-3 text-sm text-blue-600 hover:underline font-medium"
                  >
                    View all {links.length} comparisons →
                  </Link>
                </section>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <Link href="/credit-cards" className="text-blue-600 hover:underline font-medium">
              ← Back to Credit Cards
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
