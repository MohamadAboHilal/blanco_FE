import React, { useMemo, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TipCard from "./TipCard";

// chunk into pages of 6 (3x2)
function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function TipsCarousel({ tips = [] }) {
  const pages = useMemo(() => chunkArray(tips, 6), [tips]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (pages.length === 0) return null;

  return (
    <div className="relative w-full px-6 md:px-12">
      {/* arrows */}
      <button
        type="button"
        onClick={prev}
        disabled={!canPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40"
        aria-label="Previous tips"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        disabled={!canNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40"
        aria-label="Next tips"
      >
        ›
      </button>

      {/* Viewport: allow shadows to show vertically, disable text selection while dragging */}
      <div
        className="overflow-x-hidden overflow-y-visible py-8 select-none"
        ref={emblaRef}
      >
        {/* Track: margin-based spacing to avoid overlap artifacts */}
        <div className="flex -ml-3 pb-2">
          {pages.map((page, pageIdx) => (
            <div key={pageIdx} className="pl-3 flex-[0_0_100%] shrink-0">
              {/* 3×2 grid page; exact row height + custom 10px gap */}
              <div className="grid grid-cols-3 auto-rows-[179px] gap-x-[10px] gap-y-[10px]">
                {page.map((t, i) => (
                  <div key={i} className="flex items-stretch justify-center">
                    <TipCard {...t} />
                  </div>
                ))}
                {/* If last page isn’t full, you can pad with empty cells if desired */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
