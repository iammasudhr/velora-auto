import { Inquiry, FAQ } from '@/components/Sections';
import { seo } from '@/lib/seo';
import { booking } from '@/data/booking';

export const metadata = seo(
  'Book a Studio Visit',
  booking.description,
  '/book/',
);

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Book a studio appointment</h1>
      <Inquiry />
      <FAQ />
    </>
  );
}
