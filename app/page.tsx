import DetailedCardRow from '../components/DetailedCardRow';
import FunnelSelector from '../components/FunnelSelector';
import WelcomeBackBanner from '../components/WelcomeBackBanner';
import { cardData } from '../lib/card-data';

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
        {/* Segmentation Funnel — multi-step wizard at top (Step 1: situation, Step 2: deposit, Step 3: trust) */}
        <FunnelSelector />
        {/* Welcome back: client component reads localStorage (bcf_segment from Funnel), links to results */}
        <WelcomeBackBanner />

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Credit Card Options for Bad or Limited Credit
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Compare secured cards and credit-builder accounts designed for scores under 600. No lender bias. No obligation.
          </p>
        </section>

        {/* Offer Stack - Sandwich Layout */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {cardData.map((card) => (
              <DetailedCardRow
                key={card.slug}
                title={card.title}
                label={card.label}
                highlights={card.highlights}
                fees={card.fees}
                creditScore={card.creditScore}
                slug={card.slug}
                reviewUrl={card.reviewUrl}
                editorialScore={card.editorialScore}
              />
            ))}
          </div>
        </section>

        {/* Methodology */}
        <MethodologySection />
      </main>
    </div>
  );
}
