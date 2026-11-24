import {getGalleryItems, getGalleryPageContent, type GalleryPageContent} from '@/sanity/lib/queries';
import GalleryGridClient, {type GalleryItem} from '@/components/gallery/gallery-grid-client';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  let page: GalleryPageContent | null = null;
  let items: GalleryItem[] = [];
  let failed = false;
  try {
    [page, items] = await Promise.all([getGalleryPageContent(), getGalleryItems()]);
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
    failed = true;
  }
  return <main className="page-shell">
    <section className="gallery-intro">
      <h1>{page?.heading || 'A growing collection of recent work'}</h1>
      {page?.sectionCopy && <p className="section-copy">{page.sectionCopy}</p>}
    </section>
    {failed ? <p role="status">The gallery is temporarily unavailable. Please try again shortly.</p> : <GalleryGridClient items={items} />}
  </main>;
}
