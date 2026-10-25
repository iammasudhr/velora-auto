import Link from 'next/link';
import { pages } from '@/data/pages';
import { PageHero } from '@/components/Sections';

export default function NotFound() {
  return (
    <>
      <PageHero {...pages.notFound} />
      <div className="container not-found-action">
        <Link href="/" className="button button-dark">
          {pages.notFound.button}
        </Link>
      </div>
    </>
  );
}
