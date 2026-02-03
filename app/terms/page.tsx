import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Terms of Use
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            By accessing BadCreditFirst, you agree to these terms. All content is for informational purposes only and does not constitute financial advice. We are not a lender and do not make credit decisions. We strive for accuracy but cannot guarantee that all information is up-to-date. Users should verify terms with the card issuer before applying.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            To the fullest extent permitted by law, BadCreditFirst shall not be liable for any damages resulting from your use of this site.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            All content on BadCreditFirst, including text, graphics, and site design, is the property of BadCreditFirst and may not be reproduced without permission.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Governing Law</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            These Terms of Use are governed by the laws of the State of Florida, without regard to conflict of law principles.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Changes</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We reserve the right to modify these terms at any time.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
