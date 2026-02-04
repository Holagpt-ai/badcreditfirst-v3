import type { Metadata } from 'next';
import Link from 'next/link';
import CreditReportErrorsChecklist from '@/components/CreditReportErrorsChecklist';
import { getFAQSchema } from '@/lib/schema';

const FAQ_ITEMS = [
  { q: 'Who can see my credit reports?', a: 'Lenders, landlords, insurers, and employers may request your credit report with your permission. Creditors you apply to can also access your report. You have the right to obtain a free copy of your report from each of the three major bureaus (Equifax, Experian, TransUnion) once per year at annualcreditreport.com.' },
  { q: 'How do you restore bad credit?', a: 'Restoring credit typically involves paying bills on time, reducing balances, and avoiding new negative entries. Secured cards and credit builder accounts can help establish positive payment history. Improvement takes time; there are no quick fixes for accurate negative information.' },
  { q: 'How can bad credit be legally repaired?', a: 'Under the Fair Credit Reporting Act (FCRA), you have the right to dispute inaccurate or unverifiable information with the credit bureaus. The bureau must investigate within 30 days. Accurate negative information generally cannot be removed early; it remains for the legally prescribed period (typically 7 years for most items, 10 years for Chapter 7 bankruptcy).' },
  { q: 'Does paying off my bills repair my credit?', a: 'Paying off current bills on time helps build positive payment history, which is the largest factor in your score. Paying off past-due accounts or collections may improve your score over time, but the negative history may remain on your report for up to 7 years. Paying does not remove accurate negative entries.' },
  { q: 'What items can be removed from a credit report?', a: 'Only inaccurate, incomplete, or unverifiable information can be removed through the dispute process. Accurate negative information, such as legitimate late payments or valid collections, generally stays on your report until it ages off (typically 7 years from the date of first delinquency). No one can legally remove accurate negative information before that time.' },
  { q: 'Can late payments be removed?', a: 'Accurate late payments cannot be removed early. They remain on your report for up to 7 years from the date of the late payment. You may dispute late payments only if they are inaccurate (wrong date, wrong amount, or not yours). Some issuers offer a one-time goodwill adjustment; this is at their discretion and not guaranteed.' },
  { q: 'Can collections be removed?', a: 'Accurate collections typically remain for up to 7 years from the date the debt first became delinquent. You can dispute collections that are inaccurate, duplicated, or unverifiable. Paying a collection does not automatically remove it; the account may be updated to "paid" but can still appear on your report. "Pay for delete" agreements are rare and not legally required of collectors.' },
  { q: 'Can repossessions be removed from my credit report?', a: 'Accurate repossessions remain on your report for up to 7 years from the date of first delinquency. Disputes apply only to inaccurate or unverifiable information. There is no legal way to remove an accurate repossession before it ages off.' },
  { q: 'Can foreclosures be removed from my credit report?', a: 'Accurate foreclosures stay on your report for up to 7 years. You may dispute a foreclosure only if it contains errors (wrong dates, amounts, or property). No one can legally remove an accurate foreclosure before the reporting period ends.' },
  { q: 'Can bankruptcies be removed from my credit report?', a: 'Chapter 7 bankruptcy remains for 10 years from the filing date. Chapter 13 remains for 7 years from the filing date. Accurate bankruptcies cannot be removed early. Disputes apply only to inaccuracies. Rebuilding credit after bankruptcy is possible through secured cards and credit builder accounts.' },
  { q: 'Can student loans be removed from my credit report?', a: 'Accurate student loan entries remain on your report. Defaulted federal student loans may be rehabilitated or consolidated, which can change how they appear. Private student loans follow the same 7-year reporting rule as other debts. Disputes apply only to inaccurate information. Student loans generally cannot be discharged through bankruptcy except in limited circumstances.' },
  { q: 'Can credit inquiries be removed?', a: 'Hard inquiries (from applications for credit) remain on your report for up to 2 years but typically affect your score less over time. You may dispute inquiries you did not authorize. Soft inquiries (checking your own score, pre-approvals) do not affect your score and are not visible to lenders. Accurate hard inquiries from applications you made generally cannot be removed early.' },
] as const;

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/faq',
  },
};

export default function FAQPage() {
  const faqSchema = getFAQSchema([...FAQ_ITEMS]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 leading-relaxed mb-10">
            This page provides general educational information about credit reports and credit building. Understanding how credit works can help you make informed decisions about rebuilding or establishing your credit history.
          </p>

          <section className="space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h2>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </section>

          <CreditReportErrorsChecklist />

          <section className="mt-10 pt-8 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Related resources</h2>
            <p className="text-slate-600 text-sm mb-4">
              Learn more about credit scores, rebuilding, and how to compare products.
            </p>
            <ul className="flex flex-wrap gap-3 text-sm">
              <li>
                <Link href="/education" className="text-blue-600 hover:underline font-medium">
                  Education Center
                </Link>
              </li>
              <li>
                <Link href="/compare/secured-credit-cards" className="text-blue-600 hover:underline font-medium">
                  Secured card comparisons
                </Link>
              </li>
              <li>
                <Link href="/credit-cards/category/bad-credit" className="text-blue-600 hover:underline font-medium">
                  Cards for bad credit
                </Link>
              </li>
            </ul>
          </section>

          <p className="mt-10 pt-8 border-t border-slate-200 text-sm text-slate-500 italic">
            This information is for educational purposes only and does not constitute legal or financial advice.
          </p>

          <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
