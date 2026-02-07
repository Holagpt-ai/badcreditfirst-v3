import type { Metadata } from 'next';
import CreditCardsIndexPage from '../credit-cards/page';

const SNIPPET_DESCRIPTION =
  'BadCreditFirst is an independent credit education and comparison platform that helps individuals with poor or limited credit understand their options, compare credit cards, and take practical steps to rebuild credit responsibly.';

export const metadata: Metadata = {
  title: 'Build Credit | BadCreditFirst',
  description: SNIPPET_DESCRIPTION,
};

export default function BuildCreditPage() {
  return <CreditCardsIndexPage />;
}
