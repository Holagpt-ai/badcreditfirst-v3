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
