import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { getArticleSchema, getPersonSchema } from '../../../lib/schema';

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
  // ——— PILLAR 2: NEGATIVE ITEMS ———
  'how-long-do-items-stay': {
    title: 'How Long Do Negative Items Stay on Your Report?',
    quickAnswer:
      'Most negative items fall off after 7 years. Chapter 7 bankruptcy stays for 10 years, while hard inquiries fall off after 2 years.',
    body: (
      <>
        <div className="my-8">
          <p className="text-sm font-semibold text-slate-600 mb-3">Timeline</p>
          <ul className="space-y-3 border-l-4 border-slate-200 pl-6">
            <li className="text-slate-700"><strong>2 Years:</strong> Hard Inquiries</li>
            <li className="text-slate-700"><strong>7 Years:</strong> Late Payments, Collections, Charge-Offs</li>
            <li className="text-slate-700"><strong>10 Years:</strong> Chapter 7 Bankruptcy</li>
          </ul>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Negative items are removed automatically when the reporting period ends. You do not need to pay to have them removed early, but paying or settling can sometimes help with approval in the meantime.
        </p>
      </>
    ),
  },
  'removing-collections': {
    title: 'How to Remove Collections (Pay for Delete)',
    quickAnswer:
      'You can negotiate a "Pay for Delete" agreement where the collector agrees to remove the account in exchange for payment. Always get this in writing before paying.',
    body: (
      <>
        <div className="my-8 flex flex-col gap-4 max-w-sm">
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-center font-medium text-slate-700">1. Contact collector</div>
          <div className="text-slate-400 text-center">↓</div>
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-center font-medium text-slate-700">2. Request Pay for Delete in writing</div>
          <div className="text-slate-400 text-center">↓</div>
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-center font-medium text-slate-700">3. Get agreement in writing</div>
          <div className="text-slate-400 text-center">↓</div>
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-center font-medium text-slate-700">4. Pay only after written agreement</div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Not all collectors agree to pay-for-delete. If they refuse, you can still pay or settle to show a zero balance, which can help your score over time.
        </p>
      </>
    ),
  },
  'hard-inquiries-explained': {
    title: 'Hard vs. Soft Inquiries: What\'s the Difference?',
    quickAnswer:
      'Hard inquiries happen when you apply for credit and can drop your score by 5-10 points. Soft inquiries (checking your own score) have zero impact.',
    body: (
      <>
        <div className="my-8 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-4 py-3 font-semibold text-slate-800">Feature</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Hard Inquiry</th>
                <th className="px-4 py-3 font-semibold text-slate-800">Soft Inquiry</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100"><td className="px-4 py-3 font-medium text-slate-700">When</td><td className="px-4 py-3">You apply for credit</td><td className="px-4 py-3">You check your own score</td></tr>
              <tr className="border-b border-slate-100"><td className="px-4 py-3 font-medium text-slate-700">Impact on score</td><td className="px-4 py-3">Can drop 5–10 points</td><td className="px-4 py-3">Zero impact</td></tr>
              <tr><td className="px-4 py-3 font-medium text-slate-700">Stays on report</td><td className="px-4 py-3">Up to 2 years</td><td className="px-4 py-3">Not shown to lenders</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Rate-shopping for a mortgage or auto loan within a short window (e.g., 14–45 days) is often counted as one inquiry. Space out other applications to limit impact.
        </p>
      </>
    ),
  },
  'bankruptcy-and-rebuilding': {
    title: 'Rebuilding Credit After Bankruptcy',
    quickAnswer:
      'Recovery takes time, but you can start rebuilding immediately with secured cards. Your score can rebound significantly within 12-24 months of discharge.',
    body: (
      <p className="text-slate-600 leading-relaxed">
        After bankruptcy, focus on secured cards and credit-builder products that report to all three bureaus. Pay on time every month and keep utilization low. Avoid new debt until you have a stable emergency fund. Many people see meaningful score improvement within 12–24 months of discharge.
      </p>
    ),
  },
  // ——— PILLAR 3: REPORTS & RIGHTS ———
  'reading-your-credit-report': {
    title: 'How to Read Your Credit Report',
    body: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Personal Info</h2>
          <p>Your name, address, date of birth, and SSN (often partially masked). Check for errors or signs of identity theft.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Account History</h2>
          <p>Each credit account with balance, limit, payment status, and age. Look for late payments, high utilization, or accounts you do not recognize.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Public Records</h2>
          <p>Bankruptcies, tax liens, or civil judgments. These can stay for 7–10 years and have a large impact.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Inquiries</h2>
          <p>Hard inquiries (when you applied for credit) and sometimes soft inquiries. Hard inquiries stay for about 2 years.</p>
        </section>
      </div>
    ),
  },
  'how-to-dispute-errors': {
    title: 'How to Dispute Errors (DIY Repair)',
    quickAnswer:
      'You have the right to dispute inaccurate info under the FCRA. The bureau must investigate within 30 days.',
    body: (
      <>
        <div className="my-8 flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-slate-50">
            <span className="text-lg font-bold text-slate-800">30</span>
          </div>
          <p className="text-sm text-slate-500 text-center">days to investigate</p>
        </div>
        <div className="my-8">
          <p className="text-slate-600 leading-relaxed">
            Send a dispute letter to the bureau (Equifax, Experian, or TransUnion) that lists the error and any proof. The bureau must investigate and respond within 30 days. If the furnisher cannot verify the info, it must be removed or corrected.
          </p>
        </div>
      </>
    ),
  },
  'fair-credit-reporting-act': {
    title: 'Your Rights Under the Fair Credit Reporting Act (FCRA)',
    body: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p><strong className="text-slate-800">Right to accuracy:</strong> You can dispute inaccurate or incomplete information. Bureaus must investigate within 30 days.</p>
        <p><strong className="text-slate-800">Right to privacy:</strong> Your report can only be accessed for permissible purposes (e.g., lending, employment with your consent).</p>
        <p><strong className="text-slate-800">Right to know what is in your file:</strong> You are entitled to a free copy of your report from each bureau once every 12 months at annualcreditreport.com.</p>
      </div>
    ),
  },
  'freezing-your-credit': {
    title: 'How to Freeze Your Credit',
    quickAnswer:
      'A security freeze prevents lenders from viewing your report, stopping identity thieves from opening new accounts. It is free and does not hurt your score.',
    body: (
      <>
        <div className="my-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-slate-200 flex items-center justify-center text-2xl">🔒</div>
          <div>
            <p className="font-semibold text-slate-800">Freeze = Lock</p>
            <p className="text-sm text-slate-600">Lenders cannot pull your report until you lift the freeze. You can thaw temporarily when you apply for credit.</p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Place a freeze with Equifax, Experian, and TransUnion (all three). It is free and does not affect your score. Unfreeze when you need to apply; you can refreeze afterward.
        </p>
      </>
    ),
  },
  // ——— PILLAR 4: REBUILDING ———
  'the-30-percent-utilization-rule': {
    title: 'The 30% Utilization Rule Explained',
    quickAnswer:
      'Keep your credit card balances below 30% of your limit to maximize your score. For the best results, keep it below 10%.',
    body: (
      <>
        <div className="my-8 space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">Healthy: Under 30%</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-green-500 rounded" style={{ width: '30%' }} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">Risky: 90% utilization</p>
            <div className="h-6 rounded bg-slate-100 overflow-hidden">
              <div className="h-full bg-red-500 rounded" style={{ width: '90%' }} />
            </div>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Utilization is the share of your total credit limit you use. Pay down balances before the statement date so your reported utilization stays low. Under 10% is ideal; under 30% is still good.
        </p>
      </>
    ),
  },
  'authorized-user-strategy': {
    title: 'The Authorized User Strategy (Piggybacking)',
    quickAnswer:
      'Being added as an authorized user on a family member\'s old, positive account can instantly add years of history to your report.',
    body: (
      <p className="text-slate-600 leading-relaxed">
        The primary account holder adds you as an authorized user. If the card issuer reports authorized users to the bureaus, the account history (age, payment history, utilization) can appear on your report and may boost your score. Choose an account with a long history of on-time payments and low utilization. You do not need a card or access to the account for the history to help.
      </p>
    ),
  },
  'secured-vs-unsecured': {
    title: 'Secured vs. Unsecured Credit Cards',
    quickAnswer:
      'Secured cards require a refundable deposit that usually becomes your credit limit. Unsecured cards do not require a deposit but are harder to get with bad credit.',
    body: (
      <p className="text-slate-600 leading-relaxed">
        Secured cards are designed for people rebuilding credit; the deposit reduces risk for the issuer. Unsecured cards do not require a deposit but typically require better credit. Both can report to the bureaus—pay on time and keep utilization low to build your score.
      </p>
    ),
  },
  'credit-builder-loans': {
    title: 'Credit Builder Loans Explained',
    quickAnswer:
      'A credit builder loan holds the loan amount in an account while you make payments. Those payments are reported to the bureaus, building your history.',
    body: (
      <p className="text-slate-600 leading-relaxed">
        You make fixed payments over a set term (e.g., 6–24 months). The lender reports each payment to the bureaus. At the end, you receive the funds (or they pay off the “loan”). Ideal for people with no credit or thin files who want to build history without a credit card.
      </p>
    ),
  },
};

