'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { navigation, mobileTabs } from '@/data/navigation';
import Icon from './Icon';
import { swipeTarget, isAtPageBottom } from '@/lib/navigation';

export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="brand-symbol" aria-hidden="true">
        V<span>/</span>
      </span>
      <span>
        {site.shortName}
        <small>{site.descriptor}</small>
      </span>
    </span>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  const active = mobileTabs.findIndex((t) =>
    t.href === '/' ? pathname === '/' : pathname.startsWith(t.href),
  );

  useEffect(() => {
    let last = window.scrollY;
    let acc = 0;

    const listener = () => {
      const y = Math.max(0, window.scrollY);
      const d = y - last;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const atBottom = isAtPageBottom(y, window.innerHeight, scrollHeight);

      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;

      if (y < 90 || atBottom) {
        setHidden(false);
        acc = 0;
      } else if (Math.abs(acc) > 14) {
        setHidden(acc > 0);
        acc = 0;
      }

      last = y;
    };

    window.addEventListener('scroll', listener, { passive: true });
    window.addEventListener('resize', listener, { passive: true });
    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, []);

  useEffect(() => {
    setMenu(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [menu]);

  function swipeEnd(e: React.TouchEvent) {
    if (!start.current) return;
    const dx = e.changedTouches[0].clientX - start.current.x;
    const dy = e.changedTouches[0].clientY - start.current.y;
    start.current = null;

    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

    const index = swipeTarget(active, dx, dy, mobileTabs.length);
    if (index !== active) {
      swiped.current = true;
      setAnnouncement(`${mobileTabs[index].label} page`);
      router.push(mobileTabs[index].href);
      setTimeout(() => {
        swiped.current = false;
      }, 400);
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <Icon name="map" />
            {site.topbar.left}
          </span>
          <span>{site.topbar.right}</span>
          <a href={`tel:+91${site.phone}`}>
            <Icon name="phone" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((n) => (
              <Link
                href={n.href}
                key={n.href}
                aria-current={
                  pathname.startsWith(n.href) ? 'page' : undefined
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link className="button button-lime header-cta" href="/book/">
            Book a visit
            <Icon name="arrow" />
          </Link>

          <button
            className="menu-toggle"
            id="menu-toggle"
            aria-controls="mobile-menu"
            aria-expanded={menu}
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? 'close' : 'menu'} />
          </button>
        </div>

        {menu && (
          <nav
            className="mobile-menu"
            id="mobile-menu"
            aria-label="Expanded navigation"
          >
            <Link href="/">Home</Link>
            {navigation.map((n) => (
              <Link href={n.href} key={n.href}>
                {n.label}
              </Link>
            ))}
            <Link href="/book/">Book a studio visit</Link>
            <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
          </nav>
        )}
      </header>

      <nav
        ref={navRef}
        className={`mobile-dock ${hidden || menu ? 'is-hidden' : ''}`}
        aria-label="Quick pages. Swipe left or right to change pages."
        onTouchStart={(e) => {
          start.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
          swiped.current = false;
        }}
        onTouchEnd={swipeEnd}
        onTouchCancel={() => {
          start.current = null;
        }}
        onClickCapture={(e) => {
          if (swiped.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {mobileTabs.map((t, i) => (
          <Link
            href={t.href}
            key={t.href}
            aria-current={i === active ? 'page' : undefined}
            className={i === active ? 'active' : ''}
          >
            <Icon name={t.icon} />
            <span>{t.label}</span>
          </Link>
        ))}
      </nav>

      <span className="sr-only" role="status">
        {announcement}
      </span>
    </>
  );
}
