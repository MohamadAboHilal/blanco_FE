import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReviewCard from "./ReviewCard";
import { useLocale } from "../useLocale";

function chunkArray(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size)
    out.push(array.slice(i, i + size));
  return out;
}

export default function ReviewsCarousel({ reviews = [] }) {
  const { dir } = useLocale(); // 'ltr' | 'rtl'
  const isRtl = dir === "rtl";

  // 4 reviews per page -> 2 columns × 2 rows
  const pages = chunkArray(reviews, 4);

  // Embla v8 with direction
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    direction: dir,
  });

  // Re-init when direction changes (after language switch)
  useEffect(() => {
    emblaApi?.reInit({ loop: true, align: "start", direction: dir });
  }, [emblaApi, dir]);

  // Arrow enabled state
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
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handlers
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Flip sides & handlers in RTL so it feels natural
  const prevBtnProps = {
    onClick: isRtl ? scrollNext : scrollPrev,
    disabled: isRtl ? !canNext : !canPrev,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 " +
      (isRtl ? "right-2" : "left-2"),
    "aria-label": isRtl ? "Next reviews" : "Previous reviews",
  };
  const nextBtnProps = {
    onClick: isRtl ? scrollPrev : scrollNext,
    disabled: isRtl ? !canPrev : !canNext,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 " +
      (isRtl ? "left-2" : "right-2"),
    "aria-label": isRtl ? "Previous reviews" : "Next reviews",
  };

  return (
    <div className="relative w-full px-6 md:px-12">
      {/* arrows */}
      <button type="button" {...prevBtnProps}>
        ‹
      </button>
      <button type="button" {...nextBtnProps}>
        ›
      </button>

      {/* Viewport: keep Y visible so card shadows show; set dir for native behavior */}
      <div
        ref={emblaRef}
        dir={dir}
        className="overflow-x-hidden overflow-y-visible py-8 select-none"
      >
        {/* Track: use gap (direction-agnostic) instead of margin hacks */}
        <div className="flex gap-6 pb-2">
          {pages.map((page, pageIdx) => (
            <div key={pageIdx} className="flex-[0_0_100%] shrink-0">
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
