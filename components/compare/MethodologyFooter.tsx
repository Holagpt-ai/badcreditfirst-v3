import Link from 'next/link';

export default function MethodologyFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-slate-200">
      <p className="text-sm text-slate-600 mb-2">
        Our rankings are editorial and not influenced by advertiser payments. See our full methodology.
      </p>
      <Link href="/how-we-rank-cards" className="text-blue-600 hover:underline text-sm font-medium">
        How we rank cards →
      </Link>
    </footer>
  );
}
