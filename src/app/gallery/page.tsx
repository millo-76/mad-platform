import { getGalleryItems, getGalleryPageContent } from '@/sanity/lib/queries';
import GalleryGridClient from '@/components/gallery/gallery-grid-client';

export const dynamic = 'force-dynamic';

const defaultGalleryPageContent = {
  eyebrow: 'Gallery',
  heading: 'A growing collection of recent work',
  sectionCopy: 'Drag photos to reorder them in Studio, set each photo size, and archive older work whenever you want to rotate what is live.',
};

const defaultGalleryItems = [
  {
    _id: 1,
    image: null,
    imageAlt: "Gallery placeholder",
  },
  {
    _id: 2,
    image: null,
    imageAlt: "Gallery placeholder",
  },
  {
    _id: 3,
    image: null,
    imageAlt: "Gallery placeholder",
  },
  {
    _id: 4,
    image: null,
    imageAlt: "Gallery placeholder",
  },
  {
    _id: 5,
    image: null,
    imageAlt: "Gallery placeholder",
  },
  {
    _id: 6,
    image: null,
    imageAlt: "Gallery placeholder",
  },
];

export default async function GalleryPage() {
  let pageContent = defaultGalleryPageContent;
  let galleryItems = [];

  try {
    const [fetchedPageContent, fetchedItems] = await Promise.all([
      getGalleryPageContent(),
      getGalleryItems(),
    ]);

    if (fetchedPageContent) {
      pageContent = {
        eyebrow: fetchedPageContent.eyebrow || defaultGalleryPageContent.eyebrow,
        heading: fetchedPageContent.heading || defaultGalleryPageContent.heading,
        sectionCopy: fetchedPageContent.sectionCopy || defaultGalleryPageContent.sectionCopy,
      };
    }

    galleryItems = fetchedItems;
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    galleryItems = defaultGalleryItems;
  }

  // Fallback to default if empty
  const items = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  return (
    <main className="page-shell">
      <section className="gallery-intro">
        <h1>{pageContent.heading}</h1>
        <p className="section-copy">
          {items.length === defaultGalleryItems.length
            ? "Upload photos in Studio, drag to reorder them, set their size, and toggle archive on any photo to hide it without deleting it."
            : pageContent.sectionCopy}
        </p>
      </section>

      <GalleryGridClient items={items} />
    </main>
  );
}