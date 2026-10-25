import { galleryContent } from '@/data/gallery';
import Gallery from '@/components/Gallery';
import { PageHero, CTA } from '@/components/Sections';
import { seo } from '@/lib/seo';

export const metadata = seo(
  'Studio Gallery',
  galleryContent.description,
  '/gallery/',
);

export default function Page() {
  return (
    <>
      <PageHero {...galleryContent} />
      <section className="container section section-top-zero">
        <Gallery />
      </section>
      <CTA />
    </>
  );
}
