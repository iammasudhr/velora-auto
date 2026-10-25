'use client';

import { useState } from 'react';
import Image from 'next/image';
import { gallery, galleryFilters, galleryContent } from '@/data/gallery';

export default function Gallery() {
  const [filter, setFilter] = useState('All');

  return (
    <>
      <div className="filter-tabs" role="group" aria-label="Gallery category">
        {galleryFilters.map((c) => (
          <button
            key={c}
            aria-pressed={c === filter}
            className={c === filter ? 'active' : ''}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {gallery
          .filter((g) => filter === 'All' || g.category === filter)
          .map((g) => (
            <figure key={g.id} className="hover-card">
              <Image
                src={g.image}
                alt={g.alt}
                width={850}
                height={650}
                sizes="(max-width:700px) 100vw, 50vw"
              />
              <figcaption>
                <span className="label">{g.category}</span>
                <h3>{g.title}</h3>
              </figcaption>
            </figure>
          ))}
      </div>

      <p className="fine-print">{galleryContent.notice}</p>
    </>
  );
}
