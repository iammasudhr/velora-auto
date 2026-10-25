import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/jost';
import './globals.css';
import { site } from '@/data/site';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: site.themeColor,
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Car Detailing & PPF in Bengaluru`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: {
    index: site.live,
    follow: site.live,
  },
  icons: {
    icon: [
      { url: site.icons.favicon },
      { url: site.logoIcon, type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: site.icons.apple, sizes: '180x180' }],
  },
  manifest: site.icons.manifest,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.tagline,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [site.ogImage],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
