'use client';

import { useState } from 'react';
import Image from 'next/image';
import { home } from '@/data/home';
import Icon from './Icon';

export default function BeforeAfter() {
  const [value, setValue] = useState(50);
  const c = home.comparison;

  return (
    <div className="comparison">
      <div className="compare-stage">
        <Image
          src={c.after}
          alt="Clean finish after detailing"
          width={1400}
          height={800}
          sizes="(max-width: 800px) 100vw, 85vw"
        />

        <div
          className="compare-before"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={c.before}
            alt="Dull finish before detailing"
            fill
            sizes="(max-width: 800px) 100vw, 85vw"
          />
        </div>

        <span className="compare-tag before-tag">BEFORE</span>
        <span className="compare-tag after-tag">AFTER</span>

        <div className="compare-line" style={{ left: `${value}%` }}>
          <span>
            <Icon name="previous" />
            <Icon name="next" />
          </span>
        </div>

        <input
          aria-label="Before and after comparison. Move left to reveal after, right to reveal before."
          aria-valuetext={`${value}% before, ${100 - value}% after`}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>

      <div className="compare-footer">
        <span>DRAG TO EXPLORE</span>
        <p>{c.note}</p>
      </div>
    </div>
  );
}
