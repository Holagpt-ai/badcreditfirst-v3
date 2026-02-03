export default function CreditReportErrorsChecklist() {
  return (
    <section className="mb-8" aria-labelledby="credit-errors-checklist-heading">
      <h2 id="credit-errors-checklist-heading" className="text-lg font-bold text-slate-900 mb-2">
        Check Your Credit Report for These Common Errors
      </h2>
      <p className="text-slate-600 leading-relaxed mb-4">
        Before applying for new credit, review your report for mistakes that can lower approval odds.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
        <li>Accounts that do not belong to you</li>
        <li>Late payments reported incorrectly</li>
        <li>Paid collections still marked as unpaid</li>
        <li>Duplicate accounts</li>
        <li>Incorrect balances or credit limits</li>
        <li>Negative items older than the legal reporting period</li>
        <li>Hard inquiries you did not authorize</li>
      </ul>
      <p className="text-sm text-slate-500">
        If you find any of these errors, dispute them before applying for new credit.
      </p>
    </section>
  );
}
