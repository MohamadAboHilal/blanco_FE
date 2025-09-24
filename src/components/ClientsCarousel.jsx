import React, { useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "../useLocale";

// logos: Array<string | { src: string; alt?: string }>
export default function ClientsCarousel({ logos = [] }) {
  const { dir } = useLocale(); // 'ltr' | 'rtl'

  // Normalize data to { src, alt }
  const items = useMemo(
    () =>
      logos.map((item, i) =>
        typeof item === "string" ? { src: item, alt: `client-${i}` } : item
      ),
    [logos]
  );

  // Use a faster speed for small screens
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const autoplay = useRef(
    Autoplay({
      delay: isMobile ? 700 : 700, // Much faster on mobile
      stopOnInteraction: true, // Fix: allow swipe/drag to pause autoplay
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      playOnInit: true,
      loop: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
      direction: dir, // Embla v8
    },
    [autoplay.current]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({
        loop: true,
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
        direction: dir,
      });
      // Ensure autoplay is running and loop is enabled
      if (autoplay.current) {
        autoplay.current.play();
      }
    }
  }, [emblaApi, dir]);

  if (!items.length) {
    return (
      <div className="h-[120px] grid place-items-center text-slate-400">
        No logos
      </div>
    );
  }

  return (
    <div className="relative px-2 sm:px-4 md:px-8 lg:px-12">
      <div className="overflow-hidden" ref={emblaRef} dir={dir}>
        <div className="flex gap-4 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-12 flex-nowrap">
          {items.map(({ src, alt }, i) => (
            <div
              key={i}
              className="flex-none flex items-center justify-center px-1"
              style={{ minWidth: "80px", maxWidth: "160px" }}
            >
              <img
                src={src}
                alt={alt || `client-${i}`}
                className="h-8 sm:h-10 md:h-12 w-auto object-contain select-none"
                draggable="false"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
