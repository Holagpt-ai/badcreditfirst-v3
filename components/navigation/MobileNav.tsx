'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import { Shield, Check } from 'lucide-react';
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
    href,
    links,
  }: {
    id: Section;
    label: string;
    href: string;
    links: { href: string; label: string }[];
  }) => (
    <div className="border-b border-slate-200">
      <div className="flex items-center justify-between">
        <Link
          href={href}
          onClick={onClose}
          className="block py-3 text-sm font-semibold text-slate-900 hover:text-blue-600"
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => toggle(id)}
          className="p-3 text-slate-500 hover:text-slate-700"
          aria-expanded={expanded === id}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expanded === id ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {expanded === id && (
        <div className="pb-3 pl-2 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
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
      {/* Header: Logo left, Hamburger right (competitor pattern) */}
      <div className="flex lg:hidden items-center justify-between h-14 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 min-w-0"
          aria-label="BadCreditFirst home"
          onClick={onClose}
        >
          <span className="relative inline-block w-7 h-7 shrink-0" aria-hidden>
            <Shield className="w-7 h-7 text-slate-600" />
            <Check
              className="w-3.5 h-3.5 text-green-600 absolute inset-0 m-auto"
              style={{ filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.35))' }}
              strokeWidth={3}
            />
          </span>
          <span className="text-base font-semibold text-slate-900 tracking-tight truncate">
            BadCreditFirst
          </span>
        </Link>
        <button
          type="button"
          onClick={() => (open ? onClose() : onOpen())}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 shrink-0"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Menu className="w-6 h-6" />
        </button>
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
        className={`fixed inset-y-0 right-0 w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-200 lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
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
          <SectionBlock id="learn" label="Learn" href="/education" links={LEARN_LINKS} />
          <SectionBlock id="about" label="About" href="/about" links={ABOUT_LINKS} />
        </div>
      </div>
    </>
  );
}
