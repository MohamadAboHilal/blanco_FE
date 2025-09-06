import React from "react";

export default function BeforeAfterCard({
  before,
  after,
  onOpen,
  onHoverOpen,
}) {
  return (
    <button
      onClick={onOpen}
      onMouseEnter={onHoverOpen}
      className="relative w-full overflow-hidden rounded-3xl
                 bg-white border border-white/60 shadow-2xl shadow-black/5 ring-1 ring-black/5"
      aria-label="Open before/after comparison"
    >
      <div className="relative aspect-video">
        {/* After (base, full) */}
        <img
          src={after}
          alt="After"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Before (left half) */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />

        {/* Center divider */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/70 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />

        {/* Labels */}
        <span className="absolute left-3 top-3 rounded-md bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-700">
          Before
        </span>
        <span className="absolute right-3 bottom-3 rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
          After
        </span>
      </div>

      {/* Hover tint */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition hover:bg-black/10" />
    </button>
  );
}
