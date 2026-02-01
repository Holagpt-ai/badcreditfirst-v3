import Link from 'next/link';
import { Star, CreditCard } from 'lucide-react';
import DetailedCardRow from '../../../components/DetailedCardRow';

// Full card list for comparison rows (title, label, highlights, fees, creditScore, slug, + review narrative fields)
const cardData = [
  {
    title: 'OpenSky® Secured Visa® Credit Card',
    label: 'Best for No Credit Check',
    highlights: ['No credit check to apply', 'Refundable deposit starts at $200', 'Reports to all 3 credit bureaus'],
    fees: '$35 Annual Fee',
    creditScore: 'No Credit Check',
    slug: 'opensky-secured-visa',
    approvalOdds: 'Fair/Poor (580+)',
    realWorldUseCase: 'Best for someone renting who needs to show payment history.',
    feeRisk: 'Watch out for the $35 annual fee; it is charged immediately.',
    upgradePath: 'After 6 months, consider applying for Capital One Platinum.',
  },
  {
    title: 'First Progress Platinum Prestige Mastercard®',
    label: 'Best for Credit Rebuilding',
    highlights: ['Reports to all 3 bureaus', 'No credit history required', '24/7 Online Account Access'],
    fees: '$49 Annual Fee',
    creditScore: 'Poor to Fair',
    slug: 'first-progress-platinum',
    approvalOdds: 'Poor/No Credit (500+)',
    realWorldUseCase: 'Best for someone with thin or damaged credit who can afford the annual fee and deposit.',
    feeRisk: 'The $49 annual fee is charged in the first year; factor it into your budget.',
    upgradePath: 'After 12 months of on-time payments, explore unsecured cards that report to all three bureaus.',
  },
  {
    title: 'Self - Credit Builder Account',
    label: 'Best Alternative to a Credit Card',
    highlights: ['No hard pull on your credit', 'Build credit while you save', 'Plans start at $25/mo'],
    fees: '$25/mo',
    creditScore: 'Building',
    slug: 'self-credit-builder',
    approvalOdds: 'High (no credit check)',
    realWorldUseCase: 'Best for someone who does not want a credit card but needs a positive tradeline.',
    feeRisk: 'Monthly plans start at $25; confirm the total cost before committing.',
    upgradePath: 'After completing the term, consider a secured card to add revolving credit to your mix.',
  },
  {
    title: 'Mission Lane Visa® Credit Card',
    label: 'Coming Soon',
    highlights: ['Unsecured option', 'No security deposit', 'Clear fee structure'],
    fees: '—',
    creditScore: '—',
    slug: 'mission-lane',
    approvalOdds: 'Fair (600+)',
    realWorldUseCase: 'Best for someone with fair credit who wants an unsecured option without a deposit.',
    feeRisk: 'Check the current fee schedule on the issuer site before applying.',
    upgradePath: 'Use on-time payments to improve your score, then compare other unsecured options.',
  },
  {
    title: 'Credit One Bank® Platinum Visa®',
    label: 'Coming Soon',
    highlights: ['Cash back rewards', 'Regular account reviews', 'Free credit score access'],
    fees: '—',
    creditScore: '—',
    slug: 'credit-one-platinum',
    approvalOdds: 'Fair/Poor (580+)',
    realWorldUseCase: 'Best for someone with limited credit who wants a chance at rewards and account reviews.',
    feeRisk: 'Fees vary by applicant; review your offer carefully before accepting.',
    upgradePath: 'After building history, consider cards with clearer fee structures and higher rewards.',
  },
];

// Slug -> name & URL for review page (review UI also uses narrative fields from cardData by slug)
const cardDataReview: Record<string, { name: string; url: string }> = {
  'opensky-secured-visa': { name: 'OpenSky® Secured Visa® Credit Card', url: 'https://openskycc.com' },
  'first-progress-platinum': { name: 'First Progress Platinum Prestige Mastercard®', url: 'https://firstprogress.com' },
  'self-credit-builder': { name: 'Self - Credit Builder Account', url: 'https://www.self.inc' },
  'mission-lane': { name: 'Mission Lane Visa® Credit Card', url: 'https://www.missionlane.com' },
  'credit-one-platinum': { name: 'Credit One Bank® Platinum Visa®', url: 'https://www.creditonebank.com' },
};

