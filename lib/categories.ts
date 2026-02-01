/**
 * Category config and rich SEO content for credit card category pages.
 */

export const categories: Record<string, { title: string; filter: (title: string) => boolean }> = {
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

export const categoryContent: Record<string, {
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
