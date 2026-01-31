import Link from 'next/link';

const pageTitles: Record<string, string> = {
  about: 'About Us',
  education: 'Education',
  privacy: 'Privacy Policy',
  terms: 'Terms',
  contact: 'Contact',
  'advertiser-disclosure': 'Advertiser Disclosure',
  'credit-cards': 'Credit Cards',
};

function getPageTitle(slug: string): string {
  return pageTitles[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}

export default function CatchAllPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugSegment = params.slug?.[0] ?? 'page';
  const pageName = getPageTitle(slugSegment);
  const isContact = slugSegment === 'contact';
  const isTerms = slugSegment === 'terms';
  const isAdvertiserDisclosure = slugSegment === 'advertiser-disclosure';
  const isPrivacy = slugSegment === 'privacy';
  const isAbout = slugSegment === 'about';
  const isEducation = slugSegment === 'education';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          {isContact ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Contact Us
              </h1>
              <p className="text-slate-600 leading-relaxed mb-6">
                We value your feedback. For questions regarding our reviews or partnerships, please contact us.
              </p>
              <div className="text-slate-600 leading-relaxed space-y-2 mb-6">
                <p><strong>Email:</strong> carlos.acosta@badcreditfirst.com</p>
                <p><strong>Phone:</strong> (305) 619-3497</p>
                <p><strong>Mailing Address:</strong> 1631 Del Prado Blvd S #1124, Cape Coral, FL 33990</p>
              </div>
              <p className="text-slate-500 text-sm italic mb-8">
                Note: We are not a bank and cannot assist with specific credit card account issues.
              </p>
            </>
          ) : isPrivacy ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-slate-600 leading-relaxed mb-4">
                BadCreditFirst (&quot;BadCreditFirst,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you visit our website.
              </p>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Information We Collect</h2>
              <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-4">
                <li>Information you provide when contacting us (email, name)</li>
                <li>Usage data such as pages visited and time spent on the site</li>
                <li>Device and browser information</li>
                <li>IP address and general location data</li>
              </ul>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How We Use Information</h2>
              <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-4">
                <li>To improve our website and user experience</li>
                <li>To respond to your inquiries</li>
                <li>To analyze site traffic and performance</li>
                <li>To comply with legal obligations</li>
              </ul>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Contact Information</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                For privacy-related questions, contact us at carlos.acosta@badcreditfirst.com or write to 1631 Del Prado Blvd S #1124, Cape Coral, FL 33990.
              </p>
            </>
          ) : isAbout ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                About BadCreditFirst
              </h1>
              <p className="text-slate-600 leading-relaxed mb-6">
                BadCreditFirst is an independent, advertising-supported website that helps consumers compare credit cards and credit-building products designed for people with bad or limited credit. We provide information to help you make informed decisions. We are not a lender and do not make credit decisions.
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
            </>
          ) : isEducation ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Credit Education
              </h1>
              <p className="text-slate-600 leading-relaxed mb-6">
                Understanding credit is the first step toward improving your financial health. We provide educational content to help you learn how credit works, how to build or rebuild your score, and how to choose the right products for your situation.
              </p>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Topics We Cover</h2>
              <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-6">
                <li>Credit scores and reports</li>
                <li>Secured vs. unsecured cards</li>
                <li>Credit-building strategies</li>
                <li>Fee structures and APR</li>
                <li>How to avoid common mistakes</li>
              </ul>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Upcoming Articles</h2>
              <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-8">
                <li>How Credit Scores Work</li>
                <li>Secured Credit Cards Explained</li>
                <li>Building Credit Without a Credit Card</li>
                <li>Understanding Your Credit Report</li>
                <li>Choosing the Right Card for Your Score</li>
              </ul>
            </>
          ) : isTerms ? (
            <>
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
                All content on this site is the property of BadCreditFirst and protected by copyright laws.
              </p>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Governing Law</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                These terms are governed by the laws of the State of Florida.
              </p>
              <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Changes</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                We reserve the right to modify these terms at any time.
              </p>
            </>
          ) : isAdvertiserDisclosure ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Advertiser Disclosure
              </h1>
              <p className="text-slate-600 leading-relaxed mb-8">
                BadCreditFirst is an independent, advertising-supported comparison service. The offers that appear on this site are from companies from which BadCreditFirst receives compensation. This compensation may impact how and where products appear on this site (including, for example, the order in which they appear). BadCreditFirst does not include all card companies or all available card offers.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                {pageName}
              </h1>
              <p className="text-slate-600 leading-relaxed mb-8">
                We are currently updating our {pageName} page. Please check back shortly for the full content.
              </p>
            </>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
