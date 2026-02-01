import Link from 'next/link';
import { Star, CreditCard } from 'lucide-react';
import DetailedCardRow from '../../components/DetailedCardRow';

// Full card list for comparison rows (title, label, highlights, fees, creditScore, slug)
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

// Slug -> name & URL for review page
const cardDataReview: Record<string, { name: string; url: string }> = {
  'opensky-secured-visa': { name: 'OpenSky® Secured Visa® Credit Card', url: 'https://openskycc.com' },
  'first-progress-platinum': { name: 'First Progress Platinum Prestige Mastercard®', url: 'https://firstprogress.com' },
  'self-credit-builder': { name: 'Self - Credit Builder Account', url: 'https://www.self.inc' },
  'mission-lane': { name: 'Mission Lane Visa® Credit Card', url: 'https://www.missionlane.com' },
  'credit-one-platinum': { name: 'Credit One Bank® Platinum Visa®', url: 'https://www.creditonebank.com' },
};

// Category config: title + filter by card title text
const categories: Record<string, { title: string; filter: (title: string) => boolean }> = {
  'secured-cards': {
    title: 'Secured Credit Cards',
    filter: (title) => title.includes('Secured') || title.includes('Self'),
  },
  'credit-builder': {
    title: 'Credit Builder Accounts',
    filter: (title) => title.includes('Self'),
  },
  'bad-credit': {
    title: 'Credit Cards for Bad Credit',
    filter: () => true,
  },
};

export default function CreditCardSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const category = categories[slug];
  const card = cardDataReview[slug];

  // Category: comparison list layout
  if (category) {
    const filteredCards = cardData.filter((c) => category.filter(c.title));
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <main className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
              {category.title}
            </h1>
            <p className="text-sm text-slate-400">
              By Sofia Acosta | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
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
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Card review: single review layout
  if (card) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
              {card.name}
            </h1>
            <p className="text-slate-500 font-medium">Review & Details</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 flex justify-center border-b border-slate-100 bg-slate-50">
              <div className="w-full max-w-sm aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10" />
                <CreditCard className="w-16 h-16 text-slate-400 opacity-50" />
              </div>
            </div>
            <div className="px-8 pt-6 flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
              <span className="text-sm text-slate-500 ml-2 font-medium">4.5/5</span>
            </div>
            <div className="px-8 py-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Pros & Cons</h2>
              <div className="space-y-3 text-slate-600">
                <p>Good for building credit. Reports to all bureaus. Designed for limited or no credit history.</p>
                <p>Consider fees and deposit requirements before applying. Terms and conditions apply.</p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <a
                href={card.url}
                target="_blank"
                rel="nofollow noreferrer"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center"
              >
                Visit Issuer Website
              </a>
              <p className="mt-3 text-xs text-slate-500 text-center">
                You will be redirected to the issuer&apos;s official website.
              </p>
              <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
                BadCreditFirst may receive compensation if you apply through links on this page.
              </p>
              <p className="mt-6 text-center">
                <Link href="/credit-cards" className="text-blue-600 hover:underline text-sm font-medium">
                  ← Back to Credit Cards
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <div>Page Not Found</div>;
}
