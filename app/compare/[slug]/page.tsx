import { notFound } from 'next/navigation';
import { getComparisonBySlug } from '@/data/comparisons';
import ComparisonHero from '@/components/compare/ComparisonHero';
import SnapshotTable from '@/components/compare/SnapshotTable';
import DecisionLogicSection from '@/components/compare/DecisionLogicSection';
import KeyDifferences from '@/components/compare/KeyDifferences';
import EditorialContext from '@/components/compare/EditorialContext';
import SummaryTakeaway from '@/components/compare/SummaryTakeaway';
import ComparisonCTAs from '@/components/compare/ComparisonCTAs';
import MethodologyFooter from '@/components/compare/MethodologyFooter';

type Props = { params: { slug: string } };

export default function ComparePage({ params }: Props) {
  const { slug } = params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <ComparisonHero data={comparison} />
          <SnapshotTable data={comparison} />
          <DecisionLogicSection data={comparison} />
          <KeyDifferences data={comparison} />
          <EditorialContext data={comparison} />
          <SummaryTakeaway data={comparison} />
          <ComparisonCTAs data={comparison} />
          <MethodologyFooter />
        </div>
      </main>
    </div>
  );
}
