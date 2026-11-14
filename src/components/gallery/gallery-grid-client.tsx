'use client';

import {useEffect, useRef, useState} from 'react';
import type {SanityImageSource} from '@sanity/image-url';
import {urlFor} from '@/sanity/lib/image';

export type GalleryStyle = 'grid' | 'carousel' | 'albums';
export type GalleryItem = {
  _id: string;
  title?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  album?: string;
  isArchived?: boolean;
  gridSize?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
};

export function GalleryGridClient({items, initialStyle = 'grid'}: {items: GalleryItem[]; initialStyle?: GalleryStyle}) {
  const [style, setStyle] = useState<GalleryStyle>(initialStyle);
  const [album, setAlbum] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const viewerTrack = useRef<HTMLDivElement>(null);
  const viewerIndex = useRef(0);
  const opener = useRef<HTMLElement | null>(null);
  const photos = items.filter(item => item.image);
  const albumName = (item: GalleryItem) => item.album?.trim() || 'Uncategorized';
  const albums = [...new Set(photos.map(albumName))];
  const visible = style === 'albums' && album ? photos.filter(item => albumName(item) === album) : photos;
  const selected = active === null ? null : photos[active];

  useEffect(() => {setStyle(initialStyle)}, [initialStyle]);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    dialog.current?.showModal();
    const rail = viewerTrack.current;
    const alignPhoto = () => rail?.scrollTo({left: viewerIndex.current * rail.clientWidth, behavior: 'instant'});
    alignPhoto();
    const resize = new ResizeObserver(alignPhoto);
    if (rail) resize.observe(rail);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {resize.disconnect(); document.body.style.overflow = previous; opener.current?.focus()};
  }, [isOpen]);

  const close = () => {dialog.current?.close(); setActive(null)};
  const move = (delta: number) => {
    const rail = viewerTrack.current;
    if (!rail || active === null) return;
    viewerIndex.current = Math.max(0, Math.min(photos.length - 1, viewerIndex.current + delta));
    rail.scrollTo({left: viewerIndex.current * rail.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  const cards = visible.map(item => (
    <figure className={`gallery-card gallery-card--${item.gridSize || 'medium'}`} key={item._id}>
      <button className="gallery-photo-button" aria-label={`Enlarge ${item.imageAlt || item.title || 'gallery photo'}`} onClick={event => {
        opener.current = event.currentTarget;
        viewerIndex.current = photos.findIndex(photo => photo._id === item._id);
        setActive(viewerIndex.current);
      }}>
        <img src={urlFor(item.image!).width(1400).quality(85).url()} alt={item.imageAlt || item.title || 'Gallery photo'} className="gallery-media-image" loading="lazy" />
      </button>
    </figure>
  ));

  return (
    <section className="gallery-experience" aria-label="Photo gallery">
      <div className="gallery-controls" role="group" aria-label="Gallery style">
        {(['grid', 'carousel', 'albums'] as const).map(option => <button key={option} aria-pressed={style === option} onClick={() => {setStyle(option); setAlbum(null)}}>{option[0].toUpperCase() + option.slice(1)}</button>)}
      </div>
      {!photos.length ? <p>No photos to display yet.</p> : style === 'albums' && !album ? (
        <div className="gallery-albums">{albums.map(name => {
          const members = photos.filter(item => albumName(item) === name);
          return <button className="gallery-album" key={name} onClick={() => setAlbum(name)}>
            <img src={urlFor(members[0].image!).width(800).url()} alt="" loading="lazy" />
            <span>{name} · {members.length} {members.length === 1 ? 'photo' : 'photos'}</span>
          </button>;
        })}</div>
      ) : <>
        {style === 'albums' && <div className="gallery-controls"><button onClick={() => setAlbum(null)}>Back to albums</button><h2>{album}</h2></div>}
        {style === 'carousel' && <div className="gallery-controls"><button aria-label="Previous photos" onClick={() => track.current?.scrollBy({left: -track.current.clientWidth, behavior: 'smooth'})}>Previous</button><button aria-label="Next photos" onClick={() => track.current?.scrollBy({left: track.current.clientWidth, behavior: 'smooth'})}>Next</button></div>}
        <div ref={track} className={style === 'carousel' ? 'gallery-carousel' : 'gallery-grid'} tabIndex={style === 'carousel' ? 0 : undefined} aria-label={style === 'carousel' ? 'Scroll through photos' : undefined}>{cards}</div>
      </>}
      <dialog ref={dialog} className="gallery-lightbox" aria-label="Enlarged photo" onCancel={close} onClose={() => setActive(null)} onClick={event => {if (event.target === event.currentTarget) close()}} onKeyDown={event => {
        if (event.key === 'ArrowLeft') {event.preventDefault(); move(-1)}
        if (event.key === 'ArrowRight') {event.preventDefault(); move(1)}
      }}>
        <div className="gallery-lightbox-content">
          <div className="gallery-lightbox-toolbar"><button className="gallery-lightbox-close" autoFocus onClick={close} aria-label="Close enlarged photo">×</button></div>
          <div className="gallery-lightbox-stage">
            <div ref={viewerTrack} className="gallery-lightbox-track" aria-label="Photos — swipe to browse" onScroll={event => {
              const rail = event.currentTarget;
              if (!isOpen || !dialog.current?.open || !rail.clientWidth) return;
              const index = Math.round(rail.scrollLeft / rail.clientWidth);
              setActive(Math.max(0, Math.min(photos.length - 1, index)));
              // Update the navigation position only once a slide is aligned.
              if (Math.abs(rail.scrollLeft - index * rail.clientWidth) < 2) viewerIndex.current = index;
            }}>
              {isOpen && photos.map((photo, index) => <div className="gallery-lightbox-slide" key={photo._id} aria-hidden={active !== index}>
                <img src={urlFor(photo.image!).width(2400).fit('max').url()} alt={photo.imageAlt || photo.title || 'Gallery photo'} loading={Math.abs(index - (active ?? 0)) <= 1 ? 'eager' : 'lazy'} draggable={false} />
              </div>)}
            </div>
            {photos.length > 1 && <>
              <button className="gallery-lightbox-arrow gallery-lightbox-arrow--previous" aria-label="Previous photo" disabled={active === 0} onClick={() => move(-1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
              </button>
              <button className="gallery-lightbox-arrow gallery-lightbox-arrow--next" aria-label="Next photo" disabled={active === photos.length - 1} onClick={() => move(1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
              </button>
            </>}
          </div>
          <p aria-live="polite">{active === null ? '' : `${active + 1} / ${photos.length}`}{selected?.title ? ` — ${selected.title}` : ''}</p>
        </div>
      </dialog>
    </section>
  );
}
export default GalleryGridClient;
