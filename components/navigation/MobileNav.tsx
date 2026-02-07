'use client';

import Link from 'next/link';
import { Menu, X, Shield, Check } from 'lucide-react';
import { MOBILE_NAV_SECTIONS } from './nav-data';

interface MobileNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MobileNav({ open, onOpen, onClose }: MobileNavProps) {
  const SectionBlock = ({
    title,
    href,
    links,
  }: {
    title: string;
    href?: string;
    links: { href: string; label: string }[];
  }) => (
    <div className="border-b border-slate-200 pb-4 last:border-b-0">
      {href ? (
        <Link
          href={href}
          onClick={onClose}
          className="block py-2 text-sm font-semibold text-slate-900 hover:text-blue-600"
        >
          {title}
        </Link>
      ) : (
        <div className="py-2 text-sm font-semibold text-slate-900">{title}</div>
      )}
      <div className="space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="block py-2.5 pl-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Header bar */}
      <div className="flex lg:hidden items-center justify-between h-16 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="BadCreditFirst home"
          onClick={onClose}
        >
          <span className="relative inline-block w-8 h-8 sm:w-10 sm:h-10 shrink-0" aria-hidden>
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900" />
            <Check
              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 absolute inset-0 m-auto"
              style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.35))' }}
              strokeWidth={3}
            />
          </span>
          <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            BadCreditFirst
          </span>
        </Link>
        <button
          type="button"
          onClick={() => (open ? onClose() : onOpen())}
          className="flex items-center gap-2 p-2 -mr-2 text-slate-700 hover:text-slate-900"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          <span className="text-xs sm:text-sm font-semibold">Menu</span>
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
        <div className="pt-16 pb-8 px-4 space-y-5">
          {MOBILE_NAV_SECTIONS.map((section) => (
            <SectionBlock
              key={section.title}
              title={section.title}
              href={section.href}
              links={section.links}
            />
          ))}
        </div>
      </div>
    </>
  );
}
