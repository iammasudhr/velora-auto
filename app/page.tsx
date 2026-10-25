import Link from 'next/link';
import Image from 'next/image';
import { home } from '@/data/home';
import { pricing } from '@/data/packages';
import { site } from '@/data/site';
import { seo, jsonLd } from '@/lib/seo';
import HeroMotion from '@/components/HeroMotion';
import ServiceGrid from '@/components/ServiceGrid';
import BeforeAfter from '@/components/BeforeAfter';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import { SectionHeading, FAQ, Inquiry } from '@/components/Sections';
import Icon from '@/components/Icon';

export const metadata = seo(
  'Car Detailing, Ceramic Coating & PPF in Bengaluru',
  site.description,
  '/',
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: site.url,
            description: site.description,
          }),
        }}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" />
              {home.hero.eyebrow}
            </span>
            <h1>
              {home.hero.title}
              <br />
              <em>{home.hero.accent}</em>
            </h1>
            <p>{home.hero.description}</p>
            <div className="hero-actions">
              <Link href="/book/" className="button button-lime">
                {home.hero.primary}
                <Icon name="arrow" />
              </Link>
              <Link className="text-link" href="/services/">
                {home.hero.secondary}
                <Icon name="right" />
              </Link>
            </div>
            <div className="hero-bottom">
              <span>{home.hero.bottomLabel}</span>
              <span>01 — 06</span>
            </div>
          </div>

          <HeroMotion />
        </div>
      </section>

      <section className="promise-strip">
        <div className="container">
          {home.promise.map((p) => (
            <div key={p.title}>
              <Icon name={p.icon as 'shield' | 'sparkle' | 'calendar'} />
              <div>
                <strong>{p.title}</strong>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="heading-row">
          <SectionHeading {...home.services} />
          <Link href="/services/" className="text-link">
            {home.services.link}
            <Icon name="arrow" />
          </Link>
        </div>
        <ServiceGrid />
      </section>

      <section className="section studio-section">
        <div className="container studio-grid">
          <div className="studio-image">
            <Image
              src={home.studio.image}
              alt={home.studio.alt}
              width={900}
              height={1000}
              sizes="(max-width:800px) 100vw, 50vw"
            />
            <span className="image-caption">
              THE FINISH IS JUST THE BEGINNING.
            </span>
          </div>

          <div>
            <SectionHeading
              {...home.studio}
              description={home.studio.text}
            />
            <div className="studio-points">
              {home.studio.points.map((p, i) => (
                <div key={p.title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about/" className="text-link">
              {home.studio.link}
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="container">
          <div className="heading-row">
            <SectionHeading {...home.comparison} light />
            <Icon name="sparkle" className="section-symbol" />
          </div>
          <BeforeAfter />
        </div>
      </section>

      <section className="section container">
        <SectionHeading {...pricing} />
        <Packages />
        <div className="ppf-banner">
          <div>
            <h3>{pricing.ppfTitle}</h3>
            <p>{pricing.ppfText}</p>
          </div>
          <Link
            href="/services/paint-protection-film/"
            className="button button-outline"
          >
            {pricing.ppfCta}
            <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeading {...home.process} />
          <div className="process-grid">
            {home.process.steps.map((s, i) => (
              <article key={s.title}>
                <span>
                  0{i + 1}
                  <Icon name="arrow" />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <Inquiry />
    </>
  );
}
