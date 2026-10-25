'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { services } from '@/data/services';
import { packages } from '@/data/packages';
import { booking } from '@/data/booking';
import { site, whatsappLink } from '@/data/site';
import {
  bookingSchema,
  bookingMessage,
  onlyDigits,
  indiaToday,
  indiaMinutes,
} from '@/lib/booking';
import Icon from './Icon';

export default function BookingForm() {
  const params = useSearchParams();
  const requested = params.get('service');
  const preselected = services.some((s) => s.slug === requested)
    ? requested!
    : services[0].slug;
  const requestedPackage = packages.find(
    (p) => p.id === params.get('package'),
  );

  const [hydrated, setHydrated] = useState(false);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [today, setToday] = useState('');
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setHydrated(true);
    const update = () => {
      setToday(indiaToday());
      setMinutes(indiaMinutes());
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReady('');
    setStatus('');

    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    if (values.company) return;

    const parsed = bookingSchema(
      services.map((s) => s.slug),
      booking.times,
    ).safeParse(values);

    if (!parsed.success) {
      const out: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        out[String(i.path[0])] ??= i.message;
      });
      setErrors(out);
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    setErrors({});
    const serviceName = services.find(
      (s) => s.slug === parsed.data.service,
    )!.name;
    setReady(whatsappLink(bookingMessage(parsed.data, serviceName)));
    setStatus(booking.success);
  }

  const err = (key: string) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    ) : null;

  const attr = (key: string) => ({
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  return (
    <form
      className="booking-form"
      onSubmit={submit}
      onChange={() => {
        if (ready) {
          setReady('');
          setStatus('');
        }
      }}
      noValidate
    >
      <div className="form-heading">
        <span className="label">APPOINTMENT REQUEST</span>
        <h3>{booking.formTitle}</h3>
        <p>{booking.formDescription}</p>
      </div>

      <div className="form-grid">
        <label>
          {booking.labels.name}
          <input
            name="name"
            autoComplete="name"
            placeholder={booking.placeholders.name}
            maxLength={80}
            required
            {...attr('name')}
          />
          {err('name')}
        </label>

        <label>
          {booking.labels.phone}
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            pattern="[0-9]{10}"
            value={phone}
            onChange={(e) => setPhone(onlyDigits(e.target.value))}
            placeholder={booking.placeholders.phone}
            required
            {...attr('phone')}
          />
          {err('phone')}
        </label>

        <label>
          {booking.labels.vehicle}
          <input
            name="vehicle"
            placeholder={booking.placeholders.vehicle}
            maxLength={100}
            required
            {...attr('vehicle')}
          />
          {err('vehicle')}
        </label>

        <label>
          {booking.labels.service}
          <select
            name="service"
            defaultValue={preselected}
            {...attr('service')}
          >
            {services.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
          {err('service')}
        </label>

        <label>
          {booking.labels.date}
          <input
            name="date"
            type="date"
            min={today || undefined}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            {...attr('date')}
          />
          {err('date')}
        </label>

        <label>
          {booking.labels.time}
          <select name="time" required defaultValue="" {...attr('time')}>
            <option value="" disabled>
              Select a window (IST)
            </option>
            {booking.times.map((t) => (
              <option
                key={t}
                disabled={
                  date === today && Number(t.slice(0, 2)) * 60 <= minutes
                }
              >
                {t}
              </option>
            ))}
          </select>
          {err('time')}
        </label>
      </div>

      <label className="notes-label">
        {booking.labels.notes} <span>(optional)</span>
        <textarea
          name="notes"
          rows={3}
          maxLength={1500}
          defaultValue={
            requestedPackage ? `Interested in ${requestedPackage.name}.` : ''
          }
          placeholder={booking.placeholders.notes}
          {...attr('notes')}
        />
        {err('notes')}
      </label>

      <div className="honeypot" aria-hidden="true">
        <label>
          Company
          <input name="company" autoComplete="off" tabIndex={-1} />
        </label>
      </div>

      <label className="consent">
        <input
          name="consent"
          type="checkbox"
          value="yes"
          required
          {...attr('consent')}
        />
        <span>
          I agree to be contacted about this enquiry and have read the{' '}
          <a href="/privacy/">privacy notice</a>.
        </span>
      </label>
      {err('consent')}

      <button
        className="button button-dark full"
        type="submit"
        disabled={!hydrated}
      >
        {booking.submit}
        <Icon name="whatsapp" />
      </button>

      <p className="form-notice">{booking.notice}</p>

      <div role="status" aria-live="polite">
        {status && (
          <div className="request-ready">
            <p>{status}</p>
            <a
              className="button button-lime full"
              href={ready}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp & send
              <Icon name="arrow" />
            </a>
            <small>Sending to {site.phoneDisplay}</small>
          </div>
        )}
      </div>
    </form>
  );
}
