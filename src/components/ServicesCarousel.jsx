import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ServiceCard from "./ServiceCard";

export default function ServicesCarousel({ services = [] }) {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
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

  return (
    <div className="relative px-6 md:px-12">
      {/* arrows */}
      <button
        type="button"
        onClick={prev}
        disabled={!canPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40"
        aria-label="Previous services"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        disabled={!canNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-xl shadow disabled:opacity-40"
        aria-label="Next services"
      >
        ›
      </button>

      {/* Viewport: allow vertical shadows */}
      <div
        className="overflow-x-hidden px-6 overflow-y-visible py-8 select-none"
        ref={emblaRef}
      >
        {/* Track: use margin-based spacing (Embla-friendly) */}
        <div className="flex -ml-6 pb-2">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="
                pl-6
                relative z-10
                flex-[0_0_291px] shrink-0
              "
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
