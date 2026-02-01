import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

const articleContent: Record<string, { title: string; quickAnswer?: string; body: ReactNode }> = {
  'what-is-a-good-credit-score': {
    title: 'What Is a Good Credit Score? (2026 Guide)',
    quickAnswer:
      'A good FICO® score is generally considered to be 670 or higher. Scores above 740 are considered "Very Good", while scores above 800 are "Exceptional".',
    body: (
      <>
        {/* CSS Bar Chart */}
        <div className="my-8">
          <p className="text-sm font-semibold text-slate-600 mb-2">FICO® Score Ranges</p>
          <div className="flex h-10 rounded-lg overflow-hidden border border-slate-200 shadow-inner">
            <div className="bg-red-500 min-w-0" style={{ flex: '279' }} title="300-579 Poor" />
            <div className="bg-orange-400 min-w-0" style={{ flex: '90' }} title="580-669 Fair" />
            <div className="bg-yellow-400 min-w-0" style={{ flex: '70' }} title="670-739 Good" />
            <div className="bg-lime-400 min-w-0" style={{ flex: '60' }} title="740-799 Very Good" />
            <div className="bg-green-600 min-w-0" style={{ flex: '50' }} title="800-850 Excellent" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 gap-1">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Very Good</span>
            <span>Excellent</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The 5 Factors of Credit</h2>
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h3 className="font-bold text-slate-800 mb-2">1. Payment History (35%)</h3>
            <p>Whether you pay bills on time. Late payments, collections, and bankruptcies hurt your score.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-2">2. Amounts Owed / Utilization (30%)</h3>
            <p>How much of your available credit you use. Keeping balances below 30% of your limit is recommended.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-2">3. Length of Credit History (15%)</h3>
            <p>How long your accounts have been open. Older accounts in good standing help your score.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-2">4. New Credit (10%)</h3>
            <p>Recent applications and new accounts. Too many hard inquiries in a short period can lower your score.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-2">5. Credit Mix (10%)</h3>
            <p>Variety of account types (cards, loans). A healthy mix can help, but it is not required to have a good score.</p>
          </section>
        </div>
      </>
    ),
  },
  'how-credit-scores-work': {
    title: 'How Credit Scores Work',
    body: (
      <p className="text-slate-600 leading-relaxed">
        Your credit score is calculated based on data from Equifax, Experian, and TransUnion. The most important factor is Payment History (35%). Amounts owed, length of credit history, new credit, and credit mix make up the rest. Lenders use these scores to decide whether to approve you and at what rate.
      </p>
    ),
  },
  'what-is-a-bad-credit-score': {
    title: 'What Is a Bad Credit Score? (And The Path Back)',
    quickAnswer:
      'A score below 670 is generally considered fair or poor. Scores below 580 are considered "Very Poor" and make it difficult to get approved for traditional credit cards or loans without paying high interest rates/fees.',
    body: (
      <>
        {/* 5-color bar chart with opacity on yellow/lime/green */}
        <div className="my-8">
          <p className="text-sm font-semibold text-slate-600 mb-2">FICO® Score Ranges (Danger Zones Emphasized)</p>
          <div className="flex h-10 rounded-lg overflow-hidden border border-slate-200 shadow-inner">
            <div className="bg-red-500 min-w-0" style={{ flex: '279' }} title="300-579 Poor" />
            <div className="bg-orange-400 min-w-0" style={{ flex: '90' }} title="580-669 Fair" />
            <div className="bg-yellow-400 opacity-30 min-w-0" style={{ flex: '70' }} title="670-739 Good" />
            <div className="bg-lime-400 opacity-30 min-w-0" style={{ flex: '60' }} title="740-799 Very Good" />
            <div className="bg-green-600 opacity-30 min-w-0" style={{ flex: '50' }} title="800-850 Excellent" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 gap-1">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Very Good</span>
            <span>Excellent</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Real-World Costs of Bad Credit</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          A bad credit score can lead to application denials, higher security deposits for utilities and rentals, and much higher APR on any credit you do get. Lenders see you as higher risk and charge more or require collateral.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Common Causes</h2>
        <p className="text-slate-600 leading-relaxed">
          Late or missed payments, maxed-out credit cards, and accounts in collections or default all drag your score down. Rebuilding starts with paying on time and reducing balances.
        </p>
      </>
    ),
  },
  'how-is-my-score-calculated': {
    title: 'How Is My Credit Score Calculated? The 5 Factors',
    quickAnswer:
      'Your FICO® score is calculated using five weighted data points from your credit report. The most important factors are your Payment History (35%) and your Credit Utilization (30%).',
    body: (
      <>
        {/* 5 stacked progress bars */}
        <div className="my-8 space-y-4">
          <p className="text-sm font-semibold text-slate-600 mb-4">Factor Weights (FICO®)</p>
          <div>
            <p className="text-sm text-slate-700 mb-1">Payment History — 35%</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-blue-500 rounded" style={{ width: '35%' }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-700 mb-1">Amounts Owed (Utilization) — 30%</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-purple-500 rounded" style={{ width: '30%' }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-700 mb-1">Length of Credit History — 15%</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-green-500 rounded" style={{ width: '15%' }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-700 mb-1">Credit Mix — 10%</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-yellow-500 rounded" style={{ width: '10%' }} />
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-700 mb-1">New Credit — 10%</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-orange-500 rounded" style={{ width: '10%' }} />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Payment History (35%)</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Whether you pay bills on time. Late payments, missed payments, collections, and bankruptcies hurt your score. To optimize: pay every bill by the due date, even if only the minimum.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Amounts Owed / Utilization (30%)</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          How much of your available credit you use. High utilization signals risk. To optimize: keep balances below 30% of your total credit limit; paying down cards helps quickly.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Length of Credit History (15%)</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          How long your accounts have been open and the age of your oldest account. To optimize: keep old accounts open when possible; avoid closing your longest-standing card.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Credit Mix (10%)</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Variety of account types (revolving credit like cards, installment loans like auto or student loans). To optimize: a healthy mix can help, but do not open accounts just for mix—only what you need.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. New Credit (10%)</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Recent applications and new accounts. Too many hard inquiries in a short period can lower your score. To optimize: space out applications and avoid applying for many cards at once.
        </p>
      </>
    ),
  },
  'fico-vs-vantagescore': {
    title: 'FICO® vs. VantageScore: What\'s the Difference?',
    quickAnswer:
      'FICO® is used by 90% of top lenders for lending decisions. VantageScore is commonly used by free credit monitoring sites for educational purposes. While their models differ slightly, they both use data from the three major bureaus.',
    body: (
      <>
        {/* Comparison table */}
        <div className="my-8 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-4 py-3 font-semibold text-slate-800">Feature</th>
                <th className="px-4 py-3 font-semibold text-slate-800">FICO® Score</th>
                <th className="px-4 py-3 font-semibold text-slate-800">VantageScore 3.0/4.0</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-700">Used By Lenders?</td>
                <td className="px-4 py-3">Yes (90% market share)</td>
                <td className="px-4 py-3">Rarely</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-700">Score Range</td>
                <td className="px-4 py-3">300–850</td>
                <td className="px-4 py-3">300–850</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-700">Min. History Needed</td>
                <td className="px-4 py-3">6 months of data</td>
                <td className="px-4 py-3">1 month of data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why FICO Matters More for Mortgages and Cars</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          When you apply for a mortgage or auto loan, most lenders pull your FICO® score (or a FICO-based model). That is why improving your FICO® score has the most direct impact on approval and rates for big-ticket borrowing.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why VantageScore Is Still Useful</h2>
        <p className="text-slate-600 leading-relaxed">
          VantageScore is still useful for tracking trends over time. Many free credit monitoring tools show VantageScore; if your VantageScore goes up, your FICO® score often moves in a similar direction. Use it as a guide, but focus on FICO® when preparing for a major application.
        </p>
      </>
    ),
  },
};

export default function EducationArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const article = articleContent[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <article className="max-w-3xl mx-auto px-6 py-12 prose prose-slate">
        {/* Hero */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {article.title}
          </h1>
          <p className="text-slate-500 text-sm mb-1">By Sofia Acosta</p>
          <p className="text-slate-400 text-sm">Last Updated: February 2026</p>
        </header>

        {/* Quick Answer (if present) */}
        {article.quickAnswer && (
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-6 mb-8 text-slate-700">
            <p className="font-semibold text-slate-800 mb-2">Quick Answer</p>
            <p className="leading-relaxed">{article.quickAnswer}</p>
          </div>
        )}

        {/* Body */}
        <div className="mb-12">{article.body}</div>

        {/* Author Bio */}
        <footer className="border-t border-slate-200 pt-8 mt-12">
          <p className="text-sm text-slate-500">
            <strong className="text-slate-700">About Sofia Acosta:</strong> Sofia is a financial researcher specializing in credit repair strategies.
          </p>
          <Link href="/education" className="inline-block mt-6 text-blue-600 hover:underline text-sm font-medium">
            ← Back to Education Center
          </Link>
        </footer>
      </article>
    </div>
  );
}
