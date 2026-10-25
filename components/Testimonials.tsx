'use client';

import { useState } from 'react';
import { testimonials, testimonialContent } from '@/data/testimonials';
import Icon from './Icon';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">{testimonialContent.eyebrow}</span>
          <h2>{testimonialContent.title}</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <article
              className={`testimonial hover-card ${
                i === index ? 'mobile-active' : ''
              }`}
              key={t.id}
            >
              <Icon name="quote" />
              <blockquote>{t.quote}</blockquote>
              <div>
                <strong>{t.name}</strong>
                <span>{t.service}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonial-controls">
          <button
            aria-label="Previous testimonial"
            onClick={() =>
              setIndex((index + testimonials.length - 1) % testimonials.length)
            }
          >
            <Icon name="previous" />
          </button>
          <span aria-live="polite">
            {index + 1} / {testimonials.length}
          </span>
          <button
            aria-label="Next testimonial"
            onClick={() => setIndex((index + 1) % testimonials.length)}
          >
            <Icon name="next" />
          </button>
        </div>

        <p className="fine-print">{testimonialContent.notice}</p>
      </div>
    </section>
  );
}
