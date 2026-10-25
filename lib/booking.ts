import { z } from 'zod';

export const onlyDigits = (value: string, max = 10): string =>
  value.replace(/[^0-9]/g, '').slice(0, max);

export function indiaToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const val = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${val('year')}-${val('month')}-${val('day')}`;
}

export function indiaMinutes(now = new Date()): number {
  const p = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  return (
    Number(p.find((x) => x.type === 'hour')?.value) * 60 +
    Number(p.find((x) => x.type === 'minute')?.value)
  );
}

export function bookingSchema(
  serviceIds: string[],
  timeSlots: string[],
  now = new Date(),
) {
  return z
    .object({
      name: z.string().trim().min(2, 'Enter your name.').max(80),
      phone: z
        .string()
        .regex(/^[0-9]{10}$/, 'Enter exactly 10 numeric digits.'),
      vehicle: z
        .string()
        .trim()
        .min(2, 'Enter your car make and model.')
        .max(100),
      service: z
        .string()
        .refine((s) => serviceIds.includes(s), 'Choose a listed service.'),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a valid date.')
        .refine(
          (s) =>
            !Number.isNaN(Date.parse(s)) &&
            new Date(s).toISOString().slice(0, 10) === s,
          'Choose a valid calendar date.',
        )
        .refine(
          (s) => s >= indiaToday(now),
          'Choose today or a future date.',
        ),
      time: z
        .string({ error: 'Choose a preferred time window.' })
        .refine(
          (s) => timeSlots.includes(s),
          'Choose a listed time window.',
        ),
      notes: z
        .string()
        .trim()
        .max(1500, 'Keep notes under 1,500 characters.'),
      consent: z.literal('yes', {
        error: 'Please agree to be contacted about this enquiry.',
      }),
    })
    .superRefine((data, ctx) => {
      if (
        data.date === indiaToday(now) &&
        Number(data.time.slice(0, 2)) * 60 <= indiaMinutes(now)
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['time'],
          message:
            'This window has already started. Choose a later time or date.',
        });
      }
    });
}

export type BookingDetails = {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

export function bookingMessage(
  data: BookingDetails,
  serviceName: string,
): string {
  return [
    'Hello, I’d like to request a detailing appointment.',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Car: ${data.vehicle}`,
    `Service: ${serviceName}`,
    `Preferred date: ${data.date}`,
    `Time (IST): ${data.time}`,
    `Notes: ${data.notes || 'None'}`,
    '',
    'Please confirm availability, the service scope and final quote.',
  ].join('\n');
}
