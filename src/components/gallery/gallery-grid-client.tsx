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
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previous; opener.current?.focus()};
  }, [isOpen]);

  const close = () => {dialog.current?.close(); setActive(null)};
  const move = (delta: number) => setActive(index => index === null ? null : (index + delta + photos.length) % photos.length);
  const cards = visible.map(item => (
    <figure className={`gallery-card gallery-card--${item.gridSize || 'medium'}`} key={item._id}>
      <button className="gallery-photo-button" aria-label={`Enlarge ${item.imageAlt || item.title || 'gallery photo'}`} onClick={event => {
        opener.current = event.currentTarget;
        setActive(photos.findIndex(photo => photo._id === item._id));
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
          <div className="gallery-controls"><button autoFocus onClick={close}>Close</button>{photos.length > 1 && <><button onClick={() => move(-1)}>Previous</button><button onClick={() => move(1)}>Next</button></>}</div>
          {selected && <img src={urlFor(selected.image!).width(2400).fit('max').url()} alt={selected.imageAlt || selected.title || 'Gallery photo'} />}
          <p aria-live="polite">{active === null ? '' : `${active + 1} / ${photos.length}`}{selected?.title ? ` — ${selected.title}` : ''}</p>
        </div>
      </dialog>
    </section>
  );
}
export default GalleryGridClient;
