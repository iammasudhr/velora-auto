'use client';

import { useEffect, useState } from 'react';
import { home } from '@/data/home';
import Icon from './Icon';

export default function HeroMotion() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);

  return (
    <div className="hero-visual">
      <picture>
        {!paused && (
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet={home.hero.poster}
          />
        )}
        <img
          src={paused ? home.hero.poster : home.hero.image}
          alt={home.hero.alt}
          width={960}
          height={720}
          fetchPriority="high"
        />
      </picture>

      <div className="hero-image-label">
        <span className="status-dot" />
        {home.hero.imageLabel}
      </div>

      {!reduced && (
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? home.hero.play : home.hero.pause}
          aria-pressed={paused}
        >
          <Icon name={paused ? 'play' : 'pause'} />
          <span>{paused ? home.hero.play : home.hero.pause}</span>
        </button>
      )}
    </div>
  );
}
