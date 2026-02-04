import Link from 'next/link';
import { Check, Shield, RefreshCw, FileText, User } from 'lucide-react';

/**
 * Conversion Trust Layering
 * Trust badges (non-spammy) + methodology links + author/editorial graph surfaced visually.
 */

const BADGES = [
  { icon: Check, label: 'Editorially Reviewed' },
  { icon: Shield, label: 'Secure Application (Issuer Hosted)' },
  { icon: RefreshCw, label: 'Updated Regularly' },
] as const;

interface TrustSignalsProps {
  /** Compact: badges + links inline. Full: adds author block. */
  variant?: 'compact' | 'full';
}

export default function TrustSignals({ variant = 'compact' }: TrustSignalsProps) {
  return (
    <section
      className="flex flex-col gap-4 py-4"
      aria-label="Trust signals"
    >
      {/* Trust badges — minimal, non-spammy */}
      <div className="flex flex-wrap justify-center gap-4 text-slate-600">
        {BADGES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-xs font-medium"
          >
            <Icon className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Methodology links near CTA */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
        <Link
          href="/how-we-rank-cards"
          className="text-slate-500 hover:text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          How we review cards
        </Link>
        <Link
          href="/editorial-disclaimer"
          className="text-slate-500 hover:text-blue-600 hover:underline"
        >
          Editorial policy
        </Link>
      </div>

      {/* Author + editorial graph surfaced visually */}
      {variant === 'full' && (
        <div className="flex justify-center">
          <Link
            href="/author/carlos-acosta"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 hover:underline"
          >
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reviewed by Carlos Acosta</span>
          </Link>
        </div>
      )}
    </section>
  );
}
