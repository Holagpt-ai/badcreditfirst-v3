import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
    notFound();
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
          {orderedCards.map((card, index) => (
            <DetailedCardRow
              key={card.slug}
              title={card.title}
              label={card.label}
              highlights={card.highlights}
              fees={card.fees}
              creditScore={card.creditScore}
              slug={card.slug}
              reviewUrl={card.reviewUrl}
              editorialScore={card.editorialScore}
              segment={segment}
              position={index + 1}
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
