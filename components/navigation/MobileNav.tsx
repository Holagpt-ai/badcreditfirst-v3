'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Check, Menu, ChevronDown } from 'lucide-react';
import {
  COMPARE_CARDS,
  BUILD_CREDIT_CARDS,
  LEARN_LINKS,
  TOOLS_LINKS,
} from './nav-data';

const TRUST_LINES = ['No impact to credit score', 'Pre-qualified offers', 'Secure application'];

type Section = 'compare' | 'build' | 'learn' | 'tools' | null;

interface MobileNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  trustOpen: boolean;
  onTrustToggle: () => void;
}

export default function MobileNav({ open, onOpen, onClose, trustOpen, onTrustToggle }: MobileNavProps) {
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
              className="block w-full py-3 px-4 text-center text-sm font-medium bg-slate-100 text-slate-800 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
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
          href="/compare"
          className="text-sm font-semibold text-slate-800 hover:text-blue-600"
          onClick={onClose}
        >
          Compare Cards
        </Link>
        <button
          type="button"
          onClick={onTrustToggle}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900"
          aria-label="Trust information"
        >
          <Shield className="w-6 h-6" />
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
        className={`fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-200 lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal
        aria-label="Navigation"
      >
        <div className="pt-14 pb-8 px-4">
          {trustOpen && (
            <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              {TRUST_LINES.map((line) => (
                <div key={line} className="flex items-center gap-2 text-xs text-slate-700 py-1">
                  <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  {line}
                </div>
              ))}
            </div>
          )}
          <SectionBlock id="compare" label="Compare Cards" links={COMPARE_CARDS} />
          <SectionBlock id="build" label="Build Credit" links={BUILD_CREDIT_CARDS} />
          <SectionBlock id="learn" label="Learn" links={LEARN_LINKS} />
          <SectionBlock id="tools" label="Tools" links={TOOLS_LINKS} />
          <div className="border-b border-slate-200 pt-2">
            <Link
              href="/about"
              onClick={onClose}
              className="block py-3 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
