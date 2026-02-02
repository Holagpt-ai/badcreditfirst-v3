import type { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Shield, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Card Reviews & Comparisons (2026) | BadCreditFirst',
  description:
    'Compare secured credit cards and credit-building products for bad or limited credit. Independent reviews, fees, and approval tips.',
};

const CATEGORY_TILES = [
  { href: '/credit-cards/category/secured-cards', label: 'Secured Cards', icon: Shield },
  { href: '/credit-cards/category/bad-credit', label: 'Bad Credit Cards', icon: CreditCard },
  { href: '/credit-cards/category/credit-builder', label: 'Credit Builder Accounts', icon: Building2 },
] as const;

export default function CreditCardsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Category tiles — actionable choices first */}
        <section className="mb-10" aria-label="Browse by category">
          <h2 className="text-lg font-bold text-slate-900 mb-4 sr-only">
            Compare by category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORY_TILES.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
                </div>
                <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Explainer content — kept below tiles */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Credit Card Reviews & Comparisons
          </h1>
          <p className="text-slate-600 leading-relaxed mb-6">
            BadCreditFirst provides reviews and comparisons of credit cards and credit-building products designed for consumers with bad or limited credit.
          </p>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-2 mb-8">
            <li>We focus on options that do not require perfect credit.</li>
            <li>Help establish or rebuild credit history.</li>
            <li>Offer transparent fees and terms.</li>
          </ul>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Types of Products Reviewed
          </h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-2 mb-8">
            <li>Secured credit cards</li>
            <li>Credit builder accounts</li>
            <li>Credit-building alternatives</li>
          </ul>
          <p className="text-slate-500 text-sm italic mb-8">
            BadCreditFirst does not include all available offers. Users should review issuer terms before applying.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            View Top Recommended Cards
          </Link>
        </div>
      </main>
    </div>
  );
}
