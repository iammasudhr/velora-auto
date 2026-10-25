import { pricing } from '@/data/packages';
import { seo } from '@/lib/seo';
import Packages from '@/components/Packages';
import { PageHero, CTA, FAQ } from '@/components/Sections';

export const metadata = seo(
  'Detailing Packages & Starting Prices',
  pricing.description,
  '/packages/',
);

export default function Page() {
  return (
    <>
      <PageHero {...pricing} />

      <section className="section container section-top-zero">
        <Packages />
        <div className="addons">
          <h3>Make the care plan yours.</h3>
          <p>Optional extras, quoted separately:</p>
          <div>
            {pricing.addons.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
