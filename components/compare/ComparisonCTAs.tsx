import Link from 'next/link';
import type { ComparisonPage } from '@/data/comparisons';
import { getCardBySlug } from '@/lib/card-data';
import { shouldLinkTo } from '@/lib/rollout-control';
import type { ABVariant } from '@/lib/ab-guardrails';
import ConversionTrustLayer from '@/components/ConversionTrustLayer';
import AffiliateCTA from '@/components/AffiliateCTA';

interface Props {
  data: ComparisonPage;
  /** Affiliate offer href from getPrimaryOffer. */
  affiliateHref?: string;
  /** A/B variant for CTA color. */
  abVariant?: ABVariant;
}

/**
 * Hub → Comparison → Review CTA sequencing.
 * Internal CTAs (view full review) + optional soft affiliate CTA (max 1).
 * Disclosure before first monetized CTA.
 */
export default function ComparisonCTAs({ data, affiliateHref, abVariant = 'A' }: Props) {
  const { ctaMap, entityA, entityB } = data;
  const cardA = getCardBySlug(entityA.slug);
  const cardB = getCardBySlug(entityB.slug);
  const activeCard = [cardA, cardB]
    .filter((c) => c?.status === 'active')
    .sort((a, b) => (b?.editorialScore ?? 0) - (a?.editorialScore ?? 0))[0];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Read full reviews to decide</h2>
      <p className="text-slate-600 text-sm mb-4">
        Compare fees, approval odds, and credit-building value before applying.
      </p>
      <div className="flex flex-wrap gap-4">
        {shouldLinkTo(ctaMap.entityA.href) && (
          <Link
            href={ctaMap.entityA.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            {ctaMap.entityA.label}
          </Link>
        )}
        {shouldLinkTo(ctaMap.entityB.href) && (
          <Link
            href={ctaMap.entityB.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            {ctaMap.entityB.label}
          </Link>
        )}
      </div>
      {activeCard && affiliateHref && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <ConversionTrustLayer variant="compact" />
          <div className="mt-3 max-w-xs">
            <AffiliateCTA
              href={affiliateHref}
              label={`Apply for ${(entityA.slug === activeCard.slug ? entityA.name : entityB.name).replace(/®/g, '')}`}
              variant="secondary"
              abVariant={abVariant}
            />
          </div>
        </div>
      )}
    </section>
  );
}
