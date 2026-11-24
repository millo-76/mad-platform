'use client';

import {useEffect, useRef, useState} from 'react';
import {useClient} from 'sanity';
import {IntentLink} from 'sanity/router';
import GalleryGridClient, {type GalleryItem, type GalleryStyle} from '@/components/gallery/gallery-grid-client';
import {urlFor} from '../lib/image';

type StudioPhoto = GalleryItem & {_id: string; filename?: string};
const query = `{"photos": *[_type == "galleryItem"] | order(orderRank asc, _createdAt asc){..., "filename": image.asset->originalFilename}, "page": *[_type == "galleryPage"][0]}`;

export function GalleryStudio() {
  const client = useClient({apiVersion: '2025-02-19'});
  const [photos, setPhotos] = useState<StudioPhoto[]>([]);
  const [style, setStyle] = useState<GalleryStyle>('grid');
  const [preview, setPreview] = useState(false);
  const [archived, setArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pending, setPending] = useState<StudioPhoto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const confirmation = useRef<HTMLElement>(null);
  useEffect(() => {if (pending) {confirmation.current?.focus(); confirmation.current?.scrollIntoView({block: 'nearest'})}}, [pending]);

  useEffect(() => {
    let mounted = true;
    let generation = 0;
    async function refresh() {
      const request = ++generation;
      try {
        const result = await client.fetch<{photos: StudioPhoto[]; page: {galleryStyle?: GalleryStyle} | null}>(query, {}, {perspective: 'drafts', useCdn: false});
        if (mounted && request === generation) {setPhotos(result.photos); setStyle(result.page?.galleryStyle || 'grid'); setError('')}
      } catch {
        if (mounted) setError('Could not load gallery photos. Check your connection and refresh.');
      } finally {if (mounted) setLoading(false)}
    }
    void refresh();
    const subscription = client.listen('*[_type in ["galleryItem", "galleryPage"]]', {}, {includeResult: false}).subscribe({next: () => void refresh(), error: () => {if (mounted) setError('Live updates disconnected. Refresh to see the latest photos.')}});
    return () => {mounted = false; subscription.unsubscribe()};
  }, [client]);

  async function deletePhoto() {
    if (!pending) return;
    const id = pending._id.replace(/^drafts\./, '');
    setDeleting(true);
    setError('');
    try {
      await client.transaction().delete(`drafts.${id}`).delete(id).commit();
      setPhotos(current => current.filter(photo => photo._id.replace(/^drafts\./, '') !== id));
      setPending(null);
    } catch {
      setError('Could not delete this photo. Check your permissions, connection, or whether another document references it.');
    } finally {setDeleting(false)}
  }

  return <div className="studio-gallery">
    <h1>Gallery photos</h1>
    <p>See your photos together, or preview their layout. Draft edits appear in this preview; publish each photo to update the website.</p>
    <div className="gallery-controls">
      <IntentLink intent="create" params={{type: 'galleryItem'}}>Add photo</IntentLink>
      <button aria-pressed={!preview} onClick={() => setPreview(false)}>Manage photos</button>
      <button aria-pressed={preview} onClick={() => setPreview(true)}>Preview gallery</button>
    </div>
    <p>Use Gallery photo order to drag photos into order. The website displays albums. Use the same album name on photos you want to group.</p>
    {error && <p role="alert">{error}</p>}
    {pending && <section ref={confirmation} tabIndex={-1} role="region" aria-label="Confirm photo deletion" className="studio-gallery-card">
      <h2>Delete {pending.title || pending.filename || 'this photo'}?</h2>
      <p>This permanently deletes the gallery entry, including its draft, and removes it from the website. The uploaded asset stays in the media library so other pages using it are unaffected. Archive the photo instead if you want to reuse this entry later.</p>
      <div className="gallery-controls"><button disabled={deleting} onClick={() => void deletePhoto()}>{deleting ? 'Deleting…' : 'Permanently delete photo'}</button><button disabled={deleting} onClick={() => setPending(null)}>Cancel</button></div>
    </section>}
    {loading ? <p role="status">Loading photos…</p> : preview ? <GalleryGridClient items={photos.filter(photo => !photo.isArchived)} initialStyle={style} showStyleControls /> : <>
      <label><input type="checkbox" checked={archived} onChange={event => setArchived(event.target.checked)} /> Show archived photos</label>
      <div className="studio-gallery-grid">{photos.filter(photo => archived || !photo.isArchived).map(photo => <article key={photo._id} className="studio-gallery-card">
        {photo.image && <img src={urlFor(photo.image).width(600).url()} alt={photo.imageAlt || photo.title || photo.filename || 'Gallery photo'} loading="lazy" />}
        <p>{photo.title || photo.filename || 'Untitled photo'}</p>
        <p>{photo.gridSize || 'medium'} · {photo.album || 'Uncategorized'}{photo.isArchived ? ' · Archived' : ''}</p>
        <div className="gallery-controls"><IntentLink intent="edit" params={{id: photo._id.replace(/^drafts\./, ''), type: 'galleryItem'}}>Edit photo</IntentLink><button disabled={deleting} onClick={() => {setPending(photo); setError('')}}>Delete photo</button></div>
      </article>)}</div>
      {!photos.filter(photo => archived || !photo.isArchived).length && <p>No photos here yet. Add a photo or show archived photos.</p>}
    </>}
  </div>;
}
