import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Accessibility Statement | BadCreditFirst',
  alternates: {
    canonical: 'https://badcreditfirst.com/accessibility-statement',
  },
};

export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="prose mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Accessibility Statement
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst is committed to ensuring digital accessibility for people with disabilities. We strive to make our website usable by as many people as possible, including those who use assistive technologies such as screen readers, keyboard navigation, and voice control.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Ongoing Improvement</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We are continually improving the accessibility of our site. We follow widely accepted guidelines and best practices to make our content more accessible. If you encounter any barriers or have suggestions for improvement, we want to hear from you.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Contact Us</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            If you have questions or feedback about accessibility, please contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
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
