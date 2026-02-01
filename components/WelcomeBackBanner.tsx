'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'bcf_segment';

const SEGMENT_DISPLAY: Record<string, string> = {
  'no-credit-deposit': 'No Credit (Can Pay Deposit)',
  'no-credit-no-deposit': 'No Credit (No Deposit)',
  'bad-credit-deposit': 'Bad Credit (Can Pay Deposit)',
  'bad-credit-no-deposit': 'Bad Credit (No Deposit)',
  'denied-deposit': 'Recently Denied (Can Pay Deposit)',
  'denied-no-deposit': 'Recently Denied (No Deposit)',
  'rebuilding-deposit': 'Rebuilding (Can Pay Deposit)',
  'rebuilding-no-deposit': 'Rebuilding (No Deposit)',
};

export default function WelcomeBackBanner() {
  const [segment, setSegment] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SEGMENT_DISPLAY[saved]) setSegment(saved);
    } catch {
      // ignore
    }
  }, []);

  if (!segment) return null;

  const displayName = SEGMENT_DISPLAY[segment];
  const resultsHref = `/credit-cards/results/${segment}`;

  return (
    <div className="bg-blue-50 border-b border-blue-200">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-slate-700 font-medium">Welcome back!</span>
        <Link
          href={resultsHref}
          className="text-blue-600 hover:text-blue-700 font-semibold underline"
        >
          View your results for {displayName}
        </Link>
      </div>
    </div>
  );
}
