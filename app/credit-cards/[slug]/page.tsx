import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, CreditCard } from 'lucide-react';

const cardData: Record<string, { name: string; url: string }> = {
  'opensky-secured-visa': {
    name: 'OpenSky® Secured Visa® Credit Card',
    url: 'https://openskycc.com',
  },
  'first-progress-platinum': {
    name: 'First Progress Platinum Prestige Mastercard®',
    url: 'https://firstprogress.com',
  },
  'self-credit-builder': {
    name: 'Self - Credit Builder Account',
    url: 'https://www.self.inc',
  },
  'mission-lane': {
    name: 'Mission Lane Visa® Credit Card',
    url: 'https://www.missionlane.com',
  },
  'credit-one-platinum': {
    name: 'Credit One Bank® Platinum Visa®',
    url: 'https://www.creditonebank.com',
  },
};

export default function CreditCardReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const card = cardData[slug];

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900 hover:text-slate-900">
            BadCreditFirst
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/credit-cards" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Credit Cards
            </Link>
            <Link href="/education" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Education
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            {card.name}
          </h1>
          <p className="text-slate-500 font-medium">Review & Details</p>
        </div>

        {/* Card Content */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Placeholder Image */}
          <div className="p-8 flex justify-center border-b border-slate-100 bg-slate-50">
            <div className="w-full max-w-sm aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <CreditCard className="w-16 h-16 text-slate-400 opacity-50" />
            </div>
          </div>

          {/* Star Rating */}
          <div className="px-8 pt-6 flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
            <span className="text-sm text-slate-500 ml-2 font-medium">4.5/5</span>
          </div>

          {/* Pros & Cons */}
          <div className="px-8 py-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Pros & Cons</h2>
            <div className="space-y-3 text-slate-600">
              <p>Good for building credit. Reports to all bureaus. Designed for limited or no credit history.</p>
              <p>Consider fees and deposit requirements before applying. Terms and conditions apply.</p>
            </div>
          </div>

          {/* CTA & Disclosures */}
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
          </div>
        </div>
      </main>
    </div>
  );
}
