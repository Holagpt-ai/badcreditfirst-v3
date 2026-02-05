import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Your Privacy Choices | BadCreditFirst',
  alternates: {
    canonical: 'https://badcreditfirst.com/your-privacy-choices',
  },
};

export default function YourPrivacyChoicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="prose mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Your Privacy Choices
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst respects your privacy and your choices regarding your personal information. This page summarizes your rights and how to exercise them.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Your Rights</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Depending on where you live, you may have the right to request access to the personal information we hold about you, request correction of inaccurate data, or request deletion of your personal information. We will respond to valid requests in accordance with applicable law.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How to Submit a Request</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            To exercise your privacy rights, please contact us at{' '}
            <a href="mailto:carlos.acosta@badcreditfirst.com" className="text-blue-600 hover:underline">
              carlos.acosta@badcreditfirst.com
            </a>
            . We will process your request within the timeframes required by applicable law.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            For more information about how we collect, use, and protect your information, please see our{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
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
