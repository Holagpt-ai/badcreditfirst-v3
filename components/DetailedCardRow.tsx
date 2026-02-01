import React from 'react';
import { Star, Check, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
interface DetailedCardRowProps {
  title: string;
  label: string;
  highlights: string[];
  fees: string;
  creditScore: string;
  slug: string;
  /** Path to the single-card review page, e.g. /credit-cards/review/opensky-secured-visa */
  reviewUrl: string;
  affiliateLink?: string;
}

export default function DetailedCardRow({ title, label, highlights, fees, creditScore, slug, reviewUrl, affiliateLink = '#' }: DetailedCardRowProps) {
  return (

  <div className="flex flex-col md:flex-row">
    {/* LEFT: Compliant Image Placeholder (No Logos) */}
    <div className="w-full md:w-[220px] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50">
       <div className="w-full aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <CreditCard className="w-10 h-10 text-slate-400 opacity-50" />
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
          
          <div className="flex items-center mb-4 space-x-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
            <span className="text-xs text-slate-500 ml-2 font-medium">4.5/5</span>
          </div>
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
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    {/* RIGHT: Action Area */}
    <div className="w-full md:w-[280px] p-6 bg-slate-50 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100">
        <Link
          href={reviewUrl}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center group"
        >
          View Offer Details
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href={reviewUrl}
          className="mt-3 text-center text-blue-600 text-sm hover:underline block"
        >
          View Full Review →
        </Link>
        <p className="mt-4 text-[10px] text-center text-slate-400 leading-tight">
          Terms and conditions apply. <br/> Rates subject to change.
        </p>
    </div>
  </div>
); }
