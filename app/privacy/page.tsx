import { pages } from '@/data/pages';
import { seo } from '@/lib/seo';

export const metadata = seo('Privacy', pages.privacy.intro, '/privacy/');

export default function Page() {
  const p = pages.privacy;

  return (
    <article className="container legal section">
      <span className="eyebrow">VELORA / PRIVACY</span>
      <h1>{p.title}</h1>
      <p>{p.intro}</p>
      {p.sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.text}</p>
        </section>
      ))}
    </article>
  );
}
