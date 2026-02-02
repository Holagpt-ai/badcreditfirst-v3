import type { ComparisonPage } from '@/data/comparisons';

interface Props {
  data: ComparisonPage;
}

export default function DecisionLogicSection({ data }: Props) {
  const { entityA, entityB, decisionLogic } = data;
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">When to Choose Each</h2>
      <div className="space-y-4">
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold text-slate-900 mb-2">Best for {entityA.name}</h3>
          <p className="text-slate-600 leading-relaxed">{decisionLogic.bestForA}</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold text-slate-900 mb-2">Best for {entityB.name}</h3>
          <p className="text-slate-600 leading-relaxed">{decisionLogic.bestForB}</p>
        </div>
        <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/60">
          <h3 className="font-semibold text-slate-900 mb-2">Neither may fit</h3>
          <p className="text-slate-600 leading-relaxed">{decisionLogic.neither}</p>
        </div>
      </div>
    </section>
  );
}
