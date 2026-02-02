import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function ComparisonHero({ data }: Props) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
        {data.entityA.name} vs {data.entityB.name}
      </h1>
      <p className="text-slate-600">
        For {data.intent}.
      </p>
    </header>
  );
}
