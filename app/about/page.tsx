import Image from 'next/image';
import { pages } from '@/data/pages';
import { home } from '@/data/home';
import { PageHero, CTA } from '@/components/Sections';
import { seo } from '@/lib/seo';
import Icon from '@/components/Icon';

export const metadata = seo(
  'The Studio',
  pages.about.description,
  '/about/',
);

export default function Page() {
  const p = pages.about;

  return (
    <>
      <PageHero {...p} />

      <section className="section container section-top-zero studio-grid">
        <Image
          className="about-image"
          src={home.studio.image}
          alt={home.studio.alt}
          width={900}
          height={1000}
        />
        <div>
          <h2>{p.heading}</h2>
          {p.body.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="container values-grid">
          {p.values.map((v) => (
            <article key={v.title}>
              <Icon name="sparkle" />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
