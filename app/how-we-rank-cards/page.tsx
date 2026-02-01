import Link from 'next/link';

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
          <Link href="/" className="inline-block mt-8 text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
