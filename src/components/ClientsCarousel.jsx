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

  const autoplay = useRef(
    Autoplay({
      delay: 1100,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
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
    emblaApi?.reInit({
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
      direction: dir,
    });
  }, [emblaApi, dir]);

  if (!items.length) {
    return (
      <div className="h-[120px] grid place-items-center text-slate-400">
        No logos
      </div>
    );
  }

  return (
    <div className="relative px-6 md:px-12">
      <div className="overflow-hidden" ref={emblaRef} dir={dir}>
        <div className="flex gap-6">
          {items.map(({ src, alt }, i) => (
            <div
              key={i}
              className="flex-none flex items-center justify-center
                         basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
            >
              <img
                src={src}
                alt={alt || `client-${i}`}
                className="h-10 md:h-12 w-auto object-contain select-none"
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
