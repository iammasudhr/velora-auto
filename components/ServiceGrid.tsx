'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { services, serviceCategories } from '@/data/services';
import { money } from '@/data/packages';
import Icon from './Icon';

export default function ServiceGrid({
  filterable = false,
  limit,
}: {
  filterable?: boolean;
  limit?: number;
}) {
  const [filter, setFilter] = useState('All');
  const list = services
    .filter((s) => filter === 'All' || s.category === filter)
    .slice(0, limit);

  return (
    <>
      {filterable && (
        <div
          className="filter-tabs"
          role="group"
          aria-label="Service category"
        >
          {serviceCategories.map((c) => (
            <button
              key={c}
              className={c === filter ? 'active' : ''}
              aria-pressed={c === filter}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="service-grid">
        {list.map((s) => (
          <article className="service-card hover-card" key={s.slug}>
            <Link
              href={`/services/${s.slug}/`}
              className="service-image"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={s.image}
                width={700}
                height={520}
                sizes="(max-width:650px) 100vw, (max-width:1000px) 50vw, 33vw"
                alt={s.name}
              />
              <span className="service-number">
                0{services.indexOf(s) + 1} / {s.category}
              </span>
            </Link>

            <div className="service-body">
              <Icon name={s.icon} />
              <h3>
                <Link href={`/services/${s.slug}/`}>{s.name}</Link>
              </h3>
              <p>{s.description}</p>
              <div className="service-bottom">
                <span>From {money(s.from)}</span>
                <Link
                  href={`/services/${s.slug}/`}
                  aria-label={`Explore ${s.name}`}
                >
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
