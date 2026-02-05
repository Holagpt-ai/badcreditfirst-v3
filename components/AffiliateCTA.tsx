import type { ReactNode } from 'react';

export type AffiliateCTAVariant = 'primary' | 'secondary';

interface AffiliateCTAProps {
  href: string;
  label: string;
  variant?: AffiliateCTAVariant;
  disabled?: boolean;
  /** Renders immediately after the button. Use for ConversionTrustLayer. */
  after?: ReactNode;
}

const BASE_CLASSES =
  'w-full py-4 font-bold rounded-lg shadow-sm transition-all text-center flex items-center justify-center';

const PRIMARY_CLASSES =
  'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md';

const SECONDARY_CLASSES =
  'bg-slate-200 hover:bg-slate-300 text-slate-800';

export default function AffiliateCTA({
  href,
  label,
  variant = 'primary',
  disabled = false,
  after,
}: AffiliateCTAProps) {
  const classes = [
    BASE_CLASSES,
    variant === 'primary' ? PRIMARY_CLASSES : SECONDARY_CLASSES,
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
