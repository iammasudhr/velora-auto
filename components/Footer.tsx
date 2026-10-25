import Link from 'next/link';
import { site, whatsappLink } from '@/data/site';
import { navigation } from '@/data/navigation';
import { services } from '@/data/services';
import { Wordmark } from './Navigation';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>
          <p>{site.footer.text}</p>
          <a
            className="text-link"
            href={whatsappLink(
              'Hello, I’d like to discuss a car detailing service.',
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Let’s talk
            <Icon name="arrow" />
          </a>
        </div>

        <div>
          <h3>Explore</h3>
          {navigation.map((n) => (
            <Link href={n.href} key={n.href}>
              {n.label}
            </Link>
          ))}
        </div>

        <div>
          <h3>The care collection</h3>
          {services.map((s) => (
            <Link href={`/services/${s.slug}/`} key={s.slug}>
              {s.name}
            </Link>
          ))}
        </div>

        <div>
          <h3>Visit, by appointment</h3>
          <p>{site.location}</p>
          <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
          <p>{site.hours}</p>
          <span className="fine-print">{site.locationNote}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()}{' '}
          <Link href="/">Velora Auto Studio</Link>. {site.footer.copyright}
        </span>
        <div className="footer-legal">
          <Link href="/privacy/">Privacy Policy</Link>
          <Link href="/terms/">Terms &amp; Conditions</Link>
        </div>
        <a
          className="dev-logo"
          href="https://infitus.in"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Developed by Infitus"
        >
          <img
            src="/dev-logo.svg"
            alt="Developed by Infitus"
            width={122}
            height={16}
          />
        </a>
      </div>

      {site.demo && (
        <p className="container footer-notice">{site.footer.notice}</p>
      )}
    </footer>
  );
}
