# VELORA Auto Studio

A premium Bengaluru-focused car-detailing, ceramic-coating and PPF concept site. Next.js App Router, React, TypeScript, locally hosted Jost variable font, react-icons/pi only, and Zod form validation. No backend or paid form service is required. The project is configured for static export.

## Quick start

Use Node.js 22.18+ or Node 24 LTS.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. `npm install` also works; `npm ci` reproduces the included lockfile.

```bash
npm test
npm run build
npm run typecheck
npm run check
```

`npm run build` creates `out/`. Modern Next.js runs static export through `output: 'export'`; do not run the removed `next export` command. `next start` is not used. Preview a build with `npm run preview` (requires Python 3) at http://localhost:3000. Opening the HTML using file:// is not supported.

## Pages

Home, services, six dedicated service pages, packages, gallery, about, contact, booking, privacy and terms: **15 content routes**, plus custom 404, robots.txt and sitemap.xml.

## Main features

- 36-frame genuine animated WebP hero showing a person polishing a car, with pause/play and a reduced-motion static poster.
- Sticky top navigation on desktop/mobile; desktop top bar.
- Mobile bottom dock: Home, Services, Packages, Book. Tap a tab or swipe horizontally **on the dock** to move to the neighbouring page. Downward scrolling hides it; upward scrolling reveals it. Vertical page scrolling does not navigate tabs. Keyboard focus remains accessible.
- Frosted translucent dock, safe-area inset padding, viewportFit cover, central theme color.
- Jost typography, 17–18px body copy, readable headings. Cards have no default shadow; shadows appear only on hover.
- Filterable services and gallery, vehicle-size package pricing, keyboard/touch-friendly before–after slider, native FAQ accordions and mobile testimonial controls.
- Homepage enquiry and dedicated booking page. Name, 10-digit numeric mobile, car, service, date, time, notes and consent. Phone input strips letters/punctuation; numeric-only placeholder. Zod validates before preparing a message.
- Date/time validation uses Asia/Kolkata, including already-started time windows.
- Actual user-provided call and WhatsApp number: **+91 6297639011**.
- No online payments or automatic slot reservation. Form data is not stored on this website.

## Booking flow

1. The visitor fills the form and selects **Continue on WhatsApp**.
2. Zod validates it. Errors appear beside the inputs.
3. A clearly labelled **Open WhatsApp & send** link appears, with the prepared message.
4. The visitor reviews and sends it in WhatsApp. The operator replies to confirm availability and pricing.

There is no backend, secret key, form provider, fake success response or auto-send. Calls and direct WhatsApp enquiry links work immediately. Automatic email, CRM storage, live calendar availability and payment processing are outside this static template.

## Central data

| File | Purpose |
|---|---|
| `data/site.ts` | Brand, phone, WhatsApp, city, demo area, hours, theme color, OG path and footer |
| `data/navigation.ts` | Desktop links and ordered mobile dock tabs |
| `data/home.ts` | Hero, promise strip, studio content, comparison and process |
| `data/services.ts` | Service slugs, icons, imagery, prices, durations, details and exclusions |
| `data/packages.ts` | Packages, vehicle multipliers, pricing note and add-ons |
| `data/booking.ts` | Form copy, labels, placeholders and time windows |
| `data/faq.ts` | Shared FAQ content |
| `data/testimonials.ts` | Clearly labelled example testimonials |
| `data/gallery.ts` | Gallery items, categories and imagery notice |
| `data/pages.ts` | About/contact/legal/404 content |
| `app/globals.css` | Design tokens, layout, hover and responsive styles |
| `lib/booking.ts` | Reusable Zod validation and WhatsApp message formatting |
| `lib/seo.ts` | Shared metadata and safe JSON-LD serialization |

Keep image URLs rooted at `/images/`. The manifest/icons are static branding assets; regenerate them when rebranding. Small control labels and accessibility descriptions also live alongside their component.

## Deployment

### Upload the supplied export

The delivered archive has a top-level **out/** directory. Upload its **contents**, including `_next/`, images, icons, fonts and XML files, to a static host's root. Preserve subdirectories. Use directory index routing and 404.html. Do not add a single-page-app catch-all rewrite to index.html.

### Build on Vercel

Import the `source/` folder as the repository root (or set it as Root Directory). Use `npm run build`; the Next.js config enables static export. Set your environment variables before building.

### Cloudflare Pages

Root: `source` if using the delivered folder structure. Build: `npm run build`. Output: `out`. Node: 22.18+ or 24. No Workers/OpenNext adapter is needed for this static export. Direct Upload can use the supplied top-level out folder.

## Before public use

- The brand/studio is a demo concept. Whitefield, Bengaluru is an illustrative area, not a verified premises address. The map opens an area search. Replace it with the actual business location before inviting visits.
- Sample prices, service timing and testimonial copy must be approved/replaced. Do not remove the sample label while keeping fictional testimonials. Images and the before–after comparison are AI-created demonstrations, not customer-result evidence.
- Set the real domain in `.env.local` using `.env.example`. `NEXT_PUBLIC_SITE_LIVE=false` deliberately prevents demo indexing. Set it to true only after the domain and content are ready; rebuild and redeploy.
- Update `site.demo` and demo-specific notices only after replacing illustrative content. Review privacy/terms for the actual operator.
- Confirm the intended receiving WhatsApp number and business hours before sharing publicly.

## Testing

Automated tests cover numeric sanitization, exact phone length, past/invalid dates, India date boundaries, time-window validity, consent, service integrity, message formatting and horizontal/vertical swipe decisions. Export checks cover all 15 pages, H1s, canonical/OG metadata, local link and asset resolution, icons and animated-WebP structure.

Desktop browser verification was performed against the production **out/** export: visual layout, loaded images, motion pause/play, package updates, comparison range, service filter, numeric input validation and prepared WhatsApp URL. No test message was sent. Real-device mobile swipe, iOS safe-area and mobile Safari behavior still need a physical-device pass; responsive styles and swipe logic are implemented, not claimed as device-certified.

See `ASSET_NOTES.md`, `SEO_GUIDE.md`, `FOLDER_STRUCTURE.md` and `LAUNCH_CHECKLIST.md`.
