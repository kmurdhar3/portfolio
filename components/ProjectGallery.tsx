"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { GalleryLightbox } from "./GalleryLightbox";

export interface GallerySlide {
  src: string;
  alt: string;
}

export interface GalleryLabels {
  previous: string;
  next: string;
  show: string;
  slide: string;
  of: string;
  open: string;
  close: string;
  zoomIn: string;
  zoomOut: string;
  hint: string;
}

const SWIPE_PX = 40;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

/**
 * Screenshot carousel for the featured product card. Manual only (no autoplay): arrows,
 * dots, arrow keys and swipe. Slides are stacked and cross-faded so every image loads
 * lazily as the card nears the viewport and switching never flashes.
 */
export function ProjectGallery({
  slides,
  name,
  sizes,
  labels,
  className = "",
  preload = false,
}: {
  slides: GallerySlide[];
  name: string;
  sizes: string;
  labels: GalleryLabels;
  className?: string;
  preload?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const swipeStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  // Images load only once the gallery is close to the viewport (or always, if preloaded),
  // and only the slides you've reached plus the next one. Keeps the first page load light.
  const [near, setNear] = useState(preload);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]));
  useEffect(() => {
    if (near) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const go = (next: number) => {
    const i = (next + count) % count;
    setIndex(i);
    setSeen((prev) => {
      const nextSeen = new Set(prev);
      nextSeen.add(i);
      nextSeen.add((i + 1) % count);
      nextSeen.add((i - 1 + count) % count);
      return nextSeen;
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = e.clientX;
    swiped.current = false;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) >= SWIPE_PX) {
      swiped.current = true; // so the click that follows a swipe doesn't open the viewer
      go(index + (dx < 0 ? 1 : -1));
    }
  };
  const openViewer = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setViewerOpen(true);
  };

  const control =
    "inline-flex items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${name} ${labels.slide.toLowerCase()}s`}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      className={`relative aspect-[16/10] touch-pan-y overflow-hidden border-b border-line bg-surface-2 ${className}`}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${labels.slide} ${i + 1} ${labels.of} ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-300 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {near && seen.has(i) ? (
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes={sizes}
              preload={preload && i === 0}
              draggable={false}
              className="object-cover object-top select-none"
            />
          ) : (
            <span role="img" aria-label={s.alt} className="block h-full w-full" />
          )}
        </div>
      ))}

      {/* Whole image is the "open full screen" target; arrows and dots sit above it. */}
      <button
        type="button"
        onClick={openViewer}
        aria-label={`${labels.open}: ${labels.slide} ${index + 1} ${labels.of} ${count}`}
        aria-haspopup="dialog"
        className="group/open absolute inset-0 cursor-zoom-in"
      >
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white opacity-90 backdrop-blur-sm transition-opacity group-hover/open:opacity-100">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          {labels.open}
        </span>
      </button>

      {/* With a single screenshot there is nothing to browse: only the full-screen view. */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={labels.previous}
            className={`${control} absolute top-1/2 left-3 h-9 w-9 -translate-y-1/2`}
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={labels.next}
            className={`${control} absolute top-1/2 right-3 h-9 w-9 -translate-y-1/2`}
          >
            <Chevron direction="right" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-black/45 px-1.5 backdrop-blur-sm">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${labels.show} ${i + 1} ${labels.of} ${count}`}
                aria-current={i === index}
                className="group inline-flex h-6 w-5 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-white" : "w-2 bg-white/45 group-hover:bg-white/75"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {labels.slide} {index + 1} {labels.of} {count}
      </p>

      <GalleryLightbox
        slides={slides}
        name={name}
        labels={labels}
        index={index}
        onIndexChange={go}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
}
