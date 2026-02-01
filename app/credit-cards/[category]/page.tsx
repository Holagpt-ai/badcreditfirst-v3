import { notFound } from 'next/navigation';
import DetailedCardRow from '../../components/DetailedCardRow';

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

const categoryContent: Record<string, { title: string; intro: string; filter: string[] }> = {
  'secured-cards': {
    title: 'Secured Credit Cards',
    intro: 'Use your own money to build credit safely. No credit check options available.',
    filter: ['opensky-secured-visa', 'first-progress-platinum'],
  },
  'credit-builder': {
    title: 'Credit Builder Accounts',
    intro: 'Build credit history without a traditional credit card. Ideal for no-credit profiles.',
    filter: ['self-credit-builder'],
  },
  'bad-credit': {
    title: 'Best Credit Cards for Bad Credit',
    intro: 'Unsecured and secured options designed to help you rebuild.',
    filter: [], // Empty means show all
  },
};

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const content = categoryContent[category];

  if (!content) {
    notFound();
  }

  const filteredCards = content.filter.length > 0
    ? cardData.filter((card) => content.filter.includes(card.slug))
    : cardData;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-2">
            {content.intro}
          </p>
          <p className="text-sm text-slate-400">
            By Sofia Acosta | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Cards */}
        <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {filteredCards.map((card) => (
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
      </main>
    </div>
  );
}
