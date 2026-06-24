import { urlFor } from "@/sanity/lib/image";

type GalleryItem = {
  _id: string | number;
  title?: string;
  image?: any;
  imageAlt?: string;
};

export function GalleryGridClient({ items }: { items: GalleryItem[] }) {
  return (
    <section className="gallery-grid" aria-label="Gallery items">
      {items.map((item) => (
        <figure className="gallery-card" key={item._id}>
          {item.image ? (
            <img
              src={urlFor(item.image).width(1400).quality(85).url()}
              alt={item.imageAlt || item.title || "Gallery photo"}
              className="gallery-media-image"
            />
          ) : (
            <div className="placeholder-media" aria-hidden="true" />
          )}
        </figure>
      ))}
    </section>
  );
}

export default GalleryGridClient;
