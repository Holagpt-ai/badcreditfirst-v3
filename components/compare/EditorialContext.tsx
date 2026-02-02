import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function EditorialContext({ data }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Why We Compare These Two</h2>
      <p className="text-slate-600 leading-relaxed">{data.editorialContext}</p>
    </section>
  );
}
