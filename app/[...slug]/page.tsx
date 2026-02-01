import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const redirects: Record<string, string> = {
  'credit-card': '/credit-cards',
  'bad-credit-cards': '/credit-cards/bad-credit',
};

export default function CatchAll({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');

  if (redirects[slug]) {
    redirect(redirects[slug]);
  }

  notFound();
}
