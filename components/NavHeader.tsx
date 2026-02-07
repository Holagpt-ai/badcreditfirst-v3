'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Check, Menu } from 'lucide-react';
import {
  DESKTOP_NAV_LINKS,
  MOBILE_TOP_BUTTONS,
  MOBILE_LINKS,
  TRUST_TOOLTIP_LINES,
} from '@/lib/nav-config';

export default function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trustOpen, setTrustOpen] = useState(false);
  const trustRefMobile = useRef<HTMLDivElement>(null);
  const trustRefDesktop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const inTrust =
        trustRefMobile.current?.contains(e.target as Node) ||
        trustRefDesktop.current?.contains(e.target as Node);
      if (!inTrust) setTrustOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const TrustTooltip = () => (
    <>
      {TRUST_TOOLTIP_LINES.map((line) => (
        <div key={line} className="flex items-center gap-2 text-xs text-slate-700 py-0.5">
          <Check className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden="true" />
          {line}
        </div>
      ))}
    </>
  );

  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white z-50">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        {/* Mobile header: hamburger | Compare Cards | Trust — no logo */}
        <div className="flex lg:hidden items-center justify-between h-14">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
          <Link
            href="/compare"
            className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
          >
            Compare Cards
          </Link>
          <div className="relative" ref={trustRefMobile}>
            <button
              type="button"
              onClick={() => setTrustOpen(!trustOpen)}
              className="p-2 -mr-2 text-slate-600 hover:text-slate-900"
              aria-label="Trust information"
              aria-expanded={trustOpen}
            >
              <Shield className="w-6 h-6" aria-hidden="true" />
            </button>
            {trustOpen && (
              <div
                className="absolute right-0 top-full mt-1 py-2 px-3 bg-white border border-slate-200 rounded-lg shadow-lg text-left min-w-[180px] z-10"
                role="tooltip"
              >
                <TrustTooltip />
              </div>
            )}
          </div>
        </div>

        {/* Desktop: Logo | Compare Cards Build Credit Learn Tools | Trust — one logo, left, no dropdowns */}
        <div className="hidden lg:flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="BadCreditFirst home"
            >
              <span className="relative inline-block w-7 h-7 shrink-0" aria-hidden="true">
                <Shield className="w-7 h-7 text-slate-600" />
                <Check
                  className="w-3.5 h-3.5 text-green-600 absolute inset-0 m-auto"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.35))' }}
                  strokeWidth={3}
                />
              </span>
              <span className="text-base font-semibold text-slate-900 tracking-tight">
                BadCreditFirst
              </span>
            </Link>
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {DESKTOP_NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors ${
                    item.label === 'Compare Cards' ? 'font-bold text-slate-900' : 'font-medium text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="relative" ref={trustRefDesktop}>
            <button
              type="button"
              onMouseEnter={() => setTrustOpen(true)}
              onMouseLeave={() => setTrustOpen(false)}
              onClick={() => setTrustOpen(!trustOpen)}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded"
              aria-label="Trust information"
            >
              <Shield className="w-5 h-5" />
            </button>
            {trustOpen && (
              <div
                className="absolute right-0 top-full mt-1 py-2 px-3 bg-white border border-slate-200 rounded-lg shadow-lg text-left min-w-[180px] z-30"
                role="tooltip"
              >
                <TrustTooltip />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out menu: top buttons + flat links */}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full pt-14 pb-6 overflow-y-auto px-4">
          {/* Top section: button-style CTAs */}
          <div className="flex flex-col gap-2 mb-6">
            {MOBILE_TOP_BUTTONS.map((btn) => (
              <Link
                key={btn.href}
                href={btn.href}
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3 px-4 text-center text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {btn.label}
              </Link>
            ))}
          </div>

          {/* Simple grouped links — no accordion */}
          <div className="space-y-1 border-t border-slate-200 pt-4">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
