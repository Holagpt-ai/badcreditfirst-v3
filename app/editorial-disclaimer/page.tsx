import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/editorial-disclaimer',
  },
};

export default function EditorialDisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Editorial Disclaimer
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst provides educational and comparison content to help consumers understand credit cards and credit-building products designed for people with bad or limited credit.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Editorial Independence</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our content is editorially independent. Reviews, rankings, and comparisons are based on our own evaluation criteria. We do not accept payment to alter editorial opinions or to favor specific products.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">No Guarantees</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst does not guarantee approval for any product or credit improvement. Approval decisions are made solely by lenders and issuers. Outcomes depend on your individual circumstances, credit history, and the issuer&apos;s criteria.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Information Accuracy</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Product terms, fees, and eligibility requirements may change. We strive for accuracy but cannot guarantee that all information is current. Users should verify details directly with the issuer before applying.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
