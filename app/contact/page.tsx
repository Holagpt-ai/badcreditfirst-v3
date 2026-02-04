import type { Metadata } from 'next';
import Link from 'next/link';
import { getWebPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/contact',
  },
};

export default function ContactPage() {
  const webPageSchema = getWebPageSchema({
    name: 'Contact BadCreditFirst',
    url: 'https://badcreditfirst.com/contact',
    description: 'Contact BadCreditFirst. Mailing address and email for questions about our content and recommendations.',
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Contact BadCreditFirst
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst is an independent website that helps consumers compare credit cards and credit-building products. We welcome questions, corrections, and feedback about our content.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How to Reach Us</h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            For general inquiries:
          </p>
          <p className="text-slate-600 leading-relaxed mb-2">
            <a href="mailto:carlos.acosta@badcreditfirst.com" className="text-blue-600 hover:underline">
              carlos.acosta@badcreditfirst.com
            </a>
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong className="text-slate-800">Mailing address:</strong><br />
            BadCreditFirst<br />
            1631 Del Prado Blvd S #1124<br />
            Cape Coral, FL 33990
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Purpose of Contact</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-4">
            <li>Questions about our content or recommendations</li>
            <li>Corrections or updates to product information</li>
            <li>Feedback about your experience on our site</li>
          </ul>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Important Disclaimer</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            BadCreditFirst is not a lender, credit bureau, or financial advisor. We do not make credit decisions or have access to your credit report. For product-specific questions, approval status, or account issues, please contact the issuer directly.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
