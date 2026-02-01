'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

const SITUATIONS = [
  { id: 'no-credit', label: 'No Credit', description: 'I have no credit history' },
  { id: 'bad-credit', label: 'Bad Credit', description: 'Collection, late payments, or low score' },
  { id: 'denied', label: 'Denied', description: "I've been denied for other cards" },
  { id: 'rebuilding', label: 'Rebuilding', description: 'After bankruptcy or major setback' },
] as const;

const DEPOSIT_OPTIONS = [
  { id: 'deposit', label: 'Yes', description: 'I can pay a security deposit' },
  { id: 'no-deposit', label: 'No', description: "I'd prefer no deposit" },
] as const;

const TRUST_DELAY_MS = 1800;

export default function FunnelSelector() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [situation, setSituation] = useState<string | null>(null);
  const [deposit, setDeposit] = useState<string | null>(null);

  const handleSituation = (id: string) => {
    setSituation(id);
    setStep(2);
  };

  const handleDeposit = (id: string) => {
    setDeposit(id);
    setStep(3);
    const segment = `${situation}-${id}`;
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('bcf_segment', segment);
    } catch {
      // ignore
    }
    setTimeout(() => {
      router.push(`/credit-cards/results/${segment}`);
    }, TRUST_DELAY_MS);
  };

  const handleBack = () => {
    if (step === 2) {
      setSituation(null);
      setStep(1);
    } else if (step === 3) {
      setDeposit(null);
      setStep(2);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-8 bg-slate-50 border-y border-slate-200">
      {/* Step 1: What is your situation? */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
            What is your situation?
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Choose the option that best describes you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SITUATIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSituation(opt.id)}
                className="group flex items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {opt.label}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">{opt.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Constraint? — Can you pay a deposit? Yes/No */}
      {step === 2 && (
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="text-sm text-slate-500 hover:text-blue-600 mb-4"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
            Constraint?
          </h2>
          <p className="text-sm text-slate-500 text-center mb-1">
            Can you pay a deposit?
          </p>
          <p className="text-sm text-slate-500 text-center mb-6">
            Many secured cards require a refundable security deposit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            {DEPOSIT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleDeposit(opt.id)}
                className="group flex items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {opt.label}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">{opt.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Trust screen */}
      {step === 3 && (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Finding best matches...
          </h2>
          <p className="text-slate-500 text-sm">
            We&apos;re ranking options for your situation.
          </p>
        </div>
      )}
    </section>
  );
}
