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
