'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import { getDisclosureForNetwork, getActiveNetwork } from '@/lib/compliance';

/**
 * Lightweight conversion trust layer for affiliate-network compliance.
 * Uses lib/compliance.ts for CJ, Impact, Partnerize-specific disclosures.
 * Place near first monetized CTA. No banners, popups, or cookie junk.
 */
interface ConversionTrustLayerProps {
  /** Show "Approval not guaranteed" near buttons. Default true. */
  showApprovalDisclaimer?: boolean;
  /** Show "Independent & Advertising-Supported" microcopy. Default true. */
  showIndependentCopy?: boolean;
  /** Show editorial disclaimer tooltip. Default true. */
  showEditorialTooltip?: boolean;
  /** Compact variant for tight layouts (e.g. inline with CTA). */
  variant?: 'default' | 'compact';
}

function EditorialTooltip() {
  return (
    <span title="Our reviews are independent. We do not rank by compensation.">
      <Info
        className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0"
        aria-label="Editorial disclaimer"
      />
    </span>
  );
}

export default function ConversionTrustLayer({
  showApprovalDisclaimer = true,
  showIndependentCopy = true,
  showEditorialTooltip = true,
  variant = 'compact',
}: ConversionTrustLayerProps) {
  const network = getActiveNetwork();
  const disclosure = getDisclosureForNetwork(network);

  if (variant === 'compact') {
    return (
      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 flex-wrap">
        {showIndependentCopy && (
          <>
            <span>{disclosure.short}</span>
            {showEditorialTooltip && <EditorialTooltip />}
          </>
        )}
        {showApprovalDisclaimer && (
          <span>Approval not guaranteed.</span>
        )}
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 space-y-2">
      {showIndependentCopy && (
        <p className="leading-relaxed flex items-start gap-1.5">
          <span>{disclosure.full}</span>
          {showEditorialTooltip && <EditorialTooltip />}
        </p>
      )}
      {showApprovalDisclaimer && (
        <p className="leading-relaxed">
          <strong className="text-slate-700">Approval not guaranteed.</strong> Issuers decide eligibility. Terms apply.
        </p>
      )}
      <p className="leading-relaxed">
        <Link href="/advertiser-disclosure" className="text-blue-600 hover:underline font-medium">
          How we make money
        </Link>
        {' · '}
        <Link href="/editorial-disclaimer" className="text-blue-600 hover:underline font-medium">
          Editorial disclaimer
        </Link>
      </p>
    </div>
  );
}
