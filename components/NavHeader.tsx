'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Check, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { NAV_ITEMS, NAV_ABOUT, TRUST_TOOLTIP_LINES } from '@/lib/nav-config';

export default function NavHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [trustOpen, setTrustOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const trustRefMobile = useRef<HTMLDivElement>(null);
  const trustRefDesktop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      const inTrust = (trustRefMobile.current?.contains(e.target as Node)) || (trustRefDesktop.current?.contains(e.target as Node));
      if (!inTrust) setTrustOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobile = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white z-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Mobile header */}
        <div className="flex md:hidden items-center justify-between h-14">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 "
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
                {TRUST_TOOLTIP_LINES.map((line) => (
                  <div key={line} className="flex items-center gap-2 text-xs text-slate-700 py-0.5">
                    <Check className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden="true" />
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between py-4 relative">
          <nav className="flex items-center gap-1" ref={dropdownRef} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setOpenDropdown(openDropdown === item.label ? null : item.label);
                        }
                      }}
                      className={`flex items-center gap-0.5 px-3 py-2 text-sm rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors ${
                        item.label === 'Compare' ? 'font-bold text-slate-900' : 'font-medium text-slate-600'
                      }`}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </button>
                    {openDropdown === item.label && (
                      <div
                        className="absolute left-0 top-full pt-1 z-20"
                        role="menu"
                      >
                        <div className="py-1 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[200px]">
                          {item.href && (
                            <Link
                              href={item.href}
                              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-t-lg"
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                            >
                              View all
                            </Link>
                          )}
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href ?? '#'}
                    className={`px-3 py-2 text-sm rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors ${
                      item.label === 'Compare' ? 'font-bold text-slate-900' : 'font-medium text-slate-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-2">
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
                  {TRUST_TOOLTIP_LINES.map((line) => (
                    <div key={line} className="flex items-center gap-2 text-xs text-slate-700 py-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden="true" />
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-normal text-slate-500 hover:text-slate-700 transition-colors"
              aria-label="BadCreditFirst home"
            >
              <span className="relative inline-block w-7 h-7 shrink-0" aria-hidden="true">
                <Shield className="w-7 h-7 text-slate-400" />
                <Check className="w-3.5 h-3.5 text-green-500 absolute inset-0 m-auto" style={{ filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.35))' }} strokeWidth={3} />
              </span>
              <span className="text-sm">BadCreditFirst</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-200 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full pt-14 pb-6 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-slate-100">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleMobile(item.label)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? 'rotate-90' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="bg-slate-50 py-1">
                      {item.href && (
                        <Link
                          href={item.href}
                          className="block px-6 py-2 text-sm text-slate-600 hover:text-blue-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          View all
                        </Link>
                      )}
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-6 py-2 text-sm text-slate-600 hover:text-blue-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href ?? '#'}
                  className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="border-b border-slate-100">
            <Link
              href={NAV_ABOUT.href}
              className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              {NAV_ABOUT.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
