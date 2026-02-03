'use client';

import { useEffect } from 'react';

export default function ResultsViewedTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasViewedResults', 'true');
    }
  }, []);
  return null;
}
