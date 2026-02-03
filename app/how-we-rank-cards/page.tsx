import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/how-we-rank-cards',
  },
};

export default function HowWeRankCardsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            How We Rank Cards
          </h1>
          <p className="text-slate-600 leading-relaxed mb-8">
            At BadCreditFirst, we do not rank cards based on who pays us the most. We evaluate products based on three core criteria:
          </p>
          <ol className="space-y-6 list-none pl-0">
            <li>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Fee Transparency</h2>
              <p className="text-slate-600 leading-relaxed">
                We prioritize cards that clearly disclose annual fees and avoid hidden monthly charges.
              </p>
            </li>
            <li>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Bureau Reporting</h2>
              <p className="text-slate-600 leading-relaxed">
                We only recommend cards that report to at least one major credit bureau (Equifax, Experian, or TransUnion).
              </p>
            </li>
            <li>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Approval Odds</h2>
              <p className="text-slate-600 leading-relaxed">
                We focus on products specifically designed for consumers with credit scores under 600.
              </p>
            </li>
          </ol>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">Methodology</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our rankings are based on editorial evaluation. We consider the following factors when reviewing cards:
          </p>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-2 mb-6">
            <li><strong className="text-slate-800">Approval accessibility:</strong> How well the product fits consumers with bad or limited credit.</li>
            <li><strong className="text-slate-800">Fees:</strong> Transparency, clarity, and total cost of ownership.</li>
            <li><strong className="text-slate-800">Reporting behavior:</strong> Whether the issuer reports to all three major bureaus.</li>
            <li><strong className="text-slate-800">Usability:</strong> Account management, clarity of terms, and user experience.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            Rankings reflect our editorial judgment. They are not influenced by advertiser relationships or payments from issuers.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-2">What we do not consider</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Payment for placement. We do not accept payment to rank a card higher or to include it in our lists. Compensation from affiliate links does not affect how we order or rate products.
            </p>
          </div>

          <Link href="/" className="inline-block mt-8 text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
