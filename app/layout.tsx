import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { Shield, Check } from "lucide-react";
import { getOrganizationSchema, getWebSiteSchema, AUTHOR_SCHEMA } from "@/lib/schema";
import TrustSignals from "@/components/TrustSignals";
import NavHeader from "@/components/NavHeader";
import { CONTACT_EMAIL } from "@/lib/contact";
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
        <NavHeader />
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
            {/* ROW 3: Affiliate disclosure (Impact, CJ, Partnerize compliance) */}
            <div className="space-y-3 mb-8 border-t border-slate-700 pt-8">
              <p className="text-xs text-slate-500 leading-relaxed">
                BadCreditFirst.com is an independent, advertising-supported website. We may receive compensation from credit card issuers and financial partners when users click on links or apply for offers on our site.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compensation may influence how and where offers appear, but it does not affect our editorial opinions, reviews, or evaluations. All content is created independently to help consumers make informed decisions.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                BadCreditFirst.com is not a lender and does not guarantee approval for any credit card or financial product. All applications are subject to the issuer&apos;s terms, conditions, and approval criteria.
              </p>
              <p className="text-xs text-slate-500">
                <Link href="/advertiser-disclosure" className="text-slate-400 hover:text-white underline underline-offset-1">Full disclosure</Link>
                {' · '}
                <Link href="/editorial-disclaimer" className="text-slate-400 hover:text-white underline underline-offset-1">Editorial disclaimer</Link>
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
                Contact: {CONTACT_EMAIL}
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
