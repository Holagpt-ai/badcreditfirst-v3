import Link from 'next/link';

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">
            Site Map
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Credit Cards By Category */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Credit Cards By Category</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Secured Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Unsecured Cards for Bad Credit</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Credit Builder Accounts</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">No Credit Check Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Cards for Rebuilding Credit</Link></li>
              </ul>
            </div>

            {/* Column 2: Credit Cards by Issuer */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Credit Cards by Issuer</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards/opensky-secured-visa" className="text-blue-600 hover:underline text-sm block">OpenSky®</Link></li>
                <li><Link href="/credit-cards/first-progress-platinum" className="text-blue-600 hover:underline text-sm block">First Progress</Link></li>
                <li><Link href="/credit-cards/self-credit-builder" className="text-blue-600 hover:underline text-sm block">Self Financial</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Mission Lane</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Credit One Bank®</Link></li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 mb-4 mt-8">Credit Cards by Credit Quality</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Bad Credit (Score &lt; 600)</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Fair Credit (Score 600-660)</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Limited / No Credit History</Link></li>
              </ul>
            </div>

            {/* Column 3: Education & Company */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Education & Company</h2>
              <ul className="space-y-2">
                <li><Link href="/education" className="text-blue-600 hover:underline text-sm block">Education Center</Link></li>
                <li><Link href="/education" className="text-blue-600 hover:underline text-sm block">How Credit Scores Work</Link></li>
                <li><Link href="/how-we-rank-cards" className="text-blue-600 hover:underline text-sm block">How We Rank Cards</Link></li>
                <li><Link href="/about" className="text-blue-600 hover:underline text-sm block">About BadCreditFirst</Link></li>
                <li><Link href="/contact" className="text-blue-600 hover:underline text-sm block">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-blue-600 hover:underline text-sm block">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-blue-600 hover:underline text-sm block">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
