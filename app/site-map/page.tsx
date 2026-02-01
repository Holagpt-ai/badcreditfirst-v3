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
                <li><Link href="/credit-cards/category/secured-cards" className="text-blue-600 hover:underline text-sm block">Secured Credit Cards</Link></li>
                <li><Link href="/credit-cards/category/bad-credit" className="text-blue-600 hover:underline text-sm block">Unsecured Cards for Bad Credit</Link></li>
                <li><Link href="/credit-cards/category/credit-builder" className="text-blue-600 hover:underline text-sm block">Credit Builder Accounts</Link></li>
                <li><Link href="/credit-cards/category/secured-cards" className="text-blue-600 hover:underline text-sm block">No Credit Check Cards</Link></li>
                <li><Link href="/credit-cards/category/bad-credit" className="text-blue-600 hover:underline text-sm block">Cards for Rebuilding Credit</Link></li>
              </ul>
            </div>

            {/* Column 2: Credit Cards by Issuer */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Credit Cards by Issuer</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards/review/opensky-secured-visa" className="text-blue-600 hover:underline text-sm block">OpenSky®</Link></li>
                <li><Link href="/credit-cards/review/first-progress-platinum" className="text-blue-600 hover:underline text-sm block">First Progress</Link></li>
                <li><Link href="/credit-cards/review/self-credit-builder" className="text-blue-600 hover:underline text-sm block">Self Financial</Link></li>
                <li><Link href="/credit-cards/review/mission-lane" className="text-blue-600 hover:underline text-sm block">Mission Lane</Link></li>
                <li><Link href="/credit-cards/review/credit-one-platinum" className="text-blue-600 hover:underline text-sm block">Credit One Bank®</Link></li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 mb-4 mt-8">Credit Cards by Credit Quality</h2>
              <ul className="space-y-2">
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Bad Credit (Score &lt; 600)</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Fair Credit (Score 600-660)</Link></li>
                <li><Link href="/credit-cards" className="text-blue-600 hover:underline text-sm block">Limited / No Credit History</Link></li>
              </ul>
            </div>

            {/* Column 3: Education Center + Company Info */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">4. Education Center</h2>
              <h3 className="text-sm font-semibold text-slate-700 mt-4 mb-2">Understanding Scores</h3>
              <ul className="space-y-2">
                <li><Link href="/education/what-is-a-good-credit-score" className="text-blue-600 hover:underline text-sm block">What Is a Good Credit Score?</Link></li>
                <li><Link href="/education/what-is-a-bad-credit-score" className="text-blue-600 hover:underline text-sm block">What Is a Bad Credit Score?</Link></li>
                <li><Link href="/education/how-is-my-score-calculated" className="text-blue-600 hover:underline text-sm block">How Is My Score Calculated?</Link></li>
                <li><Link href="/education/fico-vs-vantagescore" className="text-blue-600 hover:underline text-sm block">FICO® vs. VantageScore</Link></li>
              </ul>
              <h3 className="text-sm font-semibold text-slate-700 mt-4 mb-2">Negative Items</h3>
              <ul className="space-y-2">
                <li><Link href="/education/how-long-do-items-stay" className="text-blue-600 hover:underline text-sm block">How Long Items Stay on Report</Link></li>
                <li><Link href="/education/removing-collections" className="text-blue-600 hover:underline text-sm block">Removing Collections</Link></li>
                <li><Link href="/education/hard-inquiries-explained" className="text-blue-600 hover:underline text-sm block">Hard Inquiries Explained</Link></li>
                <li><Link href="/education/bankruptcy-and-rebuilding" className="text-blue-600 hover:underline text-sm block">Bankruptcy & Rebuilding</Link></li>
              </ul>
              <h3 className="text-sm font-semibold text-slate-700 mt-4 mb-2">Reports & Rights</h3>
              <ul className="space-y-2">
                <li><Link href="/education/reading-your-credit-report" className="text-blue-600 hover:underline text-sm block">Reading Your Credit Report</Link></li>
                <li><Link href="/education/how-to-dispute-errors" className="text-blue-600 hover:underline text-sm block">How to Dispute Errors</Link></li>
                <li><Link href="/education/fair-credit-reporting-act" className="text-blue-600 hover:underline text-sm block">Fair Credit Reporting Act Rights</Link></li>
                <li><Link href="/education/freezing-your-credit" className="text-blue-600 hover:underline text-sm block">Freezing Your Credit</Link></li>
              </ul>
              <h3 className="text-sm font-semibold text-slate-700 mt-4 mb-2">Rebuilding Strategy</h3>
              <ul className="space-y-2">
                <li><Link href="/education/secured-vs-unsecured" className="text-blue-600 hover:underline text-sm block">Secured vs. Unsecured Cards</Link></li>
                <li><Link href="/education/credit-builder-loans" className="text-blue-600 hover:underline text-sm block">Credit Builder Loans</Link></li>
                <li><Link href="/education/the-30-percent-utilization-rule" className="text-blue-600 hover:underline text-sm block">The 30% Utilization Rule</Link></li>
                <li><Link href="/education/authorized-user-strategy" className="text-blue-600 hover:underline text-sm block">Authorized User Strategy</Link></li>
              </ul>

              <h2 className="text-lg font-bold text-slate-900 mb-4 mt-8">5. Company Info</h2>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-blue-600 hover:underline text-sm block">About BadCreditFirst</Link></li>
                <li><Link href="/contact" className="text-blue-600 hover:underline text-sm block">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-blue-600 hover:underline text-sm block">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-blue-600 hover:underline text-sm block">Terms of Use</Link></li>
                <li><Link href="/advertiser-disclosure" className="text-blue-600 hover:underline text-sm block">Advertiser Disclosure</Link></li>
                <li><Link href="/editorial-disclaimer" className="text-blue-600 hover:underline text-sm block">Editorial Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
