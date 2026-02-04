import Link from 'next/link';
import type { ComparisonLink } from '@/data/comparisons';

interface Props {
  links: ComparisonLink[];
  /** Optional heading. Omit to render list only. */
  heading?: string;
}

export default function ComparisonHubList({ links, heading }: Props) {
  if (links.length === 0) return null;

  return (
    <section>
      {heading && (
        <h2 className="text-xl font-bold text-slate-900 mb-3">{heading}</h2>
      )}
      <ul className="flex flex-wrap gap-3 text-sm">
        {links.map(({ slug, anchorText }) => (
          <li key={slug}>
            <Link
              href={`/compare/${slug}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {anchorText}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
