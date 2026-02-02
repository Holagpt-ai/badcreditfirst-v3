import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function KeyDifferences({ data }: Props) {
  const { keyDifferences } = data;
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Key Differences</h2>
      <ul className="space-y-3 text-slate-600 leading-relaxed">
        <li><strong className="text-slate-800">Approval predictability:</strong> {keyDifferences.approvalPredictability}</li>
        <li><strong className="text-slate-800">Deposit:</strong> {keyDifferences.deposit}</li>
        <li><strong className="text-slate-800">Cost structure:</strong> {keyDifferences.costStructure}</li>
      </ul>
    </section>
  );
}
