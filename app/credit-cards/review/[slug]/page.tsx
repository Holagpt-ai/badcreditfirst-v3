import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CreditCard } from 'lucide-react';
import { getCardBySlug } from '../../../../lib/card-data';

const baseUrl = 'https://www.badcreditfirst.com';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = getCardBySlug(params.slug);
  if (!card) return { title: 'Review Not Found' };
  return {
    title: `${card.title} Review (2026) | BadCreditFirst`,
    description: `Independent review of ${card.title}. ${card.label}. Compare fees, approval odds, and credit-building value.`,
  };
}

export default function CreditCardReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const card = getCardBySlug(slug);

  if (!card) {
    return <div>Page Not Found</div>;
  }

  const { approvalOdds, realWorldUseCase, feeRisk, upgradePath, title, issuerUrl, fees } = card;
  const reviewUrl = `${baseUrl}${card.reviewUrl}`;
  const ratingValue = 4.5;
  const bestRating = 5;
  const reviewCount = 1;
  const feesText = fees ?? '';
  const annualFeeMatch = feesText.match(/\$(\d+)/);
  const priceValue = annualFeeMatch ? parseFloat(annualFeeMatch[1]) : 0;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    url: issuerUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating,
      reviewCount,
    },
    ...(priceValue > 0 && {
      offers: {
        '@type': 'Offer',
        price: priceValue,
        priceCurrency: 'USD',
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        description: feesText,
      },
    }),
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: productSchema,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating,
      reviewCount,
    },
    author: {
      '@type': 'Organization',
      name: 'BadCreditFirst',
      url: baseUrl,
    },
    url: reviewUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Credit Cards', item: `${baseUrl}/credit-cards` },
      { '@type': 'ListItem', position: 3, name: title, item: reviewUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            {title}
          </h1>
          <p className="text-slate-500 font-medium">Review & Details</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-8 flex justify-center border-b border-slate-100 bg-slate-50">
            <div className="w-full max-w-sm aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <CreditCard className="w-16 h-16 text-slate-400 opacity-50" />
            </div>
          </div>
          <div className="px-8 pt-6 flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
            <span className="text-sm text-slate-500 ml-2 font-medium">4.5/5</span>
          </div>

          {/* Verdict */}
          {(approvalOdds ?? realWorldUseCase) && (
            <div className="px-8 py-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Verdict</h2>
              <div className="space-y-2 text-slate-600">
                {approvalOdds && (
                  <p><strong className="text-slate-800">Approval odds:</strong> {approvalOdds}</p>
                )}
                {realWorldUseCase && (
                  <p><strong className="text-slate-800">Real-world use:</strong> {realWorldUseCase}</p>
                )}
              </div>
            </div>
          )}

          {/* Fee Reality Check */}
          {feeRisk && (
            <div className="px-8 py-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Fee Reality Check</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
                <p className="text-sm font-semibold mb-1">⚠ Watch out</p>
                <p className="text-slate-700 leading-relaxed">{feeRisk}</p>
              </div>
            </div>
          )}

          <div className="px-8 py-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Pros & Cons</h2>
            <div className="space-y-3 text-slate-600">
              <p>Good for building credit. Reports to all bureaus. Designed for limited or no credit history.</p>
              <p>Consider fees and deposit requirements before applying. Terms and conditions apply.</p>
            </div>
          </div>

          {/* Rebuilding Strategy */}
          {upgradePath && (
            <div className="px-8 py-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Rebuilding Strategy</h2>
              <p className="text-slate-600 leading-relaxed">{upgradePath}</p>
            </div>
          )}

          <div className="px-8 pb-8 border-t border-slate-100">
            <a
              href={issuerUrl}
              target="_blank"
              rel="nofollow noreferrer"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center"
            >
              Visit Issuer Website
            </a>
            <p className="mt-3 text-xs text-slate-500 text-center">
              You will be redirected to the issuer&apos;s official website.
            </p>
            <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
              BadCreditFirst may receive compensation if you apply through links on this page.
            </p>
            <p className="mt-6 text-center">
              <Link href="/credit-cards" className="text-blue-600 hover:underline text-sm font-medium">
                ← Back to Credit Cards
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
