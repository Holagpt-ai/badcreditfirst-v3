import type { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Shield, Building2 } from 'lucide-react';
import SnippetAnchor from '@/components/SnippetAnchor';

const SNIPPET_DESCRIPTION =
  'BadCreditFirst is an independent credit education and comparison platform that helps individuals with poor or limited credit understand their options, compare credit cards, and take practical steps to rebuild credit responsibly.';

export const metadata: Metadata = {
  title: 'Credit Card Reviews & Comparisons (2026) | BadCreditFirst',
  description: SNIPPET_DESCRIPTION,
};

const CATEGORY_ENTRIES = [
  {
    href: '/credit-cards/category/secured-cards',
    label: 'Secured Credit Cards',
    description: 'Cards that use a refundable deposit instead of credit history. Good for no credit or rebuilding.',
    icon: Shield,
  },
  {
    href: '/credit-cards/category/bad-credit',
    label: 'Credit Cards for Bad Credit',
    description: 'Options for damaged or limited credit. Compare fees and approval fit before you apply.',
    icon: CreditCard,
  },
  {
    href: '/credit-cards/category/credit-builder',
    label: 'Credit Builder Accounts',
    description: 'Save and build a tradeline without a credit card. No hard pull to get started.',
    icon: Building2,
  },
] as const;

export default function CreditCardsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
            Credit Card Reviews & Comparisons
          </h1>
          <SnippetAnchor description={SNIPPET_DESCRIPTION} />
        </header>
        {/* Category entry points — clear options before explainer */}
        <section className="mb-10" aria-label="Browse by category">
          <h2 className="text-lg font-bold text-slate-900 mb-4 sr-only">
            Compare by category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORY_ENTRIES.map(({ href, label, description, icon: Icon }) => (
              <div
                key={href}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{label}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                  {description}
                </p>
                <Link
                  href={href}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  View cards <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Explainer content — kept below tiles */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
            How We Review Credit Cards
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            BadCreditFirst provides reviews and comparisons of credit cards and credit-building products designed for consumers with bad or limited credit.
          </p>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-2 mb-8">
            <li>We focus on options that do not require perfect credit.</li>
            <li>Help establish or rebuild credit history.</li>
            <li>Offer transparent fees and terms.</li>
          </ul>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Types of Products Reviewed
          </h3>
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
