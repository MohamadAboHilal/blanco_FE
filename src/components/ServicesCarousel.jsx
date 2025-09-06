import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ServiceCard from "./ServiceCard";
import { useLocale } from "../useLocale";

export default function ServicesCarousel({ services = [], dir: dirProp }) {
  // Read direction from your locale hook or allow an override via prop
  const { dir: ctxDir } = useLocale();
  const dir = dirProp || ctxDir; // 'ltr' | 'rtl'
  const isRtl = dir === "rtl";

  // Autoplay plugin
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  // Embla setup (v8 supports `direction`)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", direction: dir },
    [autoplay.current]
  );

  // Re-init when direction changes
  useEffect(() => {
    emblaApi?.reInit({ loop: false, align: "start", direction: dir });
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

  // In RTL we flip sides AND handlers so UX feels natural
  const prevBtnProps = {
    onClick: isRtl ? scrollNext : scrollPrev,
    disabled: isRtl ? !canNext : !canPrev,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 " +
      (isRtl ? "right-2" : "left-2"),
    "aria-label": isRtl ? "Next services" : "Previous services",
  };
  const nextBtnProps = {
    onClick: isRtl ? scrollPrev : scrollNext,
    disabled: isRtl ? !canPrev : !canNext,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 " +
      (isRtl ? "left-2" : "right-2"),
    "aria-label": isRtl ? "Previous services" : "Next services",
  };

  return (
    <div className="relative px-8 md:px-14">
      {/* Arrows */}
      <button type="button" {...prevBtnProps}>
        ‹
      </button>
      <button type="button" {...nextBtnProps}>
        ›
      </button>

      {/* Viewport (dir helps native snap & keyboard) */}
      <div
        ref={emblaRef}
        dir={dir}
        className="overflow-x-hidden overflow-y-visible py-8 select-none"
      >
        {/* Track — use gap so spacing is direction-agnostic */}
        <div className="flex gap-6 pb-2 px-4">
          {services.map((service, idx) => (
            <div key={idx} className="flex-[0_0_291px] shrink-0">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
