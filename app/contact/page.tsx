import { pages } from '@/data/pages';
import { site, whatsappLink } from '@/data/site';
import { PageHero, Inquiry } from '@/components/Sections';
import { seo } from '@/lib/seo';
import Icon from '@/components/Icon';

export const metadata = seo(
  'Contact & Location',
  pages.contact.description,
  '/contact/',
);

export default function Page() {
  const c = pages.contact;

  return (
    <>
      <PageHero {...c} />

      <section className="container contact-grid section section-top-zero">
        <a className="contact-card hover-card" href={`tel:+91${site.phone}`}>
          <Icon name="phone" />
          <h3>{c.callTitle}</h3>
          <p>{site.phoneDisplay}</p>
          <span className="text-link">
            Call the team
            <Icon name="arrow" />
          </span>
        </a>

        <a
          className="contact-card hover-card"
          href={whatsappLink(
            'Hello, I’d like to know more about your detailing services.',
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" />
          <h3>{c.whatsappTitle}</h3>
          <p>{site.hours}</p>
          <span className="text-link">
            Open WhatsApp
            <Icon name="arrow" />
          </span>
        </a>

        <a
          className="contact-card hover-card"
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="map" />
          <h3>{c.locationTitle}</h3>
          <p>{site.location}</p>
          <p className="fine-print">{site.locationNote}</p>
          <span className="text-link">
            {c.locationAction}
            <Icon name="arrow" />
          </span>
        </a>
      </section>

      <Inquiry />
    </>
  );
}
