import Link from 'next/link';

export default function CreditCardsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
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
