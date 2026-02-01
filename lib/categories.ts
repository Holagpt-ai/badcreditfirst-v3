/**
 * Category config and full content for the "Perfect Category Page" template.
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

export type CategoryPageContent = {
  /** 2–3 sentences for Quick Answer / Featured Snippet. */
  quickAnswer: string;
  /** Bulleted list: ideal user. */
  whoThisIsFor: string[];
  /** Bulleted list: who should skip. */
  whoThisIsNotFor: string[];
  /** How We Chose: approval, fees, reporting. */
  methodologySummary: { approval: string; fees: string; reporting: string };
  /** ~400 words: How This Category Helps Rebuild Credit. */
  deepEducation: string;
  /** Warning: fees, locked deposits, etc. */
  risksDownsides: string;
  /** What to apply for next. */
  graduationPath: string;
  /** 3–5 FAQ items (JSON-LD). */
  faq: { q: string; a: string }[];
  /** Legacy intro (used in meta/fallback). */
  intro: string;
  whoShouldNotApply: string;
  howToChoose: string;
};

export const categoryContent: Record<string, CategoryPageContent> = {
  'secured-cards': {
    quickAnswer:
      'Secured credit cards require a refundable security deposit that usually becomes your credit limit. They are designed for people with bad credit, no credit, or recent bankruptcy. Most report to all three bureaus, so on-time use helps rebuild your score.',
    whoThisIsFor: [
      'People with bad credit or no credit history who can afford a refundable deposit.',
      'Anyone rebuilding after bankruptcy or collections who wants a card that reports like a normal credit card.',
      'Consumers who prefer a card in their wallet over a credit-builder loan.',
    ],
    whoThisIsNotFor: [
      'People who cannot tie up $200–$500 in a security deposit.',
      'Anyone seeking a high limit or rewards; secured cards are for building credit, not spending.',
      'Applicants in active dispute or collections with the same issuer.',
    ],
    methodologySummary: {
      approval: 'We favor cards that accept applicants with poor or no credit, including options that do not run a hard credit check.',
      fees: 'We prioritize transparent annual fees and avoid products with hidden monthly fees or unclear fee schedules.',
      reporting: 'We only include cards that report to at least one major bureau (Equifax, Experian, or TransUnion); most in this list report to all three.',
    },
    deepEducation:
      'Secured credit cards are one of the most effective tools for rebuilding credit because they give you a real revolving line that reports to the bureaus. When you fund the card with a security deposit, the issuer holds that deposit as collateral. Your credit limit is typically equal to (or close to) the deposit amount. That structure reduces risk for the lender, so many secured cards approve applicants who would be denied for unsecured cards.\n\nYour payment history and utilization on the card are reported to Equifax, Experian, and TransUnion, just like a regular credit card. Payment history and amounts owed (utilization) are two of the largest factors in your FICO score, so using a secured card responsibly—paying in full or keeping utilization low and never missing a payment—directly supports score improvement. Over time, some issuers will graduate you to an unsecured card and return your deposit, or you can close the account in good standing and get your deposit back. Either way, the positive history stays on your report for years.\n\nSecured cards are especially valuable if you have no credit file or a thin file, because they help you establish a tradeline. For people coming out of bankruptcy or serious delinquency, they offer a clear path: save for the deposit, apply, use the card sparingly, pay on time, and let the bureaus record your progress. We chose the cards on this page based on fee transparency, approval accessibility, and confirmed bureau reporting so you can compare options that meet a consistent bar.',
    risksDownsides:
      'Your security deposit is locked until you close the account in good standing or graduate to unsecured. If you miss payments, you can lose the deposit and damage your credit further. Annual fees are common and often charged in the first year; factor them into your budget. Secured cards do not offer meaningful rewards or high limits—they are for rebuilding, not for everyday spending at scale.',
    graduationPath:
      'After 6–12 months of on-time payments and low utilization, consider applying for an unsecured card from the same issuer (if they offer graduation) or from another lender that accepts fair credit. Check your score and pre-qualification tools before applying to avoid unnecessary hard inquiries.',
    faq: [
      { q: 'Do secured cards check my credit?', a: 'Many secured cards do not perform a hard credit check; they rely on your deposit and basic application info. Some may do a soft check. Check each issuer\'s terms before applying.' },
      { q: 'When do I get my deposit back?', a: 'Your deposit is typically refunded when you close the account in good standing or when the issuer graduates you to an unsecured card. Terms vary by issuer.' },
      { q: 'Will a secured card help my score?', a: 'Yes, if the card reports to the bureaus and you pay on time and keep utilization low. Payment history and utilization are two of the biggest factors in your score.' },
      { q: 'How much deposit do I need?', a: 'Deposits often start around $200–$500 and can go higher. Your deposit usually sets your credit limit. Choose an amount you can afford to leave on deposit for at least several months.' },
      { q: 'Can I get a secured card after bankruptcy?', a: 'Yes. Many secured cards accept applicants with recent bankruptcy because the deposit reduces the issuer\'s risk. Focus on cards that report to all three bureaus so your positive history builds across your file.' },
    ],
    intro: 'Secured credit cards are designed for people with bad credit, no credit history, or recent setbacks like bankruptcy. You fund the card with a refundable security deposit that typically becomes your credit limit.',
    whoShouldNotApply: 'Do not apply if you cannot afford to tie up the required security deposit, if you are currently in collections or dispute with the same issuer, or if you are looking for a high credit limit or rewards.',
    howToChoose: 'Look for low or no annual fees, a refundable deposit that becomes your credit line, and confirmation that the card reports to at least one major credit bureau (Equifax, Experian, or TransUnion).',
  },
  'credit-builder': {
    quickAnswer:
      'Credit builder accounts are installment-style products that report your payments to the credit bureaus. You make fixed payments over a set term; many do not require a credit check. They are ideal for people with no credit or who prefer not to use a credit card.',
    whoThisIsFor: [
      'People with no credit history who want to establish a positive tradeline without a credit card.',
      'Anyone who has been denied for secured cards and needs another way to build payment history.',
      'Consumers who prefer a structured payment plan over revolving credit.',
    ],
    whoThisIsNotFor: [
      'People who need access to cash or credit immediately; funds are often released only after the term.',
      'Anyone who cannot commit to fixed monthly payments for the full term (e.g., 6–24 months).',
      'Applicants who already have several positive tradelines and would benefit more from a secured card.',
    ],
    methodologySummary: {
      approval: 'We include products that are accessible to people with no credit or poor credit, including options with no hard credit check.',
      fees: 'We look for clear total cost, no hidden fees, and transparent monthly or term-based pricing.',
      reporting: 'We only recommend products that report to at least one major bureau so your payments build your credit file.',
    },
    deepEducation:
      'Credit builder accounts help you rebuild or establish credit by creating a positive installment tradeline on your report. Unlike a credit card, these products work like a small loan or savings plan: you make fixed monthly payments over a set term (often 6–24 months), and the lender reports those payments to the credit bureaus. In many cases, you do not receive the full loan amount upfront; instead, the funds are held in an account or applied to a loan balance, and you receive the money (or access to savings) at the end of the term once you have made all payments. That structure minimizes risk for the lender, so approval is often available even with no credit history or a low score.\n\nBecause there is typically no hard credit pull, applying does not ding your score. Once you are in the program, each on-time payment is reported as positive payment history. Payment history is the single largest factor in most credit scoring models, so building a track record of on-time payments can have a meaningful impact over time. Credit builder products are especially useful if you have been denied for secured cards, do not want to use a credit card, or have a thin file and need an installment tradeline to diversify your credit mix.\n\nWe selected the options on this page based on reporting confirmation, fee transparency, and accessibility so you can compare products that meet our standards for helping you rebuild credit.',
    risksDownsides:
      'You typically do not get the full loan amount or savings until you complete the term. If you miss payments, you may face fees and negative reporting. Total cost (fees plus any interest) can add up—compare the full cost and term length before committing. These products are not for short-term liquidity needs.',
    graduationPath:
      'After completing the credit builder term with on-time payments, consider adding a secured card to establish revolving credit. A mix of installment and revolving tradelines can support your score. Check your report to confirm the account is reporting, then apply for a secured card when you are ready.',
    faq: [
      { q: 'Does a credit builder loan hurt my credit to apply?', a: 'Most credit builder products do not require a hard credit check, so applying typically does not lower your score. Making on-time payments can help build your history.' },
      { q: 'When do I get the money?', a: 'It depends on the product. Some hold the funds in an account until you complete payments; others disburse at the start. Read the terms before signing.' },
      { q: 'How long until I see score improvement?', a: 'Positive payment history usually shows on your report within 1–2 months. Score impact can vary; many people see improvement within 6–12 months of consistent reporting.' },
      { q: 'Is a credit builder the same as a secured card?', a: 'No. Credit builders are usually installment products with fixed payments; secured cards are revolving credit with a deposit. Both can report to the bureaus and help your score. Credit builders do not give you a card to spend on.' },
      { q: 'Can I use a credit builder if I have bad credit?', a: 'Yes. Many credit builder products are designed for people with bad or no credit and do not require a credit check. They are a good option if you cannot get approved for a secured card or prefer not to use one.' },
    ],
    intro: 'Credit builder accounts are for people who have little or no credit history, or who prefer not to use a credit card. They work like small installment loans: you make fixed payments over a set term, and the lender reports those payments to the credit bureaus.',
    whoShouldNotApply: 'Avoid credit builder accounts if you need access to credit or cash immediately, if you cannot commit to fixed monthly payments for the full term, or if you already have several positive tradelines.',
    howToChoose: 'Choose a product that reports to at least one major bureau, has clear fees and no hidden charges, and fits your monthly budget. Compare the total cost and the term length so you can commit for the full period.',
  },
  'bad-credit': {
    quickAnswer:
      'Credit cards for bad credit include secured cards (with a refundable deposit) and a small number of unsecured options for consumers with scores under 600 or thin files. They are meant to help you establish or rebuild a positive payment history that reports to the bureaus.',
    whoThisIsFor: [
      'People with a FICO or VantageScore under 600, or with a thin or damaged file.',
      'Anyone rebuilding after late payments, collections, or bankruptcy who can afford fees and deposits.',
      'Consumers with little or no credit history who want a card or credit-building product that reports.',
    ],
    whoThisIsNotFor: [
      'People who cannot make monthly payments or have not budgeted for fees and deposits.',
      'Anyone seeking a high limit or premium rewards; bad-credit products are for rebuilding.',
      'Applicants who have not checked their report for errors or have not compared total cost.',
    ],
    methodologySummary: {
      approval: 'We prioritize products designed for poor or no credit, including no–credit-check options and those that accept scores in the 500s.',
      fees: 'We favor transparent fees (annual fee, deposit when applicable) and call out high or variable fees so you can compare true cost.',
      reporting: 'We only include products that report to at least one major bureau so your on-time use helps your score.',
    },
    deepEducation:
      'Credit cards and credit-building products for bad credit exist to help you establish or repair your payment history. When your score is low or your file is thin, mainstream unsecured cards are often out of reach. Secured cards and credit builder accounts fill that gap by reducing risk for the lender—either through a security deposit or a structured payment plan—so approval is possible even with a low or missing score. The key is that your activity is reported to the bureaus.\n\nPayment history and amounts owed (utilization) drive a large share of your FICO score, so a card or loan that reports and that you use responsibly (on-time payments, low utilization) can move your score in the right direction over 12–24 months. Bad-credit options often come with trade-offs: annual fees, possible deposits, and lower limits. We do not rank by compensation; we rank by fee transparency, approval accessibility, and bureau reporting so you can compare options that meet a consistent bar.\n\nOur goal is to help you choose a product you can stick with and that will report your progress. Once you have several months of positive history, you can look toward unsecured cards or better rates. The cards and products on this page are a starting point for that journey.',
    risksDownsides:
      'Annual fees and security deposits are common; factor them into your budget. Unsecured options for bad credit may have higher fees or variable terms. Missing payments will hurt your score and can lead to lost deposits or collections. These products are for rebuilding—misuse can worsen your situation.',
    graduationPath:
      'After 12–24 months of on-time payments and low utilization, check your score and consider unsecured cards for fair credit. Use pre-qualification tools when available to reduce unnecessary hard inquiries. Keep your oldest account open when possible to preserve length of history.',
    faq: [
      { q: 'Can I get a credit card with a 500 score?', a: 'Yes. Secured cards and some credit builder products often accept applicants with low or no scores. Unsecured options for a 500 score are limited and may have high fees.' },
      { q: 'Will applying for multiple cards hurt my score?', a: 'Each application can result in a hard inquiry, which may temporarily lower your score. Space out applications and only apply for products you are likely to use.' },
      { q: 'How long until I can qualify for better cards?', a: 'With on-time payments and low utilization, many people see meaningful score improvement in 12–24 months. Timing depends on your starting point and consistency.' },
      { q: 'Do I need a deposit for every bad-credit card?', a: 'Not every product requires a deposit. Secured cards do; many credit builder products do not. A small number of unsecured cards target bad-credit consumers but may have higher fees or stricter terms.' },
      { q: 'Will these cards report to all three bureaus?', a: 'Reporting varies by product. We prioritize options that report to at least one major bureau; many in our list report to all three. Check the product details or issuer site to confirm before applying.' },
    ],
    intro: 'Credit cards for bad credit include both secured cards (which require a refundable deposit) and a small number of unsecured options aimed at consumers with scores under 600 or thin files.',
    whoShouldNotApply: 'Do not apply if you are currently unable to make monthly payments, if you are seeking a high limit or premium rewards, or if you have not reviewed your budget for fees and deposits.',
    howToChoose: 'Prioritize products that report to the major bureaus, have transparent fees (annual fee, deposit if applicable), and are designed for your situation. Compare total cost and reporting before applying.',
  },
};
