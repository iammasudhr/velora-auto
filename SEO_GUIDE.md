# SEO and sharing

- All primary content is statically rendered HTML, with clear headings and crawlable links.
- Each route has a title, description, canonical, OG and Twitter image metadata.
- Central social image: `public/images/og.jpg` (1200 × 630).
- `app/sitemap.ts` derives service URLs from the same service data used for page generation.
- `app/robots.ts` uses the central live flag. The supplied demo is noindex/disallow; enable only after business data and domain are real.
- JSON-LD includes WebSite and service-detail BreadcrumbList. No fake aggregate ratings, credentials or local address schema are emitted.
- Add LocalBusiness/AutomotiveBusiness structured data only when real business name, location, hours and ownership are verified.
- Jost is bundled locally. Photos are WebP; the hero is a 1.2MB multi-frame WebP with a static motion-reduction fallback. Hero loads eagerly, nonhero Next Image components lazy-load by default.
- Favicon ICO, 192/512 PNG icons, Apple touch icon and manifest are included.
- No ranking, indexing speed, search-engine feature or conversion guarantee is made by this template.

Before launch set NEXT_PUBLIC_SITE_URL to the actual HTTPS origin, set NEXT_PUBLIC_SITE_LIVE=true, rebuild, inspect canonical URLs and submit /sitemap.xml to the business's search-console account. Static environment variables are baked into the build; changing a hosting variable without rebuilding does not update out.
