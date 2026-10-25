import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, servicePage } from '@/data/services';
import { money, pricing } from '@/data/packages';
import { site } from '@/data/site';
import { seo, jsonLd } from '@/lib/seo';
import { FAQ, CTA } from '@/components/Sections';
import Icon from '@/components/Icon';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? seo(s.name, s.description, `/services/${slug}/`) : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: site.url,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: site.url + '/services/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: s.name,
                item: site.url + `/services/${s.slug}/`,
              },
            ],
          }),
        }}
      />

      <section className="detail-hero">
        <div className="container detail-grid">
          <div>
            <Link className="text-link" href="/services/">
              <Icon name="left" />
              All services
            </Link>
            <span className="eyebrow">
              {s.category} / {s.short}
            </span>
            <h1>{s.name}</h1>
            <p>{s.description}</p>
            <div className="detail-stats">
              <span>
                From <strong>{money(s.from)}</strong>
              </span>
              <span>
                <Icon name="clock" />
                {s.time}
              </span>
            </div>
            <Link
              href={`/book/?service=${s.slug}`}
              className="button button-lime"
            >
              {servicePage.requestLabel}
              <Icon name="arrow" />
            </Link>
          </div>

          <Image
            src={s.image}
            alt={s.name}
            width={900}
            height={800}
            priority
            className="detail-image"
          />
        </div>
      </section>

      <section className="section container detail-content">
        <div>
          <span className="eyebrow">THE AGREED SCOPE</span>
          <h2>{servicePage.checklistTitle}</h2>
          <ul className="checklist">
            {s.includes.map((i) => (
              <li key={i}>
                <Icon name="check" />
                {i}
              </li>
            ))}
          </ul>
          <div className="detail-note">
            <h3>Who it’s for</h3>
            <p>{s.suitable}</p>
          </div>
        </div>

        <aside className="information-panel">
          <h3>{servicePage.notesTitle}</h3>
          <h4>What to expect</h4>
          <p>{s.benefit}</p>
          <h4>Scope & exclusions</h4>
          <p>{s.excludes}</p>
          <h4>Aftercare</h4>
          <p>{s.aftercare}</p>
          <p className="fine-print">{pricing.note}</p>
        </aside>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
