"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { GalleryLabels, GallerySlide } from "./ProjectGallery";

const SWIPE_PX = 50;
const ZOOM = 2.5;

function Icon({ d, className = "h-6 w-6" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/**
 * Full-screen viewer, shopping-site style: big image, arrows, swipe, thumbnails,
 * tap/click to zoom and move to pan. Uses native <dialog> for Esc, focus trap and top layer.
 */
export function GalleryLightbox({
  slides,
  name,
  labels,
  index,
  onIndexChange,
  open,
  onClose,
}: {
  slides: GallerySlide[];
  name: string;
  labels: GalleryLabels;
  index: number;
  onIndexChange: (i: number) => void;
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const gesture = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const count = slides.length;

  const go = (next: number) => {
    setZoomed(false);
    onIndexChange((next + count) % count);
  };

  // Open/close the native dialog and lock page scroll while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setZoomed(false);
    document.documentElement.style.overflow = "";
    onClose();
  };

  const originFrom = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    return `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`;
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    gesture.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (g && Math.hypot(e.clientX - g.x, e.clientY - g.y) > 8) g.moved = true;
    // While zoomed, the image follows the pointer (mouse hover or finger drag).
    if (zoomed) setOrigin(originFrom(e));
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g) return;
    const dx = e.clientX - g.x;
    if (!zoomed && g.moved && Math.abs(dx) >= SWIPE_PX) {
      go(index + (dx < 0 ? 1 : -1));
    } else if (!g.moved) {
      // Tap / click toggles zoom, centred where you tapped.
      if (!zoomed) setOrigin(originFrom(e));
      setZoomed((z) => !z);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    // The dialog lives inside the carousel's React tree; don't let keys reach it too.
    e.stopPropagation();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  const btn =
    "inline-flex items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:bg-white/25";
  const slide = slides[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${name} — ${labels.slide} ${index + 1} ${labels.of} ${count}`}
      onClose={handleClose}
      onCancel={handleClose}
      onKeyDown={onKeyDown}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
    >
      {open && slide && (
        <div className="flex h-full flex-col">
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="font-mono text-sm text-white/80" aria-live="polite">
              {name} · {index + 1} / {count}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? labels.zoomOut : labels.zoomIn}
                aria-pressed={zoomed}
                className={`${btn} h-10 w-10`}
              >
                <Icon
                  className="h-5 w-5"
                  d={zoomed ? "M8 11h6M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" : "M11 8v6M8 11h6M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35"}
                />
              </button>
              <button
                type="button"
                onClick={handleClose}
                aria-label={labels.close}
                autoFocus
                className={`${btn} h-10 w-10`}
              >
                <Icon className="h-5 w-5" d="M18 6 6 18M6 6l12 12" />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div className="relative min-h-0 flex-1">
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (gesture.current = null)}
              className={`absolute inset-0 overflow-hidden px-2 sm:px-16 ${
                zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in touch-pan-y"
              }`}
            >
              <div
                className="relative h-full w-full transition-transform duration-200 ease-out"
                style={{ transform: zoomed ? `scale(${ZOOM})` : "none", transformOrigin: origin }}
              >
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  draggable={false}
                  className="object-contain select-none"
                />
              </div>
            </div>

            {count > 1 && !zoomed && (
              <>
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label={labels.previous}
                  className={`${btn} absolute top-1/2 left-2 h-12 w-12 -translate-y-1/2 sm:left-4`}
                >
                  <Icon d="m15 5-7 7 7 7" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label={labels.next}
                  className={`${btn} absolute top-1/2 right-2 h-12 w-12 -translate-y-1/2 sm:right-4`}
                >
                  <Icon d="m9 5 7 7-7 7" />
                </button>
              </>
            )}
          </div>

          {/* Caption + thumbnails */}
          <div className="shrink-0 px-4 pt-2 pb-4 sm:px-6">
            <p className="mx-auto max-w-3xl text-center text-sm text-white/75">{slide.alt}</p>
            {count > 1 && (
              <div className="mt-3 flex justify-center gap-2 overflow-x-auto">
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${labels.show} ${i + 1} ${labels.of} ${count}`}
                    aria-current={i === index}
                    className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-opacity sm:h-14 sm:w-24 ${
                      i === index ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-90"
                    }`}
                  >
                    <Image src={s.src} alt="" fill sizes="96px" className="object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-2 hidden text-center font-mono text-[11px] text-white/45 sm:block">
              {labels.hint}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}
