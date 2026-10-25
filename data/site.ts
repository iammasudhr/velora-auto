export const site = {
  name: 'VELORA Auto Studio',
  shortName: 'VELORA',
  descriptor: 'AUTO STUDIO',
  tagline: 'For the love of the drive.',
  description:
    'Explore precision car detailing, ceramic coating and paint protection film. Compare care packages and request a Bengaluru studio appointment on WhatsApp.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://veloraauto.in').replace(
    /\/$/,
    '',
  ),
  live: process.env.NEXT_PUBLIC_SITE_LIVE
    ? process.env.NEXT_PUBLIC_SITE_LIVE === 'true'
    : true,
  demo: false,
  phone: '6297639011',
  phoneDisplay: '+91 62976 39011',
  whatsapp: '916297639011',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'IN',
  locality: 'Whitefield',
  location: 'Whitefield, Bengaluru, Karnataka',
  locationNote:
    'Visits by prior appointment. Contact us on WhatsApp to confirm your slot and directions.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Whitefield%20Bengaluru',
  hours: 'Mon–Sat · 9:00 AM–7:00 PM',
  hoursNote:
    'Appointment requests only; availability is confirmed on WhatsApp.',
  themeColor: '#121615',
  ogImage: '/images/og.jpg',
  logoIcon: '/icon.png',
  icons: {
    favicon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    manifest: '/site.webmanifest',
  },
  topbar: {
    left: 'BENGALURU / WHITEFIELD',
    right: 'DETAILING. PROTECTION. PERFECTION.',
  },
  footer: {
    heading: 'Your next drive deserves this.',
    text: 'Considered care for the car you love. Start with a conversation, leave with a plan.',
    copyright: 'All rights reserved.',
    notice: '',
  },
};

export const whatsappLink = (message: string): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
