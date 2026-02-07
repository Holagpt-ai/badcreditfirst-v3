'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import { BUILD_CREDIT_HREF, LEARN_LINKS, ABOUT_LINKS } from './nav-data';

type Section = 'learn' | 'about' | null;

interface MobileNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MobileNav({ open, onOpen, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<Section>(null);

  const toggle = (s: Section) => setExpanded((prev) => (prev === s ? null : s));

  const SectionBlock = ({
    id,
    label,
    links,
  }: {
    id: Section;
    label: string;
    links: { href: string; label: string }[];
  }) => (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => toggle(id)}
        className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-slate-800"
        aria-expanded={expanded === id}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${expanded === id ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded === id && (
        <div className="pb-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="block py-2.5 px-4 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Header bar */}
      <div className="flex lg:hidden items-center justify-between h-14 px-4">
        <button
          type="button"
          onClick={() => (open ? onClose() : onOpen())}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link
          href={BUILD_CREDIT_HREF}
          className="text-sm font-semibold text-slate-800 hover:text-blue-600"
          onClick={onClose}
        >
          Build Credit
        </Link>
        <div className="w-10" />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          aria-hidden
          onClick={onClose}
        />
      )}

      {/* Slide-out */}
      <div
        className={`fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-200 lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal
        aria-label="Navigation"
      >
        <div className="pt-14 pb-8 px-4">
          <Link
            href={BUILD_CREDIT_HREF}
            onClick={onClose}
            className="block py-3 text-sm font-bold text-slate-900 hover:text-blue-600 border-b border-slate-200"
          >
            Build Credit
          </Link>
          <SectionBlock id="learn" label="Learn" links={LEARN_LINKS} />
          <SectionBlock id="about" label="About" links={ABOUT_LINKS} />
        </div>
      </div>
    </>
  );
}
