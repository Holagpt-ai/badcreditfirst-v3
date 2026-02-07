'use client';

import Link from 'next/link';
import { COMPARE_CARDS, BUILD_CREDIT_CARDS, LEARN_LINKS, TOOLS_LINKS } from './nav-data';

type PanelKey = 'compare' | 'build' | 'learn' | 'tools' | null;

interface MegaMenuProps {
  activePanel: PanelKey;
  onMouseEnter: (key: PanelKey) => void;
  onMouseLeave: () => void;
  close: () => void;
}

export default function MegaMenu({ activePanel, onMouseEnter, onMouseLeave, close }: MegaMenuProps) {
  if (!activePanel) return null;

  const CardGrid = ({ cards, title }: { cards: { href: string; label: string }[]; title: string }) => (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            onClick={close}
            className="flex flex-col justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );

  const SlimList = ({ links, title }: { links: { href: string; label: string }[]; title: string }) => (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="flex flex-col gap-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="absolute left-0 right-0 top-full border-t border-slate-200 bg-slate-50/95 shadow-lg"
      onMouseEnter={() => onMouseEnter(activePanel)}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
        {activePanel === 'compare' && (
          <CardGrid cards={COMPARE_CARDS} title="Compare by category" />
        )}
        {activePanel === 'build' && (
          <CardGrid cards={BUILD_CREDIT_CARDS} title="By your situation" />
        )}
        {activePanel === 'learn' && (
          <SlimList links={LEARN_LINKS} title="Learn" />
        )}
        {activePanel === 'tools' && (
          <SlimList links={TOOLS_LINKS} title="Tools" />
        )}
      </div>
    </div>
  );
}
