import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const routes = [
  '',
  'about',
  'book',
  'contact',
  'gallery',
  'packages',
  'privacy',
  'terms',
  'services',
  'services/signature-wash',
  'services/interior-detailing',
  'services/paint-correction',
  'services/ceramic-coating',
  'services/paint-protection-film',
  'services/maintenance-care',
];

for (const route of routes) {
  const file = path.join('out', route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing ${file}`);

  const html = fs.readFileSync(file, 'utf8');
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${file} must contain one H1`,
  );

  for (const term of [
    'rel="canonical"',
    'viewport-fit=cover',
    'property="og:image"',
    'apple-touch-icon',
  ]) {
    assert.ok(html.includes(term), `${file} missing ${term}`);
  }

  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    const url = match[1];
    if (url === '/' || url.startsWith('//')) continue;

    const target = path.join('out', decodeURIComponent(url));
    assert.ok(
      fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html')),
      `${file}: missing local asset/link ${url}`,
    );
  }
}

for (const file of [
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'icon.png',
  'apple-touch-icon.png',
  'icon-512.png',
  'favicon.ico',
  'images/hero.webp',
  'images/hero-poster.webp',
  'images/og.jpg',
]) {
  assert.ok(fs.existsSync(path.join('out', file)), file);
}

const webp = fs.readFileSync('out/images/hero.webp');
assert.equal(webp.toString('ascii', 0, 4), 'RIFF');
assert.ok(
  webp.includes(Buffer.from('ANIM')) && webp.includes(Buffer.from('ANMF')),
  'Hero must be animated WebP',
);

console.log(
  `PASS: ${routes.length} prerendered pages, H1s, metadata, local links/assets, static crawler files, icons and genuine animated WebP.`,
);
