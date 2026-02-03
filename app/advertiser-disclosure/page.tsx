import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/advertiser-disclosure',
  },
};

export default function AdvertiserDisclosurePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Advertiser Disclosure
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst may earn commissions when you click on links or apply for products featured on our site. This compensation helps support our operations and allows us to provide free content at no cost to you.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Compensation Does Not Determine Eligibility</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The fact that we receive compensation does not influence which products appear on our site or how they are ranked. We are not paid to place products in a specific order or to guarantee eligibility.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How We Make Recommendations</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our recommendations are based on editorial criteria such as fee transparency, approval accessibility, and reporting to major credit bureaus. We also consider factors that matter to users, including your credit situation and preferences. Our goal is to surface options that may be a good fit for your circumstances.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Not All Offers Included</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We do not include every product available in the market. The products we feature are those we have evaluated and deemed relevant to our audience. Other offers may exist that we have not reviewed.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
