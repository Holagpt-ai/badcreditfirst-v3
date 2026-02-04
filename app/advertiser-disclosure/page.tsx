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
            BadCreditFirst is an advertising-supported comparison service. We may receive compensation from third-party partners when you click on links or apply for products featured on our site. This compensation helps support our operations and allows us to provide free content at no cost to you.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How Compensation May Affect Offer Placement</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Compensation is one of several factors that may impact how and where offers appear on our site, including the order in which they are presented. Other factors include your credit profile, product availability, and our editorial methodology. See our <Link href="/how-we-rank-cards" className="text-blue-600 hover:underline">How We Rank Cards</Link> page for details.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Editorial Independence</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Compensation does not influence our editorial opinions, ratings, or recommendations. Our content is independently researched and written. Third-party partners do not review, approve, or endorse our editorial content. We are not paid to place products in a specific order or to guarantee eligibility. See our <Link href="/editorial-disclaimer" className="text-blue-600 hover:underline">Editorial Disclaimer</Link>.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How We Make Recommendations</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our recommendations are based on editorial criteria such as fee transparency, approval accessibility, and reporting to major credit bureaus. We consider factors that matter to users, including your credit situation and preferences. Our goal is to surface options that may be a good fit for your circumstances.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Not All Offers Included</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We do not include every product available in the market. The products we feature are those we have evaluated and deemed relevant to our audience. Other offers may exist that we have not reviewed.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/editorial-disclaimer" className="text-blue-600 hover:underline font-medium">
              Editorial Disclaimer →
            </Link>
            <Link href="/how-we-rank-cards" className="text-blue-600 hover:underline font-medium">
              How We Rank Cards →
            </Link>
            <Link href="/" className="text-slate-500 hover:text-blue-600 hover:underline">
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
