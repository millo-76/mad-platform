"use client";

import { useEffect, useMemo, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

type GalleryImage = {
  image: any;
  alt: string;
  caption?: string;
};

type GalleryItem = {
  _id: string | number;
  title: string;
  category?: string;
  description?: string;
  image?: any;
  images?: GalleryImage[];
};

function buildImageSet(item: GalleryItem) {
  const extraImages = (item.images || [])
    .filter((entry) => entry?.image)
    .map((entry, index) => ({
      ...entry,
      alt: entry.alt || `${item.title} image ${index + 1}`,
    }));

  if (!item.image) {
    return extraImages;
  }

  const primaryRef = item.image.asset?._ref;
  const withoutPrimaryDuplicates = extraImages.filter(
    (entry) => entry.image?.asset?._ref !== primaryRef,
  );

  return [
    {
      image: item.image,
      alt: item.title,
      caption: item.description,
    },
    ...withoutPrimaryDuplicates,
  ];
}

export function GalleryGridClient({ items }: { items: GalleryItem[] }) {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeItem = activeItemIndex === null ? null : items[activeItemIndex];
  const activeImages = useMemo(() => (activeItem ? buildImageSet(activeItem) : []), [activeItem]);
  const activeImage = activeImages[activeImageIndex] || activeImages[0] || null;

  useEffect(() => {
    if (activeItemIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItemIndex(null);
        setActiveImageIndex(0);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItemIndex]);

  const closeModal = () => {
    setActiveItemIndex(null);
    setActiveImageIndex(0);
  };

  return (
    <>
      <section className="gallery-grid" aria-label="Gallery items">
        {items.map((item, itemIndex) => {
          const imageSet = buildImageSet(item);
          const leadImage = item.image
            ? {
                image: item.image,
                alt: item.title,
              }
            : imageSet[0];

          return (
            <article className="gallery-card" key={item._id}>
              <button
                type="button"
                className="gallery-media-button"
                onClick={() => {
                  setActiveItemIndex(itemIndex);
                  setActiveImageIndex(0);
                }}
                aria-label={`Open images for ${item.title}`}
              >
                {leadImage ? (
                  <div className="gallery-media-frame">
                    <img
                      src={urlFor(leadImage.image).width(1200).quality(85).url()}
                      alt={leadImage.alt}
                      className="gallery-media-image"
                    />
                  </div>
                ) : (
                  <div className="placeholder-media" aria-hidden="true" />
                )}
              </button>
              <div className="gallery-meta">
                {item.category ? <p className="chip">{item.category}</p> : null}
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {imageSet.length > 1 ? <p className="gallery-hint">{imageSet.length} images available</p> : null}
              </div>
            </article>
          );
        })}
      </section>

      {activeItem ? (
        <div className="gallery-modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="gallery-modal-close" onClick={closeModal} aria-label="Close gallery preview">
              Close
            </button>

            <div className="gallery-modal-main">
              {activeImage ? (
                <figure className="gallery-modal-figure">
                  <img
                    src={urlFor(activeImage.image).width(1400).quality(90).url()}
                    alt={activeImage.alt}
                    className="gallery-modal-image"
                  />
                  {activeImage.caption ? <figcaption className="gallery-modal-caption">{activeImage.caption}</figcaption> : null}
                </figure>
              ) : null}

              <div className="gallery-modal-copy">
                {activeItem.category ? <p className="chip">{activeItem.category}</p> : null}
                <h2 id="gallery-modal-title">{activeItem.title}</h2>
                {activeItem.description ? <p>{activeItem.description}</p> : null}
              </div>
            </div>

            {activeImages.length > 1 ? (
              <div className="gallery-thumb-strip" aria-label={`More images for ${activeItem.title}`}>
                {activeImages.map((image, imageIndex) => (
                  <button
                    key={`${activeItem._id}-${imageIndex}`}
                    type="button"
                    className={`gallery-thumb-button ${imageIndex === activeImageIndex ? "is-active" : ""}`}
                    onClick={() => setActiveImageIndex(imageIndex)}
                  >
                    <img
                      src={urlFor(image.image).width(280).quality(80).url()}
                      alt={image.alt}
                      className="gallery-thumb-image"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}