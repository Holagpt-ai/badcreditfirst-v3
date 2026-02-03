import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getComparisonBySlug, getRelatedComparisons } from '@/data/comparisons';
import ComparisonHero from '@/components/compare/ComparisonHero';
import SnapshotTable from '@/components/compare/SnapshotTable';
import DecisionLogicSection from '@/components/compare/DecisionLogicSection';
import KeyDifferences from '@/components/compare/KeyDifferences';
import EditorialContext from '@/components/compare/EditorialContext';
import SummaryTakeaway from '@/components/compare/SummaryTakeaway';
import ComparisonCTAs from '@/components/compare/ComparisonCTAs';
import MethodologyFooter from '@/components/compare/MethodologyFooter';
import CreditReportErrorsChecklist from '@/components/CreditReportErrorsChecklist';
import CreditRebuildTimeline from '@/components/CreditRebuildTimeline';
import TrustBadges from '@/components/TrustBadges';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) return { title: 'Comparison Not Found' };
  return {
    title: `${comparison.entityA.name} vs ${comparison.entityB.name} | BadCreditFirst`,
    description: `Compare ${comparison.entityA.name} and ${comparison.entityB.name} for ${comparison.intent}. Independent comparison.`,
    alternates: {
      canonical: `https://badcreditfirst.com/compare/${params.slug}`,
    },
  };
}

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
          <TrustBadges />
          <SnapshotTable data={comparison} />
          <DecisionLogicSection data={comparison} />
          <KeyDifferences data={comparison} />
          <EditorialContext data={comparison} />
          <SummaryTakeaway data={comparison} />
          <CreditReportErrorsChecklist />
          <CreditRebuildTimeline />
          <ComparisonCTAs data={comparison} />
          <MethodologyFooter />

          {(() => {
            const relatedLinks = getRelatedComparisons(slug, 3);
            if (relatedLinks.length === 0) return null;
            return (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Related comparisons</h2>
                <ul className="flex flex-wrap gap-3 text-sm">
                  {relatedLinks.map(({ slug: compSlug, anchorText }) => (
                    <li key={compSlug}>
                      <Link href={`/compare/${compSlug}`} className="text-blue-600 hover:underline font-medium">
                        {anchorText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
