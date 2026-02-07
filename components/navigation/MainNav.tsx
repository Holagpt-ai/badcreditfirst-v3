'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Check } from 'lucide-react';
import MobileNav from './MobileNav';
import { BUILD_CREDIT_HREF, LEARN_LINKS, ABOUT_LINKS } from './nav-data';

type PanelKey = 'learn' | 'about' | null;

export default function MainNav() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closePanel = () => setActivePanel(null);

  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white z-50">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        {/* Mobile */}
        <div className="lg:hidden">
          <MobileNav
            open={mobileOpen}
            onOpen={() => setMobileOpen(true)}
            onClose={() => setMobileOpen(false)}
          />
        </div>

        {/* Desktop: Logo | Build Credit | Learn | About — no duplicate logo, dropdowns under labels */}
        <div
          className="hidden lg:flex items-center justify-between py-4"
          onMouseLeave={closePanel}
        >
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="BadCreditFirst home"
          >
            <span className="relative inline-block w-7 h-7 shrink-0" aria-hidden>
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
            {/* Build Credit: direct link, no dropdown */}
            <Link
              href={BUILD_CREDIT_HREF}
              className="px-3 py-2 text-sm font-bold text-slate-900 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              Build Credit
            </Link>

            {/* Learn: link + dropdown under label */}
            <div
              className="relative"
              onMouseEnter={() => setActivePanel('learn')}
              onMouseLeave={closePanel}
            >
              <Link
                href="/education"
                className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Learn
              </Link>
              {activePanel === 'learn' && (
                <div className="absolute left-0 top-full pt-1 z-20">
                  <div className="bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[180px]">
                    {LEARN_LINKS.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About: link + dropdown under label */}
            <div
              className="relative"
              onMouseEnter={() => setActivePanel('about')}
              onMouseLeave={closePanel}
            >
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              {activePanel === 'about' && (
                <div className="absolute left-0 top-full pt-1 z-20">
                  <div className="bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[180px]">
                    {ABOUT_LINKS.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
