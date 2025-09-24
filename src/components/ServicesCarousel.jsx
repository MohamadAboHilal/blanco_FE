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

  return (
    <div className="relative px-3 sm:px-4 md:px-8 lg:px-10">
      {/* Viewport */}
      <div
        ref={emblaRef}
        dir={dir}
        className="overflow-x-hidden overflow-y-visible py-2 select-none"
      >
        {/* Track: tiny gap, stretch slides so cards keep full height */}
        <div className="flex items-stretch gap-0 pb-2">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="
                shrink-0 h-full
                /* widths per breakpoint */
                flex-[0_0_88%] sm:flex-[0_0_50%] md:flex-[0_0_42%]
                lg:flex-[0_0_320px] xl:flex-[0_0_320px]
                /* enough vertical room so cards don't squash */
                min-h-[380px] md:min-h-[420px]
              "
              style={{ marginLeft: 0, marginRight: 0 }}
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
