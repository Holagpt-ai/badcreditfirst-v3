import type { ReactNode } from 'react';
import type { ABVariant } from '@/lib/ab-guardrails';

export type AffiliateCTAVariant = 'primary' | 'secondary';

interface AffiliateCTAProps {
  href: string;
  label: string;
  variant?: AffiliateCTAVariant;
  disabled?: boolean;
  /** A/B variant: affects button color only. A=blue, B=emerald. */
  abVariant?: ABVariant;
  /** Renders immediately after the button. Use for ConversionTrustLayer. */
  after?: ReactNode;
}

const BASE_CLASSES =
  'w-full py-4 font-bold rounded-lg shadow-sm transition-all text-center flex items-center justify-center';

const PRIMARY_CLASSES =
  'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md';

const PRIMARY_ALT_CLASSES =
  'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md';

const SECONDARY_CLASSES =
  'bg-slate-200 hover:bg-slate-300 text-slate-800';

function getColorClasses(variant: AffiliateCTAVariant, abVariant: ABVariant): string {
  if (variant === 'secondary') return SECONDARY_CLASSES;
  return abVariant === 'B' ? PRIMARY_ALT_CLASSES : PRIMARY_CLASSES;
}

export default function AffiliateCTA({
  href,
  label,
  variant = 'primary',
  disabled = false,
  abVariant = 'A',
  after,
}: AffiliateCTAProps) {
  const classes = [
    BASE_CLASSES,
    getColorClasses(variant, abVariant),
  ].join(' ');

  if (disabled) {
    return (
      <div className="space-y-3">
        <div
          className={`${BASE_CLASSES} bg-slate-200 text-slate-600 cursor-not-allowed`}
          aria-disabled="true"
        >
          {label}
        </div>
        {after}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className={classes}
      >
        {label}
      </a>
      {after}
    </div>
  );
}
