"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ReactNode } from "react";

type Side = { src?: string; alt?: string; placeholder?: ReactNode };

/**
 * Accessible before/after comparison slider.
 * Drag, click, or use the keyboard (arrow keys) to compare.
 */
export function BeforeAfter({ before, after, className = "" }: { before: Side; after: Side; className?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const renderSide = (s: Side) =>
    s.src ? (
      <Image src={s.src} alt={s.alt ?? ""} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" draggable={false} />
    ) : (
      s.placeholder
    );

  return (
    <div
      ref={ref}
      className={`relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden bg-beige ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* After (base layer) */}
      <div className="absolute inset-0">{renderSide(after)}</div>
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {renderSide(before)}
      </div>

      <span className="pointer-events-none absolute left-4 top-4 bg-charcoal/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-white">Before</span>
      <span className="pointer-events-none absolute right-4 top-4 bg-ivory/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-charcoal">After</span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-charcoal/70 text-white backdrop-blur">
          <svg viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
            <path d="M6 1L1 6l5 5M18 1l5 5-5 5" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
