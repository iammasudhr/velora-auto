'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  packages,
  vehicleClasses,
  packagePrice,
  money,
  pricing,
  type VehicleClass,
} from '@/data/packages';
import Icon from './Icon';

export default function Packages() {
  const [vehicle, setVehicle] = useState<VehicleClass>('hatchback');

  return (
    <>
      <div className="vehicle-tabs" role="group" aria-label="Vehicle size">
        {vehicleClasses.map((v) => (
          <button
            key={v.id}
            aria-pressed={vehicle === v.id}
            onClick={() => setVehicle(v.id)}
            className={vehicle === v.id ? 'active' : ''}
          >
            <Icon name="car" />
            {v.name}
          </button>
        ))}
      </div>

      <div className="package-grid" aria-live="polite">
        {packages.map((p) => (
          <article
            className={`package-card hover-card ${p.featured ? 'featured' : ''}`}
            key={p.id}
          >
            <span className="label">{p.tag}</span>
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            <div className="price">
              <small>Starting from</small>
              <strong>{money(packagePrice(p.base, vehicle))}</strong>
              <span>
                {vehicleClasses.find((v) => v.id === vehicle)?.name}
              </span>
            </div>

            <ul>
              {p.items.map((i) => (
                <li key={i}>
                  <Icon name="check" />
                  {i}
                </li>
              ))}
            </ul>

            <div className="package-time">
              <Icon name="clock" />
              {p.time}
            </div>

            <Link
              href={`/book/?service=${p.service}&package=${p.id}`}
              className={`button full ${
                p.featured ? 'button-lime' : 'button-outline'
              }`}
            >
              Enquire about this package
              <Icon name="arrow" />
            </Link>
          </article>
        ))}
      </div>

      <p className="fine-print pricing-note">{pricing.note}</p>
    </>
  );
}