const AUTHOR_NAME = 'Carlos Acosta';
const AUTHOR_URL = '/author/carlos-acosta';
const DATE_PUBLISHED = '2026-01-15';
const DATE_MODIFIED = '2026-02-01';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articleContent[params.slug];
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | BadCreditFirst`,
    description: article.quickAnswer ?? `Learn about ${article.title} and credit-building strategies.`,
  };
}

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

  const articleUrl = `/education/${slug}`;
  const articleSchema = getArticleSchema({
    title: article.title,
    url: articleUrl,
    description: article.quickAnswer,
    authorName: AUTHOR_NAME,
    authorUrl: AUTHOR_URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const authorSchema = getPersonSchema({
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    description: 'Fintech Entrepreneur & Credit Researcher. Founder of BadCreditFirst.',
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-12 prose prose-slate">
        {/* Hero */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {article.title}
          </h1>
          <p className="text-slate-500 text-sm mb-1">By Carlos Acosta</p>
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
            <strong className="text-slate-700">About Carlos Acosta:</strong> Carlos Acosta is the founder of BadCreditFirst and a fintech entrepreneur focused on credit education and product comparison for consumers with bad or limited credit.{' '}
            <Link href="/author/carlos-acosta" className="text-blue-600 hover:underline">View author page</Link>.
          </p>
          <Link href="/education" className="inline-block mt-6 text-blue-600 hover:underline text-sm font-medium">
            ← Back to Education Center
          </Link>
        </footer>
      </article>
    </div>
  );
}
