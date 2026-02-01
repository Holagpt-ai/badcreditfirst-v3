import type { Metadata } from 'next';
import Link from 'next/link';

const AUTHOR_ARTICLES = [
  { slug: 'what-is-a-good-credit-score', title: 'What Is a Good Credit Score?' },
  { slug: 'how-is-my-score-calculated', title: 'How Is My Score Calculated?' },
  { slug: 'what-is-a-bad-credit-score', title: 'What Is a Bad Credit Score?' },
  { slug: 'fico-vs-vantagescore', title: 'FICO® vs. VantageScore' },
  { slug: 'secured-vs-unsecured', title: 'Secured vs. Unsecured Credit Cards' },
  { slug: 'credit-builder-loans', title: 'Credit Builder Loans Explained' },
] as const;

export const metadata: Metadata = {
  title: 'Carlos Acosta | Author & Founder',
  description: 'Fintech Entrepreneur & Credit Researcher. Founder of BadCreditFirst. Learn how we review credit cards and our methodology.',
};

export default function AuthorCarlosAcostaPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Carlos Acosta
          </h1>
          <p className="text-lg font-medium text-blue-600 mb-6">
            Fintech Entrepreneur & Credit Researcher
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Credentials</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Founder, BadCreditFirst</li>
              <li>Credit researcher and product comparison specialist</li>
              <li>Focus: fee transparency, bureau reporting, approval accessibility</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Bio</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
            Carlos Acosta is the founder of BadCreditFirst and a fintech entrepreneur focused on credit education and product comparison for consumers with bad or limited credit. As a credit researcher, he evaluates credit cards and credit-building products based on fee transparency, bureau reporting, and approval accessibility—not on affiliate payouts. His goal is to help people understand their options and make informed decisions when rebuilding credit.
            </p>
            <p className="text-slate-600 leading-relaxed">
            BadCreditFirst is operated by Carlos Acosta and provides independent information; it is not a lender. The site may receive compensation when users apply for offers listed here. All editorial content is created independently and reflects BadCreditFirst&apos;s own evaluation criteria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Methodology</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
            How we review cards at BadCreditFirst:
            </p>
            <ol className="space-y-4 list-decimal list-inside text-slate-600">
              <li>
                <strong className="text-slate-800">Fee transparency</strong> — We prioritize products that clearly disclose annual fees and avoid hidden monthly charges. We call out fee risks in each review.
              </li>
              <li>
                <strong className="text-slate-800">Bureau reporting</strong> — We only recommend cards that report to at least one major credit bureau (Equifax, Experian, or TransUnion). Reporting is essential for rebuilding credit.
              </li>
              <li>
                <strong className="text-slate-800">Approval odds & fit</strong> — We focus on products designed for consumers with poor or no credit. Each review includes approval odds and who the card is best for in the real world.
              </li>
              <li>
                <strong className="text-slate-800">Rebuilding path</strong> — We highlight upgrade paths and next steps so you can plan beyond your first card.
              </li>
            </ol>
            <p className="text-slate-600 leading-relaxed mt-4">
            We do not rank cards by compensation. Our reviews and rankings are based on the criteria above. For more detail, see our <Link href="/how-we-rank-cards" className="text-blue-600 hover:underline">How We Rank Cards</Link> page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Articles</h2>
            <p className="text-slate-600 mb-4">Credit education articles on BadCreditFirst:</p>
            <ul className="space-y-2">
              {AUTHOR_ARTICLES.map((a) => (
                <li key={a.slug}>
                  <Link href={`/education/${a.slug}`} className="text-blue-600 hover:underline text-sm font-medium">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/education" className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium">
              View all Education Center articles →
            </Link>
          </section>

          <div className="border-t border-slate-200 pt-6 flex flex-wrap gap-4">
            <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
              ← Home
            </Link>
            <Link href="/about" className="text-blue-600 hover:underline text-sm font-medium">
              About BadCreditFirst
            </Link>
            <Link href="/credit-cards" className="text-blue-600 hover:underline text-sm font-medium">
              Credit Cards
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
