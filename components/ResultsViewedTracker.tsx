'use client';

import { useEffect } from 'react';

export default function ResultsViewedTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('bcf_hasViewedResults', 'true');
      } catch {
        // ignore
      }
    }
  }, []);
  return null;
}
