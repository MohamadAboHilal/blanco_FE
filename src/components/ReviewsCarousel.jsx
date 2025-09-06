import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReviewCard from "./ReviewCard";

function chunkArray(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size)
    out.push(array.slice(i, i + size));
  return out;
}

export default function ReviewsCarousel({ reviews = [] }) {
  // 4 reviews per page -> 2 columns × 2 rows
  const pages = chunkArray(reviews, 4);

  // Embla (no autoplay)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
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

  return (
    <div className="relative w-full px-6 md:px-12">
      {/* arrows */}
      <button
        type="button"
        onClick={prev}
        disabled={!canPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40"
        aria-label="Previous reviews"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        disabled={!canNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40"
        aria-label="Next reviews"
      >
        ›
      </button>

      {/* Viewport: keep Y visible so card shadows show */}
      <div
        className="overflow-x-hidden overflow-y-visible py-8 select-none"
        ref={emblaRef}
      >
        {/* Track: margin-based spacing (Embla-friendly) */}
        <div className="flex -ml-6 pb-2">
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="pl-6 flex-[0_0_100%] shrink-0" /* one full page per slide */
            >
              {/* 2x2 grid page; rows fixed to card height */}
              <div className="grid grid-cols-2 gap-y-4 auto-rows-[198px]">
                {page.map((review, i) => (
                  <div key={i} className="flex items-stretch justify-center">
                    {/* The card is 422×198 max, centered inside each grid cell */}
                    <ReviewCard {...review} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
