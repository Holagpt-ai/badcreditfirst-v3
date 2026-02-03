export default function CreditRebuildTimeline() {
  return (
    <section className="mb-8" aria-labelledby="credit-rebuild-timeline-heading">
      <h2 id="credit-rebuild-timeline-heading" className="text-lg font-bold text-slate-900 mb-2">
        What Rebuilding Credit Usually Looks Like
      </h2>
      <p className="text-slate-600 leading-relaxed mb-4">
        Credit improvement is not instant. Most people see progress in predictable stages.
      </p>
      <ol className="list-decimal list-inside space-y-4 text-slate-600">
        <li>
          <strong className="text-slate-900">Month 0–1</strong>
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li>Account approved and opened</li>
            <li>Initial deposit or setup completed</li>
            <li>Credit line reports to bureaus</li>
          </ul>
        </li>
        <li>
          <strong className="text-slate-900">Month 2–3</strong>
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li>First on-time payments reported</li>
            <li>Credit utilization stabilizes</li>
            <li>Early score movement possible</li>
          </ul>
        </li>
        <li>
          <strong className="text-slate-900">Month 4–6</strong>
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li>Consistent payment history builds</li>
            <li>Approval odds for better cards improve</li>
            <li>Fewer rejections when applying</li>
          </ul>
        </li>
        <li>
          <strong className="text-slate-900">Month 6–12</strong>
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li>Graduation or upgrade options appear</li>
            <li>Lower fees and higher limits possible</li>
            <li>Stronger overall credit profile</li>
          </ul>
        </li>
      </ol>
      <p className="mt-4 text-sm text-slate-500">
        Results vary based on payment history, balances, and past credit issues.
      </p>
    </section>
  );
}
