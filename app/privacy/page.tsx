import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://badcreditfirst.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            BadCreditFirst (&quot;BadCreditFirst,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you visit our website.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-4">
            <li>Information you provide when contacting us (email, name)</li>
            <li>Usage data such as pages visited and time spent on the site</li>
            <li>Device and browser information</li>
            <li>IP address and general location data</li>
          </ul>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">How We Use Information</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-4">
            <li>To improve our website and user experience</li>
            <li>To respond to your inquiries</li>
            <li>To analyze site traffic and performance</li>
            <li>To comply with legal obligations</li>
          </ul>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Your Privacy Rights</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Residents of certain states may have rights regarding their personal information, including the right to request access or deletion. BadCreditFirst does not sell personal information. Requests related to privacy may be submitted by contacting carlos.acosta@badcreditfirst.com.
          </p>
          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">Contact Information</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            For privacy-related questions, contact us at carlos.acosta@badcreditfirst.com or write to 1631 Del Prado Blvd S #1124, Cape Coral, FL 33990.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            ← Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
