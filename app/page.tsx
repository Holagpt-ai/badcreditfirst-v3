import DetailedCardRow from '../components/DetailedCardRow';

const cardData = [
  {
    title: 'OpenSky® Secured Visa® Credit Card',
    label: 'Best for No Credit Check',
    highlights: ['No credit check to apply', 'Refundable deposit starts at $200', 'Reports to all 3 credit bureaus'],
    fees: '$35 Annual Fee',
    creditScore: 'No Credit Check',
    slug: 'opensky-secured-visa',
  },
  {
    title: 'First Progress Platinum Prestige Mastercard®',
    label: 'Best for Credit Rebuilding',
    highlights: ['Reports to all 3 bureaus', 'No credit history required', '24/7 Online Account Access'],
    fees: '$49 Annual Fee',
    creditScore: 'Poor to Fair',
    slug: 'first-progress-platinum',
  },
  {
    title: 'Self - Credit Builder Account',
    label: 'Best Alternative to a Credit Card',
    highlights: ['No hard pull on your credit', 'Build credit while you save', 'Plans start at $25/mo'],
    fees: '$25/mo',
    creditScore: 'Building',
    slug: 'self-credit-builder',
  },
  {
    title: 'Mission Lane Visa® Credit Card',
    label: 'Coming Soon',
    highlights: ['Unsecured option', 'No security deposit', 'Clear fee structure'],
    fees: '—',
    creditScore: '—',
    slug: 'mission-lane',
  },
  {
    title: 'Credit One Bank® Platinum Visa®',
    label: 'Coming Soon',
    highlights: ['Cash back rewards', 'Regular account reviews', 'Free credit score access'],
    fees: '—',
    creditScore: '—',
    slug: 'credit-one-platinum',
  },
];

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