// Category config: title + filter by card title text
const categories: Record<string, { title: string; filter: (title: string) => boolean }> = {
  'secured-cards': {
    title: 'Secured Credit Cards',
    filter: (title) => title.includes('Secured') || title.includes('Self'),
  },
  'credit-builder': {
    title: 'Credit Builder Accounts',
    filter: (title) => title.includes('Self'),
  },
  'bad-credit': {
    title: 'Credit Cards for Bad Credit',
    filter: () => true,
  },
};

// Rich SEO content per category: intro (~200 words), warning, how to choose, FAQ
const categoryContent: Record<string, {
  intro: string;
  whoShouldNotApply: string;
  howToChoose: string;
  faq: { q: string; a: string }[];
}> = {
  'secured-cards': {
    intro: 'Secured credit cards are designed for people with bad credit, no credit history, or recent setbacks like bankruptcy. You fund the card with a refundable security deposit that typically becomes your credit limit, which reduces risk for the issuer and often means approval is more likely even with a low or missing score. Approval odds are generally high for applicants who can afford the deposit and meet basic identity and income checks. Many secured cards do not run a traditional credit check at all, so they are among the most accessible options for rebuilding. Your on-time payments and usage are reported to the major bureaus, helping you establish or repair your credit over time. If you have a few hundred dollars available for a deposit and want a card that reports like a normal credit card, secured cards are a strong fit.',
    whoShouldNotApply: 'Do not apply if you cannot afford to tie up the required security deposit, if you are currently in collections or dispute with the same issuer, or if you are looking for a high credit limit or rewards. Secured cards are for building or rebuilding credit, not for borrowing large amounts or earning significant rewards.',
    howToChoose: 'Look for low or no annual fees, a refundable deposit that becomes your credit line, and confirmation that the card reports to at least one major credit bureau (Equifax, Experian, or TransUnion). Prefer cards that graduate to unsecured or return your deposit after a period of on-time use.',
    faq: [
      { q: 'Do secured cards check my credit?', a: 'Many secured cards do not perform a hard credit check; they rely on your deposit and basic application info. Some may do a soft check. Check each issuer\'s terms before applying.' },
      { q: 'When do I get my deposit back?', a: 'Your deposit is typically refunded when you close the account in good standing or when the issuer graduates you to an unsecured card. Terms vary by issuer.' },
      { q: 'Will a secured card help my score?', a: 'Yes, if the card reports to the bureaus and you pay on time and keep utilization low. Payment history and utilization are two of the biggest factors in your score.' },
    ],
  },
  'credit-builder': {
    intro: 'Credit builder accounts are for people who have little or no credit history, or who prefer not to use a credit card. They work like small installment loans: you make fixed payments over a set term (e.g., 6–24 months), and the lender reports those payments to the credit bureaus. You often receive the loan amount or access to savings at the end of the term. Approval odds are high because the product is structured to minimize risk—you are effectively paying into an account or loan that you then receive. There is usually no hard credit pull, so they will not ding your score to apply. Credit builder products are ideal if you want to build a payment history without using a revolving credit card, or if you have been denied for secured cards and need another way to get positive tradelines on your report.',
    whoShouldNotApply: 'Avoid credit builder accounts if you need access to credit or cash immediately, if you cannot commit to fixed monthly payments for the full term, or if you already have several positive tradelines and are better served by a secured card. These products are for building history, not for short-term borrowing.',
    howToChoose: 'Choose a product that reports to at least one major bureau, has clear fees and no hidden charges, and fits your monthly budget. Compare the total cost (fees plus any interest) and the term length so you can commit for the full period.',
    faq: [
      { q: 'Does a credit builder loan hurt my credit to apply?', a: 'Most credit builder products do not require a hard credit check, so applying typically does not lower your score. Making on-time payments can help build your history.' },
      { q: 'When do I get the money?', a: 'It depends on the product. Some hold the funds in an account until you complete payments; others disburse at the start. Read the terms before signing.' },
      { q: 'How long until I see score improvement?', a: 'Positive payment history usually shows on your report within 1–2 months. Score impact can vary; many people see improvement within 6–12 months of consistent reporting.' },
    ],
  },
  'bad-credit': {
    intro: 'Credit cards for bad credit include both secured cards (which require a refundable deposit) and a small number of unsecured options aimed at consumers with scores under 600 or thin files. These products are for people who have had late payments, collections, bankruptcy, or simply no credit history. Approval odds vary: secured cards and credit builder accounts tend to have high approval rates because they are designed for this segment, while unsecured cards for bad credit are fewer and may have stricter eligibility or higher fees. Lenders in this space often prioritize applicants who have steady income and can afford fees and deposits. The goal of these cards is to help you establish or rebuild a positive payment history that reports to the bureaus, which can improve your score over time and eventually qualify you for better rates and products.',
    whoShouldNotApply: 'Do not apply if you are currently unable to make monthly payments, if you are seeking a high limit or premium rewards, or if you have not reviewed your budget for fees and deposits. These products are for rebuilding; misuse can worsen your situation.',
    howToChoose: 'Prioritize products that report to the major bureaus, have transparent fees (annual fee, deposit if applicable), and are designed for your situation (e.g., no credit check vs. poor credit). Compare total cost and reporting before applying.',
    faq: [
      { q: 'Can I get a credit card with a 500 score?', a: 'Yes. Secured cards and some credit builder products often accept applicants with low or no scores. Unsecured options for a 500 score are limited and may have high fees.' },
      { q: 'Will applying for multiple cards hurt my score?', a: 'Each application can result in a hard inquiry, which may temporarily lower your score. Space out applications and only apply for products you are likely to use.' },
      { q: 'How long until I can qualify for better cards?', a: 'With on-time payments and low utilization, many people see meaningful score improvement in 12–24 months. Timing depends on your starting point and consistency.' },
    ],
  },
};

