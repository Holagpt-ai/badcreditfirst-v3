'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Check } from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';

type PanelKey = 'compare' | 'build' | 'learn' | 'cards' | null;

const TOP_LINKS: { key: PanelKey; href: string; label: string }[] = [
  { key: 'compare', href: '/compare', label: 'Compare Cards' },
  { key: 'build', href: '/credit-cards', label: 'Build Credit' },
  { key: 'learn', href: '/education', label: 'Learn' },
  { key: 'cards', href: '/credit-cards', label: 'Cards' },
];

export default function MainNav() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMega = () => setActivePanel(null);

  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white z-50" ref={navRef}>
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        {/* Mobile: MobileNav handles header + slide-out */}
        <div className="lg:hidden">
          <MobileNav
            open={mobileOpen}
            onOpen={() => setMobileOpen(true)}
            onClose={() => setMobileOpen(false)}
          />
        </div>

        {/* Desktop: Logo | Compare Cards Build Credit Learn Tools | Trust + MegaMenu */}
        <div
          className="hidden lg:block relative"
          onMouseLeave={closeMega}
        >
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
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
                {TOP_LINKS.map((item) => (
                  <div
                    key={item.key}
                    onMouseEnter={() => setActivePanel(item.key)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors ${
                        item.label === 'Compare Cards'
                          ? 'font-bold text-slate-900'
                          : 'font-medium text-slate-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <MegaMenu
              activePanel={activePanel}
              onMouseEnter={setActivePanel}
              onMouseLeave={closeMega}
              close={closeMega}
            />
        </div>
      </div>
    </header>
  );
}
