import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubBySlug, getComparisonsForHub } from '@/data/comparisons';
import ComparisonHubList from '@/components/compare/ComparisonHubList';
import { getWebPageSchema } from '@/lib/schema';

const HUB_SLUG = 'secured-credit-cards';
const SITE_URL = 'https://badcreditfirst.com';

export const metadata: Metadata = {
  title: 'Secured Credit Card Comparisons | BadCreditFirst',
  description:
    'Side-by-side comparisons of secured credit cards for bad credit and no credit. Compare fees, deposits, and approval odds.',
  alternates: {
    canonical: `${SITE_URL}/compare/${HUB_SLUG}`,
  },
};

export default function SecuredCreditCardsHubPage() {
  const hub = getHubBySlug(HUB_SLUG);
  const links = getComparisonsForHub(HUB_SLUG);

  if (!hub) return null;

  const webPageSchema = getWebPageSchema({
    name: hub.title,
    url: `${SITE_URL}/compare/${HUB_SLUG}`,
    description: hub.description,
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
              {hub.title}
            </h1>
            <p className="text-slate-600 leading-relaxed">
              {hub.description}
            </p>
          </header>

          <ComparisonHubList links={links} heading="Comparisons" />

          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-4">
            <Link href="/compare" className="text-blue-600 hover:underline font-medium">
              ← All comparison hubs
            </Link>
            <Link href="/credit-cards/category/secured-cards" className="text-blue-600 hover:underline font-medium">
              Secured cards category →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
