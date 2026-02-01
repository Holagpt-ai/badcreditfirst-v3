import type { Metadata } from 'next';
import Link from 'next/link';
import DetailedCardRow from '../../../../components/DetailedCardRow';
import { cardData } from '../../../../lib/card-data';
import { getSegmentDisplayName, isValidSegment, getCardsForSegment } from '../../../../lib/segment';

type Props = { params: { segment: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segment = params.segment;
  if (!isValidSegment(segment)) return { title: 'Results Not Found' };
  const name = getSegmentDisplayName(segment);
  return {
    title: `Best Options for ${name} (2026) | BadCreditFirst`,
    description: `Compare the best credit cards and credit-building options for ${name}. Independent reviews and rankings.`,
  };
}

export default function CreditCardsResultsPage({
  params,
}: {
  params: { segment: string };
}) {
  const { segment } = params;

  if (!isValidSegment(segment)) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Results Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const segmentName = getSegmentDisplayName(segment);
  const orderedCards = getCardsForSegment(cardData, segment);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Best Options for {segmentName}
          </h1>
          <p className="text-slate-600">
            We ranked these options for your situation. Compare fees, approval odds, and reporting.
          </p>
          <p className="mt-4">
            <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
              ← Start over
            </Link>
          </p>
        </header>

        <section className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {orderedCards.map((card) => (
            <DetailedCardRow
              key={card.slug}
              title={card.title}
              label={card.label}
              highlights={card.highlights}
              fees={card.fees}
              creditScore={card.creditScore}
              slug={card.slug}
              reviewUrl={card.reviewUrl}
            />
          ))}
        </section>

        <p className="mt-8 text-center">
          <Link href="/credit-cards" className="text-blue-600 hover:underline text-sm font-medium">
            View all credit card categories
          </Link>
        </p>
      </main>
    </div>
  );
}
