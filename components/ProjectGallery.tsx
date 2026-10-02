'use client';

import {useEffect, useState} from 'react';

type Props = {
  title: string;
  images: string[];
};

export default function ProjectGallery({title, images}: Props) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') {
        setActive((current) =>
          current === null ? 0 : (current + 1) % images.length
        );
      }
      if (event.key === 'ArrowLeft') {
        setActive((current) =>
          current === null
            ? 0
            : (current - 1 + images.length) % images.length
        );
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [active, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="project-gallery">
        <button
          className="gallery-hero-button"
          onClick={() => setActive(0)}
          aria-label={`Open ${title} gallery`}
        >
          <img
            className="gallery-large"
            src={images[0]}
            alt={`${title} - photo 1`}
          />
          <span className="gallery-view-label">View Gallery</span>
        </button>

        <div className="thumb-grid">
          {images.map((image, index) => (
            <button
              className={`gallery-thumb ${index === 0 ? 'selected' : ''}`}
              key={`${image}-${index}`}
              onClick={() => setActive(index)}
              aria-label={`Open photo ${index + 1}`}
            >
              <img src={image} alt={`${title} - photo ${index + 1}`} />
              {index === 0 && <span>Cover</span>}
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          onClick={() => setActive(null)}
        >
          <button
            className="gallery-close"
            onClick={() => setActive(null)}
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            className="gallery-nav gallery-prev"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active - 1 + images.length) % images.length);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[active]}
              alt={`${title} - photo ${active + 1}`}
            />
            <div className="gallery-counter">
              {active + 1} / {images.length}
            </div>
          </div>

          <button
            className="gallery-nav gallery-next"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active + 1) % images.length);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
