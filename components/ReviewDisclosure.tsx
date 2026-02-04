import Link from 'next/link';

/** Variant: compact near CTA vs full "How we make money" block. */
export type ReviewDisclosureVariant = 'cta' | 'full';

interface ReviewDisclosureProps {
  variant?: ReviewDisclosureVariant;
}

/**
 * CTA variant: Offer positioning disclaimer placed immediately before/after Apply button.
 * Short, scannable. Reinforces trust at conversion point.
 */
function CtaDisclosure() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
      <p className="font-semibold text-slate-700 mb-1">Offer disclosure</p>
      <p className="leading-relaxed">
        BadCreditFirst may receive compensation if you apply through this link. Our review and rating are independent. Compensation does not affect our editorial opinions or product rankings.
      </p>
      <Link href="/advertiser-disclosure" className="mt-2 inline-block text-blue-600 hover:underline font-medium">
        How we make money →
      </Link>
    </div>
  );
}

/**
 * Full variant: Explicit "How we make money" block.
 * Clear separation of editorial vs affiliate. Use above CTA section.
 */
function FullDisclosure() {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-slate-50 p-6"
      aria-labelledby="how-we-make-money"
    >
      <h2 id="how-we-make-money" className="text-lg font-bold text-slate-900 mb-3">
        How we make money
      </h2>
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
        <p>
          BadCreditFirst is an advertising-supported comparison site. We may earn a commission when you apply for products through our links. This helps us provide free content.
        </p>
        <p>
          <strong className="text-slate-800">Editorial vs affiliate:</strong> Our reviews, ratings, and recommendations are independent. We do not rank products by compensation. See our{' '}
          <Link href="/how-we-rank-cards" className="text-blue-600 hover:underline">methodology</Link> and{' '}
          <Link href="/advertiser-disclosure" className="text-blue-600 hover:underline">advertiser disclosure</Link>.
        </p>
      </div>
    </section>
  );
}

export default function ReviewDisclosure({ variant = 'cta' }: ReviewDisclosureProps) {
  return variant === 'full' ? <FullDisclosure /> : <CtaDisclosure />;
}
