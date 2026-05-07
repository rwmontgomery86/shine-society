"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PAIR_COUNT = 6;

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [pair, setPair] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      handleMove(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section className="ss-section ss-ba">
      <div className="ss-ba__copy">
        <span className="ss-ba__kicker">— Before / After</span>
        <h2 className="ss-ba__title">Drag to see the difference.</h2>
        <p>
          Real results from recent details. Slide the divider to compare —
          and use the dots below to flip between jobs.
        </p>
        <div className="ss-ba__dots" role="tablist" aria-label="Before/after pair">
          {Array.from({ length: PAIR_COUNT }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={pair === n}
              aria-label={`Show pair ${n}`}
              className={"ss-ba__dot " + (pair === n ? "is-on" : "")}
              onClick={() => setPair(n)}
            />
          ))}
        </div>
      </div>
      <div
        className="ss-ba__viewer"
        ref={ref}
        onMouseDown={(e) => {
          dragging.current = true;
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          handleMove(e.touches[0].clientX);
        }}
      >
        <div className="ss-ba__pane ss-ba__pane--before">
          <Image
            src={`/before-and-after/before-${pair}.jpg`}
            alt={`Before — pair ${pair}`}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
            priority={pair === 1}
          />
          <span className="ss-ba__chip ss-ba__chip--before">BEFORE</span>
        </div>
        <div
          className="ss-ba__pane ss-ba__pane--after"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={`/before-and-after/after-${pair}.jpg`}
            alt={`After — pair ${pair}`}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
            priority={pair === 1}
          />
          <span className="ss-ba__chip ss-ba__chip--after">AFTER</span>
        </div>
        <div
          className="ss-ba__handle"
          style={{ left: pos + "%" }}
          role="slider"
          aria-label="Before/after slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
        >
          <span className="ss-ba__line" />
          <span className="ss-ba__knob">
            <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
              <path
                d="M9 6 3 12l6 6m6-12 6 6-6 6"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
