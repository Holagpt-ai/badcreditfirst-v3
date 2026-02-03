import { Check, Shield, RefreshCw, CheckCircle2 } from 'lucide-react';

const BADGES = [
  { icon: Check, label: 'Editorially Reviewed' },
  { icon: CheckCircle2, label: 'No Impact on Your Credit Score' },
  { icon: Shield, label: 'Secure Application (Issuer Hosted)' },
  { icon: RefreshCw, label: 'Updated Regularly' },
] as const;

export default function TrustBadges() {
  return (
    <section
      className="flex flex-wrap justify-center gap-6 py-6 px-4 text-slate-600"
      aria-label="Trust indicators"
    >
      {BADGES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Icon className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
