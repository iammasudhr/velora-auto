import { servicePage } from '@/data/services';
import { seo } from '@/lib/seo';
import ServiceGrid from '@/components/ServiceGrid';
import { PageHero, CTA, FAQ } from '@/components/Sections';

export const metadata = seo(
  'Our Detailing Services',
  servicePage.description,
  '/services/',
);

export default function Page() {
  return (
    <>
      <PageHero {...servicePage} />
      <section className="container section section-top-zero">
        <ServiceGrid filterable />
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
