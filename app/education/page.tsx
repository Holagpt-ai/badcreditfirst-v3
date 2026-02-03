import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import CreditReportResourceBox from '@/components/Education/CreditReportResourceBox';

export const metadata: Metadata = {
  title: 'Credit Education Center | BadCreditFirst',
  description:
    'Expert guides on credit scores, FICO vs VantageScore, secured cards, and credit-building. Learn before you apply.',
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Credit Education Center
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            Our Education Center is designed to help consumers understand credit cards, secured cards, and credit-building tools before applying for any financial product.
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Expert guides to understanding and improving your credit score.
          </p>
        </div>

        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Start Here
        </h2>
        <CreditReportResourceBox />

        <Link
          href="/faq"
          className="mt-6 flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors group"
        >
          <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Frequently Asked Questions
          </span>
          <span className="text-slate-500 group-hover:text-blue-600" aria-hidden="true">→</span>
        </Link>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Column 1: Understanding Scores */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Understanding Scores</h2>
            </div>
            <ul>
              <li><Link href="/education/what-is-a-good-credit-score" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">What is a Good Credit Score?</Link></li>
              <li><Link href="/education/what-is-a-bad-credit-score" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">What is a Bad Credit Score?</Link></li>
              <li><Link href="/education/how-is-my-score-calculated" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">How is My Score Calculated?</Link></li>
              <li><Link href="/education/fico-vs-vantagescore" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">FICO® vs. VantageScore</Link></li>
            </ul>
          </div>

          {/* Column 2: Reports & Rights */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-bold text-slate-900">Reports & Rights</h2>
            </div>
            <ul>
              <li><Link href="/education/reading-your-credit-report" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Reading Your Credit Report</Link></li>
              <li><Link href="/education/how-to-dispute-errors" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">How to Dispute Errors</Link></li>
              <li><Link href="/education/fair-credit-reporting-act" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Fair Credit Reporting Act</Link></li>
              <li><Link href="/education/freezing-your-credit" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Freezing Your Credit</Link></li>
            </ul>
          </div>

          {/* Column 3: Negative Items */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-lg font-bold text-slate-900">Negative Items</h2>
            </div>
            <ul>
              <li><Link href="/education/how-long-do-items-stay" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">How Long Do Items Stay?</Link></li>
              <li><Link href="/education/removing-collections" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Removing Collections</Link></li>
              <li><Link href="/education/hard-inquiries-explained" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Hard Inquiries Explained</Link></li>
              <li><Link href="/education/bankruptcy-and-rebuilding" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Bankruptcy & Rebuilding</Link></li>
            </ul>
          </div>

          {/* Column 4: Rebuilding Strategy */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-lg font-bold text-slate-900">Rebuilding Strategy</h2>
            </div>
            <ul>
              <li><Link href="/education/secured-vs-unsecured" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Secured vs. Unsecured</Link></li>
              <li><Link href="/education/credit-builder-loans" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Credit Builder Loans</Link></li>
              <li><Link href="/education/the-30-percent-utilization-rule" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">The 30% Utilization Rule</Link></li>
              <li><Link href="/education/authorized-user-strategy" className="text-slate-600 hover:text-blue-600 hover:underline block mb-2">Authorized User Strategy</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/education/how-to-dispute-errors"
            className="text-blue-600 hover:underline font-medium"
          >
            Not sure where to begin? Read our credit rebuild checklist →
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-slate-500">
          All guides are independently researched and updated regularly.
        </p>
      </main>
    </div>
  );
}
