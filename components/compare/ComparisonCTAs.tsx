import Link from 'next/link';
import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function ComparisonCTAs({ data }: Props) {
  const { ctaMap } = data;
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Next Steps</h2>
      <div className="flex flex-wrap gap-4">
        <Link
          href={ctaMap.entityA.href}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          {ctaMap.entityA.label}
        </Link>
        <Link
          href={ctaMap.entityB.href}
          className="inline-flex items-center justify-center px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
        >
          {ctaMap.entityB.label}
        </Link>
      </div>
    </section>
  );
}
