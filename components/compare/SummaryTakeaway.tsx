import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function SummaryTakeaway({ data }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Summary</h2>
      <p className="text-slate-600 leading-relaxed">{data.summaryTakeaway}</p>
    </section>
  );
}
