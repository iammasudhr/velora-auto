import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  bookingSchema,
  bookingMessage,
  onlyDigits,
  indiaToday,
} from '../lib/booking.ts';

const now = new Date('2026-10-25T04:00:00Z');
const schema = bookingSchema(
  ['signature-wash'],
  ['09:00–11:00', '11:00–13:00'],
  now,
);

const valid = {
  name: 'Demo Visitor',
  phone: '6297639011',
  vehicle: 'Hyundai Creta',
  service: 'signature-wash',
  date: '2026-10-26',
  time: '11:00–13:00',
  notes: '',
  consent: 'yes',
};

test('allows a complete future appointment request', () => {
  assert.equal(schema.safeParse(valid).success, true);
});

test('rejects short, long, formatted and alphabetic phone numbers', () => {
  for (const phone of [
    '123',
    '62976390111',
    '62976abc11',
    '62976 39011',
    '+916297639011',
  ]) {
    assert.equal(schema.safeParse({ ...valid, phone }).success, false);
  }
});

test('sanitizes pasted input to 10 numeric digits', () => {
  assert.equal(onlyDigits('abc62 976-39011xyz!99'), '6297639011');
});

test('rejects invalid, past and normalized non-calendar dates', () => {
  for (const date of ['2026-10-24', '2026-02-30', 'garbage']) {
    assert.equal(schema.safeParse({ ...valid, date }).success, false);
  }
});

test('rejects a time window already started today in Bengaluru', () => {
  assert.equal(
    schema.safeParse({ ...valid, date: '2026-10-25', time: '09:00–11:00' })
      .success,
    false,
  );
});

test('accepts a later time window today', () => {
  assert.equal(
    schema.safeParse({ ...valid, date: '2026-10-25' }).success,
    true,
  );
});

test('rejects missing consent and tampered service/time', () => {
  assert.equal(
    schema.safeParse({ ...valid, consent: undefined }).success,
    false,
  );
  assert.equal(
    schema.safeParse({ ...valid, service: 'unknown' }).success,
    false,
  );
  assert.equal(
    schema.safeParse({ ...valid, time: '23:00' }).success,
    false,
  );
});

test('India date rolls over independently of host time zone', () => {
  assert.equal(indiaToday(new Date('2026-10-25T20:00:00Z')), '2026-10-26');
});

test('message preserves actual newlines and enquiry details', () => {
  const message = bookingMessage(valid, 'Signature wash');
  assert.ok(message.includes('\nPhone: 6297639011\n'));
  assert.ok(message.includes('Please confirm availability'));
  assert.ok(!message.includes('\\n'));
});
