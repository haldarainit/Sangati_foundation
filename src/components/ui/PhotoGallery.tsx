'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, Images } from 'lucide-react';

import { useAccessibility } from '../context/AccessibilityContext';

export interface GalleryPhoto {
  id: string;
  src: string;
  /** Both optional — photos can be uploaded in bulk and described later. */
  title?: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  /** How many to show before the "Show all" button appears. */
  initialCount?: number;
  /** Give the first photo a larger tile. Looks good for 6+ photos. */
  featureFirst?: boolean;
  /** Accessible name for the gallery region. */
  label?: string;
}

/**
 * Photo gallery with a full-screen viewer.
 *
 * Built for sets of 30+ photos:
 *  - only the first `initialCount` are in the DOM until "Show all" is pressed,
 *    and every tile below the fold lazy-loads
 *  - full keyboard support (arrows, Home/End, Escape) with focus trapped in the
 *    viewer and returned to the tile you opened it from
 *  - the viewer announces "Photo 3 of 30" to screen readers
 *  - honours the site's Reduced Motion setting
 */
export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  initialCount = 12,
  featureFirst = true,
  label = 'Photo gallery',
}) => {
  const { reduceMotion } = useAccessibility();
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = photos.length;
  const visible = expanded ? photos : photos.slice(0, initialCount);
  const hiddenCount = total - visible.length;

  const isOpen = openIndex !== null;
  const current = isOpen ? photos[openIndex] : null;

  const open = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((prev) => (prev === null ? prev : (prev + delta + total) % total));
    },
    [total]
  );

  // Return focus to the tile that opened the viewer.
  useEffect(() => {
    if (isOpen) return;
    const target = lastFocused.current;
    if (target && document.contains(target)) target.focus();
  }, [isOpen]);

  // Move focus into the viewer and lock background scrolling.
  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  // Keyboard handling for the viewer.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'ArrowRight':
          e.preventDefault();
          step(1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          step(-1);
          break;
        case 'Home':
          e.preventDefault();
          setOpenIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setOpenIndex(total - 1);
          break;
        case 'Tab': {
          // Trap focus inside the dialog.
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button');
          if (!focusables?.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close, step, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) step(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  if (!photos.length) return null;

  const motion = reduceMotion ? '' : 'transition-all duration-300';
  const zoom = reduceMotion ? '' : 'group-hover:scale-105 transition-transform duration-500';

  return (
    <>
      <section aria-label={label} className="space-y-5">
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0"
          role="list"
        >
          {visible.map((photo, idx) => {
            const feature = featureFirst && idx === 0 && total >= 6;

            return (
              <li
                key={photo.id}
                className={feature ? 'col-span-2 row-span-2' : ''}
              >
                <button
                  ref={(el) => {
                    tileRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => open(idx)}
                  aria-label={
                    photo.title
                      ? `View photo ${idx + 1} of ${total}: ${photo.title}`
                      : `View photo ${idx + 1} of ${total}`
                  }
                  className={`group relative block w-full h-full overflow-hidden rounded-2xl border-2 border-ink/15 bg-mist hover:border-road focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold focus-visible:border-road ${motion} ${
                    reduceMotion ? '' : 'hover:-translate-y-1 hover:shadow-xl'
                  }`}
                >
                  <div className={`relative w-full ${feature ? 'aspect-square' : 'aspect-[4/3]'}`}>
                    <Image
                      src={photo.src}
                      alt={photo.caption || photo.title || ''}
                      fill
                      loading={idx < 4 ? undefined : 'lazy'}
                      priority={false}
                      sizes={
                        feature
                          ? '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw'
                          : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                      }
                      className={`object-cover ${zoom}`}
                    />
                  </div>

                  {/* Caption overlay — only when there is something to show */}
                  {(photo.title || (feature && photo.caption)) && (
                    <div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent p-3 pt-8 text-left"
                      aria-hidden="true"
                    >
                      {photo.title && (
                        <p
                          className={`font-mono text-[10px] sm:text-xs font-bold text-marigold uppercase tracking-wide ${
                            feature ? 'line-clamp-2' : 'line-clamp-1'
                          }`}
                        >
                          {photo.title}
                        </p>
                      )}
                      {feature && photo.caption && (
                        <p className="font-body text-xs text-field/90 line-clamp-2 mt-1">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Zoom affordance */}
                  <span
                    className="absolute top-2 right-2 grid place-items-center w-8 h-8 rounded-full bg-field/90 text-ink opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {hiddenCount > 0 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-road text-field font-display font-bold border-2 border-ink rounded-full hover:bg-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold"
            >
              <Images className="w-5 h-5" aria-hidden="true" />
              <span>Show all {total} photos</span>
            </button>
          </div>
        )}
      </section>

      {/* Full-screen viewer */}
      {isOpen && current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${label}, photo ${openIndex + 1} of ${total}`}
          className="fixed inset-0 z-[100] bg-ink/97 flex flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Backdrop click closes */}
          <div className="absolute inset-0" onClick={close} aria-hidden="true" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between gap-4 p-4 text-field">
            <p className="font-mono text-xs sm:text-sm font-bold" aria-hidden="true">
              {openIndex + 1} / {total}
            </p>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] font-mono text-xs font-bold uppercase border-2 border-field/40 rounded-full hover:bg-field hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          {/* Image */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-2 sm:px-16 min-h-0">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-1 sm:left-4 z-20 grid place-items-center w-12 h-12 rounded-full bg-field/90 text-ink hover:bg-marigold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="relative w-full h-full max-w-5xl">
              <Image
                key={current.id}
                src={current.src}
                alt={current.caption || current.title || ''}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-1 sm:right-4 z-20 grid place-items-center w-12 h-12 rounded-full bg-field/90 text-ink hover:bg-marigold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marigold"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Caption — omitted entirely when the photo has neither */}
          {(current.title || current.caption) && (
            <div className="relative z-10 p-4 sm:p-6 text-center max-w-3xl mx-auto space-y-1">
              {current.title && (
                <p className="font-display font-bold text-field text-sm sm:text-lg">
                  {current.title}
                </p>
              )}
              {current.caption && (
                <p className="font-body text-xs sm:text-sm text-field/80">{current.caption}</p>
              )}
            </div>
          )}

          {/* Screen-reader announcement */}
          <p className="sr-only" role="status" aria-live="polite">
            {`Photo ${openIndex + 1} of ${total}.`}{' '}
            {current.caption || current.title || 'No description available.'}{' '}
            Use the left and right arrow keys to move between photos, and Escape to close.
          </p>
        </div>
      )}
    </>
  );
};
