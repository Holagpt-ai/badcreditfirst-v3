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
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Airline Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Balance Transfer Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Best Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Business Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Cash Back Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Gas Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Low Interest Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">No Annual Fee Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Reward Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Secured Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Student Credit Cards</Link></li>
              </ul>
            </div>

            {/* Column 2: Credit Cards by Issuer */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Credit Cards by Issuer</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Capital One Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Chase Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Citibank Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Credit One Bank Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Discover Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Mission Lane Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">OpenSky Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Wells Fargo Credit Cards</Link></li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 mb-4 mt-8">Credit Cards by Credit Quality</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Excellent Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Good Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Fair/Average Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Bad/Poor Credit Cards</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Limited/No Credit History</Link></li>
              </ul>
            </div>

            {/* Column 3: Education & Resources */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Education & Resources</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Credit Card Comparison</Link></li>
                <li><Link href="/how-credit-scores-work" className="text-blue-600 hover:underline text-sm block">How Credit Scores Work</Link></li>
                <li><Link href="/education" className="text-blue-600 hover:underline text-sm block">Education Center</Link></li>
                <li><Link href="/about" className="text-blue-600 hover:underline text-sm block">About BadCreditFirst</Link></li>
                <li><Link href="/contact" className="text-blue-600 hover:underline text-sm block">Contact Us</Link></li>
                <li><Link href="/terms" className="text-blue-600 hover:underline text-sm block">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
