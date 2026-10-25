import type { Metadata } from 'next';
import { site } from '@/data/site';

export function seo(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: path,
      siteName: site.name,
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
      title,
      description,
      images: [site.ogImage],
    },
  };
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
