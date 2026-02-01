import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const options = [
  {
    label: 'I have NO credit history',
    href: '/credit-cards/credit-builder',
    description: 'Credit builder accounts & first-time options',
  },
  {
    label: 'I have Bad credit (Collection/Late Payments)',
    href: '/credit-cards/bad-credit',
    description: 'Cards and products for rebuilding',
  },
  {
    label: 'I want to avoid a credit check',
    href: '/credit-cards/secured-cards',
    description: 'No credit check secured cards',
  },
  {
    label: 'I am rebuilding after Bankruptcy',
    href: '/credit-cards/secured-cards',
    description: 'Secured cards that report to bureaus',
  },
];

export default function FunnelSelector() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
        What represents your situation?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => (
          <Link
            key={opt.href + opt.label}
            href={opt.href}
            className="group flex items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {opt.label}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{opt.description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
