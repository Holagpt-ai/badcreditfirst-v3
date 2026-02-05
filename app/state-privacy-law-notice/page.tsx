import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'State Privacy Law Notice | BadCreditFirst',
  alternates: {
    canonical: 'https://badcreditfirst.com/state-privacy-law-notice',
  },
};

export default function StatePrivacyLawNoticePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="prose mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            State Privacy Law Notice
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            This notice supplements our Privacy Policy and applies to residents of states with comprehensive privacy laws, including California (CCPA/CPRA), Virginia, Colorado, Connecticut, Utah, and other states with similar statutes.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">We Do Not Sell Personal Information</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst does not sell your personal information. We do not share your personal information with third parties for their direct marketing purposes.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Limited Data Sharing</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We may share limited information with service providers who assist us in operating our website, such as hosting and analytics providers. We may also share information with affiliate partners when you click through to their sites or apply for products through our links. This sharing is necessary to provide our services and is disclosed in our Privacy Policy.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Contact Us</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            For questions about this notice or to exercise your privacy rights, contact us at{' '}
            <a href="mailto:privacy@badcreditfirst.com" className="text-blue-600 hover:underline">
              privacy@badcreditfirst.com
            </a>
            .
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
