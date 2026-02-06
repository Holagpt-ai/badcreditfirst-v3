import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { Shield, Check } from "lucide-react";
import { getOrganizationSchema, getWebSiteSchema, AUTHOR_SCHEMA } from "@/lib/schema";
import TrustSignals from "@/components/TrustSignals";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://badcreditfirst.com";
const organizationSchema = getOrganizationSchema(SITE_URL);
const websiteSchema = getWebSiteSchema(SITE_URL);

export const metadata: Metadata = {
  metadataBase: new URL("https://badcreditfirst.com"),
  title: "BadCreditFirst | Build Credit with Confidence (2026)",
  description: "Compare the best secured credit cards and credit builder loans for 2026. Independent reviews for bad credit, no credit, and bankruptcy recovery.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(AUTHOR_SCHEMA),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Header */}
        <header className="border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <span className="text-2xl font-black tracking-tighter text-blue-900 flex items-center gap-2">
                <span className="relative inline-block w-8 h-8 shrink-0" aria-hidden="true">
                  <Shield className="w-8 h-8 text-slate-600" />
                  <Check className="w-4 h-4 text-green-600 absolute inset-0 m-auto" style={{ filter: "drop-shadow(0 0 4px rgba(34,197,94,0.35))" }} strokeWidth={3} />
                </span>
                BadCreditFirst
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/credit-cards" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                Compare Cards
              </Link>
              <Link href="/education" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                Education
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </header>
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5JXXYC365C"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5JXXYC365C');
  `}
        </Script>
        {children}
        {/* Footer - 4-Row Network-Ready */}
        <footer className="bg-slate-900 text-slate-400 py-12 text-sm">
          <div className="max-w-5xl mx-auto px-6">
            {/* ROW 1: Navigation Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-slate-300 mb-3">Compare</h3>
                <ul className="space-y-2">
                  <li><Link href="/credit-cards/category/bad-credit" className="hover:text-white transition-colors">Cards for Bad Credit</Link></li>
                  <li><Link href="/credit-cards/category/secured-cards" className="hover:text-white transition-colors">Secured Cards</Link></li>
                  <li><Link href="/credit-cards/category/credit-builder" className="hover:text-white transition-colors">Credit Builder</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-300 mb-3">Learn</h3>
                <ul className="space-y-2">
                  <li><Link href="/education" className="hover:text-white transition-colors">Education Center</Link></li>
                  <li><Link href="/education" className="hover:text-white transition-colors">How Credit Scores Work</Link></li>
                  <li><Link href="/how-we-rank-cards" className="hover:text-white transition-colors">How We Rank Cards</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-300 mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/site-map" className="hover:text-white transition-colors">Sitemap</Link></li>
                </ul>
              </div>
            </div>
            {/* ROW 2: Legal Links */}
            <div className="flex flex-wrap gap-4 mb-8 border-t border-slate-700 pt-8">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/advertiser-disclosure" className="hover:text-white transition-colors">Advertiser Disclosure</Link>
              <Link href="/editorial-disclaimer" className="hover:text-white transition-colors">Editorial Disclaimer</Link>
              <Link href="/accessibility-statement" className="hover:text-white transition-colors">Accessibility Statement</Link>
              <Link href="/state-privacy-law-notice" className="hover:text-white transition-colors">State Privacy Law Notice</Link>
              <Link href="/your-privacy-choices" className="hover:text-white transition-colors">Your Privacy Choices</Link>
            </div>
            {/* ROW 3: Disclaimers — parity with Credit Karma, NerdWallet, CNBC Select */}
            <div className="space-y-4 mb-8 border-t border-slate-700 pt-8">
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-400">Advertiser Disclosure:</strong> BadCreditFirst is an advertising-supported comparison service. We may receive compensation from partners when you apply through our links. Compensation is one of several factors that may impact how and where offers appear. Compensation does not influence our editorial opinions or rankings. <Link href="/advertiser-disclosure" className="text-slate-400 hover:text-white underline underline-offset-1">Full disclosure</Link>.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-400">Editorial Disclaimer:</strong> Content is independently researched and written. Third-party partners do not review, approve, or endorse our content. We do not rank by compensation. <Link href="/editorial-disclaimer" className="text-slate-400 hover:text-white underline underline-offset-1">Full disclaimer</Link>.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-400">General:</strong> BadCreditFirst is operated by Carlos Acosta. We provide independent information and are not a lender. We do not guarantee approval for any financial product.
              </p>
            </div>
            {/* ROW 4: Brand Anchor + Author + Trust Signals */}
            <div className="border-t border-slate-700 pt-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-lg mb-2 hover:opacity-90 transition-opacity">
                <span className="relative inline-block w-6 h-6 shrink-0" aria-hidden="true">
                  <Shield className="w-6 h-6 text-slate-400" />
                  <Check className="w-3 h-3 text-green-400 absolute inset-0 m-auto" style={{ filter: "drop-shadow(0 0 4px rgba(52,211,153,0.35))" }} strokeWidth={3} />
                </span>
                BadCreditFirst
              </Link>
              <p className="text-xs text-slate-500 mb-3">
                Author & Founder: <Link href="/author/carlos-acosta" className="text-slate-300 hover:text-white transition-colors underline underline-offset-2">Carlos Acosta</Link>
                {' · '}
                Contact: carlos.acosta@badcreditfirst.com
              </p>
              <div className="mb-4">
                <TrustSignals variant="compact" />
              </div>
              <p className="text-xs text-slate-500 mb-1">Operated by BadCreditFirst</p>
              <p className="text-xs text-slate-500 mb-1">1631 Del Prado Blvd S #1124, Cape Coral, FL 33990</p>
              <p className="text-xs text-slate-500 mb-1">BadCreditFirst is an independent comparison and education platform and does not guarantee approval for any financial product.</p>
              <p className="text-xs text-slate-500">© 2026 BadCreditFirst. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
