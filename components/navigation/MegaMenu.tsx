'use client';

import Link from 'next/link';
import { COMPARE_CARDS, BUILD_CREDIT_CARDS, LEARN_LINKS, CARDS_LINKS } from './nav-data';

type PanelKey = 'compare' | 'build' | 'learn' | 'cards' | null;

interface MegaMenuProps {
  activePanel: PanelKey;
  onMouseEnter: (key: PanelKey) => void;
  onMouseLeave: () => void;
  close: () => void;
}

export default function MegaMenu({ activePanel, onMouseEnter, onMouseLeave, close }: MegaMenuProps) {
  if (!activePanel) return null;

  const LinkList = ({ links }: { links: { href: string; label: string }[] }) => (
    <div className="flex flex-col py-1 min-w-[180px]">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={close}
          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );

  const links =
    activePanel === 'compare' ? COMPARE_CARDS :
    activePanel === 'build' ? BUILD_CREDIT_CARDS :
    activePanel === 'learn' ? LEARN_LINKS :
    activePanel === 'cards' ? CARDS_LINKS : [];

  return (
    <div
      className="absolute left-0 top-full pt-1 z-20"
      onMouseEnter={() => onMouseEnter(activePanel)}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
        <LinkList links={links} />
      </div>
    </div>
  );
}
