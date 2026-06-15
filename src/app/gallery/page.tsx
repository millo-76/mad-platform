import { getGalleryItems } from '@/sanity/lib/queries';
import { GalleryGridClient } from '@/components/gallery/gallery-grid-client';

export const dynamic = 'force-dynamic';

const defaultGalleryItems = [
  {
    _id: 1,
    title: "Editorial Series",
    category: "Photography",
    description: "A structured visual narrative intended for print and digital covers.",
  },
  {
    _id: 2,
    title: "Brand Campaign",
    category: "Creative Direction",
    description: "Launch assets designed around a modular campaign identity.",
  },
  {
    _id: 3,
    title: "Product Showcase",
    category: "Commercial",
    description: "High-detail compositions featuring texture, form, and color balance.",
  },
  {
    _id: 4,
    title: "Portrait Collection",
    category: "Portraits",
    description: "Character-led work focused on mood, contrast, and environment.",
  },
  {
    _id: 5,
    title: "Studio Archive",
    category: "Behind The Scenes",
    description: "Reference moments documenting process and production context.",
  },
  {
    _id: 6,
    title: "Motion Frames",
    category: "Film",
    description: "Cinematic stills extracted from short-form motion pieces.",
  },
];

export default async function GalleryPage() {
  let galleryItems = [];

  try {
    galleryItems = await getGalleryItems();
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    galleryItems = defaultGalleryItems;
  }

  // Fallback to default if empty
  const items = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  return (
    <main className="page-shell">
      <section>
        <p className="eyebrow">Gallery</p>
        <h1>Featured work collection</h1>
        <p className="section-copy">
          {items.length === defaultGalleryItems.length
            ? "Replace these placeholders with project thumbnails, media, or dynamic content from your CMS when ready."
            : "A curated collection of recent work."}
        </p>
      </section>

      <GalleryGridClient items={items} />
    </main>
  );
}