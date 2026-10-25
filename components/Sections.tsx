import { Suspense } from 'react';
import Link from 'next/link';
import { faqs, faqContent } from '@/data/faq';
import { booking } from '@/data/booking';
import { site } from '@/data/site';
import BookingForm from './BookingForm';
import Icon from './Icon';

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? 'light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section container faq-section">
      <SectionHeading {...faqContent} />
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details name="studio-faq" key={f.q}>
            <summary>
              <span>
                <small>0{i + 1}</small>
                {f.q}
              </span>
              <Icon name="down" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Inquiry() {
  return (
    <section className="section inquiry-section" id="inquiry">
      <div className="container inquiry-grid">
        <div className="inquiry-copy">
          <span className="eyebrow">{booking.eyebrow}</span>
          <h2>{booking.title}</h2>
          <p>{booking.description}</p>
          <ul>
            {booking.points.map((t) => (
              <li key={t}>
                <Icon name="check" />
                {t}
              </li>
            ))}
          </ul>
          <a className="inquiry-phone" href={`tel:+91${site.phone}`}>
            <Icon name="phone" />
            {site.phoneDisplay}
          </a>
          <p className="small-copy">
            {site.hours}
            <br />
            {site.location}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="booking-form">Loading appointment form…</div>
          }
        >
          <BookingForm />
        </Suspense>

        <noscript>
          <p>
            Please enable JavaScript for the enquiry form, or call{' '}
            <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>.
          </p>
        </noscript>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="container cta">
      <div>
        <span className="eyebrow">{site.tagline}</span>
        <h2>{site.footer.heading}</h2>
      </div>
      <Link href="/book/" className="button button-dark">
        Book a studio visit
        <Icon name="arrow" />
      </Link>
    </section>
  );
}
