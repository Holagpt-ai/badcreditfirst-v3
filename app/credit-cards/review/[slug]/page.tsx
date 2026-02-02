import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, CreditCard } from 'lucide-react';
import { getCardBySlug, getAffiliateLink } from '../../../../lib/card-data';
import { categories } from '../../../../lib/categories';
import { getProductSchema, getReviewSchema, getBreadcrumbSchema } from '../../../../lib/schema';

const baseUrl = 'https://www.badcreditfirst.com';

/** Contextual education link shown on every review. */
const EDUCATION_LINK = { href: '/education/how-is-my-score-calculated', label: 'How Credit Scores Work' };

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
    notFound();
  }

  const { approvalOdds, realWorldUseCase, feeRisk, upgradePath, title, fees, badFor, categorySlug, editorialScore, status } = card;
  const isComingSoon = status === 'coming-soon';
  const applyHref = getAffiliateLink(slug);
  const reviewUrl = `${baseUrl}${card.reviewUrl}`;
  const ratingValue = '4.5'; // Schema unchanged (display-only uses editorialScore)
  const bestRating = 5;
  const displayScore = Math.min(bestRating, Math.max(4.1, editorialScore ?? 4.5));
  const fullStars = Math.floor(displayScore);
  const partialOpacity = displayScore - fullStars;
  const feesText = fees ?? '';
  const annualFeeMatch = feesText.match(/\$(\d+)/);
  const priceValue = annualFeeMatch ? parseFloat(annualFeeMatch[1]) : 0;
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const parentCategory = categorySlug ? categories[categorySlug] : null;
  const categoryTitle = parentCategory?.title ?? 'Credit Cards';
  const categoryHref = parentCategory ? `/credit-cards/category/${categorySlug}` : '/credit-cards';

  const productSchema = getProductSchema({
    name: title,
    url: card.issuerUrl,
    ratingValue,
    bestRating,
    ...(priceValue > 0 && {
      price: priceValue,
      priceCurrency: 'USD',
      priceValidUntil,
      description: feesText,
    }),
  });

  const reviewSchema = getReviewSchema({
    productSchema,
    reviewUrl,
    ratingValue,
    bestRating,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Credit Cards', url: '/credit-cards' },
    { name: title, url: card.reviewUrl },
  ]);

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            {title}
          </h1>
          <p className="text-slate-500 font-medium">Review & Details</p>
        </div>

        {/* BadCreditFirst Verdict — at top, prominent (approvalOdds + realWorldUseCase) */}
        <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            BadCreditFirst Verdict
          </h2>
          <div className="space-y-3 text-slate-700">
            {approvalOdds && (
              <p>
                <strong className="text-slate-900">Approval odds:</strong>{' '}
                {approvalOdds}
              </p>
            )}
            {realWorldUseCase && (
              <p>
                <strong className="text-slate-900">Real-world use:</strong>{' '}
                {realWorldUseCase}
              </p>
            )}
          </div>
        </div>

        <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ${isComingSoon ? 'opacity-90 bg-slate-50/50' : ''}`}>
          {/* Card image placeholder */}
          <div className="p-8 flex justify-center border-b border-slate-100 bg-slate-50">
            <div className="w-full max-w-sm aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <CreditCard className="w-16 h-16 text-slate-400 opacity-50" aria-hidden="true" />
            </div>
          </div>

          {/* Rating (display-only; editorialScore 4.1–4.6) */}
          <div className="px-8 pt-6 flex items-center gap-2" aria-label={`Rating: ${displayScore.toFixed(1)} out of ${bestRating}`}>
            {Array.from({ length: fullStars }, (_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 shrink-0" aria-hidden="true" />
            ))}
            {fullStars < bestRating && (
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 shrink-0" style={{ opacity: partialOpacity }} aria-hidden="true" />
            )}
            <span className="text-sm text-slate-500 ml-2 font-medium">{displayScore.toFixed(1)}/5</span>
          </div>

          {/* Risks & Downsides — feeRisk + badFor (honest analysis) */}
          {(feeRisk ?? badFor) && (
            <div className="px-8 py-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Risks & Downsides
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
                <p className="text-sm font-semibold mb-2">⚠ Honest take</p>
                <ul className="space-y-2 text-slate-700">
                  {feeRisk && (
                    <li><strong className="text-slate-800">Fees:</strong> {feeRisk}</li>
                  )}
                  {badFor && (
                    <li><strong className="text-slate-800">Not for:</strong> {badFor}</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="px-8 py-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Pros & Cons</h2>
            <div className="space-y-3 text-slate-600">
              <p>Good for building credit. Reports to all bureaus. Designed for limited or no credit history.</p>
              <p>Consider fees and deposit requirements before applying. Terms and conditions apply.</p>
            </div>
          </div>

          {/* Upgrade Path */}
          {upgradePath && (
            <div className="px-8 py-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Upgrade Path</h2>
              <p className="text-slate-600 leading-relaxed">{upgradePath}</p>
            </div>
          )}

          {/* CTA + Internal links */}
          <div className="px-8 pb-8 border-t border-slate-100">
            {isComingSoon ? (
              <div className="w-full py-4 bg-slate-200 text-slate-600 font-semibold rounded-lg text-center cursor-not-allowed" aria-disabled="true">
                Coming Soon
              </div>
            ) : (
              <>
                <a
                  href={applyHref}
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
              </>
            )}

            {/* Internal linking: parent category (every review) + 1 contextual education link */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap gap-4 justify-center text-sm">
              <Link href={categoryHref} className="text-blue-600 hover:underline font-medium">
                ← Back to {categoryTitle}
              </Link>
              <Link href={EDUCATION_LINK.href} className="text-blue-600 hover:underline font-medium">
                Read: {EDUCATION_LINK.label}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
