import React, { useMemo, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TipCard from "./TipCard";
import { useLocale } from "../useLocale";

// chunk into pages of 6 (3x2)
function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function TipsCarousel({ tips = [] }) {
  const { dir } = useLocale(); // 'ltr' | 'rtl'
  const isRtl = dir === "rtl";

  // Responsive chunking: 2 per page for mobile, 4 for tablets, 6 for large screens
  const [pageSize, setPageSize] = useState(6);
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 640) {
        setPageSize(2); // 1 col × 2 rows
      } else if (w < 1024) {
        setPageSize(4); // 2 col × 2 rows
      } else {
        setPageSize(6); // 3 col × 2 rows
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const pages = useMemo(() => chunkArray(tips, pageSize), [tips, pageSize]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    direction: dir, // Embla v8 direction
  });

  // Re-init when direction changes
  useEffect(() => {
    emblaApi?.reInit({ loop: false, align: "start", direction: dir });
  }, [emblaApi, dir]);

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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (pages.length === 0) return null;

  // Flip arrow sides & handlers in RTL so it feels natural
  const prevBtnProps = {
    onClick: isRtl ? scrollNext : scrollPrev,
    disabled: isRtl ? !canNext : !canPrev,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 " +
      (isRtl ? "right-2" : "left-2"),
    "aria-label": isRtl ? "Next tips" : "Previous tips",
  };
  const nextBtnProps = {
    onClick: isRtl ? scrollPrev : scrollNext,
    disabled: isRtl ? !canPrev : !canNext,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 " +
      (isRtl ? "left-2" : "right-2"),
    "aria-label": isRtl ? "Previous tips" : "Next tips",
  };

  return (
    <div className="relative w-full px-2 sm:px-4 md:px-12">
      {/* arrows */}
      <button type="button" {...prevBtnProps}>
        ‹
      </button>
      <button type="button" {...nextBtnProps}>
        ›
      </button>

      {/* Viewport: allow shadows; set dir for native behavior */}
      <div
        ref={emblaRef}
        dir={dir}
        className="overflow-x-hidden overflow-y-visible py-4 sm:py-8 select-none"
      >
        {/* Track: use gap (direction-agnostic) instead of margin hacks */}
        <div className="flex gap-2 sm:gap-3 pb-2">
          {pages.map((page, pageIdx) => (
            <div key={pageIdx} className="flex-[0_0_100%] shrink-0">
              {/* Responsive grid: 1 col on mobile, 2 on sm/md, 3 on lg+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[160px] sm:auto-rows-[179px] gap-x-2 gap-y-2 sm:gap-x-[10px] sm:gap-y-[10px]">
                {page.map((t, i) => (
                  <div key={i} className="flex items-stretch justify-center">
                    <TipCard {...t} />
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
