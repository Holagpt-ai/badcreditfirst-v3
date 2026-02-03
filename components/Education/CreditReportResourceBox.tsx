export default function CreditReportResourceBox() {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8" aria-labelledby="credit-report-resource-heading">
      <h3 id="credit-report-resource-heading" className="text-lg font-bold text-slate-900 mb-3">
        Get Your Free Credit Report
      </h3>
      <p className="text-slate-600 leading-relaxed mb-4">
        Federal law entitles you to one free copy of your credit report from each of the three major bureaus every 12 months. Checking your report helps you spot errors and understand what lenders see.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
        <li>Request reports from Equifax, Experian, and TransUnion</li>
        <li>No credit card required</li>
        <li>Review for errors before applying for new credit</li>
      </ul>
      <p className="mb-4">
        <a
          href="https://www.annualcreditreport.com/index.action"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Visit AnnualCreditReport.com →
        </a>
      </p>
      <p className="text-xs text-slate-500">
        BadCreditFirst is not affiliated with AnnualCreditReport.com. This link is provided for consumer convenience only.
      </p>
    </section>
  );
}
