import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { services } from '@/data/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/services/',
    '/packages/',
    '/gallery/',
    '/about/',
    '/contact/',
    '/book/',
    '/privacy/',
    '/terms/',
    ...services.map((s) => `/services/${s.slug}/`),
  ];

  return paths.map((p) => ({
    url: site.url + p,
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }));
}
