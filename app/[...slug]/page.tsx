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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            {pageName}
          </h1>
          <p className="text-slate-600 leading-relaxed mb-8">
            We are currently updating our {pageName} page. Please check back shortly for the full content.
          </p>
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
