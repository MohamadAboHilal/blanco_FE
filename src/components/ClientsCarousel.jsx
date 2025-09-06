import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "../useLocale";

export default function ClientsCarousel({ logos = [] }) {
  const { dir } = useLocale(); // 'ltr' | 'rtl'

  // Faster autoplay + pause on hover
  const autoplay = useRef(
    Autoplay({
      delay: 1100, // faster auto-scroll
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
      direction: dir, // Embla v8 direction
    },
    [autoplay.current]
  );

  // Re-init when direction changes
  useEffect(() => {
    emblaApi?.reInit({
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
      direction: dir,
    });
  }, [emblaApi, dir]);

  return (
    <div className="relative px-6 md:px-12">
      <div className="overflow-hidden" ref={emblaRef} dir={dir}>
        <div className="flex gap-6">
          {logos.map((src, i) => (
            <div
              key={i}
              className="flex-none flex items-center justify-center
                         basis-1/2 xs:basis-1/3 sm:basis-1/5 lg:basis-1/6"
            >
              <img
                src={src}
                alt={`client-${i}`}
                className="h-10 md:h-12 w-auto object-contain select-none"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
