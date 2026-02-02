'use client';

import React from 'react';
import { Star, Check, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAffiliateLink } from '@/lib/card-data';
import { trackEvent } from '@/lib/analytics';

interface DetailedCardRowProps {
  title: string;
  label: string;
  highlights: string[];
  fees: string;
  creditScore: string;
  slug: string;
  /** Path to the single-card review page, e.g. /credit-cards/review/opensky-secured-visa */
  reviewUrl: string;
  /** Optional: segment from funnel for affiliate subid (e.g. no-credit-deposit). */
  segment?: string;
  /** Optional: position in list for affiliate subid (1-based). */
  position?: number;
  /** Editorial star rating for display only (4.1–4.6). */
  editorialScore?: number;
  /** Card availability: active (Apply CTA) or coming-soon (no issuer link). */
  status?: 'active' | 'coming-soon';
  /** Why we recommend this card (editorial, one sentence). */
  whyRecommended?: string;
}

const BEST_RATING = 5;

export default function DetailedCardRow({ title, label, highlights, fees, creditScore, slug, reviewUrl, segment, position, editorialScore = 4.5, status = 'active', whyRecommended }: DetailedCardRowProps) {
  const applyHref = getAffiliateLink(slug, segment, position);
  const score = Math.min(BEST_RATING, Math.max(4.1, editorialScore));
  const fullStars = Math.floor(score);
  const partialOpacity = score - fullStars;
  const isComingSoon = status === 'coming-soon';

  const handleApplyClick = () => {
    if (!isComingSoon) trackEvent('apply_click', 'Card', slug, position ?? 0);
  };

  return (

  <div className={`flex flex-col md:flex-row ${isComingSoon ? 'opacity-75 bg-slate-50/80' : ''}`}>
    {/* LEFT: Compliant Image Placeholder (No Logos) */}
    <div className="w-full md:w-[220px] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50">
       <div className="w-full aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" aria-hidden="true" />
          <CreditCard className="w-10 h-10 text-slate-400 opacity-50" aria-hidden="true" />
       </div>
       <p className="mt-3 text-xs text-slate-400 font-medium">Image for illustration</p>
    </div>
    {/* MIDDLE: Card Data */}
    <div className="flex-1 p-6">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 leading-tight hover:text-blue-600 transition-colors">
              <Link href={reviewUrl}>
                {title}
              </Link>
            </h3>
          </div>
          
          <div className="flex items-center mb-4 space-x-1" aria-label={`Rating: ${score.toFixed(1)} out of ${BEST_RATING}`}>
            {Array.from({ length: fullStars }, (_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" aria-hidden="true" />
            ))}
            {fullStars < BEST_RATING && (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" style={{ opacity: partialOpacity }} aria-hidden="true" />
            )}
            <span className="text-xs text-slate-500 ml-2 font-medium">{score.toFixed(1)}/5</span>
          </div>
          {whyRecommended && (
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">{whyRecommended}</p>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-slate-500 text-xs uppercase font-semibold">Annual Fee</p>
              <p className="font-bold text-slate-800">{fees}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase font-semibold">Credit Rec.</p>
              <p className="font-bold text-slate-800">{creditScore}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-600">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    {/* RIGHT: Action Area */}
    <div className={`w-full md:w-[280px] p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 ${isComingSoon ? 'bg-slate-100' : 'bg-slate-50'}`}>
        {isComingSoon ? (
          <div className="w-full py-4 bg-slate-300 text-slate-600 font-semibold rounded-lg text-center cursor-not-allowed" aria-disabled="true">
            Coming Soon
          </div>
        ) : (
          <a
            href={applyHref}
            target="_blank"
            rel="nofollow noreferrer"
            onClick={handleApplyClick}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center group"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        )}
        <Link
          href={reviewUrl}
          className="mt-3 text-center text-blue-600 text-sm hover:underline block"
        >
          View Full Review <span aria-hidden="true">{'\u2192'}</span>
        </Link>
        {!isComingSoon && (
          <p className="mt-4 text-[10px] text-center text-slate-400 leading-tight">
            Terms and conditions apply. <br/> Rates subject to change.
          </p>
        )}
    </div>
  </div>
); }
