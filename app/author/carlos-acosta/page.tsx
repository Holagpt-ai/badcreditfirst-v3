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
  description: 'Fintech entrepreneur and credit education writer. Founder of BadCreditFirst. Learn how we review credit cards and our methodology.',
  alternates: {
    canonical: 'https://badcreditfirst.com/author/carlos-acosta',
  },
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
            Fintech entrepreneur & credit education writer
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Professional summary</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Carlos Acosta is the founder of BadCreditFirst and an independent reviewer focused on credit education and consumer finance for people with bad or limited credit. He writes and maintains reviews of secured credit cards, credit-builder accounts, and other products that affect credit reports and scores.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Founder, BadCreditFirst</li>
              <li>Credit researcher and product comparison specialist</li>
              <li>Focus on fee transparency, bureau reporting, and approval accessibility</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Experience</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              At BadCreditFirst, Carlos reviews credit cards and credit-building products with a narrow focus on consumers rebuilding or establishing credit. He regularly compares secured cards, credit-builder accounts, and no-deposit alternatives, with an emphasis on how fees, approvals, and reporting affect real credit files.
            </p>
            <p className="text-slate-600 leading-relaxed">
              BadCreditFirst is operated by Carlos Acosta and provides independent information; it is not a lender and does not make credit decisions. The site may receive compensation when users apply for offers listed here. All editorial content is created independently and reflects BadCreditFirst&apos;s own evaluation criteria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Editorial standards</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Reviews and comparisons on BadCreditFirst follow a consistent editorial process:
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
              BadCreditFirst does not rank cards by compensation. Reviews and rankings are based on the criteria above and are editorially independent. For more detail, see our{' '}
              <Link href="/how-we-rank-cards" className="text-blue-600 hover:underline">How We Rank Cards</Link> page.
            </p>
            <p className="text-slate-600 leading-relaxed mt-2 text-sm">
              Information on BadCreditFirst is for educational purposes and should not be taken as individualized financial advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Citations & references</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Reviews and education content on BadCreditFirst reference primary, non-affiliate sources when explaining how credit reporting and disputes work, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>
                <Link href="https://www.consumerfinance.gov/" className="text-blue-600 hover:underline">
                  Consumer Financial Protection Bureau (CFPB)
                </Link>
              </li>
              <li>
                <Link href="https://www.ftc.gov/" className="text-blue-600 hover:underline">
                  Federal Trade Commission (FTC)
                </Link>
              </li>
              <li>
                <Link href="https://www.annualcreditreport.com/" className="text-blue-600 hover:underline">
                  AnnualCreditReport.com
                </Link>
              </li>
              <li>
                <Link href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-fair-credit-reporting-act-en-314/" className="text-blue-600 hover:underline">
                  Fair Credit Reporting Act (FCRA) overview
                </Link>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Contributing Developer & Research Assistant</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Sofia Acosta is a contributing developer and research assistant for BadCreditFirst. She supports the Credit Education Center with technical research, educational content tooling, and page structure. Sofia does not review products or make editorial recommendations; her work focuses on the infrastructure and presentation of educational content.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Graduate of Beverly Hills High School (Los Angeles)</li>
              <li>Freshman at Santa Monica College, studying Computer Science and Media</li>
              <li>Developer contributor to BadCreditFirst.com</li>
              <li>Focus areas: technical research support, educational content tooling, page structure and presentation</li>
            </ul>
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