export default function CreditCardSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const category = categories[slug];
  const card = cardDataReview[slug];

  // Category: long-form article with product list in the middle
  if (category) {
    const filteredCards = cardData.filter((c) => category.filter(c.title));
    const content = categoryContent[slug];
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <main className="max-w-5xl mx-auto px-6 py-12">
          {/* Intro (above card list) */}
          <article className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
              {category.title}
            </h1>
            <p className="text-sm text-slate-400 mb-6">
              By Sofia Acosta | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            {content ? (
              <>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We focus on a curated selection of credit-building products that meet minimum standards for transparency, reporting practices, and accessibility for consumers with poor or limited credit.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {content.intro}
                </p>
              </>
            ) : (
              <p className="text-slate-600 leading-relaxed">
                We focus on a curated selection of credit-building products that meet minimum standards for transparency, reporting practices, and accessibility for consumers with poor or limited credit.
              </p>
            )}
          </article>

          {/* Product list (middle) */}
          <section className="mb-12" aria-label="Product comparison">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Compare Options</h2>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {filteredCards.map((c) => (
                <DetailedCardRow
                  key={c.slug}
                  title={c.title}
                  label={c.label}
                  highlights={c.highlights}
                  fees={c.fees}
                  creditScore={c.creditScore}
                  slug={c.slug}
                />
              ))}
            </div>
          </section>

          {/* How to Choose, Warning, FAQs (below card list) */}
          {content && (
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">How to Choose</h2>
                <p className="text-slate-600 leading-relaxed">
                  {content.howToChoose}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Who Should NOT Apply</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
                  <p className="text-sm font-semibold mb-2">⚠ Warning</p>
                  <p className="text-slate-700 leading-relaxed">
                    {content.whoShouldNotApply}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <dl className="space-y-4">
                  {content.faq.map((item, i) => (
                    <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                      <dt className="font-semibold text-slate-900 mb-1">{item.q}</dt>
                      <dd className="text-slate-600 leading-relaxed">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Card review: single review layout
  if (card) {
    const reviewCard = cardData.find((c) => c.slug === slug);
    const approvalOdds = reviewCard?.approvalOdds;
    const realWorldUseCase = reviewCard?.realWorldUseCase;
    const feeRisk = reviewCard?.feeRisk;
    const upgradePath = reviewCard?.upgradePath;

    const baseUrl = 'https://badcreditfirst-v3.vercel.app';
    const reviewUrl = `${baseUrl}/credit-cards/${slug}`;
    const ratingValue = 4.5;
    const bestRating = 5;
    const reviewCount = 1;
    const feesText = reviewCard?.fees ?? '';
    const annualFeeMatch = feesText.match(/\$(\d+)/);
    const priceValue = annualFeeMatch ? parseFloat(annualFeeMatch[1]) : 0;

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: card.name,
      url: card.url,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue,
        bestRating,
        reviewCount,
      },
      ...(priceValue > 0 && {
        offers: {
          '@type': 'Offer',
          price: priceValue,
          priceCurrency: 'USD',
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          description: feesText,
        },
      }),
    };

    const reviewSchema = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: productSchema,
      reviewRating: {
        '@type': 'Rating',
        ratingValue,
        bestRating,
        reviewCount,
      },
      author: {
        '@type': 'Organization',
        name: 'BadCreditFirst',
        url: baseUrl,
      },
      url: reviewUrl,
    };

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
              {card.name}
            </h1>
            <p className="text-slate-500 font-medium">Review & Details</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 flex justify-center border-b border-slate-100 bg-slate-50">
              <div className="w-full max-w-sm aspect-[1.586] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-inner border border-slate-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10" />
                <CreditCard className="w-16 h-16 text-slate-400 opacity-50" />
              </div>
            </div>
            <div className="px-8 pt-6 flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
              <span className="text-sm text-slate-500 ml-2 font-medium">4.5/5</span>
            </div>

            {/* Verdict */}
            {(approvalOdds ?? realWorldUseCase) && (
              <div className="px-8 py-6 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Verdict</h2>
                <div className="space-y-2 text-slate-600">
                  {approvalOdds && (
                    <p><strong className="text-slate-800">Approval odds:</strong> {approvalOdds}</p>
                  )}
                  {realWorldUseCase && (
                    <p><strong className="text-slate-800">Real-world use:</strong> {realWorldUseCase}</p>
                  )}
                </div>
              </div>
            )}

            {/* Fee Reality Check */}
            {feeRisk && (
              <div className="px-8 py-6 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Fee Reality Check</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
                  <p className="text-sm font-semibold mb-1">⚠ Watch out</p>
                  <p className="text-slate-700 leading-relaxed">{feeRisk}</p>
                </div>
              </div>
            )}

            <div className="px-8 py-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Pros & Cons</h2>
              <div className="space-y-3 text-slate-600">
                <p>Good for building credit. Reports to all bureaus. Designed for limited or no credit history.</p>
                <p>Consider fees and deposit requirements before applying. Terms and conditions apply.</p>
              </div>
            </div>

            {/* Rebuilding Strategy */}
            {upgradePath && (
              <div className="px-8 py-6 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Rebuilding Strategy</h2>
                <p className="text-slate-600 leading-relaxed">{upgradePath}</p>
              </div>
            )}

            <div className="px-8 pb-8 border-t border-slate-100">
              <a
                href={card.url}
                target="_blank"
                rel="nofollow noreferrer"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center"
              >
                Visit Issuer Website
              </a>
              <p className="mt-3 text-xs text-slate-500 text-center">
                You will be redirected to the issuer&apos;s official website.
              </p>
              <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
                BadCreditFirst may receive compensation if you apply through links on this page.
              </p>
              <p className="mt-6 text-center">
                <Link href="/credit-cards" className="text-blue-600 hover:underline text-sm font-medium">
                  ← Back to Credit Cards
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <div>Page Not Found</div>;
}
