import type { Metadata } from 'next';
import Link from 'next/link';
import DetailedCardRow from '../components/DetailedCardRow';
import FunnelSelector from '../components/FunnelSelector';
import SnippetAnchor from '../components/SnippetAnchor';
import TrustBadges from '../components/TrustBadges';
import WelcomeBackBanner from '../components/WelcomeBackBanner';
import { cardData } from '../lib/card-data';
import { categories } from '../lib/categories';

const FEATURED_CARD_COUNT = 3;

const SNIPPET_DESCRIPTION =
  'BadCreditFirst is an independent credit education and comparison platform that helps individuals with poor or limited credit understand their options, compare credit cards, and take practical steps to rebuild credit responsibly.';

export const metadata: Metadata = {
  description: SNIPPET_DESCRIPTION,
};

function MethodologySection() {
  return (
    <section className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">How We Evaluate Options</h2>
        <p className="text-slate-600 leading-relaxed">
          We rank products based on fee transparency, approval likelihood, and reporting to major credit bureaus.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Rebuild Your Credit: Best Credit Cards for Bad Credit in 2026
          </h1>
          <SnippetAnchor description={SNIPPET_DESCRIPTION} className="sr-only" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Independent reviews, approval odds, and fee breakdowns to help you choose the right card. No lender bias. No obligation.
          </p>
        </section>

        {/* Segmentation Funnel — multi-step wizard at top (Step 1: situation, Step 2: deposit, Step 3: trust) */}
        <FunnelSelector />
        {/* Welcome back: client component reads localStorage (bcf_segment from Funnel), links to results */}
        <WelcomeBackBanner />
        <TrustBadges />

        {/* Top Picks / Featured Cards */}
        <section className="max-w-5xl mx-auto px-6 pb-12" aria-labelledby="top-picks">
          <h2 id="top-picks" className="text-2xl font-bold text-slate-900 mb-6">
            Our Top Picks for 2026
          </h2>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {cardData
              .filter((c) => c.status === 'active')
              .sort((a, b) => (b.editorialScore ?? 0) - (a.editorialScore ?? 0))
              .slice(0, FEATURED_CARD_COUNT)
              .map((card, index) => (
              <DetailedCardRow
                key={card.slug}
                position={index}
                priority={index < 3}
                title={card.title}
                label={card.label}
                highlights={card.highlights}
                fees={card.fees}
                creditScore={card.creditScore}
                slug={card.slug}
                reviewUrl={card.reviewUrl}
                editorialScore={card.editorialScore}
                status={card.status}
                whyRecommended={card.whyRecommended}
              />
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="max-w-5xl mx-auto px-6 pb-12" aria-labelledby="browse-by-category">
          <h2 id="browse-by-category" className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/credit-cards/category/secured-cards"
              className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">{categories['secured-cards']?.title ?? 'Secured Credit Cards'}</h3>
              <p className="text-sm text-slate-600">
                Cards that require a deposit but offer high approval odds. Reports to all three bureaus.
              </p>
            </Link>
            <Link
              href="/credit-cards/category/bad-credit"
              className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">{categories['bad-credit']?.title ?? 'Credit Cards for Bad Credit'}</h3>
              <p className="text-sm text-slate-600">
                Secured and unsecured options for scores under 600. Compare fees, approval odds, and reporting.
              </p>
            </Link>
            <Link
              href="/credit-cards/category/credit-builder"
              className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">{categories['credit-builder']?.title ?? 'Credit Builder Accounts'}</h3>
              <p className="text-sm text-slate-600">
                Build credit without a credit card. No hard pull, fixed payments, bureau reporting.
              </p>
            </Link>
          </div>
        </section>

        {/* Methodology */}
        <MethodologySection />

        {/* E-E-A-T Trust Signals */}
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200" aria-labelledby="why-trust">
          <h2 id="why-trust" className="text-2xl font-bold text-slate-900 mb-6">
            Why Trust BadCreditFirst?
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Our editorial guidelines ensure every review is written for you, not for issuers. We rank cards based on fee transparency, approval odds, and bureau reporting—not compensation. Our writers and researchers independently evaluate each product.
            </p>
            <p>
              We explain how we rank cards so you can make informed decisions. Our data is regularly reviewed and updated. BadCreditFirst is committed to helping people with bad or limited credit rebuild responsibly—with clear, unbiased information.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
