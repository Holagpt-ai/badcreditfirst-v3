import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            About BadCreditFirst
          </h1>
          <p className="text-slate-600 leading-relaxed mb-6">
            BadCreditFirst is an independent, advertising-supported website that helps consumers compare credit cards and credit-building products designed for people with bad or limited credit. We provide information to help you make informed decisions. We are not a lender and do not make credit decisions.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            BadCreditFirst operates as an independent publisher and does not accept payment to alter editorial opinions or educational content. Product information is evaluated using internal comparison criteria designed to help consumers better understand credit-building options.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Editorial Independence</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our editorial content is created independently. While we receive compensation from partners when you apply through our links, our reviews and rankings are based on our own evaluation criteria. Compensation does not influence our editorial opinions.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How We Evaluate Products</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We rank products based on fee transparency, approval likelihood, reporting to major credit bureaus, and value for consumers with limited credit history.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Important Disclaimer</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            All content is for informational purposes only and does not constitute financial advice. We strive for accuracy but cannot guarantee that all information is up-to-date. Users should verify terms with the card issuer before applying.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8 text-sm italic">
            BadCreditFirst is not a credit card issuer, lender, or financial advisor and does not make credit approval decisions.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
