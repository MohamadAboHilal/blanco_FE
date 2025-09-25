import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ServiceCard from "./ServiceCard";
import { useLocale } from "../useLocale";

export default function ServicesCarousel({ services = [], dir: dirProp }) {
  const { dir: ctxDir } = useLocale();
  const dir = dirProp || ctxDir; // 'ltr' | 'rtl'

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      direction: dir,
      dragFree: false,
      containScroll: "trimSnaps",
      slidesToScroll: 1,
    },
    [autoplay.current]
  );

  // Re-init when direction changes
  useEffect(() => {
    emblaApi?.reInit({
      loop: false,
      align: "start",
      direction: dir,
      dragFree: false,
      containScroll: "trimSnaps",
      slidesToScroll: 1,
    });
  }, [emblaApi, dir]);

  // Carousel navigation state and handlers
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const isRtl = dir === "rtl";
  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Button props
  const prevBtnProps = {
    onClick: isRtl ? scrollNext : scrollPrev,
    disabled: isRtl ? !canNext : !canPrev,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 hidden lg:block " +
      (isRtl ? "right-2" : "left-2"),
    "aria-label": isRtl ? "Next services" : "Previous services",
  };
  const nextBtnProps = {
    onClick: isRtl ? scrollPrev : scrollNext,
    disabled: isRtl ? !canPrev : !canNext,
    className:
      "absolute top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40 hidden lg:block " +
      (isRtl ? "left-2" : "right-2"),
    "aria-label": isRtl ? "Previous services" : "Next services",
  };

  return (
    <div className="relative px-3 sm:px-4 md:px-8 lg:px-10">
      {/* arrows: only visible on lg+ screens */}
      <button type="button" {...prevBtnProps}>
        ‹
      </button>
      <button type="button" {...nextBtnProps}>
        ›
      </button>
      {/* Viewport */}
      <div
        ref={emblaRef}
        dir={dir}
        className="overflow-x-hidden overflow-y-visible py-2 select-none"
      >
        {/* Track: unified gap across all breakpoints */}
        <div className="flex items-stretch gap-4 pb-2">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="
                shrink-0 h-full
                /* Adjusted widths to account for gap-4 (16px) */
                flex-[0_0_calc(88%-12px)] sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(42%-10px)]
                lg:flex-[0_0_304px] xl:flex-[0_0_304px]
                /* enough vertical room so cards don't squash */
                min-h-[380px] md:min-h-[420px]
              "
            >
              <div className="h-full">
                <ServiceCard {...service} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
